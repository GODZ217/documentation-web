"use client"

import { motion } from "framer-motion"
import { docArticles } from "@/data/docs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen } from "lucide-react"

export function DocsOverview() {
  return (
    <section id="docs" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gradient">Documentation</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive guides and articles covering DevOps, DevSecOps, cloud infrastructure, and security best practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docArticles.map((doc, index) => (
            <motion.a
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass glass-hover rounded-xl p-6 flex flex-col group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                </div>
                <Badge variant="accent">{doc.category}</Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors">
                {doc.title}
              </h3>
              <p className="text-sm text-gray-400 flex-1 leading-relaxed mb-4">
                {doc.description}
              </p>
              <div className="flex items-center text-sm text-blue-400 group-hover:gap-3 transition-all">
                Read Article <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
