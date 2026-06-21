"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { ArrowRight, BookOpen, FolderKanban, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const NetworkBg = dynamic(
  () => import("@/components/3d/network-background").then((m) => m.NetworkBackground),
  { ssr: false },
)

export function Hero() {
  return (
    <section id="home" className="min-h-[80vh] sm:min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-float" />
        <NetworkBg />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="accent" className="mb-4 sm:mb-6">
            Professional Documentation &amp; Portfolio
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4"
        >
          <span className="shimmer-text">Godz Documentation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-lg md:text-xl text-blue-300/80 font-medium mb-3 sm:mb-6"
        >
          DevOps | DevSecOps | Cloud Infrastructure | Kubernetes | Automation
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xs sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed hidden sm:block"
        >
          Professional documentation and portfolio showcasing DevOps engineering, cloud architecture,
          security automation, infrastructure as code, CI/CD pipelines, and modern platform engineering practices.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a href="#docs" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base">
              <BookOpen className="w-4 h-4 mr-2" />
              Explore Documentation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <a href="#projects" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-sm sm:text-base">
              <FolderKanban className="w-4 h-4 mr-2" />
              View Projects
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
