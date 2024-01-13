import Header from "@/components/landing-page/header"
import db from "@/lib/supabase/db"
import React from "react"

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  // console.log(db)
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}

export default HomePageLayout
