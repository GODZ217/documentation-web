"use client"

import { motion } from "framer-motion"
import { Shield, Brain, Cloud, Lock, Code2, Rocket, CheckCircle2 } from "lucide-react"

const highlights = [
  {
    icon: Rocket,
    title: "DevOps & DevSecOps Passion",
    description: "Deeply passionate about bridging development and operations with security at every layer of the stack.",
  },
  {
    icon: Brain,
    title: "Automation First",
    description: "Automating everything from infrastructure provisioning to security scanning and compliance verification.",
  },
  {
    icon: Cloud,
    title: "Cloud Native Technologies",
    description: "Expert in containerization, orchestration, and cloud-native architecture patterns at scale.",
  },
  {
    icon: Code2,
    title: "Infrastructure as Code",
    description: "Treating infrastructure as software with version control, testing, and CI/CD best practices.",
  },
  {
    icon: Lock,
    title: "Security by Design",
    description: "Embedding security controls and practices throughout the entire development lifecycle.",
  },
  {
    icon: Shield,
    title: "Platform Engineering",
    description: "Building internal developer platforms that enable teams to ship faster and more securely.",
  },
]

const experience = [
  {
    company: "Enterprise Platform Engineering",
    role: "Platform Engineer / DevOps Engineer",
    period: "Multiple Enterprise Clients",
    items: [
      "OpenShift Container Platform implementation for government and enterprise clients",
      "CI/CD platform implementation with Jenkins, GitLab, and OpenShift Pipelines",
      "DevSecOps integration with SonarQube, Trivy, and security scanning automation",
      "Red Hat Satellite management for 1000+ RHEL VM patch management",
      "Kafka Confluent administration and storage migration on OpenShift",
      "Migration projects: application migration to Kubernetes/OpenShift",
    ],
  },
]

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            DevOps and DevSecOps engineer with expertise in building secure, scalable, and automated infrastructure.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-gray-400 leading-relaxed">
            I specialize in designing and implementing end-to-end DevOps and DevSecOps pipelines that enable
            organizations to deliver software rapidly, reliably, and securely. With deep expertise in cloud
            infrastructure, containerization, and automation, I help teams adopt modern engineering practices
            that accelerate development while maintaining enterprise-grade security.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass glass-hover rounded-xl p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {experience.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass rounded-xl p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-100">{exp.role}</h3>
                <p className="text-sm text-blue-400">{exp.company}</p>
              </div>
              <span className="text-sm text-gray-500">{exp.period}</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {exp.items.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
