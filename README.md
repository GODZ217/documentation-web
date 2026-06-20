# Godz Documentation

Professional documentation and portfolio website showcasing **DevOps Engineering**, **DevSecOps Engineering**, **Cloud Infrastructure**, **Containerization**, **CI/CD Automation**, **Kubernetes**, and **Security Automation**.

Built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion. Designed with a dark blue gradient theme and glassmorphism UI.

## Features

- **Hero Section** — Modern hero with shimmer text, animated CTAs
- **About Me** — Professional highlights with passion-driven cards
- **Skills** — Grouped by DevOps, CI/CD, Cloud, Security with badge-style tags
- **Projects** — 6 project cards with tech stack, highlights, and GitHub links
- **Documentation** — 5 in-depth articles (Docker, Kubernetes, GitHub Actions, Terraform, DevSecOps)
- **Sidebar Navigation** — GitBook/Docusaurus-style documentation sidebar
- **Contact** — GitHub, LinkedIn, Email links with glassmorphism cards
- **Responsive** — Fully responsive mobile and desktop layout
- **Smooth Animations** — Framer Motion powered scroll animations
- **Glassmorphism** — Modern glass-effect UI components
- **Dark Mode** — Dark blue gradient theme by default

## Technology Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Font | Geist (Vercel) |
| Deployment | Docker, Vercel |

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 10

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Docker

```bash
docker compose build
docker compose up -d
```

## Project Structure

```
src/
├── app/
│   ├── docs/
│   │   ├── [slug]/page.tsx     # Individual doc article page
│   │   └── page.tsx            # Documentation listing
│   ├── globals.css             # Global styles + theme
│   ├── layout.tsx              # Root layout with metadata
│   └── page.tsx                # Landing page (all sections)
├── components/
│   ├── layout/
│   │   ├── footer.tsx          # Site footer
│   │   ├── navbar.tsx          # Sticky navigation bar
│   │   └── sidebar.tsx         # Documentation sidebar
│   ├── sections/
│   │   ├── about.tsx           # About Me section
│   │   ├── contact.tsx         # Contact section
│   │   ├── docs-overview.tsx   # Documentation cards
│   │   ├── hero.tsx            # Hero section
│   │   ├── projects.tsx        # Projects section
│   │   └── skills.tsx          # Skills section
│   └── ui/
│       ├── badge.tsx           # Badge component
│       └── button.tsx          # Button component
├── data/
│   ├── docs.ts                 # Documentation articles
│   ├── projects.ts             # Projects data
│   └── skills.ts               # Skills data
└── lib/
    └── utils.ts                # Utility functions
```

## Documentation Articles

1. **Docker Fundamental for DevOps Engineers** — Docker architecture, containers vs VMs, essential commands
2. **Kubernetes Architecture Deep Dive** — Control plane, worker nodes, YAML manifests, kubectl commands
3. **Building CI/CD Pipeline with GitHub Actions** — Workflow design, pipeline stages, automation
4. **Terraform Infrastructure as Code** — IaC principles, state management, terraform workflow
5. **DevSecOps Pipeline Security Implementation** — Shift-left security, SAST, container scanning, runtime security

## Screenshots

> *Screenshots will be added here after deployment.*

## Author

**Godz** — DevOps & DevSecOps Engineer

- GitHub: [@GODZ217](https://github.com/GODZ217)

## License

MIT License — see [LICENSE](LICENSE) for details.
