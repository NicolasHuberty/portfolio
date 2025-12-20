"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Send } from "lucide-react"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:contact@nicolashuberty.com?subject=Contact from ${formState.name}&body=${formState.message}`
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="bg-zinc-50 py-24 dark:bg-slate-800/50"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              Contact
            </span>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              Let's Work Together
            </h2>
            <p className="text-zinc-600 dark:text-slate-400">
              Have a project in mind? I'd love to hear about it.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-zinc-700 dark:text-slate-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={e =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 placeholder-zinc-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-indigo-400"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-zinc-700 dark:text-slate-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={e =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 placeholder-zinc-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-indigo-400"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-zinc-700 dark:text-slate-300"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={formState.message}
                onChange={e =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 placeholder-zinc-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-indigo-400"
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Send Message
              <Send className="h-4 w-4" />
            </button>
          </motion.form>

          {/* Direct email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10"
          >
            <p className="mb-2 text-sm text-zinc-500 dark:text-slate-500">
              Or reach out directly
            </p>
            <a
              href="mailto:contact@nicolashuberty.com"
              className="inline-flex items-center gap-2 text-zinc-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              <Mail className="h-4 w-4" />
              contact@nicolashuberty.com
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
