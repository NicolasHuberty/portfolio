"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, GraduationCap, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { experiences, type Experience } from "@/lib/experience-data"

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/experience/${exp.id}`} className="group block">
        <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-all duration-200 hover:border-zinc-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600 sm:flex-row sm:gap-6 sm:p-6">
          {/* Logo - Big on the left with white background for dark mode */}
          <div className="flex-shrink-0">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-zinc-100 bg-white p-2 shadow-sm sm:h-20 sm:w-20 md:h-28 md:w-28">
              {exp.logo ? (
                <Image
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  width={100}
                  height={100}
                  className="h-full w-full object-contain"
                />
              ) : exp.type === "work" ? (
                <Briefcase className="h-10 w-10 text-zinc-400" />
              ) : (
                <GraduationCap className="h-10 w-10 text-zinc-400" />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Type badge */}
            <span
              className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${exp.type === "work"
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                : "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
                }`}
            >
              {exp.type === "work" ? (
                <>
                  <Briefcase className="h-3 w-3" /> Work
                </>
              ) : (
                <>
                  <GraduationCap className="h-3 w-3" /> Education
                </>
              )}
            </span>

            {/* Header row */}
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  {exp.title}
                </h3>
                <p className="text-sm font-medium text-zinc-600 dark:text-slate-400">
                  {exp.company}
                </p>
              </div>
              <span className="text-sm text-zinc-500 dark:text-slate-500">
                {exp.period}
              </span>
            </div>

            {/* Description */}
            <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-slate-400">
              {exp.description}
            </p>

            {/* Technologies */}
            <div className="mb-4 flex flex-wrap gap-2">
              {exp.technologies.map(tech => (
                <span
                  key={tech}
                  className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600 dark:bg-slate-700 dark:text-slate-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Read more link */}
            <div className="flex items-center gap-1 text-sm font-medium text-indigo-600 transition-all group-hover:gap-2 dark:text-indigo-400">
              Learn more
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px" })

  const workExperiences = experiences.filter(e => e.type === "work")
  const educationExperiences = experiences.filter(e => e.type === "education")

  return (
    <section
      ref={ref}
      id="experience"
      className="bg-zinc-50 py-24 dark:bg-slate-800/50"
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
            Background
          </span>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
            Experience & Education
          </h2>
          <p className="mx-auto max-w-xl text-zinc-600 dark:text-slate-400">
            My professional journey - click on any item to learn more about what
            I did and learned.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Work Experience Column */}
          <div>
            <h3 className="mb-8 flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white">
              <Briefcase className="h-5 w-5 text-indigo-500" />
              Work Experience
            </h3>
            <div className="relative space-y-8 border-l-0 border-zinc-200 pb-2 dark:border-slate-700 sm:ml-3 sm:border-l-2 sm:space-y-12">
              {workExperiences.map((exp, index) => (
                <div key={exp.id} className="relative pl-0 sm:pl-10">
                  {/* Timeline Dot - Hidden on very small screens, shown above sm */}
                  <span className="absolute -left-[9px] top-10 z-10 hidden h-[18px] w-[18px] rounded-full border-4 border-white bg-indigo-100 ring-2 ring-indigo-500 dark:border-slate-900 dark:bg-slate-800 sm:block" />

                  <ExperienceCard exp={exp} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <h3 className="mb-8 flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white">
              <GraduationCap className="h-5 w-5 text-violet-500" />
              Education
            </h3>
            <div className="relative space-y-8 border-l-0 border-zinc-200 pb-2 dark:border-slate-700 sm:ml-3 sm:border-l-2 sm:space-y-12">
              {educationExperiences.map((exp, index) => (
                <div key={exp.id} className="relative pl-0 sm:pl-10">
                  {/* Timeline Dot - Hidden on very small screens, shown above sm */}
                  <span className="absolute -left-[9px] top-10 z-10 hidden h-[18px] w-[18px] rounded-full border-4 border-white bg-violet-100 ring-2 ring-violet-500 dark:border-slate-900 dark:bg-slate-800 sm:block" />

                  <ExperienceCard exp={exp} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
