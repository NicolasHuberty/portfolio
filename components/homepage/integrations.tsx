"use client"
import { motion } from "framer-motion"
import React from "react"

import Tag from "@/components/tag"
import { skills } from "@/lib/portfolio-data"

const SkillColumn = ({
  items,
  reverse = false,
  duration = 20,
  delay = 0
}: {
  items: string[]
  reverse?: boolean
  duration?: number
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ y: reverse ? "-50%" : 0 }}
      animate={{ y: reverse ? 0 : "-50%" }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay
      }}
      className="flex flex-col gap-4 pb-4"
    >
      {Array.from({ length: 2 }).map((_, arrayIndex) => (
        <React.Fragment key={arrayIndex}>
          {items.map((item, index) => (
            <motion.div
              key={`${item}-${index}`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="group cursor-default rounded-2xl border border-white/10 bg-neutral-900 p-5 backdrop-blur transition-all duration-300 hover:border-pink-400/50 hover:bg-white/5 hover:shadow-lg hover:shadow-pink-400/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 transition-all duration-300 group-hover:from-purple-400/30 group-hover:to-pink-400/30 group-hover:shadow-md group-hover:shadow-pink-400/20">
                  <span className="text-xl text-pink-400 transition-transform duration-300 group-hover:scale-110">▹</span>
                </div>
                <span className="text-base font-medium text-white/90 transition-colors duration-300 group-hover:text-white">
                  {item}
                </span>
              </div>
            </motion.div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  )
}

export default function Integrations() {
  const skillCategories = [
    { title: skills.ai.title, items: skills.ai.items, duration: 35, delay: 0 },
    { title: skills.programming.title, items: skills.programming.items, duration: 25, delay: 0.5 },
    { title: skills.frameworks.title, items: skills.frameworks.items, duration: 30, delay: 1 },
    { title: skills.devops.title, items: skills.devops.items, duration: 28, delay: 0.3 },
    { title: skills.data.title, items: skills.data.items, duration: 32, delay: 0.7 },
    { title: skills.other.title, items: skills.other.items, duration: 38, delay: 0.2 },
  ]

  return (
    <section id="integrations" className="overflow-hidden py-24">
      <div className="container">
        <div className="flex flex-col">
          <div className="text-center">
            <Tag>Tech Stack</Tag>
            <h2 className="mx-auto mt-6 max-w-3xl text-5xl font-medium md:text-6xl">
              Building with <span className="text-pink-400">Cutting-Edge</span>{" "}
              Technologies
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
              From AI and machine learning to cloud infrastructure and modern web frameworks,
              I leverage the best tools to build scalable, intelligent systems.
            </p>
          </div>

          <div className="mt-16 h-[700px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {skillCategories.map((category, index) => (
                <div key={category.title} className="flex flex-col">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="mb-6 text-center text-xs font-bold uppercase tracking-wider text-pink-400"
                  >
                    {category.title}
                  </motion.h3>
                  <SkillColumn
                    items={category.items}
                    reverse={index % 2 === 1}
                    duration={category.duration}
                    delay={category.delay}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
