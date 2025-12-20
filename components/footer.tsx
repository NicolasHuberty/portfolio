"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  // Using static year to avoid prerender date issues in Next.js 16
  const currentYear = 2025

  return (
    <footer className="border-t border-zinc-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-zinc-900 dark:text-white">
              Nicolas Huberty
            </p>
            <p className="text-xs text-zinc-500 dark:text-slate-500">
              AI Engineer & Consultant
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:contact@nicolashuberty.com"
              className="text-zinc-400 transition-colors hover:text-zinc-600 dark:text-slate-500 dark:hover:text-white"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/nicolas-huberty"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition-colors hover:text-zinc-600 dark:text-slate-500 dark:hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/NicolasHuberty"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition-colors hover:text-zinc-600 dark:text-slate-500 dark:hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
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
