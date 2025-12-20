"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

import Tag from "@/components/tag"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "I specialize in AI engineering, full-stack development, and cloud infrastructure. From building custom LLM applications and RAG systems to deploying scalable Kubernetes clusters, I handle end-to-end development of intelligent systems.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "I primarily focus on legal tech, medical/healthcare, and business automation. My experience includes building de-identification systems for clinical documents, legal document processing platforms, and AI-powered workflow automation tools.",
  },
  {
    question: "How do you approach new projects?",
    answer:
      "I start by understanding your specific needs and challenges, then design solutions that integrate seamlessly into your existing workflows. My focus is on practical AI applications that deliver real value, not just impressive demos.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "My core stack includes Python, React/Next.js, Rust, and cloud platforms like Azure and Kubernetes. For AI work, I use LangChain, Transformers, and various LLM frameworks. I also have strong expertise in DevOps, GitLab CI/CD, and infrastructure as code.",
  },
  {
    question: "Are you available for freelance work?",
    answer:
      "Yes! I'm currently open to freelance missions and collaborations in AI engineering, automation projects, and infrastructure design. I'm based in Belgium and work with clients globally.",
  },
]

export default function Faqs() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <section id="faqs" className="py-24">
      <div className="container">
        <div className="flex justify-center">
          <Tag>Faqs</Tag>
        </div>
        <h2 className="mx-auto mt-6 max-w-xl text-center text-6xl font-medium">
          Questions? We&apos;ve got{" "}
          <span className="text-pink-400">answers</span>
        </h2>
        <div className="mx-auto mt-12 flex max-w-xl flex-col gap-6">
          {faqs.map((faq, faqIndex) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-white/10 bg-neutral-900 p-6"
            >
              <div
                className="flex items-center justify-between"
                onClick={() => setSelectedIndex(faqIndex)}
              >
                <h3 className="font-medium">{faq.question}</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "feather feather-plus flex-shrink-0 text-pink-400 transition duration-300",
                    selectedIndex === faqIndex && "rotate-45",
                  )}
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>

              <AnimatePresence>
                {selectedIndex === faqIndex && (
                  <motion.div
                    initial={{ height: 0, marginTop: 0 }}
                    animate={{
                      height: "auto",
                      marginTop: 24,
                    }}
                    exit={{ height: 0, marginTop: 0 }}
                    className={cn("overflow-hidden")}
                  >
                    <p className="text-white/50">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
