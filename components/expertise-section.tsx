"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function ExpertiseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skills = [
    {
      category: "AI & Machine Learning",
      icon: "🧠",
      items: [
        { name: "Large Language Models", level: 95 },
        { name: "RAG Architectures", level: 92 },
        { name: "Fine-tuning & Transfer Learning", level: 90 },
        { name: "Computer Vision & NLP", level: 88 },
      ],
    },
    {
      category: "Development",
      icon: "💻",
      items: [
        { name: "Python & FastAPI", level: 93 },
        { name: "React & Next.js", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "Docker & Kubernetes", level: 85 },
      ],
    },
    {
      category: "Cloud & Infrastructure",
      icon: "☁️",
      items: [
        { name: "Azure AI Services", level: 90 },
        { name: "Vector Databases", level: 88 },
        { name: "GitOps & ArgoCD", level: 85 },
        { name: "Terraform", level: 82 },
      ],
    },
  ]

  return (
    <section ref={ref} className="relative bg-slate-950 py-32">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-5xl font-bold text-white lg:text-7xl">
            Core{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Technologies and skills I work with daily
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm transition-all hover:border-blue-500/50"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:from-blue-500/5 group-hover:to-emerald-500/5 group-hover:opacity-100" />

              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className="mb-6 text-5xl">{skill.icon}</div>

                {/* Category */}
                <h3 className="mb-6 text-2xl font-bold text-white">
                  {skill.category}
                </h3>

                {/* Skills */}
                <div className="space-y-5">
                  {skill.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-300">{item.name}</span>
                        <span className="text-slate-500">{item.level}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${item.level}%` } : {}}
                          transition={{
                            duration: 1,
                            delay: index * 0.1 + itemIndex * 0.1,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Work Stats */}
        <motion.div
          className="mt-20 grid gap-8 md:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "2+", label: "Years in AI" },
            { value: "10+", label: "Technologies" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 text-center backdrop-blur-sm"
            >
              <div className="mb-2 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-4xl font-bold text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
