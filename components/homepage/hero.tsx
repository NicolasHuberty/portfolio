"use client"
import { motion, useAnimate } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef } from "react"

import Pointer from "@/components/pointer"
import cursorYouImage from "@/public/images/cursor-you.svg"
import designExample1Image from "@/public/images/design-example-1.png"
import designExample2Image from "@/public/images/design-example-2.png"

export default function Hero() {
  const [leftDesignScope, leftDesignAnimate] = useAnimate()
  const [leftPointerScope, leftPointerAnimate] = useAnimate()
  const [rightDesignScope, rightDesignAnimate] = useAnimate()
  const [rightPointerScope, rightPointerAnimate] = useAnimate()
  const constraintRef = useRef(null)

  useEffect(() => {
    leftDesignAnimate([
      [leftDesignScope.current, { opacity: 1 }, { duration: 0.5 }],
      [leftDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
    ])

    leftPointerAnimate([
      [leftPointerScope.current, { opacity: 1 }, { duration: 0.5 }],
      [leftPointerScope.current, { y: 0, x: -100 }, { duration: 0.5 }],
      [
        leftPointerScope.current,
        { x: 0, y: [0, 16, 0] },
        { duration: 0.5, ease: "easeInOut" },
      ],
    ])

    rightDesignAnimate([
      [rightDesignScope.current, { opacity: 1 }, { duration: 0.5, delay: 1.5 }],
      [rightDesignScope.current, { x: 0, y: 0 }, { duration: 0.5 }],
    ])

    rightPointerAnimate([
      [
        rightPointerScope.current,
        { opacity: 1 },
        { duration: 0.5, delay: 1.5 },
      ],
      [rightPointerScope.current, { x: 175, y: 0 }, { duration: 0.5 }],
      [
        rightPointerScope.current,
        { x: 0, y: [0, 20, 0] },
        { duration: 0.5, ease: "easeInOut" },
      ],
    ])
  }, [
    leftDesignAnimate,
    leftDesignScope,
    leftPointerAnimate,
    leftPointerScope,
    rightDesignAnimate,
    rightDesignScope,
    rightPointerAnimate,
    rightPointerScope,
  ])

  return (
    <section
      className="mx-auto mt-20 max-w-[1600px] overflow-x-clip py-24"
      style={{
        cursor: `url(${cursorYouImage.src}), auto`,
      }}
      ref={constraintRef}
    >
      <div className="container relative">
        <motion.div
          ref={leftDesignScope}
          initial={{ opacity: 0, y: 100, x: -100 }}
          drag
          // dragConstraints={constraintRef}
          dragConstraints={{ left: -100, top: -300, right: 850, bottom: 200 }}
          className="absolute -left-32 top-16 z-50 hidden lg:block"
        >
          <Image
            src={designExample1Image}
            alt="design example 1 image"
            draggable={false}
            className="h-auto w-32"
          />
        </motion.div>
        <motion.div
          ref={leftPointerScope}
          initial={{ opacity: 0, y: 100, x: -200 }}
          className="absolute left-56 top-96 z-[60] hidden lg:block"
        >
          <Pointer name="Andrea" />
        </motion.div>

        <motion.div
          ref={rightDesignScope}
          initial={{ opacity: 0, x: 100, y: 100 }}
          drag
          dragConstraints={{ left: -850, top: -300, right: 150, bottom: 200 }}
          className="absolute -right-64 -top-16 z-50 hidden lg:block"
        >
          <Image
            src={designExample2Image}
            alt="design example 2 image"
            draggable={false}
            className="h-auto w-32"
          />
        </motion.div>
        <motion.div
          ref={rightPointerScope}
          initial={{ opacity: 0, x: 275, y: 100 }}
          className="absolute -top-4 right-80 z-[60] hidden lg:block"
        >
          <Pointer name="Bryan" color="red" />
        </motion.div>

        <div className="flex justify-center gap-3">
          <span className="inline-flex rounded-full bg-purple-400/10 px-3 py-1 text-sm font-medium text-purple-400 ring-1 ring-inset ring-purple-400/20">
            Legal Tech
          </span>
          <span className="inline-flex rounded-full bg-blue-400/10 px-3 py-1 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20">
            Healthcare AI
          </span>
          <span className="inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-400/20">
            Education Tech
          </span>
        </div>
        <h1 className="mx-auto mt-8 max-w-4xl text-center text-5xl font-medium tracking-tight md:text-7xl">
          Building intelligent systems that transform organizations
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xl text-white/60">
          I'm Nicolas, an AI engineer based in Belgium. I design and implement
          AI-powered solutions that help businesses automate workflows, extract
          insights from data, and deliver exceptional user experiences.
        </p>
        <div className="mx-auto mt-10 flex max-w-md justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex rounded-full bg-white px-8 py-3 font-semibold text-neutral-950 transition-transform hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex rounded-full border border-white/20 bg-white/5 px-8 py-3 font-semibold text-white transition-all hover:bg-white/10"
          >
            Start a Conversation
          </a>
        </div>
      </div>
    </section>
  )
}
