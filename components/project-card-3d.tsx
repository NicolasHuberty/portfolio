"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import { MouseEvent, useState } from "react"

interface ProjectCard3DProps {
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
}

export default function ProjectCard3D({
  title,
  description,
  image,
  tags,
  link = "#",
}: ProjectCard3DProps) {
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-[500px] w-full cursor-pointer"
    >
      <motion.a
        href={link}
        className="relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-950/50 via-black/90 to-pink-950/50 p-6 shadow-2xl backdrop-blur-xl"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />

        {/* Animated gradient on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-500"
          animate={{
            opacity: isHovered ? 0.1 : 0,
            background: isHovered
              ? "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)"
              : "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0) 0%, transparent 50%)",
          }}
        />

        {/* Content */}
        <div
          className="relative h-full"
          style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Project Image */}
          <div className="relative mb-6 h-48 overflow-hidden rounded-2xl">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Title */}
          <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>

          {/* Description */}
          <p className="mb-4 line-clamp-3 text-sm text-white/60">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 text-xs text-white/80 backdrop-blur-sm"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Hover effect - View Project button */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              transform: "translateZ(50px)",
            }}
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-purple-400">
              <span>View Project</span>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </div>
          </motion.div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)",
          }}
        />
      </motion.a>
    </motion.div>
  )
}
