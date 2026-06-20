"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Sidebar } from "@/components/layout/sidebar"
import { docArticles } from "@/data/docs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

function parseContent(content: string) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0
  let codeBlock: string[] = []
  let inCodeBlock = false

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${i}`} className="bg-[#0a1628] rounded-xl p-4 overflow-x-auto border border-blue-500/10 my-4">
            <code className="text-sm text-gray-300 font-mono">{codeBlock.join("\n")}</code>
          </pre>
        )
        codeBlock = []
        inCodeBlock = false
      } else {
        inCodeBlock = true
      }
      i++
      continue
    }

    if (inCodeBlock) {
      codeBlock.push(line)
      i++
      continue
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-semibold text-gray-100 mt-8 mb-3">
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-blue-300 mt-10 mb-4">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="text-gray-400 ml-4 mb-1 list-disc list-inside">
          {inlineFormat(line.slice(2))}
        </li>
      )
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />)
    } else {
      elements.push(
        <p key={i} className="text-gray-400 leading-relaxed mb-2">
          {inlineFormat(line)}
        </p>
      )
    }
    i++
  }

  if (inCodeBlock && codeBlock.length > 0) {
    elements.push(
      <pre key="final-code" className="bg-[#0a1628] rounded-xl p-4 overflow-x-auto border border-blue-500/10 my-4">
        <code className="text-sm text-gray-300 font-mono">{codeBlock.join("\n")}</code>
      </pre>
    )
  }

  return elements
}

function inlineFormat(text: string): React.ReactNode {
  const parts = text.split(/(\`[^\`]+\`)/g)
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="bg-blue-500/10 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">
          {part.slice(1, -1)}
        </code>
      )
    }
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g)
    return boldParts.map((bp, j) => {
      if (bp.startsWith("**") && bp.endsWith("**")) {
        return <strong key={`${i}-${j}`} className="text-gray-200 font-semibold">{bp.slice(2, -2)}</strong>
      }
      return bp
    })
  })
}

export default function DocArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const article = docArticles.find((d) => d.slug === slug)

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-300 mb-2">Article Not Found</h1>
            <Link href="/docs" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 justify-center">
              <ArrowLeft className="w-4 h-4" /> Back to Documentation
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const contentElements = parseContent(article.content)

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <Sidebar activeSlug={slug} />
            <article className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Documentation
                </Link>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                  </div>
                  <Badge variant="accent">{article.category}</Badge>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">
                  {article.title}
                </h1>

                <p className="text-gray-400 mb-10">{article.description}</p>

                <div className="space-y-1">
                  {contentElements}
                </div>
              </motion.div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
