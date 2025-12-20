"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Briefcase, GraduationCap, CheckCircle, Lightbulb, Wrench, ImageIcon } from "lucide-react"
import type { Experience } from "@/lib/experience-data"

interface ExperienceDetails {
    duration: string
    role: string
    location: string
    overview: string
    responsibilities: string[]
    achievements: string[]
    skills: string[]
    learnings: string[]
    gallery?: string[]
    programLink?: string
}

function parseMarkdown(text: string) {
    // Regex matches **bold** OR [link](url)
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="font-semibold text-zinc-900 dark:text-white">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('[') && part.endsWith(')')) {
            const match = part.match(/\[(.*?)\]\((.*?)\)/);
            if (match) {
                return (
                    <Link key={index} href={match[2]} className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                        {match[1]}
                    </Link>
                );
            }
        }
        return part;
    });
}

export default function ExperienceDetailClient({
    experience,
    details
}: {
    experience: Experience
    details?: ExperienceDetails
}) {
    const isWork = experience.type === "work"
    const Icon = isWork ? Briefcase : GraduationCap

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            {/* Hero Section */}
            <div className={`relative bg-gradient-to-br ${experience.color} py-20`}>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                <div className="container mx-auto px-6 lg:px-8 relative">
                    {/* Back button */}
                    <Link
                        href="/#experience"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Experience
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div className="flex items-start gap-6">
                            {/* Logo */}
                            {experience.logo && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white shadow-xl flex items-center justify-center p-4"
                                >
                                    <Image
                                        src={experience.logo}
                                        alt={`${experience.company} logo`}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>
                            )}

                            {/* Title */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-medium">
                                        <Icon className="w-3.5 h-3.5" />
                                        {isWork ? "Work Experience" : "Education"}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {experience.title}
                                </h1>
                                <p className="text-xl text-white/90">
                                    {experience.company}
                                </p>
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
                                <Calendar className="w-4 h-4" />
                                <span>{experience.period}</span>
                            </div>
                            {details?.location && (
                                <div className="flex items-center gap-2 text-white/80">
                                    <MapPin className="w-4 h-4" />
                                    <span>{details.location}</span>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Overview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                                Overview
                            </h2>
                            <p className="text-zinc-600 dark:text-slate-400 leading-relaxed text-lg">
                                {parseMarkdown(details?.overview || experience.description)}
                            </p>
                        </motion.div>

                        {/* Responsibilities */}
                        {details?.responsibilities && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Wrench className="w-6 h-6 text-indigo-500" />
                                    {isWork ? "What I Did" : "Coursework & Activities"}
                                </h2>
                                <ul className="space-y-3">
                                    {details.responsibilities.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                                            <span className="text-zinc-600 dark:text-slate-400">{parseMarkdown(item)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {/* Achievements */}
                        {details?.achievements && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                                    Key Achievements
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {details.achievements.map((achievement, i) => (
                                        <div
                                            key={i}
                                            className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20"
                                        >
                                            <p className="text-emerald-700 dark:text-emerald-400 font-medium text-sm">
                                                ✓ {parseMarkdown(achievement)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Learnings */}
                        {details?.learnings && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Lightbulb className="w-6 h-6 text-amber-500" />
                                    What I Learned
                                </h2>
                                <div className="space-y-4">
                                    {details.learnings.map((learning, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20"
                                        >
                                            <span className="text-2xl">💡</span>
                                            <p className="text-amber-800 dark:text-amber-300">{learning}</p>
                                        </div>
                                    ))}
                                </div>
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
                            <div className="rounded-2xl border border-zinc-200 dark:border-slate-700 bg-zinc-50 dark:bg-slate-800 p-6">
                                <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
                                    Quick Info
                                </h3>
                                <dl className="space-y-4">
                                    <div>
                                        <dt className="text-xs text-zinc-500 dark:text-slate-500 mb-1">Period</dt>
                                        <dd className="text-zinc-900 dark:text-white font-medium">{experience.period}</dd>
                                    </div>
                                    {details?.duration && (
                                        <div>
                                            <dt className="text-xs text-zinc-500 dark:text-slate-500 mb-1">Duration</dt>
                                            <dd className="text-zinc-900 dark:text-white font-medium">{details.duration}</dd>
                                        </div>
                                    )}
                                    {details?.role && (
                                        <div>
                                            <dt className="text-xs text-zinc-500 dark:text-slate-500 mb-1">Role</dt>
                                            <dd className="text-zinc-900 dark:text-white font-medium">{details.role}</dd>
                                        </div>
                                    )}
                                    {details?.location && (
                                        <div>
                                            <dt className="text-xs text-zinc-500 dark:text-slate-500 mb-1">Location</dt>
                                            <dd className="text-zinc-900 dark:text-white font-medium">{details.location}</dd>
                                        </div>
                                    )}
                                    {details?.programLink && (
                                        <div>
                                            <dt className="text-xs text-zinc-500 dark:text-slate-500 mb-1">Program Website</dt>
                                            <dd className="text-zinc-900 dark:text-white font-medium">
                                                <a
                                                    href={details.programLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                                                >
                                                    View Program <ArrowLeft className="w-3 h-3 rotate-180" />
                                                </a>
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            {/* Skills */}
                            {details?.skills && (
                                <div className="rounded-2xl border border-zinc-200 dark:border-slate-700 bg-zinc-50 dark:bg-slate-800 p-6">
                                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
                                        Skills Developed
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {details.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-slate-700 text-zinc-700 dark:text-slate-300 border border-zinc-200 dark:border-slate-600"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Technologies */}
                            <div className="rounded-2xl border border-zinc-200 dark:border-slate-700 bg-zinc-50 dark:bg-slate-800 p-6">
                                <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
                                    Technologies
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {experience.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 text-sm rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Type Badge */}
                            <div className={`rounded-2xl bg-gradient-to-br ${experience.color} p-6`}>
                                <div className="flex items-center gap-3 text-white">
                                    <Icon className="w-8 h-8" />
                                    <div>
                                        <p className="text-white/80 text-sm">Type</p>
                                        <p className="font-semibold text-lg">
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
