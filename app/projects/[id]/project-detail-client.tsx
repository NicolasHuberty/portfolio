"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Users,
  Clock,
  Circle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import type { Project } from "@/lib/projects-data"

// Extended project details - you can add more info here per project
const projectDetails: Record<
  string,
  {
    duration: string
    team: string
    role: string
    client?: string
    year: string
    context: string
    challenge: string
    solution: string
    results: string[]
    gallery?: string[]
    thesis?: {
      title: string
      institution: string
      abstract: string
      contributions: string[]
      pdfUrl: string
      thesisUrl: string
    }
  }
> = {
  emate: {
    duration: "6 months",
    team: "Solo + 1 Legal Expert",
    role: "Full-Stack Developer & AI Engineer",
    client: "Legal Sector",
    year: "2024",
    context:
      "Law firms struggle to find relevant information across **all legal sources** (doctrine, jurisprudence, legislation). Traditional tools are limited to keyword search and often miss the nuanced connections needed for complex cases.",
    challenge:
      "Create an AI system capable of 'reasoning' like a lawyer—searching broadly, filtering intelligently, and synthesizing information from multiple document types into a cohesive, cited answer.",
    solution:
      "Developed a sophisticated **Smart Agent architecture** that emerged after long iteration loops. The system uses **Python** with comprehensive AI libraries, persistent storage on **S3**, and a managed **Qdrant** vector database. It orchestrates multiple reasoning steps to analyze the full spectrum of legal documentation, not just case precedents.",
    results: [
      "Significantly accelerates legal research workflows",
      "Agents successfully link doctrine with relevant jurisprudence",
      "Scalable architecture using Docker and Managed Qdrant",
      "High-recall retrieval across extensive legal databases",
    ],
  },
  swet: {
    duration: "Ongoing",
    team: "Freelance (with [Tom Heyerick](https://www.linkedin.com/in/tom-heyerick-79385427b/))",
    role: "Odoo Developer & Maintainer",
    client: "SWET BXL",
    year: "2023-Present",
    context:
      "SWET BXL is a Brussels-based **artisan producer of natural hot sauces**. They manage complex flows ranging from **batch production** to **omnichannel distribution** (B2B shops & B2C e-commerce).",
    challenge:
      "Legacy tools couldn't handle the integrated needs of **manufacturing (MRP)**, inventory, and automated invoicing for their growing wholesale and retail operations.",
    solution:
      "Collaborated with **Tom Heyerick** to deploy a tailored **Odoo.sh** solution. We implemented and customized core modules (**Inventory, Accounting, Website**) and established automated payment & invoicing workflows, fully replacing the previous system.",
    results: [
      "Fully migrated operations to Odoo (Inventory, Accounting, Website)",
      "Automated payment and invoicing reducing manual admin work",
      "Stable Odoo.sh infrastructure with custom Python maintenance",
      "Seamless end-to-end flow from Website order to Accounting",
    ],
  },
  datanest: {
    duration: "12 months",
    team: "Co-Founder (with [Nathan Nepper](https://www.linkedin.com/in/nathan-nepper-639478179/) & [Tom Heyerick](https://www.linkedin.com/in/tom-heyerick-79385427b/))",
    role: "AI Lead",
    client: "Law Firms (SME - Beta Testing)",
    year: "2023-2024",
    context:
      "Supported by **Yncubator**, DataNest is the **only SaaS platform in Belgium** combining intuitive interface with integrated AI specifically for SME law firms. Lawyers lose **1 hour per day** on repetitive administrative tasks: sorting emails, manually creating calendar events, tracking billable time, and searching for documents. Traditional legal tech offers disconnected databases without intelligence. We built **'Le SaaS qui simplifie la vie des avocats'** - a unified workspace where everything is automatically centralized and intelligently organized through **Nestor**, your AI virtual secretary who understands the legal profession.",
    challenge:
      "Building a system that **truly understands legal context** while maintaining **GDPR compliance** and **European data sovereignty**. The technical challenge: real-time synchronization of millions of emails across diverse providers (Exchange, Gmail, IMAP) with **intelligent automatic classification** into client folders. We needed to create an AI that doesn't just store data but actively assists lawyers - drafting emails, finding contracts, scheduling appointments - all while ensuring **strict tenant isolation** and **encrypted European hosting** to meet CCBE standards.",
    solution:
      "**Cloud-Native Microservices Architecture** on **Scaleway Kubernetes** with intelligent automation at every layer:\n\n**1. Automatic Centralization:**\nEmails, documents, tasks, and time entries are **automatically classified into intelligent client folders** without any manual configuration. The system learns your practice patterns.\n\n**2. Nestor - Your AI Virtual Secretary:**\nA **vocal and text-based AI assistant** that truly understands legal work:\n- **Email Drafting**: 'Nestor, draft a response to Martin about the urgent repair notice' - generates contextual legal correspondence\n- **Document Search**: 'Find the lease contract for the Martin case' - instant retrieval across all documents\n- **Appointment Scheduling**: 'Schedule a hearing for next Tuesday at 2pm' - creates calendar events automatically\n- **Prestation Creation**: Automatically tracks time spent on emails/documents and creates billable entries\n- **Case Insights**: 'Give me a summary of the Peeters case' - synthesizes all communications and documents\n\n**3. Intelligent Workflow:**\n- **Connect**: Simple integration with email, documents, and calendar\n- **Organize**: Automatic classification into client folders\n- **Work**: One-click access to all information, instant prestation/event creation from anywhere\n- **Bill**: Automatic time tracking, simplified invoicing, integrated online appointment booking\n\n**4. Security & Compliance:**\n- **GDPR Compliant**: Scrupulous respect for European data protection regulations\n- **European Hosting**: Data stays in certified European data centers (Scaleway)\n- **Advanced Encryption**: Security protocols adapted for sensitive legal data\n- **Tenant Isolation**: Strict PostgreSQL isolation per law firm",
    results: [
      "**Time Savings**: Lawyers gain **1 hour per day** - 30% reduction in administrative tasks",
      "**Nestor AI**: Vocal assistant for email drafting, document search, appointments, and case insights",
      "**Smart Auto-Classification**: Emails and documents automatically organized into client folders",
      "**Instant Search**: Find any document, email, or information in seconds with AI",
      "**Integrated Billing**: Automatic time tracking and prestation creation from work activities",
      "**One-Click Access**: All client information, documents, contacts accessible instantly",
      "**GDPR Certified**: European hosting with advanced encryption for legal data",
      "**Beta Adoption**: Successfully deployed with pilot SME law firms in Belgium",
    ],
  },
  docuralis: {
    duration: "Ongoing",
    team: "Solo Developer",
    role: "AI Architect & Engineer",
    client: "Internal / Enterprise SaaS",
    year: "2025",
    context:
      "Modern AI needs to go beyond static document search. Professionals require **autonomous agents** that can actively fetch external data (Web, APIs, Public Libraries) and synthesize it with internal knowledge.",
    challenge:
      "Orchestrating **Domain-Specific Agents** with distinct capabilities (Tools) while maintaining security. The goal was to implement the **Model Context Protocol (MCP)** to standardize how agents interact with the world.",
    solution:
      "Built a hybrid **RAG + Agentic Platform**. It enables the creation of specialized agents equipped with tools: **Web Search**, **API Connectors** (e.g., medical/legal databases), and **Private RAG**. Agents can plan, execute API calls, and reason across mixed data sources.",
    results: [
      "**Medical Agent** deployed: Advises on medications, drug interactions, and dosage",
      "**Legal Agent** deployed: Handles regulatory compliance and case analysis",
      "Platform for deploying specialized Domain Agents",
      "Full MCP support for standardized tool integration",
    ],
  },
  ila: {
    duration: "6 months (Master's Thesis)",
    team: "Solo + Academic Supervisor",
    role: "Researcher & Developer",
    client: "UCLouvain",
    year: "2024",
    context:
      "The amount of unstructured medical documents increases each year, presenting an opportunity to extract valuable insights that could significantly improve healthcare. However, to take advantage of this potential, it is crucial to de-identify these documents to protect patient privacy and comply with GDPR/HIPAA regulations before using them for research.",
    challenge:
      "Traditional approaches to clinical de-identification require large, expensive annotated datasets and don't adapt well to new document types. The challenge was twofold: (1) explore which deep learning strategies have the greatest impact on NER performance for PHI detection, and (2) create a tool that can quickly achieve robust performance without requiring massive annotated datasets.",
    solution:
      "The thesis has two parts. Part 1: A comprehensive evaluation of deep learning NER architectures (BERT, BiLSTM-CRF, fine-tuned transformers) to identify which methods work best for clinical de-identification. Part 2: Development of ILA (Incremental Learning Annotator), an innovative open-source tool that uses active learning and incremental training to rapidly build accurate models with minimal manual annotation effort.",
    results: [
      "95%+ F1 score on PHI detection across multiple entity types",
      "Reduced annotation effort by 70% compared to traditional approaches",
      "Published and defended at UCLouvain (2024)",
      "Open-source ILA tool available for healthcare research",
      "Enables GDPR-compliant clinical document processing",
      "Model improves automatically as users annotate edge cases",
    ],
    thesis: {
      title: "Deep Learning for de-identification of clinical documents",
      institution: "UCLouvain",
      abstract:
        "The amount of unstructured medical documents increases each year, presenting an opportunity to extract valuable insights that could significantly improve healthcare. However, to take advantage of this potential, it is crucial to de-identify these documents in order to protect patient privacy and to be able to use these documents for research. This study explores the different deep learning solutions for the de-identification of clinical documents. The first part explores the current strategies to recognize specific words in documents to understand which method has the greatest impact on performances. This evaluation helps to identify the strengths and weaknesses that traditional deep learning approaches may encounter. The second part introduces an innovative open-source tool: the Incremental Learning Annotator (ILA). This tool enhances the ability to obtain quickly a robust model that achieves good performance. This solves the need of large and well annotated dataset to obtain a robust deep learning model.",
      contributions: [
        "Comprehensive evaluation of NER architectures for clinical de-identification",
        "Novel active learning approach for medical document annotation",
        "Development of ILA: Incremental Learning Annotator tool",
        "Proven methodology for rapid model deployment with minimal data",
      ],
      pdfUrl:
        "https://thesis.dial.uclouvain.be/server/api/core/bitstreams/a36a80b6-b3d5-4106-8a56-2616fd24bfdd/content",
      thesisUrl:
        "https://thesis.dial.uclouvain.be/entities/masterthesis/4151ba15-8019-4d4a-a4e0-a6c09bde60af",
    },
  },
  infrastructure: {
    duration: "Ongoing",
    team: "Solo",
    role: "DevOps Engineer",
    year: "2022-Present",
    context:
      "Managing multiple projects requires reliable infrastructure with automated deployments, monitoring, and scalability.",
    challenge:
      "Build a private cloud infrastructure that can host all personal and client projects with enterprise-grade reliability and security.",
    solution:
      "Deployed a Kubernetes cluster with Terraform, implemented GitOps with ArgoCD, set up monitoring with Prometheus/Grafana, and automated SSL and DNS management.",
    results: [
      "99.9% uptime across all services",
      "Automated deployments via GitHub Actions",
      "Zero-downtime updates",
      "Cost savings of 60% vs. managed hosting",
    ],
  },
}

// Helper to parse markdown-like bold syntax
function parseMarkdown(text: string) {
  if (!text) return text
  // Regex matches **bold** OR [link](url)
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g)
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={index}
          className="font-semibold text-zinc-900 dark:text-white"
        >
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith("[") && part.endsWith(")")) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/)
      if (match) {
        return (
          <Link
            key={index}
            href={match[2]}
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            {match[1]}
          </Link>
        )
      }
    }
    return part
  })
}

function renderBlockContent(text: string) {
  if (!text) return null
  return text.split("\n").map((line, index) => {
    const trimmed = line.trim()
    if (!trimmed) return <div key={index} className="h-2" />

    if (trimmed.startsWith("- ")) {
      return (
        <div key={index} className="mb-1 flex items-start gap-2 pl-4">
          <span className="mt-2 text-[6px] text-zinc-400">●</span>
          <span className="leading-relaxed text-zinc-600 dark:text-slate-400">
            {parseMarkdown(trimmed.substring(2))}
          </span>
        </div>
      )
    }

    if (/^\d+\.\s/.test(trimmed)) {
      return (
        <div
          key={index}
          className="mb-1 mt-3 font-medium text-zinc-800 dark:text-slate-200"
        >
          {parseMarkdown(trimmed)}
        </div>
      )
    }

    return (
      <p
        key={index}
        className="mb-2 leading-relaxed text-zinc-600 dark:text-slate-400"
      >
        {parseMarkdown(line)}
      </p>
    )
  })
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const [currentImage, setCurrentImage] = useState(0)
  const details = projectDetails[project.id]
  const allImages = details?.gallery
    ? [...project.screenshots, ...details.gallery]
    : project.screenshots
  const hasImages = allImages.length > 0

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br ${project.color} py-20`}>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="container relative mx-auto px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/#projects"
            className="mb-8 inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              {/* Logo */}
              {project.logo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-3 shadow-xl"
                >
                  <Image
                    src={project.logo}
                    alt={`${project.title} logo`}
                    width={64}
                    height={64}
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              )}

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-sm font-medium uppercase tracking-wider text-white/70">
                  {project.category}
                </span>
                <h1 className="mb-3 mt-2 text-4xl font-bold text-white md:text-5xl">
                  {project.title}
                </h1>
                <p className="max-w-2xl text-xl text-white/90">
                  {project.subtitle}
                </p>
              </motion.div>
            </div>

            {/* Status & Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              {/* Status */}
              <div
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${
                  project.status === "online"
                    ? "bg-white/20 text-white"
                    : "bg-white/10 text-white/70"
                }`}
              >
                <Circle
                  className={`h-2.5 w-2.5 ${
                    project.status === "online"
                      ? "fill-emerald-400 text-emerald-400"
                      : "fill-white/50 text-white/50"
                  }`}
                />
                {project.status === "online" ? "Online" : "Archived"}
              </div>

              {/* External Link */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-zinc-900 transition-colors hover:bg-white/90"
                >
                  Visit Site
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-12 lg:col-span-2">
            {/* Screenshot Gallery */}
            {hasImages && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-100 shadow-lg dark:bg-slate-800">
                  <Image
                    src={allImages[currentImage]}
                    alt={`${project.title} screenshot`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    quality={85}
                    className="object-cover object-top"
                  />

                  {/* Navigation arrows */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImage((i: number) =>
                            i === 0 ? allImages.length - 1 : i - 1,
                          )
                        }
                        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentImage((i: number) =>
                            i === allImages.length - 1 ? 0 : i + 1,
                          )
                        }
                        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                    {allImages.map((img: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg ${
                          i === currentImage
                            ? "ring-2 ring-indigo-500"
                            : "opacity-60 hover:opacity-100"
                        } transition-all`}
                      >
                        <Image
                          src={img}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-white">
                Overview
              </h2>
              <div className="text-lg">
                {renderBlockContent(project.description)}
              </div>
            </motion.div>

            {/* Context */}
            {details?.context && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-white">
                  Context
                </h2>
                <div>{renderBlockContent(details.context)}</div>
              </motion.div>
            )}

            {/* Challenge */}
            {details?.challenge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-white">
                  The Challenge
                </h2>
                <div>{renderBlockContent(details.challenge)}</div>
              </motion.div>
            )}

            {/* Solution */}
            {details?.solution && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-white">
                  The Solution
                </h2>
                <div>{renderBlockContent(details.solution)}</div>
              </motion.div>
            )}

            {/* Results */}
            {details?.results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-white">
                  Results & Impact
                </h2>
                <ul className="space-y-3">
                  {details.results.map((result: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
                      <span className="text-zinc-600 dark:text-slate-400">
                        {parseMarkdown(result)}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Thesis / Research Paper Section */}
            {details?.thesis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="rounded-2xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-8 dark:border-violet-500/30 dark:from-violet-500/10 dark:to-indigo-500/10"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
                    📄 Master&apos;s Thesis
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-slate-400">
                    {details.thesis.institution}
                  </span>
                </div>

                <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
                  {details.thesis.title}
                </h2>

                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-slate-300">
                    Abstract
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-slate-400">
                    {details.thesis.abstract}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-slate-300">
                    Key Contributions
                  </h3>
                  <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {details.thesis.contributions.map(
                      (contribution: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 rounded-xl border border-zinc-100 bg-white p-3 dark:border-slate-700 dark:bg-slate-800"
                        >
                          <span className="mt-0.5 text-violet-500">✓</span>
                          <span className="text-sm text-zinc-700 dark:text-slate-300">
                            {contribution}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={details.thesis.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 font-medium text-white transition-colors hover:bg-violet-700"
                  >
                    📥 Download PDF
                  </a>
                  <a
                    href={details.thesis.thesisUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                  >
                    🔗 View on Repository
                  </a>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="sticky top-8 space-y-6"
            >
              {/* Project Info Card */}
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                <h3 className="mb-4 font-semibold text-zinc-900 dark:text-white">
                  Project Details
                </h3>
                <dl className="space-y-4">
                  {details?.year && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-zinc-400" />
                      <div>
                        <dt className="text-xs text-zinc-500 dark:text-slate-500">
                          Year
                        </dt>
                        <dd className="font-medium text-zinc-900 dark:text-white">
                          {details.year}
                        </dd>
                      </div>
                    </div>
                  )}
                  {details?.duration && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-zinc-400" />
                      <div>
                        <dt className="text-xs text-zinc-500 dark:text-slate-500">
                          Duration
                        </dt>
                        <dd className="font-medium text-zinc-900 dark:text-white">
                          {details.duration}
                        </dd>
                      </div>
                    </div>
                  )}
                  {details?.team && (
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-zinc-400" />
                      <div>
                        <dt className="text-xs text-zinc-500 dark:text-slate-500">
                          Team
                        </dt>
                        <dd className="font-medium text-zinc-900 dark:text-white">
                          {parseMarkdown(details.team)}
                        </dd>
                      </div>
                    </div>
                  )}
                  {details?.role && (
                    <div className="border-t border-zinc-200 pt-3 dark:border-slate-700">
                      <dt className="mb-1 text-xs text-zinc-500 dark:text-slate-500">
                        My Role
                      </dt>
                      <dd className="font-medium text-zinc-900 dark:text-white">
                        {parseMarkdown(details.role)}
                      </dd>
                    </div>
                  )}
                  {details?.client && (
                    <div className="border-t border-zinc-200 pt-3 dark:border-slate-700">
                      <dt className="mb-1 text-xs text-zinc-500 dark:text-slate-500">
                        Client / Sector
                      </dt>
                      <dd className="font-medium text-zinc-900 dark:text-white">
                        {details.client}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Technologies */}
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                <h3 className="mb-4 font-semibold text-zinc-900 dark:text-white">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div
                className={`rounded-2xl bg-gradient-to-br ${project.color} p-6`}
              >
                <h3 className="mb-2 font-semibold text-white">Key Impact</h3>
                <p className="text-lg font-medium text-white/90">
                  {project.impact}
                </p>
              </div>

              {/* CTA */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                >
                  Visit Live Project
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
