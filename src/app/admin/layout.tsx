import Link from "next/link"
import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <Link href="/">Назад</Link>
      {children}
    </div>
  )
}

export default Layout
