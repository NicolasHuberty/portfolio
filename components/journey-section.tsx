"use client"

import { motion } from "framer-motion"

export default function JourneySection() {
  const journeySteps = [
    {
      year: "2019 - 2022",
      title: "Bachelor's Degree",
      subtitle: "Computer Science • UCLouvain",
      description:
        "Built a strong foundation in algorithms, data structures, and software engineering. Explored machine learning, databases, and distributed systems.",
      icon: "🎓",
      color: "blue",
    },
    {
      year: "2022 - 2024",
      title: "Master's in AI",
      subtitle: "Artificial Intelligence • Cybersecurity • Data Science",
      description:
        "Specialized in AI, cybersecurity, and data science at UCLouvain. Developed ILA (Incremental Learning Annotator) for clinical document de-identification.",
      highlights: [
        "Federated learning in healthcare",
        "Privacy-preserving machine learning",
      ],
      icon: "🤖",
      color: "emerald",
    },
    {
      year: "2024 - Present",
      title: "AI Engineer",
      subtitle: "UCLouvain • Full-time",
      description:
        "Leading AI initiatives across the university. Architecting RAG systems, fine-tuning LLMs, and deploying production AI solutions on Azure.",
      techs: ["Azure AI", "RAG Systems", "LLMs", "Automation"],
      icon: "🚀",
      color: "gradient",
    },
  ]

  return (
    <section id="journey" className="relative bg-slate-950 py-24">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.h2
            className="mb-4 text-5xl font-bold text-white lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            My{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Journey
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            From student to AI engineer
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-16">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-8 top-0 w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-blue-500 opacity-20 lg:left-1/2" />

          {journeySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative grid gap-8 lg:grid-cols-2 lg:gap-16 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 top-8 -ml-2 h-4 w-4 rounded-full border-4 border-slate-950 bg-gradient-to-br from-blue-400 to-emerald-400 lg:left-1/2" />

              {/* Content */}
              <div
                className={`lg:col-span-1 ${
                  index % 2 === 1
                    ? "lg:col-start-2 lg:text-left"
                    : "lg:text-right"
                }`}
              >
                <div
                  className={`ml-20 lg:ml-0 ${index % 2 === 1 ? "" : "lg:mr-12"}`}
                >
                  <div
                    className={`mb-3 inline-block rounded-full px-4 py-1.5 text-sm font-semibold ${
                      step.color === "blue"
                        ? "bg-blue-500/10 text-blue-400"
                        : step.color === "emerald"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-gradient-to-r from-blue-500/10 to-emerald-500/10 text-blue-400"
                    }`}
                  >
                    {step.year}
                  </div>
                  <h3 className="mb-2 text-3xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mb-4 text-lg text-slate-300">{step.subtitle}</p>
                  <p className="mb-4 leading-relaxed text-slate-400">
                    {step.description}
                  </p>

                  {/* Highlights */}
                  {step.highlights && (
                    <div className="space-y-2">
                      {step.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <p className="text-sm text-slate-400">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech tags */}
                  {step.techs && (
                    <div className="flex flex-wrap gap-2">
                      {step.techs.map((tech, i) => (
                        <div
                          key={i}
                          className="rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-sm text-slate-300"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Icon/Visual */}
              <div
                className={`lg:col-span-1 ${
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }`}
              >
                <div
                  className={`ml-20 lg:ml-0 ${
                    index % 2 === 1 ? "lg:ml-12" : "lg:mr-0"
                  }`}
                >
                  <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl">{step.icon}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
