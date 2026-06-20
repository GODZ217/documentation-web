import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-blue-500/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold text-gradient">Godz Documentation</span>
          </div>
          <p className="text-sm text-gray-500">
            Built with Next.js & Tailwind CSS. &copy; {new Date().getFullYear()} Godz Documentation.
          </p>
        </div>
      </div>
    </footer>
  )
}
