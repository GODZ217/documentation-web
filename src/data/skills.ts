export interface Skill {
  name: string
  category: string
}

export const skillCategories = [
  {
    title: "DevOps",
    icon: "Settings",
    skills: ["Linux", "Bash", "Git", "Docker", "Kubernetes", "Helm", "Terraform", "Ansible"],
  },
  {
    title: "CI/CD",
    icon: "GitBranch",
    skills: ["Jenkins", "GitHub Actions", "GitLab CI", "ArgoCD"],
  },
  {
    title: "Cloud",
    icon: "Cloud",
    skills: ["AWS", "GCP", "Azure"],
  },
  {
    title: "Security",
    icon: "Shield",
    skills: ["Trivy", "Falco", "OWASP", "SonarQube", "Vault"],
  },
]
