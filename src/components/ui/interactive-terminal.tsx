"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const commands = [
  { cmd: "kubectl get pods -n production", output: "NAME                     READY   STATUS    RESTARTS   AGE\nweb-app-7d8f9c4b6-abc12   1/1     Running   0          12h\nweb-app-7d8f9c4b6-def34   1/1     Running   0          12h\napi-gw-5f2e9a1c2-ghi56    1/1     Running   1          24h\nredis-6b7f8c9d0-jkl78     1/1     Running   0          48h" },
  { cmd: "docker ps --format 'table {{.Names}}\\t{{.Status}}'", output: "NAMES               STATUS\nmy-app-web          Up 3 days\nredis-cache         Up 3 days\npostgres-db         Up 3 days\nnginx-proxy         Up 3 days" },
  { cmd: "terraform plan -out=tfplan", output: "Terraform will perform the following actions:\n\n  # aws_instance.web will be created\n  + resource \"aws_instance\" \"web\" {\n      + ami           = \"ami-0c55b159cbfafe1f0\"\n      + instance_type = \"t3.medium\"\n      + tags          = {\n          + \"Name\" = \"web-server\"\n        }\n    }\n\nPlan: 1 to add, 0 to change, 0 to destroy." },
  { cmd: "helm list -n monitoring", output: "NAME            NAMESPACE       REVISION    UPDATED                                 STATUS      CHART\nprometheus      monitoring      1           2024-01-15 10:30:00                    deployed    prometheus-25.0.0\ngrafana         monitoring      1           2024-01-15 10:30:00                    deployed    grafana-7.3.0\nloki            monitoring      1           2024-01-15 10:30:00                    deployed    loki-5.0.0" },
  { cmd: "systemctl status sshd", output: "● sshd.service - OpenSSH server daemon\n     Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; preset: enabled)\n     Active: active (running) since Mon 2024-01-15 09:00:00 UTC\n       Docs: man:sshd(8)\n   Main PID: 1234 (sshd)\n      Tasks: 1 (limit: 123456)\n     Memory: 5.2M\n        CPU: 1.234s\n     CGroup: /system.slice/sshd.service\n             └── 1234 \"sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups\"" },
  { cmd: "git log --oneline -5", output: "a1b2c3d feat: add monitoring dashboards\ne4f5g6h fix: resolve memory leak in api gateway\ni7j8k9l feat: implement rate limiting\nm0n1o2p chore: update dependencies\nq3r4s5t docs: update deployment guide" },
  { cmd: "curl -s https://api.github.com/repos/GODZ217/kubernetes-cluster-deployment | jq '.stargazers_count, .forks_count'", output: "12\n8" },
]

export function InteractiveTerminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<{ type: "input" | "output" | "system"; text: string }[]>([
    { type: "system", text: "Welcome to Godz Terminal v1.0.0" },
    { type: "system", text: "Type a command or click a suggestion below. Try: help" },
  ])
  const [commandIndex, setCommandIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50)
  }, [])

  const appendLine = useCallback((entry: { type: "input" | "output" | "system"; text: string }) => {
    setHistory((prev) => [...prev, entry])
    scrollToBottom()
  }, [scrollToBottom])

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()

    appendLine({ type: "input", text: `$ ${cmd}` })

    if (trimmed === "help") {
      appendLine({ type: "output", text: "Available commands: kubectl, docker, terraform, helm, systemctl, git, curl, help, clear" })
    } else if (trimmed === "clear") {
      setHistory([])
      return
    } else if (trimmed === "") {
      return
    } else {
      const match = commands.find((c) => c.cmd.toLowerCase().startsWith(trimmed) || trimmed.startsWith(c.cmd.split(" ")[0]))
      if (match) {
        if (match.cmd.startsWith(trimmed)) {
          appendLine({ type: "output", text: match.output })
        } else {
          appendLine({ type: "output", text: `Command not found: ${cmd}\nTry: help` })
        }
      } else {
        appendLine({ type: "output", text: `command not found: ${cmd}\nTry: help` })
      }
    }
  }, [appendLine])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isTyping || !input.trim()) return
    executeCommand(input)
    setInput("")
  }

  const handleSuggestionClick = (cmd: string) => {
    if (isTyping) return
    executeCommand(cmd)
  }

  const cycleCommand = () => {
    const cmds = commands.map((c) => c.cmd)
    setCommandIndex((prev) => (prev + 1) % cmds.length)
    setInput(cmds[commandIndex])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-3xl mx-auto"
    >
      <div
        className="rounded-xl overflow-hidden border border-blue-500/20 shadow-2xl shadow-blue-500/5"
        style={{ background: "rgba(7, 17, 32, 0.95)" }}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-500/10 bg-blue-950/30">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-xs text-blue-400/60 ml-2 font-mono">godz@devops:~$</span>
          <div className="flex-1" />
          <button
            onClick={cycleCommand}
            className="text-xs text-blue-400/40 hover:text-blue-400/80 transition-colors font-mono"
            title="Cycle through available commands"
          >
            ⎋ suggest
          </button>
        </div>

        {/* Terminal Body */}
        <div
          className="p-4 font-mono text-sm min-h-[320px] max-h-[400px] overflow-y-auto space-y-1"
          onClick={() => inputRef.current?.focus()}
        >
          <AnimatePresence>
            {history.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
              >
                {entry.type === "input" ? (
                  <div className="text-green-400/90">
                    <span className="text-blue-400">$ </span>
                    {entry.text.slice(2)}
                  </div>
                ) : entry.type === "system" ? (
                  <div className="text-blue-400/60 italic text-xs">{entry.text}</div>
                ) : (
                  <pre className="text-gray-300 whitespace-pre-wrap font-mono text-xs leading-relaxed">
                    {entry.text}
                  </pre>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input */}
        <form onSubmit={handleSubmit} className="border-t border-blue-500/10 px-4 py-3 flex items-center gap-2">
          <span className="text-green-400 font-mono text-sm">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command..."
            className="flex-1 bg-transparent border-none outline-none text-gray-200 font-mono text-sm placeholder-gray-600"
            disabled={isTyping}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={() => setInput("")}
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            ✕
          </button>
        </form>

        {/* Quick Suggestions */}
        <div className="flex flex-wrap gap-1.5 px-4 pb-3">
          {commands.slice(0, 5).map((c) => (
            <button
              key={c.cmd}
              onClick={() => handleSuggestionClick(c.cmd)}
              className="text-[10px] px-2 py-1 rounded-md bg-blue-500/10 text-blue-400/70 hover:bg-blue-500/20 hover:text-blue-300 transition-all font-mono"
            >
              {c.cmd.length > 30 ? c.cmd.slice(0, 28) + ".." : c.cmd}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
