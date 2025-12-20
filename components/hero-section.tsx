"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Building, Stethoscope, Scale, Code2, Brain, Database, Cloud, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Clean white/dark-blue background */}
            <div className="absolute inset-0 bg-white dark:bg-slate-900" />

            {/* Subtle gradient accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-cyan-50/50 dark:from-indigo-950/30 dark:via-transparent dark:to-cyan-950/30" />

            <div className="relative z-10 container mx-auto px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <div className="max-w-xl">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 text-orange-600 dark:text-orange-400 text-sm font-medium">
                                <span className="relative flex h-2 w-2 mr-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                </span>
                                Currently busy
                            </span>
                        </motion.div>

                        {/* Main headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-900 dark:text-white leading-[1.1] mb-6 tracking-tight"
                        >
                            Building intelligent systems that{" "}
                            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                transform organizations
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-zinc-600 dark:text-slate-400 leading-relaxed mb-8"
                        >
                            I'm Nicolas, an AI engineer based in Belgium. I design and implement
                            AI-powered solutions that help businesses automate workflows, extract
                            insights from data, and deliver exceptional user experiences.
                        </motion.p>

                        {/* Industry focus */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="flex flex-wrap gap-3 mb-10"
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-slate-800 text-zinc-700 dark:text-slate-300 text-sm">
                                <Scale className="w-4 h-4 text-indigo-500" />
                                Legal Tech
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-slate-800 text-zinc-700 dark:text-slate-300 text-sm">
                                <Stethoscope className="w-4 h-4 text-cyan-500" />
                                Healthcare AI
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-slate-800 text-zinc-700 dark:text-slate-300 text-sm">
                                <BookOpen className="w-4 h-4 text-violet-500" />
                                Education Tech
                            </span>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link
                                href="#projects"
                                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-slate-100 transition-all duration-200 shadow-sm"
                            >
                                View My Work
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <Link
                                href="#contact"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-100 dark:bg-slate-800 text-zinc-700 dark:text-slate-300 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-slate-700 transition-all duration-200"
                            >
                                Start a Conversation
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Column - Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="hidden lg:block relative"
                    >
                        {/* Main visual container */}
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            {/* Rotating gradient ring */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-cyan-500 to-violet-500 animate-spin-slow opacity-20 blur-3xl" />

                            {/* Center profile image */}
                            <div className="absolute inset-8 rounded-full bg-white dark:bg-slate-800 shadow-2xl overflow-hidden border-4 border-white dark:border-slate-700">
                                <Image
                                    src="/images/nicolas.jpeg"
                                    alt="Nicolas Huberty"
                                    fill
                                    className="object-cover"
                                />

                                {/* Busy Badge Overlay (LinkedIn Style) */}
                                <div className="absolute inset-0 z-10 scale-110 pointer-events-none">
                                    <svg viewBox="0 0 200 200" className="w-full h-full rotate-[-15deg]">
                                        <defs>
                                            <path id="curve" d="M 33 167 A 95 95 0 0 1 167 167" />
                                        </defs>
                                        {/* Arc Background */}
                                        <path
                                            d="M 33 167 A 95 95 0 0 1 167 167"
                                            stroke="#f97316" // Orange-500
                                            strokeWidth="28"
                                            fill="none"
                                            className="opacity-90"
                                        />
                                        {/* Text */}
                                        <text className="font-bold fill-white text-[24px] uppercase tracking-widest font-sans" dy="8">
                                            <textPath href="#curve" startOffset="50%" textAnchor="middle">
                                                #BOOKED
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>
                            </div>

                            {/* Floating skill icons */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-4 right-16 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-zinc-100 dark:border-slate-700"
                            >
                                <Brain className="w-6 h-6 text-indigo-500" />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute top-20 -right-4 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-zinc-100 dark:border-slate-700"
                            >
                                <Code2 className="w-6 h-6 text-cyan-500" />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-20 -right-2 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-zinc-100 dark:border-slate-700"
                            >
                                <Database className="w-6 h-6 text-violet-500" />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                className="absolute -bottom-2 right-20 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-zinc-100 dark:border-slate-700"
                            >
                                <Cloud className="w-6 h-6 text-emerald-500" />
                            </motion.div>

                            {/* Decorative dots */}
                            <div className="absolute top-1/4 -left-8 w-2 h-2 rounded-full bg-indigo-500" />
                            <div className="absolute top-1/2 -left-4 w-3 h-3 rounded-full bg-cyan-400" />
                            <div className="absolute bottom-1/4 -left-6 w-2 h-2 rounded-full bg-violet-500" />
                        </div>
                    </motion.div>
                </div>

                {/* Stats - Below on mobile, part of left column flow */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col gap-6 pt-10 mt-10 border-t border-zinc-200 dark:border-slate-800 lg:max-w-xl"
                >
                    <div className="flex flex-wrap gap-x-8 gap-y-2 text-base font-medium text-zinc-600 dark:text-slate-400">
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-slate-500" />
                            Based in Belgium
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-slate-500" />
                            Remote Compatible
                        </span>
                    </div>

                    <div>
                        <span className="inline-block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent font-semibold text-lg">
                            Currently fully booked building the future
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
