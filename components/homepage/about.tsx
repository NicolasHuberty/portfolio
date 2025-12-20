"use client"
import { motion } from "framer-motion"
import { Award, Briefcase, GraduationCap, Rocket } from "lucide-react"

import Tag from "@/components/tag"
import { education, experience } from "@/lib/portfolio-data"

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="container">
        <div className="flex flex-col items-center">
          <Tag>About Me</Tag>
          <h2 className="mt-6 max-w-3xl text-center text-5xl font-medium md:text-6xl">
            Background & <span className="text-pink-400">Experience</span>
          </h2>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400/20 to-pink-400/20">
              <GraduationCap className="size-7 text-pink-400" />
            </div>
            <h3 className="text-3xl font-bold">Education</h3>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 p-8 backdrop-blur transition-all duration-300 hover:border-purple-400/30 hover:shadow-xl hover:shadow-purple-400/10"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="size-5 text-purple-400" />
                    <h4 className="text-xl font-bold text-white">{education.master.degree}</h4>
                  </div>
                  <p className="text-base text-pink-400 font-medium">{education.master.specialization}</p>
                  <p className="mt-2 text-sm text-white/60">
                    {education.master.institution} • {education.master.location}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-purple-400/10 px-4 py-2 text-sm font-bold text-purple-400 ring-1 ring-purple-400/20">
                  {education.master.years}
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-pink-400/20 bg-gradient-to-br from-pink-400/10 to-purple-400/5 p-6 backdrop-blur">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="size-5 text-pink-400" />
                  <span className="text-sm font-bold uppercase tracking-wider text-pink-400">Master's Thesis</span>
                </div>
                <h5 className="text-lg font-bold text-white">{education.master.thesis.title}</h5>
                <p className="mt-3 text-sm leading-relaxed text-white/80">{education.master.thesis.outcome}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group rounded-2xl border border-white/10 bg-neutral-900/50 p-6 backdrop-blur transition-all duration-300 hover:border-purple-400/20 hover:bg-neutral-900/70"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-white">{education.bachelor.degree}</h4>
                  <p className="mt-1 text-sm text-white/50">
                    {education.bachelor.institution} • {education.bachelor.years}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-20 max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400/20 to-pink-400/20">
              <Briefcase className="size-7 text-pink-400" />
            </div>
            <h3 className="text-3xl font-bold">Professional Experience</h3>
          </div>

          <div className="space-y-6">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="group rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 p-8 backdrop-blur transition-all duration-300 hover:border-pink-400/30 hover:shadow-xl hover:shadow-pink-400/10"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h4 className="text-2xl font-bold text-white">{exp.role}</h4>
                      <span className="rounded-full bg-pink-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-pink-400 ring-1 ring-pink-400/20">
                        {exp.type}
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-pink-400">{exp.company}</p>
                    <p className="mt-4 leading-relaxed text-white/70">{exp.description}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-purple-400/10 px-4 py-2 text-sm font-bold text-purple-400 ring-1 ring-purple-400/20">
                    {exp.period}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
