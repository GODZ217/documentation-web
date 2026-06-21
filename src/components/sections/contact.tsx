"use client"

import { motion } from "framer-motion"
import { Code2, Globe, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

const contacts = [
  {
    icon: Code2,
    label: "GitHub",
    href: "https://github.com/GODZ217",
  },
  {
    icon: Globe,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rifqi-ferdinand-015ba9246/",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:muhamadrifki0307@gmail.com",
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10">
            Interested in collaborating or have a project in mind? Let&apos;s connect and build something amazing together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {contacts.map((contact) => {
            const Icon = contact.icon
            return (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover rounded-xl p-4 flex items-center gap-3 min-w-[180px] justify-center group"
              >
                <Icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {contact.label}
                </span>
              </a>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <a href="mailto:muhamadrifki0307@gmail.com">
            <Button variant="primary" size="lg">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send a Message
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
