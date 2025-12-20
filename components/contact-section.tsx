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
        <section ref={ref} id="contact" className="py-24 bg-zinc-50 dark:bg-slate-800/50">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="max-w-xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="mb-10"
                    >
                        <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
                            Contact
                        </span>
                        <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-white mb-4 tracking-tight">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-slate-300 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-slate-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-slate-300 mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all resize-none"
                                placeholder="Tell me about your project..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-slate-100 transition-colors shadow-sm"
                        >
                            Send Message
                            <Send className="w-4 h-4" />
                        </button>
                    </motion.form>

                    {/* Direct email */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-10"
                    >
                        <p className="text-zinc-500 dark:text-slate-500 text-sm mb-2">Or reach out directly</p>
                        <a
                            href="mailto:contact@nicolashuberty.com"
                            className="inline-flex items-center gap-2 text-zinc-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            contact@nicolashuberty.com
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
