"use client"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import Link from "next/link"

import { personalInfo, quote } from "@/lib/portfolio-data"
import Tag from "../tag"

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto mt-20 max-w-[1600px] py-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="flex justify-center">
            <Tag>Get In Touch</Tag>
          </div>
          <h2 className="my-6 text-center text-5xl font-medium md:text-6xl">
            Let's Work <span className="text-pink-400">Together</span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-400/10 to-pink-400/10 p-8 backdrop-blur md:p-12">
              <p className="text-center text-lg leading-relaxed text-white/80">
                I'm currently open to freelance missions and collaborations in:
              </p>

              <ul className="mx-auto mt-6 max-w-2xl space-y-3">
                {[
                  "AI engineering and generative AI",
                  "Automation and digital transformation",
                  "Infrastructure design and cloud orchestration",
                ].map(item => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-white/70"
                  >
                    <span className="mt-1 text-pink-400">▹</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 px-6 py-3 font-semibold text-neutral-950 transition-transform hover:scale-105"
                >
                  <Mail className="size-5" />
                  Send Email
                </Link>
                <Link
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-purple-400 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-400/10"
                >
                  <Linkedin className="size-5" />
                  LinkedIn
                </Link>
                <Link
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-purple-400 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-400/10"
                >
                  <Github className="size-5" />
                  GitHub
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/50">
                <MapPin className="size-4" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <div className="rounded-2xl border border-purple-400/20 bg-white/5 p-6 backdrop-blur md:p-8">
              <p className="text-center text-xl italic leading-relaxed text-white/80 md:text-2xl">
                "{quote}"
              </p>
              <p className="mt-4 text-center text-sm font-semibold text-purple-400">
                — {personalInfo.name}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
