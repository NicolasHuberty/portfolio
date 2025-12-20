import { notFound } from "next/navigation"
import { experiences, experienceDetails } from "@/lib/experience-data"
import ExperienceDetailClient from "./experience-detail-client"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return experiences.map(exp => ({
    id: exp.id,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const experience = experiences.find(e => e.id === id)

  if (!experience) {
    return { title: "Experience Not Found" }
  }

  return {
    title: `${experience.title} at ${experience.company} | Nicolas Huberty`,
    description: experience.description,
  }
}

export default async function ExperiencePage({ params }: PageProps) {
  const { id } = await params
  const experience = experiences.find(e => e.id === id)
  const details = experienceDetails[id]

  if (!experience) {
    notFound()
  }

  return <ExperienceDetailClient experience={experience} details={details} />
}
