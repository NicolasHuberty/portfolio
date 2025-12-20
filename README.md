<div align="center">

  <div>
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Docker-black?style=for-the-badge&logoColor=white&logo=docker&color=2496ED" alt="docker" />
  </div>

<h3 align="center">Nicolas Huberty - Portfolio</h3>

   <div align="center">
     Personal portfolio website showcasing AI engineering expertise, projects, and professional experience.
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🐳 [Docker Deployment](#docker)
6. 🚀 [CI/CD Pipeline](#cicd)

## <a name="introduction">🤖 Introduction</a>

A modern, responsive portfolio website built with Next.js 16, featuring smooth animations, 
dark/light theme support, and optimized for production deployment with Docker.

## <a name="tech-stack">⚙️ Tech Stack</a>

- React 19
- Next.js 16
- TypeScript
- TailwindCSS
- Framer Motion
- ShadCN UI
- Sentry (Error Tracking)
- Docker

## <a name="features">🔋 Features</a>

👉 **Responsive Design**: Fully responsive layout that works on all devices

👉 **Dark/Light Theme**: System-aware theme switching with smooth transitions

👉 **Animated UI**: Smooth animations powered by Framer Motion

👉 **Project Showcase**: Detailed project pages with descriptions and links

👉 **Experience Timeline**: Professional experience with interactive navigation

👉 **Contact Section**: Easy-to-use contact form

👉 **Performance Optimized**: Standalone Next.js build for minimal Docker images

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/) (recommended) or [Node.js](https://nodejs.org/en)

**Cloning the Repository**

```bash
git clone <your-repo-url>
cd portfolio
```

**Installation**

Install the project dependencies:

```bash
bun install
```

**Running the Project**

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="docker">🐳 Docker Deployment</a>

This project includes Docker support optimized for production deployments.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (optional)

### Building the Docker Image

```bash
docker build -t portfolio:latest .
```

### Running the Container

```bash
docker run -d -p 3000:3000 portfolio:latest
```

### Using Docker Compose

```bash
# Production mode
docker-compose up -d portfolio

# Development mode with hot reload
docker-compose --profile dev up portfolio-dev
```

### Health Check

The container includes a health check endpoint at `/api/health`:

```bash
curl http://localhost:3000/api/health
```

## <a name="cicd">🚀 CI/CD Pipeline</a>

This project includes a GitHub Actions workflow that:

1. **Lints and Format Checks** - Runs ESLint and Prettier checks
2. **Type Checks** - Validates TypeScript types
3. **Builds** - Verifies the Next.js build succeeds
4. **Docker Build & Push** - Builds and pushes Docker image to GitHub Container Registry (on main/master push)

### Optional GitHub Secrets

For GitHub authentication (optional), add these secrets:

- `AUTH_SECRET` - Secret for NextAuth.js
- `AUTH_GITHUB_ID` - GitHub OAuth App ID
- `AUTH_GITHUB_SECRET` - GitHub OAuth App Secret
