"use client"

import { motion } from "framer-motion"
import { projects } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code2, ExternalLink, CheckCircle2 } from "lucide-react"

export function Projects() {
  return (
    <section id="projects" className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Real-world projects demonstrating DevOps, cloud infrastructure, and security automation expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass glass-hover rounded-xl p-4 sm:p-6 flex flex-col"
            >
              <div className="flex-1">
                <h3 className="text-sm sm:text-lg font-semibold text-gray-100 mb-2 sm:mb-3">{project.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>

                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400">
                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="outline" className="w-full" size="sm">
                  <Code2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  <span className="text-xs sm:text-sm">View on GitHub</span>
                  <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1.5 sm:ml-2" />
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
