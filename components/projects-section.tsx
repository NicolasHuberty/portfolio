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
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isOnline
                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
            }`}>
            <Circle className={`w-2 h-2 ${isOnline ? "fill-emerald-500 text-emerald-500" : "fill-zinc-400 text-zinc-400"}`} />
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
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
        >
            <div className="h-full rounded-2xl border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden hover:shadow-xl hover:border-zinc-300 dark:hover:border-slate-600 transition-all duration-300">
                {/* Screenshot/Image Area */}
                <Link href={`/projects/${project.id}`} className="block">
                    {hasScreenshots ? (
                        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-slate-900">
                            {/* Gradient overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10`} />

                            {/* Screenshot */}
                            <Image
                                src={project.screenshots[currentImage]}
                                alt={`${project.title} screenshot`}
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Logo overlay */}
                            {project.logo && (
                                <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center p-2">
                                    <Image
                                        src={project.logo}
                                        alt={`${project.title} logo`}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )}

                            {/* Status & Category */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <StatusBadge status={project.status} />
                            </div>

                            {/* Image navigation dots */}
                            {project.screenshots.length > 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {project.screenshots.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setCurrentImage(i)
                                            }}
                                            className={`w-2 h-2 rounded-full transition-all ${i === currentImage
                                                    ? "bg-white w-6"
                                                    : "bg-white/50 hover:bg-white/75"
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Gradient placeholder for projects without screenshots */
                        <div className={`relative aspect-[16/10] bg-gradient-to-br ${project.color}`}>
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white/80 text-6xl font-bold">
                                    {project.title.charAt(0)}
                                </span>
                            </div>
                            {/* Status */}
                            <div className="absolute top-4 right-4">
                                <StatusBadge status={project.status} />
                            </div>
                        </div>
                    )}
                </Link>

                {/* Content */}
                <div className="p-6">
                    {/* Category */}
                    <span className="text-xs font-medium text-zinc-500 dark:text-slate-500 uppercase tracking-wider">
                        {project.category}
                    </span>

                    {/* Title & Subtitle */}
                    <div className="mt-1 mb-3">
                        <Link href={`/projects/${project.id}`}>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {project.title}
                            </h3>
                        </Link>
                        <p className="text-sm text-zinc-500 dark:text-slate-500">
                            {project.subtitle}
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                        {project.description}
                    </p>

                    {/* Impact */}
                    <div className="mb-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
                        <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                            ✓ {project.impact}
                        </p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 text-xs rounded-md bg-zinc-100 dark:bg-slate-700 text-zinc-600 dark:text-slate-400"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-slate-700">
                        {/* Case Study Link */}
                        <Link
                            href={`/projects/${project.id}`}
                            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                        >
                            <FileText className="w-4 h-4" />
                            Read Case Study
                        </Link>

                        {/* External Link */}
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-slate-500 hover:text-zinc-700 dark:hover:text-slate-300 transition-colors"
                            >
                                Visit Site
                                <ExternalLink className="w-4 h-4" />
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
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const featuredProjects = projects.filter((p) => p.featured)
    const otherProjects = projects.filter((p) => !p.featured)

    return (
        <section ref={ref} id="projects" className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-sm font-medium mb-4">
                        Portfolio
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-white mb-4 tracking-tight">
                        Selected Work
                    </h2>
                    <p className="text-zinc-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Real solutions that deliver real impact. Each project represents a unique challenge solved with thoughtful engineering and design.
                    </p>
                </motion.div>

                {/* Featured Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6 text-center">
                            More Projects
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                            {otherProjects.map((project) => (
                                <Link
                                    key={project.id}
                                    href={`/projects/${project.id}`}
                                    className="group flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-slate-700 bg-zinc-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:border-zinc-300 dark:hover:border-slate-600 hover:shadow-md transition-all duration-200"
                                >
                                    {/* Mini gradient icon */}
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0`}>
                                        <span className="text-white font-bold text-lg">
                                            {project.title.charAt(0)}
                                        </span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h4 className="font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {project.title}
                                            </h4>
                                            <StatusBadge status={project.status} />
                                        </div>
                                        <p className="text-sm text-zinc-500 dark:text-slate-500 truncate">
                                            {project.subtitle}
                                        </p>
                                    </div>

                                    <ArrowRight className="w-5 h-5 text-zinc-400 dark:text-slate-500 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
