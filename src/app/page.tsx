"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"
import { DocsOverview } from "@/components/sections/docs-overview"
import { TerminalSection } from "@/components/sections/terminal-section"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <DocsOverview />
        <TerminalSection />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
