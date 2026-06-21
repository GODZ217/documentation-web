"use client"

import { motion } from "framer-motion"
import { docArticles } from "@/data/docs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen } from "lucide-react"

export function DocsOverview() {
  return (
    <section id="docs" className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">
            <span className="text-gradient">Documentation</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Comprehensive guides and articles covering DevOps, DevSecOps, cloud infrastructure, and security best practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {docArticles.map((doc, index) => (
            <motion.a
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass glass-hover rounded-xl p-4 sm:p-6 flex flex-col group"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <Badge variant="accent">{doc.category}</Badge>
              </div>
              <h3 className="text-sm sm:text-lg font-semibold text-gray-100 mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors">
                {doc.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 flex-1 leading-relaxed mb-3 sm:mb-4">
                {doc.description}
              </p>
              <div className="flex items-center text-xs sm:text-sm text-blue-400 group-hover:gap-3 transition-all">
                Read Article <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
