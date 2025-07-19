import { v } from "convex/values"

import { mutation, query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel"

export const create = mutation({
  // Takes a title and optional parentDocument to create a new note
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const userId = identity.subject

    // Insert a new document with default status (not archived or published)
    const document = await context.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    })

    return document
  },
})

export const getSidebar = query({
  // Accepts an optional parentDocument ID (used to fetch children of a specific document)
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const userId = identity.subject

    // Query all non-archived child documents under the given parent for this user
    const documents = await context.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false)) // Only show non-archived docs
      .order("desc")
      .collect()

    return documents
  },
})

export const archive = mutation({
  // This mutation takes a document `id` as an argument
  args: { id: v.id("documents") },

  handler: async (context, args) => {
    // 1. Get the identity of the currently logged-in user
    const identity = await context.auth.getUserIdentity()

    // If no user is logged in, throw an error
    if (!identity) {
      throw new Error("Not authenticated")
    }

    // Store the user ID
    const userId = identity.subject

    // 2. Get the document the user is trying to archive
    const existingDocument = await context.db.get(args.id)

    // If the document doesn't exist, throw an error
    if (!existingDocument) {
      throw new Error("Not found")
    }

    // 3. Check if the document belongs to the current user
    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized")
    }

    // 4. Define a helper function to archive all child documents recursively
    const recursiveArchive = async (documentId: Id<"documents">) => {
      // Find all child documents under the given document,
      // using the `by_user_parent` index to match on userId and parentDocument
      const children = await context.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect()

      // For each child document:
      for (const child of children) {
        // - Mark it as archived
        await context.db.patch(child._id, {
          isArchived: true,
        })
        // - Recursively archive its children
        await recursiveArchive(child._id)
      }
    }

    // 5. Archive the main document
    const document = await context.db.patch(args.id, {
      isArchived: true,
    })

    // 6. Archive all its child documents recursively
    recursiveArchive(args.id)

    // 7. Return the archived top-level document
    return document
  },
})

export const getTrash = query({
  handler: async (context) => {
    const identity = await context.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const userId = identity.subject

    // Fetch all archived documents belonging to the user
    const documents = await context.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect()

    return documents
  },
})

export const restore = mutation({
  args: { id: v.id("documents") },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const userId = identity.subject

    const existingDocument = await context.db.get(args.id)
    if (!existingDocument) throw new Error("Not found")
    if (existingDocument.userId !== userId) throw new Error("Unauthorized")

    // Recursively restore all child documents (unarchive)
    const recursiveRestore = async (documentId: Id<"documents">) => {
      const children = await context.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect()

      for (const child of children) {
        await context.db.patch(child._id, { isArchived: false })
        await recursiveRestore(child._id)
      }
    }

    // Restore the main document
    const options: Partial<Doc<"documents">> = { isArchived: false }

    // If parent is still archived, detach from it to avoid restoring into a hidden folder
    if (existingDocument.parentDocument) {
      const parent = await context.db.get(existingDocument.parentDocument)
      if (parent?.isArchived) {
        options.parentDocument = undefined
      }
    }

    const document = await context.db.patch(args.id, options)

    // Restore all children
    recursiveRestore(args.id)

    return document
  },
})

export const remove = mutation({
  args: { id: v.id("documents") },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const userId = identity.subject

    const existingDocument = await context.db.get(args.id)
    if (!existingDocument) throw new Error("Not found")
    if (existingDocument.userId !== userId) throw new Error("Unauthorized")

    // Permanently delete the document
    const document = await context.db.delete(args.id)

    return document
  },
})

export const getSearch = query({
  handler: async (context) => {
    const identity = await context.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const userId = identity.subject

    // Get all non-archived documents for the user
    const documents = await context.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect()

    return documents
  },
})

export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity()
    const document = await context.db.get(args.documentId)

    if (!document) throw new Error("Not found")

    // Allow public access if the doc is published and not archived
    if (document.isPublished && !document.isArchived) {
      return document
    }

    if (!identity) throw new Error("Not authenticated")

    const userId = identity.subject

    if (document.userId !== userId) {
      throw new Error("Unauthorized")
    }

    return document
  },
})

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthenticated")

    const userId = identity.subject
    const { id, ...rest } = args

    const existingDocument = await context.db.get(id)
    if (!existingDocument) throw new Error("Not found")
    if (existingDocument.userId !== userId) throw new Error("Unauthorized")

    // Update only the fields that are provided
    const document = await context.db.patch(id, { ...rest })

    return document
  },
})

export const removeIcon = mutation({
  args: { id: v.id("documents") },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthenticated")

    const userId = identity.subject

    const existingDocument = await context.db.get(args.id)
    if (!existingDocument) throw new Error("Not found")
    if (existingDocument.userId !== userId) throw new Error("Unauthorized")

    // Remove the icon from the document
    const document = await context.db.patch(args.id, { icon: undefined })

    return document
  },
})

export const removeCoverImage = mutation({
  args: { id: v.id("documents") },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthenticated")

    const userId = identity.subject

    const existingDocument = await context.db.get(args.id)
    if (!existingDocument) throw new Error("Not found")
    if (existingDocument.userId !== userId) throw new Error("Unauthorized")

    // Remove the cover image from the document
    const document = await context.db.patch(args.id, {
      coverImage: undefined,
    })

    return document
  },
})
