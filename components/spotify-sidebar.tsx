"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function SpotifySidebar() {
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-80 flex-col overflow-y-auto bg-slate-900 lg:flex">
      <div className="flex h-full flex-col p-8">
        {/* Profile Image - Fixed position, no parallax */}
        <motion.div
          className="relative mb-6 overflow-hidden rounded-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/nicolas.jpeg"
            alt="Nicolas Huberty"
            width={300}
            height={300}
            className="h-auto w-full rounded-3xl object-cover"
          />
        </motion.div>

        {/* Name and Title */}
        <div className="mb-8">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-white"
          >
            Nicolas Huberty
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-sm text-slate-400"
          >
            AI Engineer & Full-Stack Developer
          </motion.p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Link
                href={item.href}
                className="block rounded-lg px-4 py-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Social Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex gap-3"
        >
          {[
            { name: "GitHub", icon: "G", href: "https://github.com" },
            { name: "LinkedIn", icon: "L", href: "https://linkedin.com" },
            { name: "Twitter", icon: "T", href: "https://twitter.com" },
          ].map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-slate-300 transition-colors hover:bg-blue-600 hover:text-white"
              title={social.name}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Status indicator */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2"
        >
          <motion.div
            className="h-2 w-2 rounded-full bg-emerald-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="text-xs text-emerald-400">Available for work</span>
        </motion.div>
      </div>
    </aside>
  )
}
