"use client"

import { motion } from "framer-motion"
import ProjectCard3D from "./project-card-3d"
import ScrollReveal from "./scroll-reveal"

export default function EnhancedProjectsSection() {
  const projects = [
    {
      title: "AI Legal Assistant",
      description:
        "Intelligent document analysis and contract review system powered by GPT-4 and custom NLP models.",
      image: "/images/design-example-1.png",
      tags: ["AI/ML", "Python", "Next.js", "RAG"],
    },
    {
      title: "Medical Record Platform",
      description:
        "HIPAA-compliant medical records management system with real-time collaboration and AI-powered insights.",
      image: "/images/design-example-2.png",
      tags: ["Healthcare", "React", "Node.js", "PostgreSQL"],
    },
    {
      title: "Cloud Infrastructure",
      description:
        "Scalable K3s-based GitOps infrastructure with automated deployments and monitoring.",
      image: "/images/design-example-1O.png",
      tags: ["DevOps", "Kubernetes", "ArgoCD", "Terraform"],
    },
    {
      title: "Generative AI Studio",
      description:
        "Creative platform for generating marketing content using stable diffusion and language models.",
      image: "/images/design-example-2O.png",
      tags: ["Generative AI", "Python", "FastAPI", "React"],
    },
  ]

  return (
    <section id="projects" className="relative py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-medium text-purple-400">
                💼 Featured Work
              </span>
            </motion.div>
            <h2 className="mb-4 text-4xl font-bold lg:text-6xl">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Selected
              </span>{" "}
              <span className="text-white">Projects</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/60">
              A showcase of my recent work in AI, full-stack development, and
              cloud infrastructure
            </p>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <ProjectCard3D {...project} />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 font-semibold text-white shadow-2xl shadow-purple-500/50"
            >
              <span>View All Projects</span>
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path
                  d="M7 14L11 10L7 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
