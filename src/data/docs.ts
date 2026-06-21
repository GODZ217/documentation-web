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
  {
    slug: "openshift-platform-implementation",
    title: "OpenShift Container Platform Implementation",
    description: "Enterprise OpenShift implementation guide covering platform architecture, project configuration, security policies, and production operations.",
    category: "Platform Engineering",
    content: `
## Introduction

Red Hat OpenShift Container Platform (OCP) is an enterprise Kubernetes platform that provides automated operations, centralized management, and security-focused container orchestration for mission-critical workloads.

## Fundamental Concept

### OpenShift vs Kubernetes

OpenShift extends Kubernetes with additional enterprise features: integrated container registry, automated CI/CD pipelines (OpenShift Pipelines), service mesh (OpenShift Service Mesh), serverless (OpenShift Serverless), and a web console with built-in monitoring and logging.

### Platform Architecture

OpenShift architecture consists of:

- **Control Plane Nodes**: Run API server, controller manager, scheduler, and etcd
- **Worker Nodes**: Run application workloads in containers
- **Infrastructure Nodes**: Host registry, logging, monitoring, and router components
- **Router**: External traffic ingress using HAProxy
- **Internal Registry**: Integrated container image storage

## Architecture

\`\`\`
┌─────────────────────────────────────────────┐
│              OpenShift Cluster               │
│  ┌───────────────────────────────────────┐  │
│  │          Control Plane (3x)           │  │
│  │  ┌─────────┐ ┌────────┐ ┌──────────┐ │  │
│  │  │ API Svr │ │ Sched  │ │ Ctrl Mgr │ │  │
│  │  └─────────┘ └────────┘ └──────────┘ │  │
│  │  ┌──────────────────────────────────┐ │  │
│  │  │            etcd                  │ │  │
│  │  └──────────────────────────────────┘ │  │
│  └───────────────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │           Worker Nodes (Nx)           │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────┐  │  │
│  │  │  Router  │ │ Registry │ │ Pods │  │  │
│  │  └──────────┘ └──────────┘ └──────┘  │  │
│  └───────────────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │     Infrastructure Nodes              │  │
│  │  ┌────────┐ ┌──────────┐ ┌────────┐  │  │
│  │  │Monitor │ │ Logging  │ │ Backup │  │  │
│  │  └────────┘ └──────────┘ └────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
\`\`\`

## Workflow

\`\`\`
Project Request → Namespace Creation → Network Policy → 
Service Account → Deployment Config → Route → Service → Running Application
\`\`\`

## Installation

\`\`\`bash
# Prerequisites: RHEL 9.x, valid subscription
# Install OpenShift CLI
subscription-manager repos --enable rhocp-4.14-for-rhel-9-x86_64-rpms
dnf install openshift-clients

# Install OpenShift Cluster using IPI (Installer Provisioned Infrastructure)
./openshift-install create cluster --dir=install-dir

# Verify cluster
oc get nodes
oc get clusteroperators
oc whoami
\`\`\`

## Configuration

### Project & Namespace Configuration

\`\`\`yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production-app
  annotations:
    openshift.io/description: Production application namespace
    openshift.io/display-name: Production Application
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-ingress
  namespace: production-app
spec:
  podSelector: {}
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: openshift-ingress
  policyTypes:
  - Ingress
\`\`\`

### Deployment with Security Context

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: enterprise-app
  namespace: production-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: enterprise-app
  template:
    metadata:
      labels:
        app: enterprise-app
    spec:
      serviceAccountName: app-sa
      securityContext:
        runAsNonRoot: true
        seccompProfile:
          type: RuntimeDefault
      containers:
      - name: app
        image: registry.example.com/app:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1"
\`\`\`

## Commands

### OpenShift CLI (oc)

\`\`\`bash
# Project management
oc new-project production-app
oc get projects
oc project production-app

# Pod management
oc get pods
oc describe pod <pod-name>
oc logs -f <pod-name>
oc exec -it <pod-name> -- bash

# Deployment management
oc get deployments
oc scale deployment/enterprise-app --replicas=5
oc rollout status deployment/enterprise-app
oc rollout undo deployment/enterprise-app

# Route and Service
oc expose service enterprise-app
oc get routes
oc get services
\`\`\`

### OpenShift Platform Admin

\`\`\`bash
# Cluster status
oc get nodes -o wide
oc get clusteroperators
oc adm top nodes
oc describe node <node-name>

# Node management
oc adm cordon <node>
oc adm drain <node>
oc adm uncordon <node>

# Upgrade cluster
oc adm upgrade --to-latest
oc adm upgrade --to=4.14.10
\`\`\`

## Best Practices

- Use Infrastructure nodes for platform components (registry, logging, monitoring)
- Implement Network Policies for micro-segmentation
- Use Pod Disruption Budgets for high availability
- Configure cluster autoscaling for worker nodes
- Enable etcd backup and disaster recovery procedures
- Use SCC (Security Context Constraints) for pod security
- Implement quota management per namespace

## Security Considerations

- Apply SCC (Security Context Constraints) appropriately
- Use encrypted routes with proper TLS termination
- Implement OAuth integration with enterprise SSO
- Enable Network Policy enforcement
- Regular vulnerability scanning with Red Hat Quay
- Enable audit logging at cluster level
- Use Service Mesh for mTLS between services

## Conclusion

OpenShift provides a robust enterprise Kubernetes platform with integrated security, CI/CD, and operational tooling. Proper platform configuration, security policies, and automation enable reliable, production-grade container orchestration at scale.
`,
  },
  {
    slug: "enterprise-ci-cd-devsecops",
    title: "Enterprise CI/CD & DevSecOps Pipeline",
    description: "Enterprise-grade CI/CD implementation with Jenkins, GitLab, SonarQube, and integrated security scanning across the software delivery lifecycle.",
    category: "CI/CD",
    content: `
## Introduction

Enterprise CI/CD pipelines integrate continuous integration, delivery, and deployment with security scanning at every stage — enabling rapid, reliable, and secure software delivery at scale.

## Fundamental Concept

### Enterprise Pipeline Architecture

Enterprise CI/CD consists of interconnected stages that automate the entire software delivery lifecycle:

- **Source**: Code management with Git or GitLab
- **Build**: Compile, package, and containerize applications
- **Test**: Unit, integration, and end-to-end testing
- **Security**: SAST, DAST, dependency scanning, container scanning
- **Deploy**: Progressive deployment to dev, staging, production
- **Monitor**: Application performance and security monitoring

### Tools Integration

Modern enterprise pipelines integrate multiple tools:
- **Jenkins/GitLab CI**: Pipeline orchestration
- **SonarQube**: Code quality and static analysis
- **Trivy/Snyk**: Container and dependency scanning
- **Nexus/Artifactory**: Artifact repository management
- **OpenShift/Kubernetes**: Deployment target

## Architecture

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                 CI/CD Pipeline Architecture              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Developer → GitLab/Git → Jenkins/GitLab CI             │
│                              │                           │
│                    ┌─────────┴──────────┐               │
│                    │    Pipeline        │               │
│                    └─────────┬──────────┘               │
│                              │                           │
│  ┌───────────┬───────────┬───┴────┬───────────┬──────┐  │
│  │  Build    │   Unit    │ SAST   │ Container │ Deploy│  │
│  │  Compile  │   Test    │Quality │  Scan     │       │  │
│  └───────────┴───────────┴────────┴───────────┴──────┘  │
│                              │                           │
│                    ┌─────────┴──────────┐               │
│                    │  OpenShift/K8s     │               │
│                    │  Dev → Stg → Prod  │               │
│                    └────────────────────┘               │
└─────────────────────────────────────────────────────────┘
\`\`\`

## Workflow

\`\`\`
Developer Push → GitLab Webhook → Jenkins Pipeline →
  → Build Image → Unit Test → SonarQube Scan →
  → Trivy Scan → Deploy to Dev → Integration Test →
  → Deploy to Staging → E2E Test → Deploy to Production
\`\`\`

## Installation

### Jenkins on OpenShift

\`\`\`bash
# Deploy Jenkins via OpenShift template
oc new-project cicd-tools
oc new-app jenkins-persistent \
  -p MEMORY_LIMIT=2Gi \
  -p VOLUME_CAPACITY=10Gi \
  -p JENKINS_IMAGE_STREAM_TAG=jenkins:2

# Verify deployment
oc get pods -l name=jenkins
oc get route jenkins
\`\`\`

### GitLab Runner

\`\`\`bash
# Install GitLab Runner via Helm
helm repo add gitlab https://charts.gitlab.io
helm upgrade --install gitlab-runner gitlab/gitlab-runner \
  --namespace cicd-tools \
  --set gitlabUrl=https://gitlab.example.com \
  --set runnerRegistrationToken=<token>
\`\`\`

## Configuration

### Jenkins Pipeline (Jenkinsfile)

\`\`\`groovy
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                sh 'docker build -t app:latest .'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Code Quality') {
            steps {
                sh '''
                sonar-scanner \
                  -Dsonar.projectKey=myapp \
                  -Dsonar.sources=. \
                  -Dsonar.host.url=http://sonarqube:9000
                '''
            }
        }
        
        stage('Security Scan') {
            steps {
                sh 'trivy image --severity HIGH,CRITICAL app:latest'
            }
        }
        
        stage('Deploy to Dev') {
            steps {
                sh 'oc apply -f k8s/overlays/dev'
            }
        }
        
        stage('Deploy to Production') {
            input message: 'Deploy to production?'
            steps {
                sh 'oc apply -f k8s/overlays/prod'
            }
        }
    }
    
    post {
        always {
            junit '**/test-results/**/*.xml'
        }
    }
}
\`\`\`

### GitLab CI Pipeline

\`\`\`yaml
stages:
  - build
  - test
  - security
  - deploy

variables:
  IMAGE_TAG: $CI_COMMIT_SHORT_SHA

build:
  stage: build
  script:
    - docker build -t app:$IMAGE_TAG .
    - docker tag app:$IMAGE_TAG registry.example.com/app:$IMAGE_TAG
    - docker push registry.example.com/app:$IMAGE_TAG

test:
  stage: test
  script:
    - npm ci
    - npm run test:ci
  artifacts:
    reports:
      junit: junit.xml

code_quality:
  stage: test
  script:
    - sonar-scanner
  only:
    - main

security_scan:
  stage: security
  script:
    - trivy image --severity HIGH,CRITICAL registry.example.com/app:$IMAGE_TAG
  only:
    - main

deploy_dev:
  stage: deploy
  script:
    - oc apply -f k8s/overlays/dev
  environment:
    name: dev

deploy_prod:
  stage: deploy
  script:
    - oc apply -f k8s/overlays/prod
  environment:
    name: production
  when: manual
\`\`\`

## Standardized Deployment Process

Standardized deployment ensures consistency across teams:

1. **GitFlow Branching**: main, develop, feature/hotfix branches
2. **Semantic Versioning**: vMAJOR.MINOR.PATCH tagging
3. **Environment Promotion**: Dev → Staging → Production
4. **Approval Gates**: Manual approval for production
5. **Rollback Strategy**: Automated rollback on failure
6. **Artifact Management**: All artifacts stored in Nexus/Artifactory

## Best Practices

- Standardize pipeline templates across teams
- Implement approval gates for production deployments
- Cache dependencies to speed up pipeline execution
- Use parallel stages for independent tasks
- Implement artifact versioning and retention policies
- Monitor pipeline metrics and SLAs
- Use infrastructure-as-code for pipeline configuration

## Security Considerations

- Integrate SAST scanning at commit stage
- Container image scanning before registry push
- Dependency vulnerability scanning (OWASP DC)
- Secrets management with Vault or sealed secrets
- SBOM (Software Bill of Materials) generation
- Supply chain security with image signing (Cosign)
- Regular pipeline audit and compliance reporting

## Conclusion

Enterprise CI/CD pipelines with integrated DevSecOps practices enable organizations to deliver software faster while maintaining quality and security. Standardized pipelines reduce deployment failures and increase release velocity.
`,
  },
  {
    slug: "infrastructure-automation-platform-engineering",
    title: "Infrastructure Automation & Platform Engineering",
    description: "Enterprise infrastructure automation covering Red Hat Satellite, Kafka operations, monitoring, and platform engineering best practices.",
    category: "Platform Engineering",
    content: `
## Introduction

Platform engineering focuses on building internal developer platforms and automating infrastructure operations. This article covers enterprise-scale infrastructure automation including patch management, data streaming, monitoring, and virtualization management.

## Fundamental Concept

### Platform Engineering

Platform engineering creates self-service capabilities for development teams while standardizing infrastructure operations. Key components include:

- **Automation**: Scripted provisioning, configuration, and operations
- **Self-Service**: Developer portals and API-driven infrastructure
- **Standardization**: Consistent configurations and deployment patterns
- **Observability**: Comprehensive monitoring, logging, and alerting

### Enterprise Infrastructure Components

- **Red Hat Satellite**: Patch management and provisioning for RHEL
- **Kafka Confluent**: Data streaming platform for event-driven architecture
- **Grafana/Prometheus**: Monitoring and alerting stack
- **VMware vSphere**: Virtualization infrastructure
- **Red Hat Enterprise Linux**: Enterprise operating system

## Architecture

\`\`\`
┌────────────────────────────────────────────────────┐
│            Enterprise Platform Architecture         │
├────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │          Infrastructure Automation           │  │
│  │  ┌─────────┐ ┌──────────┐ ┌───────────────┐ │  │
│  │  │Satellite│ │  Ansible │ │  Automation   │ │  │
│  │  │  Mgmt   │ │  Tower   │ │   Scripts     │ │  │
│  │  └─────────┘ └──────────┘ └───────────────┘ │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │              Data Streaming                  │  │
│  │  ┌────────┐ ┌──────────┐ ┌────────────────┐ │  │
│  │  │ Kafka  │ │Connect   │ │ Schema Registry│ │  │
│  │  │ Brokers│ │ Workers  │ │                │ │  │
│  │  └────────┘ └──────────┘ └────────────────┘ │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │            Monitoring & Observability        │  │
│  │  ┌─────────┐ ┌──────────┐ ┌──────────────┐  │  │
│  │  │Grafana  │ │Prometheus│ │    Alert     │  │  │
│  │  │Dashboard│ │  Metrics │ │   Manager    │  │  │
│  │  └─────────┘ └──────────┘ └──────────────┘  │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
\`\`\`

## Workflow

\`\`\`
Infrastructure Automation Flow:
Request → Automation → Provisioning → Configuration → Monitoring → Operations

Patch Management Flow:
Vendor Release → Satellite Sync → Test Group → Production Rollout → Validation

Data Streaming Flow:
Producer → Kafka Broker → Stream Processing → Consumer → Analytics/Storage
\`\`\`

## Red Hat Satellite Implementation

### Architecture

\`\`\`
Satellite Server
    ├── Capsule Server (Data Center 1)
    │   └── RHEL Hosts (500+ VMs)
    ├── Capsule Server (Data Center 2)
    │   └── RHEL Hosts (500+ VMs)
    └── Capsule Server (DMZ)
        └── RHEL Hosts (100+ VMs)
\`\`\`

### Configuration

\`\`\`bash
# Register host to Satellite
subscription-manager register \
  --org="ExampleOrg" \
  --activationkey="rhel-8-prod"

# Apply errata
dnf update --security

# Satellite provisioning template (Kickstart)
# Managed via Satellite Web UI or Hammer CLI
hammer host create \
  --name "web-server-01" \
  --organization "ExampleOrg" \
  --location "DC1" \
  --hostgroup "RHEL8-Prod" \
  --compute-resource "vCenter"
\`\`\`

## Kafka Confluent Administration

### Architecture

\`\`\`
┌──────────┐   ┌──────────┐   ┌──────────┐
│Producer 1│   │Producer 2│   │Producer N│
└────┬─────┘   └────┬─────┘   └────┬─────┘
     └──────────────┼──────────────┘
                    ▼
       ┌────────────────────┐
       │  Kafka Cluster     │
       │  Broker 1/2/3      │
       │  (Replication=3)   │
       └────────────────────┘
                    │
     ┌──────────────┼──────────────┐
     ▼              ▼              ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│Consumer 1│ │Consumer 2│ │Consumer N│
└──────────┘ └──────────┘ └──────────┘
\`\`\`

### Commands

\`\`\`bash
# Check cluster status
kafka-broker-api-versions --bootstrap-server localhost:9092

# Topic management
kafka-topics --bootstrap-server localhost:9092 --list
kafka-topics --bootstrap-server localhost:9092 \
  --describe --topic production-events

# Consumer group monitoring
kafka-consumer-groups --bootstrap-server localhost:9092 \
  --group app-consumer --describe

# Performance monitoring
kafka-run-class kafka.tools.JmxTool \
  --object-name kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec
\`\`\`

### Migration Procedure

\`\`\`bash
# 1. Add new brokers to cluster
# 2. Generate partition reassignment plan
kafka-reassign-partitions --bootstrap-server localhost:9092 \
  --generate --topics-to-move-json-file topics.json \
  --broker-list "1,2,3,4,5"

# 3. Execute reassignment
kafka-reassign-partitions --bootstrap-server localhost:9092 \
  --execute --reassignment-json-file reassign.json

# 4. Verify completion
kafka-reassign-partitions --bootstrap-server localhost:9092 \
  --verify --reassignment-json-file reassign.json

# 5. Remove old brokers
# Ensure no data loss and minimal downtime
\`\`\`

## Monitoring Automation

### Grafana Dashboard Configuration

\`\`\`json
{
  "dashboard": {
    "title": "OpenShift Platform Overview",
    "panels": [
      {
        "title": "Cluster CPU Utilization",
        "type": "graph",
        "targets": [
          {
            "expr": "sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_rate)"
          }
        ]
      },
      {
        "title": "Kafka Broker Throughput",
        "type": "graph",
        "targets": [
          {
            "expr": "sum(kafka_server_brokertopicmetrics_messagesin_total)"
          }
        ]
      },
      {
        "title": "VM Resource Usage",
        "type": "gauge",
        "targets": [
          {
            "expr": "100 - (avg(vmware_vm_cpu_usage) by (vm_name))"
          }
        ]
      }
    ]
  }
}
\`\`\`

### Prometheus Alert Rules

\`\`\`yaml
groups:
  - name: platform-alerts
    rules:
      - alert: HighClusterCPU
        expr: sum(node_cpu_seconds_total{mode="idle"}) / sum(node_cpu_seconds_total) < 0.2
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Cluster CPU utilization above 80%"

      - alert: KafkaConsumerLag
        expr: kafka_consumer_lag > 1000
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "Kafka consumer lag detected"

      - alert: HighDiskUsage
        expr: node_filesystem_avail_bytes / node_filesystem_size_bytes < 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Disk usage above 90%"
\`\`\`

## Operations & Maintenance

### OpenShift Administration

\`\`\`bash
# Upgrade OpenShift cluster
oc adm upgrade --to-latest
oc adm upgrade --to=4.14.10

# Monitor cluster health
oc get clusteroperators
oc describe clusteroperator <name>

# Capacity planning
oc adm top nodes
oc adm top pods --all-namespaces

# Troubleshooting
oc get events --all-namespaces
oc adm must-gather
oc adm inspect ns/<namespace>
\`\`\`

### Linux Administration

\`\`\`bash
# System hardening
systemctl stop <unnecessary-services>
dnf install scap-security-guide
oscap xccdf eval \
  --profile xccdf_org.ssgproject.content_profile_cis \
  --report report.html /usr/share/xml/scap/ssg/content/ssg-rhel8-ds.xml

# Performance troubleshooting
top
vmstat 1 10
iostat -x 1 10
sar -u 1 10
\`\`\`

### VMware Administration

\`\`\`bash
# Using govc CLI
govc datastore.info
govc find / -type m
govc vm.info production-app-01

# Resource monitoring
govc metric.sample production-app-01 cpu.usage.average
govc metric.sample production-app-01 mem.usage.average
\`\`\`

## Best Practices

- Automate patch management with Satellite content views
- Implement canary deployments for infrastructure changes
- Use Infrastructure as Code for all platform configurations
- Maintain runbooks for common operational procedures
- Implement capacity planning and right-sizing
- Regular disaster recovery drills
- Document architecture and operational procedures

## Troubleshooting Methodology

1. **Identify**: Collect symptoms, check monitoring dashboards
2. **Isolate**: Determine scope — application, platform, or infrastructure
3. **Analyze**: Review logs, metrics, and events
4. **Resolve**: Apply fix or workaround
5. **Verify**: Confirm resolution and monitor for recurrence
6. **Document**: Update runbook and create RCA

## Security Considerations

- Use Satellite content filters to enforce security errata
- Implement CIS benchmarks for RHEL hardening
- Regular vulnerability scanning and remediation
- Secure Kafka with TLS encryption and ACLs
- Implement backup and disaster recovery for all platforms
- Role-based access control for platform management
- Audit logging and SIEM integration

## Conclusion

Platform engineering and infrastructure automation enable organizations to manage enterprise-scale infrastructure efficiently. Automating patch management, monitoring, and operations reduces manual effort, improves reliability, and ensures security compliance.
`,
  },
]
