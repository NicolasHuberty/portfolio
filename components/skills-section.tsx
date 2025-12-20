"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
    Brain,
    Database,
    Workflow,
    MessageSquare,
    FileSearch,
    Cloud,
    Search,
    Rocket,
    Cog,
    Sparkles,
    ArrowRight,
    Cpu,
    Code2,
    Layers,
    Network,
} from "lucide-react"
import Image from "next/image"

const services = [
    {
        icon: Workflow,
        title: "Automate Operations",
        description: "Cut operational costs by deploying AI agents to handle repetitive tasks—emails, data entry, and customer support—24/7.",
        items: ["Invoice Processing", "Auto-Draft Emails", "Support Chatbots", "Workflow Automation"],
        color: "from-orange-500 to-amber-600",
        span: "md:col-span-2",
    },
    {
        icon: Brain,
        title: "Instant Answers (RAG)",
        description: "Stop searching for files. Chat directly with your company's documents, policies, and data to get cited answers instantly.",
        items: ["Legal Research", "HR Policies", "Technical Docs"],
        color: "from-violet-500 to-purple-600",
        span: "md:col-span-1",
    },
    {
        icon: Rocket,
        title: "Build Your Product",
        description: "Launch your custom SaaS platform or internal tool. Enterprise-grade quality, secure, and built to scale.",
        items: ["Client Portals", "SaaS MVP", "Booking Systems"],
        color: "from-blue-500 to-indigo-600",
        span: "md:col-span-1",
    },
    {
        icon: Search,
        title: "Data & Insights",
        description: "Turn raw data into clear dashboards. Understand your metrics and make data-driven decisions without spreadsheets.",
        items: ["Sales Dashboards", "Customer Churn", "Performance Metrics"],
        color: "from-emerald-500 to-teal-600",
        span: "md:col-span-2",
    },
]

// Tech stack with icons (using devicon CDN)
const techStack = [
    {
        category: "AI & ML",
        icon: Brain,
        color: "violet",
        items: [
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
            { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
            { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
            { name: "OpenAI", icon: "/icons/openai.svg" },
            { name: "LangChain", icon: "/icons/langchain.svg" },
            { name: "LangGraph", icon: "/icons/langgraph.svg" },
            { name: "Hugging Face", icon: "/icons/huggingface.svg" },
            { name: "Haystack", icon: "/icons/haystack.svg" },
            { name: "scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
            { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
            { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
            { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg" },
        ]
    },
    {
        category: "Data",
        icon: Database,
        color: "cyan",
        items: [
            { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
            { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
            { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
            { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg" },
            { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
            { name: "Apache Spark", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg" },
            { name: "Kafka", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg" },
            { name: "Airflow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apacheairflow/apacheairflow-original.svg" },
            { name: "dbt", icon: "/icons/dbt.svg" },
            { name: "Grafana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg" },
        ]
    },
    {
        category: "Web & Backend",
        icon: Code2,
        color: "emerald",
        items: [
            { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
            { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
            { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
            { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
            { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
            { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" },
            { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" },
            { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
            { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
        ]
    },
    {
        category: "Cloud & DevOps",
        icon: Layers,
        color: "orange",
        items: [
            { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
            { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg" },
            { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
            { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
            { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
            { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg" },
            { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg" },
            { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
            { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" },
            { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        ]
    },
]

export default function ServicesSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} id="services" className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        Services
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-white mb-3 tracking-tight">
                        How I Can Help
                    </h2>
                    <p className="text-zinc-500 dark:text-slate-400 max-w-xl mx-auto">
                        End-to-end solutions from strategy to production
                    </p>
                </motion.div>

                {/* Services - Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className={`group relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-slate-800 bg-zinc-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-xl hover:border-zinc-300 dark:hover:border-slate-600 transition-all duration-300 ${service.span}`}
                        >
                            <div className="relative z-10 p-8 h-full flex flex-col">
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <service.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-white/0 dark:from-white/5 dark:to-white/0 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                                </div>

                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                                    {service.title}
                                </h3>

                                <p className="text-zinc-600 dark:text-slate-400 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="mt-auto flex flex-wrap gap-2">
                                    {service.items.map((item) => (
                                        <span
                                            key={item}
                                            className="px-3 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 text-zinc-600 dark:text-slate-300"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tech Stack with Icons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <Network className="w-5 h-5 text-indigo-500" />
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                            Tech Stack
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {techStack.map((stack, stackIndex) => {
                            const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
                                violet: {
                                    bg: "bg-violet-50 dark:bg-violet-500/10",
                                    border: "border-violet-200 dark:border-violet-500/30",
                                    text: "text-violet-600 dark:text-violet-400"
                                },
                                cyan: {
                                    bg: "bg-cyan-50 dark:bg-cyan-500/10",
                                    border: "border-cyan-200 dark:border-cyan-500/30",
                                    text: "text-cyan-600 dark:text-cyan-400"
                                },
                                emerald: {
                                    bg: "bg-emerald-50 dark:bg-emerald-500/10",
                                    border: "border-emerald-200 dark:border-emerald-500/30",
                                    text: "text-emerald-600 dark:text-emerald-400"
                                },
                                orange: {
                                    bg: "bg-orange-50 dark:bg-orange-500/10",
                                    border: "border-orange-200 dark:border-orange-500/30",
                                    text: "text-orange-600 dark:text-orange-400"
                                },
                            }
                            const colors = colorClasses[stack.color]

                            return (
                                <motion.div
                                    key={stack.category}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.4 + stackIndex * 0.1 }}
                                    className={`p-5 rounded-2xl border ${colors.border} ${colors.bg}`}
                                >
                                    {/* Category Header */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <stack.icon className={`w-5 h-5 ${colors.text}`} />
                                        <span className={`text-sm font-bold uppercase tracking-wide ${colors.text}`}>
                                            {stack.category}
                                        </span>
                                    </div>

                                    {/* Tech Items with Icons */}
                                    <div className="grid grid-cols-2 gap-2">
                                        {stack.items.map((item, itemIndex) => (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                                transition={{ duration: 0.3, delay: 0.5 + stackIndex * 0.1 + itemIndex * 0.03 }}
                                                className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-zinc-100 dark:border-slate-700 hover:shadow-md hover:scale-105 transition-all duration-200"
                                            >
                                                <div className="w-5 h-5 relative flex-shrink-0">
                                                    <Image
                                                        src={item.icon}
                                                        alt={item.name}
                                                        width={20}
                                                        height={20}
                                                        className="w-full h-full object-contain"
                                                        unoptimized
                                                    />
                                                </div>
                                                <span className="text-xs font-medium text-zinc-700 dark:text-slate-300 truncate">
                                                    {item.name}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Process - Minimal Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0"
                >
                    {[
                        { step: "1", label: "Discover", icon: Search },
                        { step: "2", label: "Design", icon: Cpu },
                        { step: "3", label: "Build", icon: Cog },
                        { step: "4", label: "Deploy", icon: Rocket },
                    ].map((item, index) => (
                        <div key={item.step} className="flex items-center">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
                                <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center font-bold">
                                    {item.step}
                                </span>
                                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                    {item.label}
                                </span>
                            </div>
                            {index < 3 && (
                                <ArrowRight className="hidden md:block w-4 h-4 mx-2 text-zinc-300 dark:text-slate-600" />
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
