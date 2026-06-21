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
    github: "https://github.com/GODZ217/kubernetes-cluster-deployment",
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
    github: "https://github.com/GODZ217/github-actions-ci-cd",
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
    github: "https://github.com/GODZ217/terraform-aws-infrastructure",
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
    github: "https://github.com/GODZ217/dockerized-microservices",
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
    github: "https://github.com/GODZ217/devsecops-security-pipeline",
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
    github: "https://github.com/GODZ217/monitoring-stack-prometheus-grafana",
  },
  {
    title: "OpenShift Container Platform",
    description: "Enterprise OpenShift implementation for government and enterprise clients. Configuration of projects, namespaces, routes, services, deployments, and security policies with CI/CD, SSO, and monitoring integration.",
    tags: ["OpenShift", "Kubernetes", "Jenkins", "SSO", "Monitoring"],
    highlights: [
      "Multi-tenant cluster with RBAC and network policies",
      "Integrated CI/CD pipeline platform",
      "High-availability control plane design",
      "Security-hardened with SCC and OAuth",
    ],
    github: "https://github.com/GODZ217/openshift-container-platform",
  },
  {
    title: "Kafka Confluent Data Streaming",
    description: "Storage migration and administration of Kafka Confluent on OpenShift. Performance tuning, topic optimization, and zero-downtime data migration for production event streaming.",
    tags: ["Kafka", "Confluent", "OpenShift", "Zookeeper"],
    highlights: [
      "Zero-downtime storage migration",
      "Data validation and consistency checks",
      "Performance tuning — 50% throughput improvement",
      "Monitoring dashboards for broker metrics",
    ],
    github: "https://github.com/GODZ217/kafka-confluent-data-streaming",
  },
  {
    title: "Enterprise Infrastructure Automation",
    description: "Infrastructure automation with Red Hat Satellite managing 1000+ RHEL VMs, automated provisioning and hardening, and Grafana monitoring dashboards for platform observability.",
    tags: ["Satellite", "Ansible", "RHEL", "Grafana", "VMware"],
    highlights: [
      "Patch management automation for 1000+ VMs",
      "Automated provisioning and hardening scripts",
      "Grafana dashboards for platform monitoring",
      "Reduced operational overhead by 2x",
    ],
    github: "https://github.com/GODZ217/enterprise-infrastructure-automation",
  },
]
