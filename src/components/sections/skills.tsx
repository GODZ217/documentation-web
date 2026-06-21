"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { skillCategories } from "@/data/skills"
import { Settings, GitBranch, Cloud, Shield } from "lucide-react"

const TechOrbit = dynamic(
  () => import("@/components/3d/floating-tech-orbit").then((m) => m.FloatingTechOrbit),
  { ssr: false },
)

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Settings,
  GitBranch,
  Cloud,
  Shield,
}

export function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">
            Skills &amp; <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I work with across the DevOps and DevSecOps landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon] || Settings
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass glass-hover rounded-xl p-4 sm:p-6"
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-100">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-16"
        >
          <TechOrbit />
        </motion.div>
      </div>
    </section>
  )
}
