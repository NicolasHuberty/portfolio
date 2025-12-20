import { notFound } from "next/navigation"
import { projects } from "@/lib/projects-data"
import ProjectDetailClient from "./project-detail-client"

interface PageProps {
    params: Promise<{ id: string }>
}


export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }))
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params
    const project = projects.find((p) => p.id === id)

    if (!project) {
        return { title: "Project Not Found" }
    }

    return {
        title: `${project.title} | Nicolas Huberty`,
        description: project.description,
    }
}

export default async function ProjectPage({ params }: PageProps) {
    const { id } = await params
    const project = projects.find((p) => p.id === id)

    if (!project) {
        notFound()
    }

    return <ProjectDetailClient project={project} />
}
