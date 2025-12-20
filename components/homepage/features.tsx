import Image from "next/image"

import Avatar from "@/components/avatar"
import FeatureCard from "@/components/feature-card"
import Key from "@/components/key"
import Tag from "@/components/tag"
import avatar1 from "@/public/images/nicolas.jpeg"

const features = [
  "Custom AI Solutions",
  "LLM Integration",
  "RAG Systems",
  "Process Automation",
  "Cloud Infrastructure",
  "Full-Stack Development",
  "DevOps & CI/CD",
]

export default function Features() {
  return (
    <section id="features" className="container py-24">
      <div className="flex justify-center">
        <Tag>Features</Tag>
      </div>

      <h2 className="mx-auto mt-6 max-w-2xl text-center text-6xl font-medium">
        Where AI meets <span className="text-pink-400">real-world impact</span>
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-3">
        <FeatureCard
          title="Collaborative Development"
          description="Working together to build intelligent systems that solve real problems."
          className="group transition duration-500 hover:scale-105 md:col-span-2 lg:col-span-1"
        >
          <div className="flex aspect-video items-center justify-center">
            <Avatar className="z-40">
              <Image src={avatar1} alt="Avatar 1" className="rounded-full" />
            </Avatar>
          </div>
        </FeatureCard>

        <FeatureCard
          title="Proven Track Record"
          description="Delivering AI-powered solutions that transform how professionals work."
          className="group transition duration-500 hover:scale-105 md:col-span-2 lg:col-span-1"
        >
          <div className="flex aspect-video items-center justify-center">
            <p className="text-center text-4xl font-extrabold text-white/20 transition duration-500 group-hover:text-white/10">
              Building{" "}
              <span className="relative bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                <span>intelligent</span>
                <video
                  src="/gif-incredible.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 rounded-2xl opacity-0 shadow-xl transition duration-500 group-hover:opacity-100"
                ></video>
              </span>{" "}
              <br />
              systems that work.
            </p>
          </div>
        </FeatureCard>

        <FeatureCard
          title="Rapid Development"
          description="Efficient workflows and modern tooling for faster delivery without compromising quality."
          className="group transition duration-500 hover:scale-105 md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-auto"
        >
          <div className="flex aspect-video items-center justify-center gap-4">
            <Key className="w-28 outline outline-2 outline-offset-4 outline-transparent transition-all duration-500 group-hover:translate-y-1 group-hover:outline-pink-400">
              Shift
            </Key>
            <Key className="outline outline-2 outline-offset-4 outline-transparent transition-all delay-150 duration-500 group-hover:translate-y-1 group-hover:outline-pink-400">
              alt
            </Key>
            <Key className="outline outline-2 outline-offset-4 outline-transparent transition-all delay-300 duration-500 group-hover:translate-y-1 group-hover:outline-pink-400">
              C
            </Key>
          </div>
        </FeatureCard>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {features.map(feature => (
          <div
            key={feature}
            className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-neutral-900 px-3 py-1.5 transition duration-500 hover:scale-105 md:px-5 md:py-2"
          >
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-pink-400 text-xl text-neutral-950 transition duration-500 group-hover:rotate-45">
              &#10038;
            </span>
            <span className="font-medium md:text-lg">{feature}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
