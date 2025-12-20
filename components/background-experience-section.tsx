"use client"

import { motion } from "framer-motion"
import ScrollReveal from "./scroll-reveal"
import EducationCard from "./education-card"
import ExperienceCard from "./experience-card"
import AnimatedTimeline, { TimelineItem } from "./animated-timeline"

export default function BackgroundExperienceSection() {
  return (
    <section id="about" className="relative py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-20 text-center">
            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-medium text-purple-400">
                🎯 My Journey
              </span>
            </motion.div>
            <h2 className="mb-4 text-4xl font-bold lg:text-6xl">
              <span className="text-white">Background &</span>{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/60">
              A passionate journey through AI, computer science, and
              cutting-edge technology
            </p>
          </div>
        </ScrollReveal>

        {/* Animated Stats Bar */}
        <ScrollReveal delay={0.1}>
          <div className="mb-20 grid gap-6 md:grid-cols-4">
            {[
              { value: "2+", label: "Years in AI", icon: "🤖" },
              { value: "Master's", label: "Degree", icon: "🎓" },
              { value: "UCLouvain", label: "University", icon: "🏛️" },
              { value: "AI/ML", label: "Specialization", icon: "⚡" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-950/20 via-black/90 to-pink-950/20 p-6 text-center backdrop-blur-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="mb-2 text-4xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div className="mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-2xl font-bold text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <AnimatedTimeline>
          {/* Current Position */}
          <TimelineItem date="2024 - Present" index={0}>
            <ExperienceCard
              role="AI Engineer"
              company="UCLouvain"
              type="Full-time"
              description="Leading AI initiatives at UCLouvain, managing all generative AI, automation, and data-driven projects within the university. Designing and deploying AI systems that integrate Azure, RAG architectures, fine-tuned LLMs, and embedding-based search to streamline administrative and academic workflows."
              responsibilities={[
                "Architecting and deploying enterprise-scale AI solutions using Azure infrastructure",
                "Implementing RAG (Retrieval-Augmented Generation) systems for intelligent document processing",
                "Fine-tuning large language models for domain-specific applications",
                "Building embedding-based semantic search systems for academic content",
                "Leading cross-functional teams in AI/ML project implementation",
                "Automating administrative workflows using generative AI technologies",
                "Designing data pipelines for real-time analytics and insights",
              ]}
              technologies={[
                "Azure AI",
                "LangChain",
                "OpenAI GPT-4",
                "Vector Databases",
                "Python",
                "FastAPI",
                "React",
                "Docker",
                "Kubernetes",
                "PostgreSQL",
              ]}
              logo="/images/uclouvain-logo.png"
            />
          </TimelineItem>

          {/* Master's Education */}
          <TimelineItem date="2022 - 2024" index={1} side="left">
            <EducationCard
              degree="Master's Degree in Computer Science"
              field="Artificial Intelligence, Cybersecurity, and Data Science"
              institution="UCLouvain"
              location="Belgium"
              period="2022 - 2024"
              thesis={{
                title: "De-identification of Clinical Documents",
                description:
                  "Created ILA – Incremental Learning Annotator, demonstrating that fine-tuning models locally (per institution) significantly outperforms multi-hospital centralized models. After annotating just 50 documents, models achieved high performance, proving the effectiveness of federated learning approaches in healthcare AI.",
              }}
              achievements={[
                "Developed novel incremental learning approach for NLP in healthcare",
                "Achieved state-of-the-art performance with minimal training data",
                "Published research on privacy-preserving machine learning",
                "Specialized in AI Ethics and Responsible AI Development",
              ]}
              logo="/images/uclouvain-logo.png"
            />
          </TimelineItem>

          {/* Bachelor's Education */}
          <TimelineItem date="2019 - 2022" index={2}>
            <EducationCard
              degree="Bachelor's Degree in Computer Science"
              field="Computer Science Fundamentals"
              institution="UCLouvain"
              location="Belgium"
              period="2019 - 2022"
              achievements={[
                "Strong foundation in algorithms, data structures, and software engineering",
                "Coursework in machine learning, databases, and distributed systems",
                "Multiple academic projects in full-stack development",
                "Active participation in coding competitions and hackathons",
              ]}
              logo="/images/uclouvain-logo.png"
            />
          </TimelineItem>
        </AnimatedTimeline>

        {/* Skills Highlight */}
        <ScrollReveal delay={0.2}>
          <div className="mt-20">
            <motion.div
              className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-950/30 via-black/90 to-pink-950/30 p-12 backdrop-blur-xl"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-12 lg:grid-cols-2">
                {/* Core Expertise */}
                <div>
                  <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      ⚡
                    </span>
                    Core Expertise
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Generative AI & LLMs",
                        level: 95,
                        color: "from-purple-500 to-pink-500",
                      },
                      {
                        name: "RAG Systems & Vector DBs",
                        level: 90,
                        color: "from-pink-500 to-purple-500",
                      },
                      {
                        name: "Full-Stack Development",
                        level: 88,
                        color: "from-purple-400 to-pink-400",
                      },
                      {
                        name: "Cloud Architecture (Azure)",
                        level: 85,
                        color: "from-pink-400 to-purple-400",
                      },
                    ].map((skill, index) => (
                      <div key={index}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-white/80">{skill.name}</span>
                          <span className="text-white/60">{skill.level}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skill.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Research Interests */}
                <div>
                  <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      🔬
                    </span>
                    Research Interests
                  </h3>
                  <div className="grid gap-4">
                    {[
                      "Privacy-Preserving Machine Learning",
                      "Federated Learning in Healthcare",
                      "Natural Language Processing",
                      "Incremental & Transfer Learning",
                      "AI Ethics & Responsible AI",
                      "Medical AI & Clinical NLP",
                    ].map((interest, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{
                          x: 10,
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                        <span className="text-white/80">{interest}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 text-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 font-semibold text-white shadow-2xl shadow-purple-500/50"
            >
              <span>Let's Work Together</span>
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path
                  d="M7 14L11 10L7 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
