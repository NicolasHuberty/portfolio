"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode } from "react"

interface TimelineItemProps {
  children: ReactNode
  date: string
  index: number
  side?: "left" | "right"
}

function TimelineItem({
  children,
  date,
  index,
  side = "right",
}: TimelineItemProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative flex items-center gap-8">
      {/* Timeline line and dot */}
      <div className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center">
        {/* Animated line */}
        <motion.div
          className="w-0.5 bg-gradient-to-b from-purple-500/50 to-transparent"
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : {}}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        />

        {/* Animated dot */}
        <motion.div
          className="relative z-10 -mt-3"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
        >
          <motion.div
            className="h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(168, 85, 247, 0.7)",
                "0 0 0 10px rgba(168, 85, 247, 0)",
                "0 0 0 0 rgba(168, 85, 247, 0.7)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div
        className={`w-full ${side === "left" ? "lg:w-[calc(50%-2rem)] lg:text-right" : "lg:ml-auto lg:w-[calc(50%-2rem)]"}`}
      >
        <motion.div
          initial={{ opacity: 0, x: side === "left" ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
        >
          <div className="mb-2 text-sm font-semibold text-purple-400">
            {date}
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  )
}

interface AnimatedTimelineProps {
  children: ReactNode
}

export default function AnimatedTimeline({ children }: AnimatedTimelineProps) {
  return (
    <div className="relative space-y-16">
      {/* Start indicator */}
      <motion.div
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      </motion.div>

      {children}

      {/* End indicator */}
      <motion.div
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>
    </div>
  )
}

export { TimelineItem }
