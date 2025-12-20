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
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/experience/${exp.id}`} className="block group">
                <div className="flex gap-6 p-6 rounded-xl border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg hover:border-zinc-300 dark:hover:border-slate-600 transition-all duration-200">
                    {/* Logo - Big on the left with white background for dark mode */}
                    <div className="flex-shrink-0">
                        <div className="w-20 h-20 md:w-28 md:h-28 rounded-xl bg-white flex items-center justify-center overflow-hidden p-3 shadow-sm border border-zinc-100">
                            {exp.logo ? (
                                <Image
                                    src={exp.logo}
                                    alt={`${exp.company} logo`}
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-contain"
                                />
                            ) : exp.type === "work" ? (
                                <Briefcase className="w-10 h-10 text-zinc-400" />
                            ) : (
                                <GraduationCap className="w-10 h-10 text-zinc-400" />
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Type badge */}
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${exp.type === "work"
                            ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                            : "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400"
                            }`}>
                            {exp.type === "work" ? (
                                <><Briefcase className="w-3 h-3" /> Work</>
                            ) : (
                                <><GraduationCap className="w-3 h-3" /> Education</>
                            )}
                        </span>

                        {/* Header row */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                            <div>
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {exp.title}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-slate-400 font-medium">
                                    {exp.company}
                                </p>
                            </div>
                            <span className="text-sm text-zinc-500 dark:text-slate-500 whitespace-nowrap">
                                {exp.period}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-zinc-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                            {exp.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {exp.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2.5 py-1 text-xs rounded-md bg-zinc-100 dark:bg-slate-700 text-zinc-600 dark:text-slate-400"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Read more link */}
                        <div className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all">
                            Learn more
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default function ExperienceSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const workExperiences = experiences.filter(e => e.type === "work")
    const educationExperiences = experiences.filter(e => e.type === "education")

    return (
        <section ref={ref} id="experience" className="py-24 bg-zinc-50 dark:bg-slate-800/50">
            <div className="container mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4">
                        Background
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-white mb-4 tracking-tight">
                        Experience & Education
                    </h2>
                    <p className="text-zinc-600 dark:text-slate-400 max-w-xl mx-auto">
                        My professional journey - click on any item to learn more about what I did and learned.
                    </p>
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Work Experience Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-8 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-indigo-500" />
                            Work Experience
                        </h3>
                        <div className="relative border-l-2 border-zinc-200 dark:border-slate-700 ml-3 space-y-12 pb-2">
                            {workExperiences.map((exp, index) => (
                                <div key={exp.id} className="relative pl-8 sm:pl-10">
                                    {/* Timeline Dot */}
                                    <span className="absolute -left-[9px] top-10 w-[18px] h-[18px] rounded-full bg-indigo-100 dark:bg-slate-800 border-4 border-white dark:border-slate-900 ring-2 ring-indigo-500 z-10" />

                                    <ExperienceCard exp={exp} index={index} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-8 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-violet-500" />
                            Education
                        </h3>
                        <div className="relative border-l-2 border-zinc-200 dark:border-slate-700 ml-3 space-y-12 pb-2">
                            {educationExperiences.map((exp, index) => (
                                <div key={exp.id} className="relative pl-8 sm:pl-10">
                                    {/* Timeline Dot */}
                                    <span className="absolute -left-[9px] top-10 w-[18px] h-[18px] rounded-full bg-violet-100 dark:bg-slate-800 border-4 border-white dark:border-slate-900 ring-2 ring-violet-500 z-10" />

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
