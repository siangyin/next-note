import React from "react"

const PublicLayout = (props: { children: React.ReactNode }) => {
  return <div className="dark:bg-[#1F1F1F]">{props.children}</div>
}

export default PublicLayout
