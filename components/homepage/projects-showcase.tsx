"use client"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

import { projects } from "@/lib/portfolio-data"
import Tag from "../tag"

export default function ProjectsShowcase() {
  return (
    <section id="projects" className="mx-auto mt-20 max-w-[1600px] py-24">
      <div className="container">
        <div className="flex justify-center">
          <Tag>Projects</Tag>
        </div>
        <h2 className="my-6 text-center text-5xl font-medium md:text-6xl">
          Things I've <span className="text-pink-400">Built</span>
        </h2>
        <p className="mx-auto max-w-2xl text-center text-lg text-white/60">
          From AI research to production SaaS platforms — here's a selection of projects that showcase my work in AI engineering, automation, and digital transformation.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:border-purple-400/50 hover:bg-white/10"
            >
              {project.featured && (
                <div className="absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 px-3 py-1 text-xs font-bold text-neutral-950">
                  ⭐ Featured
                </div>
              )}

              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-purple-400/10 px-3 py-1 text-xs font-semibold text-purple-400">
                  {project.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold group-hover:text-pink-400 transition-colors">
                {project.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
                {project.description}
              </p>

              {project.longDescription && (
                <p className="mt-3 text-xs leading-relaxed text-white/50">
                  {project.longDescription}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-pink-400/5 px-2 py-1 text-xs text-pink-400/80 ring-1 ring-pink-400/20"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="rounded-md bg-pink-400/5 px-2 py-1 text-xs text-pink-400/60 ring-1 ring-pink-400/20">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-purple-400/10 px-4 py-2 text-sm font-medium text-purple-400 transition-all hover:bg-purple-400/20"
                  >
                    <ExternalLink className="size-4" />
                    Visit
                  </Link>
                )}
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-all hover:bg-white/10"
                  >
                    <Github className="size-4" />
                    Code
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
