"use client"
import { useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

import Tag from "../tag"

const text = `AI-powered solutions don't have to be complex. I build intelligent systems that seamlessly integrate into your workflows, empowering professionals in legal, medical, and business domains to work smarter, not harder.`
const words = text.split(" ")

export default function Introduction() {
  const scrollTarget = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start end", "end end"],
  })

  const [currentWord, setCurrentWord] = useState(0)

  const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length])

  useEffect(() => {
    wordIndex.on("change", latest => {
      setCurrentWord(latest)
    })
  }, [wordIndex])

  return (
    <section className="py-28 lg:py-40">
      <div className="container">
        <div className="sticky top-20 md:top-28 lg:top-40">
          <div className="flex justify-center">
            <Tag>My Approach</Tag>
          </div>

          <div className="mt-10 text-center text-4xl font-medium md:text-6xl lg:text-7xl">
            <span>Building intelligent systems that empower professionals.</span>{" "}
            <span className="">
              {words.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className={cn(
                    "text-white/15 transition duration-500",
                    wordIndex < currentWord && "text-white",
                  )}
                >{`${word} `}</span>
              ))}
            </span>
            <span className="block text-pink-400">
              That&apos;s my mission as an AI Engineer.
            </span>
          </div>
        </div>
        <div className="h-[30vh]" ref={scrollTarget}></div>
        <div className="h-[150vh]" ref={scrollTarget}></div>
      </div>
    </section>
  )
}
