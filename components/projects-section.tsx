"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, ArrowRight, FileText, Circle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { projects, type Project, type ProjectStatus } from "@/lib/projects-data"

function StatusBadge({ status }: { status: ProjectStatus }) {
  const isOnline = status === "online"
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        isOnline
          ? "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
          : "border border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
      }`}
    >
      <Circle
        className={`h-2 w-2 ${isOnline ? "fill-emerald-500 text-emerald-500" : "fill-zinc-400 text-zinc-400"}`}
      />
      {isOnline ? "Online" : "Archived"}
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [currentImage, setCurrentImage] = useState(0)
  const hasScreenshots = project.screenshots && project.screenshots.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:border-zinc-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600">
        {/* Screenshot/Image Area */}
        <Link href={`/projects/${project.id}`} className="block">
          {hasScreenshots ? (
            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-slate-900">
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10`}
              />

              {/* Screenshot */}
              <Image
                src={project.screenshots[currentImage]}
                alt={`${project.title} screenshot`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Logo overlay */}
              {project.logo && (
                <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2 shadow-lg">
                  <Image
                    src={project.logo}
                    alt={`${project.title} logo`}
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}

              {/* Status & Category */}
              <div className="absolute right-4 top-4 flex gap-2">
                <StatusBadge status={project.status} />
              </div>

              {/* Image navigation dots */}
              {project.screenshots.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {project.screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={e => {
                        e.preventDefault()
                        setCurrentImage(i)
                      }}
                      className={`h-2 w-2 rounded-full transition-all ${
                        i === currentImage
                          ? "w-6 bg-white"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Gradient placeholder for projects without screenshots */
            <div
              className={`relative aspect-[16/10] bg-gradient-to-br ${project.color}`}
            >
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold text-white/80">
                  {project.title.charAt(0)}
                </span>
              </div>
              {/* Status */}
              <div className="absolute right-4 top-4">
                <StatusBadge status={project.status} />
              </div>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-slate-500">
            {project.category}
          </span>

          {/* Title & Subtitle */}
          <div className="mb-3 mt-1">
            <Link href={`/projects/${project.id}`}>
              <h3 className="text-xl font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                {project.title}
              </h3>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-slate-500">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-slate-400">
            {project.description}
          </p>

          {/* Impact */}
          <div className="mb-4 rounded-lg border border-emerald-100 bg-emerald-50 p-3 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              ✓ {project.impact}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-5 flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span
                key={tech}
                className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600 dark:bg-slate-700 dark:text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-slate-700">
            {/* Case Study Link */}
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              <FileText className="h-4 w-4" />
              Read Case Study
            </Link>

            {/* External Link */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-700 dark:text-slate-500 dark:hover:text-slate-300"
              >
                Visit Site
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px" })

  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <section
      ref={ref}
      id="projects"
      className="bg-white py-24 dark:bg-slate-900"
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            Portfolio
          </span>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
            Selected Work
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-slate-400">
            Real solutions that deliver real impact. Each project represents a
            unique challenge solved with thoughtful engineering and design.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-6 text-center text-lg font-semibold text-zinc-900 dark:text-white">
              More Projects
            </h3>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
              {otherProjects.map(project => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group flex items-center gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition-all duration-200 hover:border-zinc-300 hover:bg-white hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                >
                  {/* Mini gradient icon */}
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${project.color} flex flex-shrink-0 items-center justify-center`}
                  >
                    <span className="text-lg font-bold text-white">
                      {project.title.charAt(0)}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex items-center gap-2">
                      <h4 className="font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                        {project.title}
                      </h4>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="truncate text-sm text-zinc-500 dark:text-slate-500">
                      {project.subtitle}
                    </p>
                  </div>

                  <ArrowRight className="h-5 w-5 flex-shrink-0 text-zinc-400 transition-all group-hover:translate-x-1 group-hover:text-indigo-500 dark:text-slate-500" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
