"use client"

import { cn } from "@/lib/utils"
import { docArticles } from "@/data/docs"
import { BookOpen, ChevronRight } from "lucide-react"

interface SidebarProps {
  activeSlug?: string
}

export function Sidebar({ activeSlug }: SidebarProps) {
  const categories = Array.from(new Set(docArticles.map((d) => d.category)))

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="glass rounded-xl p-4 sticky top-20">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-blue-500/10">
          <BookOpen className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold text-gray-200">Documentation</span>
        </div>
        <nav className="space-y-4">
          {categories.map((category) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {category}
              </h4>
              <ul className="space-y-1">
                {docArticles
                  .filter((d) => d.category === category)
                  .map((doc) => (
                    <li key={doc.slug}>
                      <a
                        href={`/docs/${doc.slug}`}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                          activeSlug === doc.slug
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "text-gray-400 hover:text-blue-400 hover:bg-blue-500/5"
                        )}
                      >
                        <ChevronRight className={cn(
                          "w-3 h-3 transition-transform",
                          activeSlug === doc.slug && "rotate-90"
                        )} />
                        {doc.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}
