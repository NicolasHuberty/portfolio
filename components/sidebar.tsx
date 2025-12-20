"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Github,
  Linkedin,
  Mail,
  Sun,
  Moon,
  ChevronRight,
  Menu,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useSidebar } from "./sidebar-context"

export default function Sidebar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const {
    isExpanded: _isExpanded,
    setIsExpanded,
    shouldShowSidebar,
  } = useSidebar()

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
            className="group fixed left-0 top-1/2 z-50 hidden -translate-y-1/2 items-center gap-2 rounded-r-2xl border border-l-0 border-zinc-200 bg-white py-4 pl-4 pr-3 shadow-lg transition-shadow hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 lg:flex"
          >
            <div className="h-10 w-10 overflow-hidden rounded-xl">
              <Image
                src="/images/nicolas.jpeg"
                alt="Nicolas Huberty"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <ChevronRight className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-indigo-500" />
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
              opacity: { duration: 0.2 },
            }}
            className="fixed left-0 top-0 z-40 hidden h-screen w-80 flex-col overflow-y-auto border-r border-zinc-200 bg-zinc-50/95 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/95 lg:flex"
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
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />

                {/* Booked Badge (Pill Style for Square Image) */}
                <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
                  <div className="rounded-full border border-white/20 bg-orange-500 px-3 py-1 text-xs font-bold tracking-wider text-white shadow-lg">
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
                      className="block rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
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
                <p className="mb-4 px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-slate-500">
                  Appearance
                </p>
                {mounted && (
                  <div className="relative flex rounded-xl border border-zinc-200/50 bg-zinc-100/80 p-1 shadow-inner backdrop-blur-md dark:border-slate-600/50 dark:bg-slate-700/50">
                    {/* Sliding Background */}
                    <motion.div
                      className="absolute inset-y-1 rounded-lg border border-zinc-200/50 bg-white shadow-sm dark:border-slate-500/50 dark:bg-slate-600"
                      initial={false}
                      animate={{
                        x: theme === "light" ? 0 : "100%",
                      }}
                      style={{
                        width: "calc(50% - 4px)",
                        left: "4px",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />

                    <button
                      onClick={() => setTheme("light")}
                      className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                        theme === "light"
                          ? "text-indigo-600 dark:text-white"
                          : "text-zinc-500 hover:text-zinc-800 dark:text-slate-400 dark:hover:text-slate-200"
                      }`}
                    >
                      <Sun
                        className={`h-4 w-4 transition-transform duration-500 ${theme === "light" ? "rotate-0 scale-110" : "rotate-[20deg] scale-90 opacity-70"}`}
                      />
                      <span>Light</span>
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                        theme === "dark"
                          ? "text-indigo-600 dark:text-white"
                          : "text-zinc-500 hover:text-zinc-800 dark:text-slate-400 dark:hover:text-slate-200"
                      }`}
                    >
                      <Moon
                        className={`h-4 w-4 transition-transform duration-500 ${theme === "dark" ? "rotate-0 scale-110" : "-rotate-[20deg] scale-90 opacity-70"}`}
                      />
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-all hover:bg-[#333] hover:text-white dark:bg-slate-700 dark:text-slate-400"
                  title="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nicolas-huberty-a1068723b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-all hover:bg-[#0077b5] hover:text-white dark:bg-slate-700 dark:text-slate-400"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="mailto:huberty.nicolas@hotmail.com"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-all hover:bg-rose-500 hover:text-white dark:bg-slate-700 dark:text-slate-400"
                  title="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </motion.div>

              {/* Status indicator */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4 flex items-center gap-2 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2 dark:border-orange-500/20 dark:bg-orange-500/10"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                </span>
                <span className="text-xs font-medium text-orange-700 dark:text-orange-400">
                  Currently busy
                </span>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-800 lg:hidden"
      >
        <Menu className="h-5 w-5 text-zinc-600 dark:text-slate-400" />
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
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 z-50 flex h-screen w-80 flex-col overflow-y-auto bg-zinc-50 dark:bg-slate-800 lg:hidden"
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
                  {navItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {/* Theme Switcher */}
                {mounted && (
                  <div className="mb-8">
                    <p className="mb-4 px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-slate-500">
                      Appearance
                    </p>
                    <div className="relative flex rounded-xl border border-zinc-200/50 bg-zinc-100/80 p-1 shadow-inner backdrop-blur-md dark:border-slate-600/50 dark:bg-slate-700/50">
                      {/* Sliding Background */}
                      <motion.div
                        className="absolute inset-y-1 rounded-lg border border-zinc-200/50 bg-white shadow-sm dark:border-slate-500/50 dark:bg-slate-600"
                        initial={false}
                        animate={{
                          x: theme === "light" ? 0 : "100%",
                        }}
                        style={{
                          width: "calc(50% - 4px)",
                          left: "4px",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />

                      <button
                        onClick={() => setTheme("light")}
                        className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                          theme === "light"
                            ? "text-indigo-600 dark:text-white"
                            : "text-zinc-500 dark:text-slate-400"
                        }`}
                      >
                        <Sun
                          className={`h-4 w-4 transition-transform duration-500 ${theme === "light" ? "rotate-0 scale-110" : "rotate-[20deg] scale-90 opacity-70"}`}
                        />
                        <span>Light</span>
                      </button>
                      <button
                        onClick={() => setTheme("dark")}
                        className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                          theme === "dark"
                            ? "text-indigo-600 dark:text-white"
                            : "text-zinc-500 dark:text-slate-400"
                        }`}
                      >
                        <Moon
                          className={`h-4 w-4 transition-transform duration-500 ${theme === "dark" ? "rotate-0 scale-110" : "-rotate-[20deg] scale-90 opacity-70"}`}
                        />
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
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-all hover:bg-[#333] hover:text-white dark:bg-slate-700 dark:text-slate-400"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nicolas-huberty-a1068723b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-all hover:bg-[#0077b5] hover:text-white dark:bg-slate-700 dark:text-slate-400"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:huberty.nicolas@hotmail.com"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-all hover:bg-rose-500 hover:text-white dark:bg-slate-700 dark:text-slate-400"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>

                {/* Status */}
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2 dark:border-orange-500/20 dark:bg-orange-500/10">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                  </span>
                  <span className="text-xs font-medium text-orange-700 dark:text-orange-400">
                    Currently busy
                  </span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
