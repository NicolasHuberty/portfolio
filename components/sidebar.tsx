"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, Sun, Moon, ChevronRight, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useSidebar } from "./sidebar-context"

export default function Sidebar() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const { isExpanded, setIsExpanded, shouldShowSidebar } = useSidebar()

    useEffect(() => {
        setMounted(true)
    }, [])

    const navItems = [
        { label: "Home", href: "#home" },
        { label: "Services", href: "#services" },
        { label: "Experience", href: "#experience" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
    ]

    return (
        <>
            {/* Collapsed Sidebar Tab - Only visible when sidebar is collapsed */}
            <AnimatePresence>
                {!shouldShowSidebar && (
                    <motion.button
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={() => setIsExpanded(true)}
                        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center gap-2 pl-4 pr-3 py-4 bg-white dark:bg-slate-800 border border-l-0 border-zinc-200 dark:border-slate-700 rounded-r-2xl shadow-lg hover:shadow-xl transition-shadow group"
                    >
                        <div className="w-10 h-10 rounded-xl overflow-hidden">
                            <Image
                                src="/images/nicolas.jpeg"
                                alt="Nicolas Huberty"
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-500 transition-colors" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Main Sidebar - Desktop */}
            <AnimatePresence mode="wait">
                {shouldShowSidebar && (
                    <motion.aside
                        initial={{ x: -320, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -320, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            opacity: { duration: 0.2 }
                        }}
                        className="fixed left-0 top-0 z-40 hidden h-screen w-80 flex-col overflow-y-auto bg-zinc-50/95 dark:bg-slate-800/95 backdrop-blur-sm border-r border-zinc-200 dark:border-slate-700 lg:flex shadow-xl"
                    >
                        <div className="flex h-full flex-col p-8">


                            {/* Profile Image */}
                            <motion.div
                                className="relative mb-6 overflow-hidden rounded-2xl"
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                            >
                                <Image
                                    src="/images/nicolas.jpeg"
                                    alt="Nicolas Huberty"
                                    width={300}
                                    height={300}
                                    className="h-auto w-full rounded-2xl object-cover"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />

                                {/* Booked Badge (Pill Style for Square Image) */}
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
                                    <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white/20 tracking-wider">
                                        #BOOKED
                                    </div>
                                </div>
                            </motion.div>

                            {/* Name and Title */}
                            <div className="mb-8">
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.15 }}
                                    className="text-xl font-semibold text-zinc-900 dark:text-white"
                                >
                                    Nicolas Huberty
                                </motion.h2>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-1 text-sm text-zinc-500 dark:text-slate-400"
                                >
                                    AI Engineer & Consultant
                                </motion.p>
                            </div>

                            {/* Navigation */}
                            <nav className="flex-1 space-y-1">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ x: -30, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.25 + index * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="block rounded-lg px-4 py-2.5 text-zinc-600 dark:text-slate-400 transition-colors hover:bg-zinc-100 dark:hover:bg-slate-700 hover:text-zinc-900 dark:hover:text-white text-sm font-medium"
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Light/Dark Mode Switcher */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mb-8"
                            >
                                <p className="text-[10px] font-bold text-zinc-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 px-1">
                                    Appearance
                                </p>
                                {mounted && (
                                    <div className="relative flex p-1 bg-zinc-100/80 dark:bg-slate-700/50 backdrop-blur-md rounded-xl border border-zinc-200/50 dark:border-slate-600/50 shadow-inner">
                                        {/* Sliding Background */}
                                        <motion.div
                                            className="absolute inset-y-1 rounded-lg bg-white dark:bg-slate-600 shadow-sm border border-zinc-200/50 dark:border-slate-500/50"
                                            initial={false}
                                            animate={{
                                                x: theme === "light" ? 0 : "100%",
                                            }}
                                            style={{
                                                width: "calc(50% - 4px)",
                                                left: "4px"
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />

                                        <button
                                            onClick={() => setTheme("light")}
                                            className={`relative flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 z-10 ${theme === "light"
                                                    ? "text-indigo-600 dark:text-white"
                                                    : "text-zinc-500 hover:text-zinc-800 dark:text-slate-400 dark:hover:text-slate-200"
                                                }`}
                                        >
                                            <Sun className={`w-4 h-4 transition-transform duration-500 ${theme === "light" ? "rotate-0 scale-110" : "rotate-[20deg] scale-90 opacity-70"}`} />
                                            <span>Light</span>
                                        </button>
                                        <button
                                            onClick={() => setTheme("dark")}
                                            className={`relative flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 z-10 ${theme === "dark"
                                                    ? "text-indigo-600 dark:text-white"
                                                    : "text-zinc-500 hover:text-zinc-800 dark:text-slate-400 dark:hover:text-slate-200"
                                                }`}
                                        >
                                            <Moon className={`w-4 h-4 transition-transform duration-500 ${theme === "dark" ? "rotate-0 scale-110" : "-rotate-[20deg] scale-90 opacity-70"}`} />
                                            <span>Dark</span>
                                        </button>
                                    </div>
                                )}
                            </motion.div>

                            {/* Social Links */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.55 }}
                                className="flex gap-2"
                            >
                                <a
                                    href="https://github.com/NicolasHuberty"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-slate-700 text-zinc-500 dark:text-slate-400 transition-all hover:bg-[#333] hover:text-white"
                                    title="GitHub"
                                >
                                    <Github className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://linkedin.com/in/nicolas-huberty"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-slate-700 text-zinc-500 dark:text-slate-400 transition-all hover:bg-[#0077b5] hover:text-white"
                                    title="LinkedIn"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                                <a
                                    href="mailto:contact@nicolashuberty.com"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-slate-700 text-zinc-500 dark:text-slate-400 transition-all hover:bg-rose-500 hover:text-white"
                                    title="Email"
                                >
                                    <Mail className="w-4 h-4" />
                                </a>
                            </motion.div>

                            {/* Status indicator */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="mt-4 flex items-center gap-2 rounded-lg bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 px-3 py-2"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                </span>
                                <span className="text-xs font-medium text-orange-700 dark:text-orange-400">Currently busy</span>
                            </motion.div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="fixed top-4 left-4 z-50 lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-md"
            >
                <Menu className="w-5 h-5 text-zinc-600 dark:text-slate-400" />
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: -320 }}
                            animate={{ x: 0 }}
                            exit={{ x: -320 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed left-0 top-0 z-50 h-screen w-80 flex-col overflow-y-auto bg-zinc-50 dark:bg-slate-800 lg:hidden flex"
                        >
                            <div className="flex h-full flex-col p-8">


                                {/* Profile Image */}
                                <div className="relative mb-6 overflow-hidden rounded-2xl">
                                    <Image
                                        src="/images/nicolas.jpeg"
                                        alt="Nicolas Huberty"
                                        width={300}
                                        height={300}
                                        className="h-auto w-full rounded-2xl object-cover"
                                    />
                                </div>

                                {/* Name and Title */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                                        Nicolas Huberty
                                    </h2>
                                    <p className="mt-1 text-sm text-zinc-500 dark:text-slate-400">
                                        AI Engineer & Consultant
                                    </p>
                                </div>

                                {/* Navigation */}
                                <nav className="flex-1 space-y-1">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block rounded-lg px-4 py-2.5 text-zinc-600 dark:text-slate-400 transition-colors hover:bg-zinc-100 dark:hover:bg-slate-700 hover:text-zinc-900 dark:hover:text-white text-sm font-medium"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>

                                {/* Theme Switcher */}
                                {mounted && (
                                    <div className="mb-8">
                                        <p className="text-[10px] font-bold text-zinc-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 px-1">
                                            Appearance
                                        </p>
                                        <div className="relative flex p-1 bg-zinc-100/80 dark:bg-slate-700/50 backdrop-blur-md rounded-xl border border-zinc-200/50 dark:border-slate-600/50 shadow-inner">
                                            {/* Sliding Background */}
                                            <motion.div
                                                className="absolute inset-y-1 rounded-lg bg-white dark:bg-slate-600 shadow-sm border border-zinc-200/50 dark:border-slate-500/50"
                                                initial={false}
                                                animate={{
                                                    x: theme === "light" ? 0 : "100%",
                                                }}
                                                style={{
                                                    width: "calc(50% - 4px)",
                                                    left: "4px"
                                                }}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />

                                            <button
                                                onClick={() => setTheme("light")}
                                                className={`relative flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 z-10 ${theme === "light"
                                                        ? "text-indigo-600 dark:text-white"
                                                        : "text-zinc-500 dark:text-slate-400"
                                                    }`}
                                            >
                                                <Sun className={`w-4 h-4 transition-transform duration-500 ${theme === "light" ? "rotate-0 scale-110" : "rotate-[20deg] scale-90 opacity-70"}`} />
                                                <span>Light</span>
                                            </button>
                                            <button
                                                onClick={() => setTheme("dark")}
                                                className={`relative flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 z-10 ${theme === "dark"
                                                        ? "text-indigo-600 dark:text-white"
                                                        : "text-zinc-500 dark:text-slate-400"
                                                    }`}
                                            >
                                                <Moon className={`w-4 h-4 transition-transform duration-500 ${theme === "dark" ? "rotate-0 scale-110" : "-rotate-[20deg] scale-90 opacity-70"}`} />
                                                <span>Dark</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Social Links */}
                                <div className="flex gap-2">
                                    <a
                                        href="https://github.com/NicolasHuberty"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-slate-700 text-zinc-500 dark:text-slate-400 transition-all hover:bg-[#333] hover:text-white"
                                    >
                                        <Github className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/nicolas-huberty"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-slate-700 text-zinc-500 dark:text-slate-400 transition-all hover:bg-[#0077b5] hover:text-white"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="mailto:contact@nicolashuberty.com"
                                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-slate-700 text-zinc-500 dark:text-slate-400 transition-all hover:bg-rose-500 hover:text-white"
                                    >
                                        <Mail className="w-4 h-4" />
                                    </a>
                                </div>

                                {/* Status */}
                                <div className="mt-4 flex items-center gap-2 rounded-lg bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 px-3 py-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                    </span>
                                    <span className="text-xs font-medium text-orange-700 dark:text-orange-400">Currently busy</span>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
