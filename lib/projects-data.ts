export type ProjectStatus = "online" | "archived"

export interface Project {
    id: string
    title: string
    subtitle: string
    category: string
    description: string
    impact: string
    status: ProjectStatus
    logo?: string
    screenshots: string[]
    technologies: string[]
    link?: string
    featured: boolean
    color: string
}

export const projects: Project[] = [
    {
        id: "emate",
        title: "eMate",
        subtitle: "Intelligent Legal Research",
        category: "Legal Research",
        description: "Intelligent legal research platform, powered by **Smart Agents**, analyzing **all legal sources** (doctrine, jurisprudence, legislation) to answer case-based queries with sourced explanations.",
        impact: "Research time reduced from hours to minutes",
        status: "online",
        logo: "/images/emate-logo.png",
        screenshots: ["/images/emate.png"],
        technologies: ["Nuxt UI", "Docker", "Python", "Qdrant"],
        link: "https://emate.be",
        featured: true,
        color: "from-blue-500 to-indigo-600",
    },
    {
        id: "swet",
        title: "SWET",
        subtitle: "Odoo ERP Implementation",
        category: "Business Automation",
        description: "Ongoing custom **Odoo** implementation and maintenance for a **Brussels-based artisanal hot sauce producer**. Deployed on **Odoo.sh** with specific custom models to streamline **production and distribution**.",
        impact: "Streamlined distribution operations via custom ERP",
        status: "online",
        logo: "/images/swet-logo.png",
        screenshots: ["/images/swet.png"],
        technologies: ["Odoo", "Python", "Odoo.sh", "PostgreSQL"],
        link: "https://www.swet.be",
        featured: true,
        color: "from-emerald-500 to-teal-600",
    },
    {
        id: "docuralis",
        title: "Docuralis",
        subtitle: "Agentic AI Platform",
        category: "Agentic AI",
        description: "Advanced **Agentic AI platform** extending beyond RAG. It uses **MCP (Model Context Protocol)**, **Web Search**, and **API integrations** to access public/private data, creating **domain-specific agents** for complex reasoning.",
        impact: "Enables autonomous multi-source reasoning",
        status: "online",
        logo: "/images/docuralis-logo.png",
        screenshots: ["/images/docuralis.png"],
        technologies: ["Python", "LangChain", "MCP", "Agentic AI"],
        link: "https://docuralis.com",
        featured: true,
        color: "from-cyan-500 to-blue-600",
    },
    {
        id: "datanest",
        title: "DataNest",
        subtitle: "Law Firm Practice Management",
        category: "Legal Tech",
        description: "Complete **Sovereign Practice Management** platform for law firms. Centralizes emails, documents, dossiers, and accounting. Built on **Kubernetes** in a secure European cloud.",
        impact: "Unified workspace for legal professionals",
        status: "archived",
        logo: "/images/datanest-logo.png",
        screenshots: ["/images/datanest.png"],
        technologies: ["Nuxt 3", "FastAPI", "Kubernetes", "PostgreSQL"],
        featured: true,
        color: "from-violet-500 to-purple-600",
    },
    {
        id: "ila",
        title: "ILA",
        subtitle: "Clinical Data Anonymization",
        category: "Healthcare AI",
        description: "AI system for medical data de-identification using fine-tuned language models. Enables privacy-compliant processing of clinical documents.",
        impact: "Privacy-compliant healthcare data processing",
        status: "archived",
        screenshots: ["/images/ila.png"],
        technologies: ["Fine-tuned LLMs", "NER", "Healthcare", "Privacy"],
        link: "https://youtu.be/PJTIBT_-VHk",
        featured: false,
        color: "from-rose-500 to-pink-600",
    },
    {
        id: "infrastructure",
        title: "Private Cloud",
        subtitle: "Enterprise Infrastructure",
        category: "DevOps",
        description: "Enterprise-grade Kubernetes infrastructure with automated CI/CD pipelines and GitOps deployment for all my projects.",
        impact: "99.9% uptime for hosted services",
        status: "online",
        screenshots: [],
        technologies: ["Kubernetes", "Terraform", "GitOps", "CI/CD"],
        featured: false,
        color: "from-orange-500 to-amber-600",
    },
]
