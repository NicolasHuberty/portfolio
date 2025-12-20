"use client"
import { motion } from "framer-motion"

import { skills } from "@/lib/portfolio-data"
import Tag from "../tag"

export default function Skills() {
  const skillCategories = Object.values(skills)

  return (
    <section id="skills" className="mx-auto mt-20 max-w-[1600px] py-24">
      <div className="container">
        <div className="flex justify-center">
          <Tag>Skills & Expertise</Tag>
        </div>
        <h2 className="my-6 text-center text-5xl font-medium md:text-6xl">
          Technical <span className="text-pink-400">Stack</span>
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur"
            >
              <h3 className="text-2xl font-bold text-purple-400">
                {category.title}
              </h3>

              <ul className="mt-6 space-y-3">
                {category.items.map(skill => (
                  <li
                    key={skill}
                    className="flex items-start gap-2 text-white/80"
                  >
                    <span className="mt-1 text-pink-400">▹</span>
                    <span className="leading-relaxed">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
