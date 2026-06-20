export interface DocArticle {
  slug: string
  title: string
  description: string
  category: string
  content: string
}

export const docArticles: DocArticle[] = [
  {
    slug: "docker-fundamental",
    title: "Docker Fundamental for DevOps Engineers",
    description: "Comprehensive guide to Docker fundamentals including architecture, commands, and best practices for DevOps engineers.",
    category: "Containerization",
    content: `
## Introduction

Docker is a containerization platform that enables developers to package applications and their dependencies into lightweight, portable containers. It has revolutionized how we build, ship, and run applications across different environments.

## Fundamental Concept

### Container vs VM

Containers share the host OS kernel and run as isolated processes, while Virtual Machines include a full guest OS. Containers are more lightweight, start in seconds, and have minimal overhead compared to VMs.

### Docker Architecture

Docker follows a client-server architecture:

- **Docker Client**: CLI tool (\`docker\`) that communicates with the Docker daemon
- **Docker Daemon (dockerd)**: Background service that manages containers, images, networks, and volumes
- **Docker Registry**: Storage for Docker images (default: Docker Hub)
- **Docker Objects**: Images, containers, networks, volumes

## Workflow

\`\`\`
Developer → Dockerfile → Build Image → Push to Registry → Pull & Run Container
\`\`\`

## Installation

\`\`\`bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Verify installation
docker --version
docker info
\`\`\`

## Configuration

\`\`\`bash
# Start Docker daemon
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group (avoid sudo)
sudo usermod -aG docker $USER
\`\`\`

## Commands

### docker pull nginx
Downloads the nginx image from Docker Hub registry. Images are stored locally and can be reused across multiple containers.

\`\`\`bash
docker pull nginx
docker pull nginx:latest
docker pull nginx:1.25-alpine
\`\`\`

### docker images
Lists all locally downloaded Docker images with their repository, tag, image ID, and size.

\`\`\`bash
docker images
docker images -a
\`\`\`

### docker ps
Lists running containers. Use \`-a\` flag to show all containers including stopped ones.

\`\`\`bash
docker ps
docker ps -a
docker ps -q
\`\`\`

### docker run -d -p 80:80 nginx
Creates and starts a new container from the nginx image in detached mode (\`-d\`), mapping host port 80 to container port 80 (\`-p\`).

\`\`\`bash
docker run -d -p 80:80 --name my-nginx nginx
docker run -d -p 8080:80 nginx
\`\`\`

### docker stop
Stops one or more running containers gracefully, sending SIGTERM and waiting before SIGKILL.

\`\`\`bash
docker stop my-nginx
docker stop $(docker ps -q)
\`\`\`

### docker rm
Removes one or more containers. Containers must be stopped before removal.

\`\`\`bash
docker rm my-nginx
docker rm $(docker ps -aq)
\`\`\`

### docker build
Builds a Docker image from a Dockerfile and context directory. Tags can be specified with \`-t\`.

\`\`\`bash
docker build -t my-app:latest .
docker build -t my-app:v1.0 -f Dockerfile.prod .
\`\`\`

### docker push
Uploads a local image to a Docker registry (Docker Hub, ECR, GCR, etc.).

\`\`\`bash
docker push username/my-app:latest
docker push registry.example.com/my-app:v1.0
\`\`\`

## Best Practices

- Use multi-stage builds to minimize image size
- Use specific image tags, not \`latest\`
- Run containers as non-root user
- Use .dockerignore to exclude unnecessary files
- Layer caching: order Dockerfile commands from least to most frequently changing
- Use health checks in Dockerfile
- Limit resource usage with \`--memory\` and \`--cpus\`
- Scan images for vulnerabilities regularly

## Security Considerations

- Never store secrets in Docker images (use secrets management)
- Regularly scan images with tools like Trivy or Snyk
- Use Docker Bench Security for host configuration auditing
- Enable content trust (\`DOCKER_CONTENT_TRUST=1\`)
- Use read-only root filesystem (\`--read-only\`)
- Drop unnecessary capabilities (\`--cap-drop ALL --cap-add NEEDED\`)

## Conclusion

Docker is essential for modern DevOps workflows. Mastering Docker commands, understanding its architecture, and following security best practices enables efficient container management and streamlined deployment pipelines.
`,
  },
  {
    slug: "kubernetes-architecture",
    title: "Kubernetes Architecture Deep Dive",
    description: "Deep dive into Kubernetes architecture covering control plane components, worker nodes, and production deployment patterns.",
    category: "Orchestration",
    content: `
## Introduction

Kubernetes is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications. It has become the industry standard for container orchestration.

## Fundamental Concept

### Kubernetes Overview

Kubernetes clusters consist of a **Control Plane** (master) and **Worker Nodes** (minions). The control plane manages the cluster state, while worker nodes run the actual application workloads.

### Control Plane Components

- **API Server**: Front-end to the control plane, exposes Kubernetes API
- **Scheduler**: Assigns Pods to nodes based on resource requirements
- **Controller Manager**: Runs controllers that regulate cluster state
- **etcd**: Distributed key-value store for cluster data

### Worker Node Components

- **Kubelet**: Node agent that ensures containers run in Pods
- **Kube Proxy**: Network proxy for service discovery and load balancing
- **Container Runtime**: Runs containers (containerd, CRI-O)

## Architecture

\`\`\`
┌─────────────────────────────────────────────────┐
│                 Control Plane                     │
│  ┌──────────┐ ┌──────────┐ ┌────────────────┐   │
│  │API Server│ │Scheduler │ │Controller Mgr  │   │
│  └────┬─────┘ └──────────┘ └────────────────┘   │
│       │                                           │
│  ┌────▼─────┐                                     │
│  │   etcd   │                                     │
│  └──────────┘                                     │
└─────────────────────────────────────────────────┘
         │
┌────────┼────────────────┐
│  ┌─────▼──────┐ ┌──────▼─────┐  │
│  │  Worker 1  │ │  Worker 2  │  │
│  │ ┌────────┐ │ │ ┌────────┐ │  │
│  │ │ Kubelet│ │ │ │ Kubelet│ │  │
│  │ │ Proxy  │ │ │ │ Proxy  │ │  │
│  │ │ Pods   │ │ │ │ Pods   │ │  │
│  │ └────────┘ │ │ └────────┘ │  │
│  └────────────┘ └────────────┘  │
└─────────────────────────────────┘
\`\`\`

## Workflow

\`\`\`
Developer → Write YAML → kubectl apply → API Server → Scheduler → Kubelet → Container Runtime
\`\`\`

## Installation

\`\`\`bash
# Using kubeadm
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

# Initialize control plane
sudo kubeadm init --pod-network-cidr=10.244.0.0/16

# Join worker nodes
sudo kubeadm join <control-plane>:6443 --token <token>
\`\`\`

## Configuration

Example Deployment YAML:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.25-alpine
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /
            port: 80
\`\`\`

## Commands

### kubectl get pods
Lists all Pods in the current namespace, showing their status, restarts, and age.

\`\`\`bash
kubectl get pods
kubectl get pods -n kube-system
kubectl get pods -o wide
\`\`\`

### kubectl get nodes
Lists all nodes in the cluster with their status, roles, and versions.

\`\`\`bash
kubectl get nodes
kubectl describe node <node-name>
\`\`\`

### kubectl describe pod
Shows detailed information about a Pod including events, conditions, and container status.

\`\`\`bash
kubectl describe pod nginx-xxxxx
kubectl describe pod -l app=nginx
\`\`\`

### kubectl logs
Displays logs from containers in a Pod. Use \`-f\` to follow logs in real-time.

\`\`\`bash
kubectl logs nginx-xxxxx
kubectl logs -f deployment/nginx
kubectl logs --tail=100 nginx-xxxxx
\`\`\`

### kubectl apply -f
Applies a configuration to a resource by file or stdin. Creates or updates resources declaratively.

\`\`\`bash
kubectl apply -f deployment.yaml
kubectl apply -f ./
kubectl apply -f https://example.com/config.yaml
\`\`\`

### kubectl delete
Deletes resources by file, name, or label selector.

\`\`\`bash
kubectl delete pod nginx-xxxxx
kubectl delete -f deployment.yaml
kubectl delete deployment nginx
\`\`\`

## Best Practices

- Use namespaces for resource isolation
- Set resource requests and limits for all containers
- Use liveness, readiness, and startup probes
- Implement RBAC with least privilege
- Use pod disruption budgets for availability
- Enable HPA (Horizontal Pod Autoscaler)
- Use network policies for micro-segmentation

## Security Considerations

- Enable RBAC and regularly audit roles
- Use Pod Security Standards (baseline/restricted)
- Scan container images before deployment
- Enable audit logging
- Use Secrets (not ConfigMaps) for sensitive data
- Implement OPA/Gatekeeper policies
- Run containers as non-root with read-only filesystems

## Conclusion

Kubernetes architecture is complex but well-designed. Understanding each component's role enables efficient cluster management, troubleshooting, and production deployment of containerized applications.
`,
  },
  {
    slug: "github-actions-ci-cd",
    title: "Building CI/CD Pipeline with GitHub Actions",
    description: "Step-by-step guide to building CI/CD pipelines with GitHub Actions including workflow design, testing, and deployment automation.",
    category: "CI/CD",
    content: `
## Introduction

GitHub Actions is a CI/CD platform that automates software workflows directly from GitHub repositories. It enables building, testing, and deploying applications with powerful workflow automation.

## Fundamental Concept

### Continuous Integration (CI)
Automatically build and test code changes when pushed to a repository. CI ensures code quality and catches issues early.

### Continuous Delivery (CD)
Extends CI by automatically deploying code to staging or production environments after passing tests.

### Continuous Deployment
Fully automated pipeline where every change that passes all stages is automatically deployed to production.

## Architecture

\`\`\`
Developer → git push → GitHub → GitHub Actions → Build → Test → Security Scan → Deploy
                    │                                  │       │          │           │
                    └── trigger workflow ───────────────┘       │          │           │
                                                                 └──────────┘───────────┘
                                                                       Pipeline Stages
\`\`\`

## Workflow

\`\`\`yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test -- --coverage
      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/

  security:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Trivy scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          severity: 'HIGH,CRITICAL'

  build:
    needs: security
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: |
          docker build -t app:\${{ github.sha }} .
          docker tag app:\${{ github.sha }} ghcr.io/\${{ github.repository }}:latest
      - name: Push to registry
        run: |
          echo "\${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u \${{ github.actor }} --password-stdin
          docker push ghcr.io/\${{ github.repository }}:latest

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          echo "Deploying to production..."
\`\`\`

## Commands

### git add .
Stages all changes in the working directory for the next commit.

\`\`\`bash
git add .
git add src/
git add -p
\`\`\`

### git commit
Records staged changes with a descriptive message.

\`\`\`bash
git commit -m "feat: add CI/CD pipeline"
git commit --amend
\`\`\`

### git push
Uploads local commits to the remote repository, triggering GitHub Actions workflows.

\`\`\`bash
git push origin main
git push origin feature/new-pipeline
\`\`\`

## Pipeline Stages Explained

1. **Trigger**: Workflow triggers on push to main/develop or PRs to main
2. **Test**: Checkout code, set up Node.js, install dependencies, run linting and tests
3. **Security**: Scan code and dependencies for vulnerabilities
4. **Build**: Create Docker image and push to container registry
5. **Deploy**: Auto-deploy to production (main branch only)

## Best Practices

- Pin action versions to commit hashes for security
- Use matrix builds for multi-version testing
- Cache dependencies to speed up workflows
- Use environment protection rules for deployments
- Keep secrets in GitHub Secrets, never in code
- Use workflow dispatch for manual triggers
- Implement status checks for branch protection

## Security Considerations

- Use OIDC for cloud provider authentication
- Restrict workflow permissions to minimum required
- Audit workflow logs regularly
- Use GitHub's Dependabot for dependency updates
- Implement approval gates for production deployments
- Scan for exposed secrets in workflow files

## Conclusion

GitHub Actions provides a powerful, integrated CI/CD platform. Well-designed pipelines with proper security and testing stages enable reliable, automated software delivery.
`,
  },
  {
    slug: "terraform-iac",
    title: "Terraform Infrastructure as Code",
    description: "Complete guide to Terraform for infrastructure provisioning including state management, modules, and production best practices.",
    category: "Infrastructure",
    content: `
## Introduction

Terraform by HashiCorp is an infrastructure-as-code (IaC) tool that enables declarative provisioning and management of cloud resources across multiple providers using a consistent workflow.

## Fundamental Concept

### Infrastructure as Code (IaC)
Managing infrastructure through machine-readable configuration files rather than manual processes. Enables version control, automation, and reproducibility.

### State Management
Terraform maintains a state file tracking the current infrastructure state. It maps real-world resources to configuration and enables plan/apply workflows.

### Provider
Plugins that enable Terraform to interact with cloud providers, SaaS APIs, and other services. Each provider exposes resources and data sources.

### Resource
The basic building block in Terraform representing a single infrastructure component (VM, bucket, network, etc.).

## Architecture

\`\`\`
Developer → Terraform Config (.tf) → terraform plan → terraform apply → Cloud Provider
                 │                          │                │
                 └── State File ────────────┘────────────────┘
                        (terraform.tfstate)
\`\`\`

## Workflow

\`\`\`
Write Config → terraform init → terraform validate → terraform plan → terraform apply → terraform destroy
\`\`\`

## Installation

\`\`\`bash
# Download and install
wget https://releases.hashicorp.com/terraform/1.9.0/terraform_1.9.0_linux_amd64.zip
unzip terraform_*.zip
sudo mv terraform /usr/local/bin/

# Verify
terraform --version
\`\`\`

## Configuration

Example AWS infrastructure:

\`\`\`hcl
provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "main-vpc"
    Environment = "production"
  }
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "public-subnet"
  }
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.medium"
  subnet_id     = aws_subnet.public.id

  tags = {
    Name = "web-server"
  }
}
\`\`\`

## Commands

### terraform init
Initializes the working directory, downloads provider plugins, and sets up backend configuration. Required before any other command.

\`\`\`bash
terraform init
terraform init -upgrade
terraform init -backend-config=backend.hcl
\`\`\`

### terraform validate
Validates configuration files for syntax errors and internal consistency. Runs locally without accessing remote resources.

\`\`\`bash
terraform validate
\`\`\`

### terraform plan
Creates an execution plan showing what resources will be created, modified, or destroyed. Safe to run without making changes.

\`\`\`bash
terraform plan
terraform plan -out=tfplan
terraform plan -var="instance_type=t3.large"
\`\`\`

### terraform apply
Executes the changes defined in the Terraform configuration. Creates, updates, or deletes infrastructure resources.

\`\`\`bash
terraform apply
terraform apply tfplan
terraform apply -auto-approve
\`\`\`

### terraform destroy
Destroys all resources managed by the current configuration. Opposite of apply.

\`\`\`bash
terraform destroy
terraform destroy -target=aws_instance.web
\`\`\`

## Best Practices

- Use remote state with locking (S3 + DynamoDB)
- Organize code into reusable modules
- Use workspaces for environment separation
- Implement proper tagging strategy
- Version control all Terraform files
- Use terraform fmt for consistent formatting
- Keep state files secure and encrypted
- Use variables and outputs for abstraction

## Security Considerations

- Never hardcode secrets in configuration
- Use Vault or AWS Secrets Manager for sensitive data
- Enable S3 bucket versioning for state files
- Use IAM roles with least privilege for providers
- Scan configurations with Checkov or tfsec
- Enable encryption for state files and resources
- Use sentinel policies for compliance

## Conclusion

Terraform provides a consistent workflow for infrastructure management across any cloud provider. Following IaC best practices ensures maintainable, secure, and reproducible infrastructure deployments.
`,
  },
  {
    slug: "devsecops-pipeline",
    title: "DevSecOps Pipeline Security Implementation",
    description: "End-to-end DevSecOps pipeline implementation guide with SAST, DAST, container scanning, and runtime security integration.",
    category: "Security",
    content: `
## Introduction

DevSecOps integrates security practices into DevOps pipelines, shifting security left and making it a shared responsibility throughout the development lifecycle.

## Fundamental Concept

### Shift Left Security
Moving security testing earlier in the development lifecycle to catch vulnerabilities when they are cheapest and easiest to fix.

### Secure SDLC (Software Development Lifecycle)
Integrating security controls at every phase: requirements, design, development, testing, deployment, and operations.

### Security Automation
Automating security checks and gates within CI/CD pipelines to ensure consistent, repeatable security validation.

## Architecture

\`\`\`
Developer → Code Commit → SAST (SonarQube) → Dependency Scan (OWASP) 
    → Container Scan (Trivy) → CI/CD Pipeline → Deploy → Runtime Security (Falco)
         │                       │                  │              │
         └─────── Security Gates ─┴──────────────────┴──────────────┘
\`\`\`

## Workflow

\`\`\`
1. Developer pushes code
2. SAST analyzes source code for vulnerabilities
3. Dependency check scans for known CVEs in libraries
4. Container image scanning checks OS packages
5. CI/CD pipeline runs integration tests
6. Deployment with security posture validation
7. Runtime monitoring detects threats in production
\`\`\`

## Installation

### SonarQube
\`\`\`bash
docker run -d --name sonarqube \
  -p 9000:9000 \
  -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true \
  sonarqube:latest
\`\`\`

### Trivy
\`\`\`bash
# Install Trivy
sudo apt-get install wget apt-transport-https gnupg lsb-release
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install trivy
\`\`\`

### Falco
\`\`\`bash
# Install Falco
curl -fsSL https://falco.org/repo/falcosecurity-packages.asc | \
  sudo gpg --dearmor -o /usr/share/keyrings/falco-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/falco-archive-keyring.gpg] https://download.falco.org/packages/deb stable main" | \
  sudo tee -a /etc/apt/sources.list.d/falcosecurity.list
sudo apt-get update
sudo apt-get install -y falco
\`\`\`

## Configuration

### CI/CD Pipeline Integration
\`\`\`yaml
security-scan:
  stage: security
  script:
    # SAST Scan
    - sonar-scanner -Dsonar.projectKey=myapp -Dsonar.sources=.
    
    # Dependency Scan
    - owasp-dependency-check --scan . --format HTML
    
    # Container Scan
    - trivy image --severity HIGH,CRITICAL myapp:latest
    
    # Policy Check
    - conftest test deployment.yaml
  only:
    - main
\`\`\`

## Commands

### trivy image nginx
Scans the nginx Docker image for known vulnerabilities in OS packages and application dependencies.

\`\`\`bash
# Scan for vulnerabilities
trivy image nginx:latest

# Scan with severity filter
trivy image --severity HIGH,CRITICAL nginx:latest

# Scan with output format
trivy image --format table nginx:latest
trivy image --format json nginx:latest > scan-results.json

# Scan filesystem
trivy fs --severity HIGH,CRITICAL .
\`\`\`

**Example Output:**
\`\`\`
Total: 45 (UNKNOWN: 0, LOW: 20, MEDIUM: 18, HIGH: 5, CRITICAL: 2)

┌──────────────┬────────────────┬──────────┬───────────────────┐
│   Library    │ Vulnerability  │ Severity │    Fixed Version  │
├──────────────┼────────────────┼──────────┼───────────────────┤
│ libcurl4     │ CVE-2024-XXXX  │ CRITICAL │ 7.88.1-10+deb12u6 │
│ openssl      │ CVE-2024-YYYY  │ HIGH     │ 3.0.13            │
│ libssl3      │ CVE-2024-ZZZZ  │ MEDIUM   │ 3.0.13            │
└──────────────┴────────────────┴──────────┴───────────────────┘
\`\`\`

The scan reveals 7 vulnerabilities (2 critical, 5 high) that should be addressed by updating base images or applying patches.

### falco
Runtime security monitoring tool that detects anomalous activity in containers.

\`\`\`bash
# Run Falco
sudo falco

# Custom rules
falco -r custom-rules.yaml

# JSON output
falco -o json_output=true
\`\`\`

## Tools Overview

### SonarQube
SAST tool for continuous code quality and security inspection. Supports 30+ languages.

### Trivy
Comprehensive vulnerability scanner for containers, filesystems, and repositories.

### Falco
Cloud-native runtime security tool for detecting unexpected behavior in containers and hosts.

### OWASP Dependency Check
Identifies project dependencies with known, published vulnerabilities (CVEs).

## Best Practices

- Integrate security scanning at multiple pipeline stages
- Fail builds on critical/high severity vulnerabilities
- Use a vulnerability management process with SLAs
- Implement policy-as-code with OPA/Conftest
- Regularly update scanner databases
- Train developers on secure coding practices
- Monitor and alert on security scan results

## Security Considerations

- Establish severity thresholds for pipeline gates
- Implement secrets scanning (truffleHog, Gitleaks)
- Use container image signing (Cosign)
- Implement network policies and segmentation
- Enable audit logging across all pipeline stages
- Perform regular penetration testing
- Maintain an incident response plan

## Conclusion

DevSecOps transforms security from a gate to an integrated part of the development process. Automating security checks in CI/CD pipelines enables teams to deliver secure software faster while maintaining compliance.
`,
  },
]
