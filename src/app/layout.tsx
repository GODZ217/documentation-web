import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Godz Documentation | DevOps & DevSecOps Portfolio",
  description:
    "Professional documentation and portfolio showcasing DevOps engineering, cloud architecture, security automation, infrastructure as code, CI/CD pipelines, and modern platform engineering practices.",
  keywords: [
    "DevOps",
    "DevSecOps",
    "Cloud Infrastructure",
    "Kubernetes",
    "Docker",
    "CI/CD",
    "Terraform",
    "Security Automation",
  ],
  openGraph: {
    title: "Godz Documentation",
    description: "Professional documentation and portfolio for DevOps & DevSecOps engineering.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
