"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { DocsOverview } from "@/components/sections/docs-overview"

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <DocsOverview />
      </main>
      <Footer />
    </>
  )
}
