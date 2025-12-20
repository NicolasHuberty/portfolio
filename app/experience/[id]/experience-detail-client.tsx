"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Briefcase,
  GraduationCap,
  Wrench,
} from "lucide-react"
import type { Experience } from "@/lib/experience-data"

function parseMarkdown(text: string) {
  // Regex matches **bold** OR [link](url)
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g)
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={index}
          className="font-semibold text-zinc-900 dark:text-white"
        >
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith("[") && part.endsWith(")")) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/)
      if (match) {
        return (
          <Link
            key={index}
            href={match[2]}
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            {match[1]}
          </Link>
        )
      }
    }
    return part
  })
}

export default function ExperienceDetailClient({
  experience,
}: {
  experience: Experience
}) {
  const isWork = experience.type === "work"
  const Icon = isWork ? Briefcase : GraduationCap

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br from-violet-600 to-indigo-600 py-20`}>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="container relative mx-auto px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/#experience"
            className="mb-8 inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Experience
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-6">
              {/* Logo */}
              {experience.logo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white p-4 shadow-xl md:h-28 md:w-28"
                >
                  <Image
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              )}

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white">
                    <Icon className="h-3.5 w-3.5" />
                    {isWork ? "Work Experience" : "Education"}
                  </span>
                </div>
                <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                  {experience.title}
                </h1>
                <p className="text-xl text-white/90">{experience.company}</p>
              </motion.div>
            </div>

            {/* Meta info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="h-4 w-4" />
                <span>{experience.period}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-12 lg:col-span-2">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-white">
                Overview
              </h2>
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-slate-400">
                {parseMarkdown(experience.description)}
              </p>
            </motion.div>

            {/* Responsibilities */}
            {experience.responsibilities && experience.responsibilities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-zinc-900 dark:text-white">
                  <Wrench className="h-6 w-6 text-indigo-500" />
                  {isWork ? "Key Responsibilities" : "Activities"}
                </h2>
                <ul className="space-y-3">
                  {experience.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                      <span className="text-zinc-600 dark:text-slate-400">
                        {parseMarkdown(item)}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="sticky top-8 space-y-6"
            >
              {/* Quick Info Card */}
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                <h3 className="mb-4 font-semibold text-zinc-900 dark:text-white">
                  Quick Info
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="mb-1 text-xs text-zinc-500 dark:text-slate-500">
                      Period
                    </dt>
                    <dd className="font-medium text-zinc-900 dark:text-white">
                      {experience.period}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-xs text-zinc-500 dark:text-slate-500">
                      Role
                    </dt>
                    <dd className="font-medium text-zinc-900 dark:text-white">
                      {experience.role}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Technologies */}
              {experience.technologies && experience.technologies.length > 0 && (
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                  <h3 className="mb-4 font-semibold text-zinc-900 dark:text-white">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map(tech => (
                      <span
                        key={tech}
                        className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-sm text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Type Badge */}
              <div
                className={`rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-6`}
              >
                <div className="flex items-center gap-3 text-white">
                  <Icon className="h-8 w-8" />
                  <div>
                    <p className="text-sm text-white/80">Type</p>
                    <p className="text-lg font-semibold">
                      {isWork ? "Work Experience" : "Education"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
