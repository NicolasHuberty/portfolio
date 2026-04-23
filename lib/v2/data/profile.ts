export const profile = {
  name: "Nicolas Huberty",
  role: "AI Engineer & Consultant",
  location: "Brussels, BE",
  email: "huberty.nicolas@hotmail.com",
  availability: {
    q2_2026: "booked",
    q3_2026: "2 slots open",
    q4_2026: "3 slots open",
  } as Record<string, string>,
  bio: `AI engineer in Brussels. Two UCLouvain degrees (BSc + MSc in Computer Science). Five years shipping production ML, RAG, and agentic workflows for organisations that need answers — not demos. Currently leading an internal AI practice at UCLouvain; previously at Smals (ONEM) on national-scale data infrastructure for Belgium's employment office.`,
  links: {
    github: "https://github.com/NicolasHuberty",
    linkedin: "https://www.linkedin.com/in/nicolas-huberty/",
    email: "mailto:huberty.nicolas@hotmail.com",
  },
  stack: {
    ai: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "LangChain",
      "LangGraph",
      "OpenAI",
      "Hugging Face",
      "Haystack",
      "scikit-learn",
    ],
    data: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Qdrant",
      "Apache Spark",
      "Kafka",
      "Airflow",
      "dbt",
    ],
    web: [
      "TypeScript",
      "React",
      "Next.js",
      "Nuxt",
      "FastAPI",
      "Flask",
      "Django",
      "Tailwind",
    ],
    cloud: [
      "Docker",
      "Kubernetes",
      "AWS",
      "GCP",
      "Azure",
      "Terraform",
      "GitHub Actions",
    ],
  } as Record<string, string[]>,
  experience: [
    {
      role: "AI Engineer",
      org: "UCLouvain",
      years: "2025 — present",
      type: "work" as const,
      blurb:
        "Leading AI initiatives. Designing RAG systems, fine-tuning LLMs, deploying production AI.",
      tags: ["Azure AI", "RAG", "LLMs", "Python"],
    },
    {
      role: "Data Engineer",
      org: "Smals (ONEM)",
      years: "2024 — 2025",
      type: "work" as const,
      blurb:
        "Built data pipelines and ETL systems for Belgium's national employment office.",
      tags: ["dbt", "SQL", "Python", "ETL"],
    },
    {
      role: "MSc Computer Science",
      org: "UCLouvain",
      years: "2022 — 2024",
      type: "edu" as const,
      blurb:
        "AI, Cybersecurity, Data Science. Thesis: clinical document de-identification.",
      tags: ["AI", "ML", "NER", "Privacy"],
    },
    {
      role: "BSc Computer Science",
      org: "UCLouvain",
      years: "2019 — 2022",
      type: "edu" as const,
      blurb: "Algorithms, data structures, software engineering.",
      tags: ["Algorithms", "Databases", "Systems"],
    },
  ],
}

export type Profile = typeof profile
