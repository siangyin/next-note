# Next Note

A clean note‑taking app (Notion‑style) built with **Next.js 15**, **Convex**, **Clerk**, **EdgeStore**, and **Tailwind/shadcn**.

**Live:**  https://next-note-app-2025.vercel.app

**Repo:** https://github.com/siangyin/next-note


---
## Features

- Email/OAuth login (Clerk)
- Real-time database
- Create, edit, and delete notes
- Nested notes (create sub-notes)
- Soft delete (Trash) and restore
- Notion-style editor
- Command‑K search
- Fully collapsable and expandable sidebar
- Light and Dark mode
- Image uploads (EdgeStore) for note visuals/covers
- Publish your note to the web
- Responsive UI

---
## Tech Stack

- **Next.js 15 (App Router)**
- **React 19 + TypeScript**
- **Convex** (database + server functions) [https://convex.dev](https://convex.dev)
- **Clerk** (authentication) [https://clerk.dev](https://clerk.dev) 
- **Tailwind CSS + shadcn/ui** [https://ui.shadcn.com/](https://ui.shadcn.com/)
- **EdgeStore** (file uploads) [https://edgestore.dev/](https://edgestore.dev/)
- Blocknotejs [https://www.blocknotejs.org/](https://www.blocknotejs.org/)
- Lucide Icons, cmdk, Sonner
- Vercel (deploy)

---
## Screenshots


**Demo:** [▶ Watch demo on YouTube](https://youtube.com/watch?v=scII93rv0uY)

Home <img width="1460" height="1186" alt="Screenshot 2025-08-10 at 9 45 33 PM" src="https://github.com/user-attachments/assets/fb9fa633-a908-4d4e-be38-05d201ea7626" />
<img width="1461" height="1189" alt="Screenshot 2025-08-10 at 9 45 25 PM" src="https://github.com/user-attachments/assets/c4419c03-aa14-4779-9ed8-09d3b8807157" />

Documents 
<img width="1430" height="1103" alt="Screenshot 2025-08-10 at 9 44 30 PM" src="https://github.com/user-attachments/assets/6660d7ad-ade8-4add-bb4e-8d32e86f4ff2" />
<img width="1428" height="1100" alt="Screenshot 2025-08-10 at 9 45 11 PM" src="https://github.com/user-attachments/assets/fd14fd67-13e7-441d-a22f-6c8d13daf294" />
<img width="1428" height="1103" alt="Screenshot 2025-08-10 at 9 44 43 PM" src="https://github.com/user-attachments/assets/53da711d-8c24-4f7a-8cd5-218d52842aba" />
<img width="1420" height="1103" alt="Screenshot 2025-08-10 at 9 44 16 PM" src="https://github.com/user-attachments/assets/c8b3505e-2b8b-4dc1-9e78-eefc11b481dd" />




---
## Project Structure (short)

```
app/
  (marketing)/...                          # public pages, landing page
  (main)/(routes)/documents/[documentId]   # authenticated app pages (documents)
  (public)/(routes)/preview/[documentId]   # public published pages
components/
  common, ui, providers (Clerk, Convex, Theme, EdgeStore), modals
convex/
  schema.ts, documents.ts, _generated, auth config
hooks/
  small UI hooks (search, scroll)
lib/
  edgestore client, small helpers
public/
  images and assets
```

---
## Getting Started

### 1) Prerequisites
- Node.js **18+**
- Accounts/keys for **Convex**, **Clerk**, and **EdgeStore**

### 2) Clone and install
```bash
git clone https://github.com/siangyin/next-note.git
cd next-note
npm i
```

### 3) Environment variables

Create `.env.local` in the project root:

```env
# App
NEXT_PUBLIC_APP_NAME=Next note

# Convex
CONVEX_DEPLOYMENT=dev:<your-deployment>     # optional, for `npx convex dev`
NEXT_PUBLIC_CONVEX_URL=https://<your>.convex.cloud

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXX
CLERK_SECRET_KEY=sk_test_XXXX

# EdgeStore (uploads)
EDGE_STORE_ACCESS_KEY=XXXX
EDGE_STORE_SECRET_KEY=XXXX
```

If your Convex auth uses Clerk JWTs, add `convex/.env.local`:

```env
CLERK_ISSUER_URL=https://<your-clerk-issuer-url>
```

### 4) Run locally

Open two terminals:

```bash
# Terminal A: Convex
npx convex dev
```

```bash
# Terminal B: Next.js
npm run dev
```

Open http://localhost:3000

### 5) Deploy

- Connect the repo on **Vercel**
- Add the same environment variables in Vercel Project Settings
- Deploy

---
## Scripts

```bash
npm run dev       # start next dev server
npm run build     # production build
npm run start     # start production server
npx convex dev    # run convex locally (separate terminal)
```

