"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
    // Using static year to avoid prerender date issues in Next.js 16
    const currentYear = 2025

    return (
        <footer className="py-10 bg-white dark:bg-slate-900 border-t border-zinc-200 dark:border-slate-800">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-zinc-900 dark:text-white font-medium text-sm">Nicolas Huberty</p>
                        <p className="text-xs text-zinc-500 dark:text-slate-500">AI Engineer & Consultant</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="mailto:contact@nicolashuberty.com"
                            className="text-zinc-400 dark:text-slate-500 hover:text-zinc-600 dark:hover:text-white transition-colors"
                            aria-label="Email"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                        <a
                            href="https://linkedin.com/in/nicolas-huberty"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 dark:text-slate-500 hover:text-zinc-600 dark:hover:text-white transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                            href="https://github.com/NicolasHuberty"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 dark:text-slate-500 hover:text-zinc-600 dark:hover:text-white transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                    </div>

                    <p className="text-xs text-zinc-500 dark:text-slate-500">
                        © {currentYear} All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}
