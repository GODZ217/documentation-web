"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Terminal } from "lucide-react"

const TerminalComponent = dynamic(
  () => import("@/components/ui/interactive-terminal").then((m) => m.InteractiveTerminal),
  { ssr: false },
)

export function TerminalSection() {
  return (
    <section id="terminal" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Interactive <span className="text-gradient">Terminal</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Try out DevOps commands directly in the browser. Click a suggestion or type your own.
          </p>
        </motion.div>

        <TerminalComponent />
      </div>
    </section>
  )
}
