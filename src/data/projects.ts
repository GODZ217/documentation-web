export interface Project {
  title: string
  description: string
  tags: string[]
  highlights: string[]
  github?: string
}

export const projects: Project[] = [
  {
    title: "Kubernetes Cluster Deployment",
    description: "Production-grade Kubernetes cluster deployment using kubeadm with HA control plane, auto-scaling, monitoring, and disaster recovery across multiple availability zones.",
    tags: ["Kubernetes", "kubeadm", "Calico", "MetalLB", "Helm"],
    highlights: [
      "High-availability control plane with 3 masters",
      "Automated worker node scaling",
      "Persistent storage with Rook/Ceph",
      "Network policies and RBAC",
    ],
    github: "#",
  },
  {
    title: "GitHub Actions CI/CD",
    description: "Enterprise CI/CD pipeline with GitHub Actions featuring matrix builds, artifact management, environment promotion, and integrated security scanning.",
    tags: ["GitHub Actions", "Docker", "SonarQube", "Terraform"],
    highlights: [
      "Multi-environment deployment strategy",
      "Containerized build agents",
      "Automated rollback capability",
      "Slack notifications & reporting",
    ],
    github: "#",
  },
  {
    title: "Terraform AWS Infrastructure",
    description: "Modular Terraform infrastructure for AWS covering VPC, EKS, RDS, ElastiCache, and S3 with remote state management and policy-as-code.",
    tags: ["Terraform", "AWS", "Docker", "Terragrunt"],
    highlights: [
      "Modular architecture with reusability",
      "Remote state with DynamoDB locking",
      "Multi-environment support (dev/staging/prod)",
      "Security scanning with Checkov",
    ],
    github: "#",
  },
  {
    title: "Dockerized Microservices",
    description: "Microservices architecture with Docker Compose and Kubernetes featuring service mesh, API gateway, distributed tracing, and circuit breakers.",
    tags: ["Docker", "Kubernetes", "Redis", "PostgreSQL"],
    highlights: [
      "12-factor app methodology",
      "Horizontal pod autoscaling",
      "Istio service mesh integration",
      "Comprehensive health checks",
    ],
    github: "#",
  },
  {
    title: "DevSecOps Security Pipeline",
    description: "End-to-end security pipeline integrating SAST, DAST, dependency scanning, container scanning, and runtime security with automated remediation.",
    tags: ["Trivy", "Falco", "OWASP", "SonarQube", "Vault"],
    highlights: [
      "Shift-left security approach",
      "Automated vulnerability scanning",
      "Runtime threat detection",
      "Secrets management with Vault",
    ],
    github: "#",
  },
  {
    title: "Monitoring Stack Prometheus Grafana",
    description: "Comprehensive monitoring solution with Prometheus, Grafana, Loki, and Tempo for metrics, logs, and traces with custom dashboards and alerting.",
    tags: ["Prometheus", "Grafana", "Loki", "Alertmanager"],
    highlights: [
      "Custom Grafana dashboards",
      "Prometheus Rule alerts",
      "Log aggregation with Loki",
      "Distributed tracing with Tempo",
    ],
    github: "#",
  },
]
