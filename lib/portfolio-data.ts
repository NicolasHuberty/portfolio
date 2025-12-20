export const personalInfo = {
  name: "Nicolas Huberty",
  title: "AI Engineer & Freelance Developer",
  tagline: "Building intelligent systems that make professional work faster, smarter, and more human",
  description: "I design, develop, and deploy AI-driven platforms that blend automation, generative intelligence, and seamless user experiences — mainly for the legal and medical industries.",
  email: "huberty.nicolas@hotmail.com", // Update this
  linkedin: "https://linkedin.com/in/nicolas-huberty", // Update this
  github: "https://github.com/NicolasHuberty", // Update this
  location: "Belgium"
}

export const education = {
  bachelor: {
    degree: "Bachelor's degree in Computer Science",
    institution: "UCLouvain",
    location: "Belgium",
    years: "2019–2022"
  },
  master: {
    degree: "Master's degree in Computer Science",
    specialization: "Artificial Intelligence, Cybersecurity, and Data Science",
    institution: "UCLouvain",
    location: "Belgium",
    years: "2022–2024",
    thesis: {
      title: "De-identification of Clinical Documents",
      description: "Focused on optimizing clinical data anonymization using fine-tuned LLMs (BERT-based models) for Named Entity Recognition (NER). Explored architecture modification, weight fine-tuning, and incremental learning approaches to enhance performance on domain-specific datasets.",
      outcome: "Created ILA – Incremental Learning Annotator, demonstrating that fine-tuning models locally (per institution) significantly outperforms multi-hospital centralized models. After annotating just 50 documents, models achieved high performance."
    }
  }
}

export const experience = [
  {
    id: "uclouvain",
    role: "AI Engineer",
    company: "UCLouvain",
    period: "Current",
    type: "Full-time",
    description: "Leading AI initiatives at UCLouvain, managing all generative AI, automation, and data-driven projects within the university. Designing and deploying AI systems that integrate Azure, RAG architectures, fine-tuned LLMs, and embedding-based search to streamline administrative and academic workflows.",
    responsibilities: [
      "Technical leadership of AI projects",
      "Strategic direction for AI initiatives",
      "Hands-on engineering of cutting-edge AI solutions",
      "Integration of generative AI systems"
    ],
    technologies: ["Azure", "Generative AI", "RAGs", "Fine-tuning", "Embeddings", "AI Systems Integration"]
  },
  {
    id: "smals",
    role: "Data Engineer",
    company: "Smals (ONEM)",
    period: "Previous",
    type: "Full-time",
    description: "Worked as a Data Engineer for Belgium's national employment office (ONEM). Focused on on-premise data infrastructure, building pipelines using DBT, Volspeed, and SQL/MySQL.",
    responsibilities: [
      "ETL optimization",
      "Data modeling",
      "Pipeline automation for large-scale governmental systems",
      "On-premise infrastructure management"
    ],
    technologies: ["DBT", "Volspeed", "MySQL", "SQL", "On-prem Infrastructure"]
  },
  {
    id: "freelance",
    role: "Freelance Engineer",
    company: "Independent",
    period: "Ongoing",
    type: "Freelance",
    description: "Helping companies implement AI and digital transformation solutions. Designing automation systems, building intelligent assistants, and integrating AI into existing business tools.",
    responsibilities: [
      "AI engineering and implementation",
      "Automation system design",
      "Integration with Odoo and internal dashboards",
      "Custom SaaS platform development"
    ],
    technologies: ["AI Engineering", "Automation", "Infrastructure", "Digital Transformation"]
  }
]

export const projects = [
  {
    id: "ila",
    title: "ILA – Incremental Learning Annotator",
    category: "AI Research",
    description: "Born from my Master's thesis, ILA is an AI tool for medical data anonymization. It demonstrates that fine-tuning LLMs locally with a small dataset (around 50 documents) can achieve outstanding results, outperforming cross-hospital training setups.",
    longDescription: "ILA combines Named Entity Recognition, incremental learning, and transfer learning for real-world, privacy-preserving applications in medical data anonymization.",
    technologies: ["Python", "BERT", "Transformers", "NER", "Incremental Learning"],
    link: null,
    github: null,
    featured: true
  },
  {
    id: "datanest",
    title: "DataNest",
    category: "SaaS Platform",
    description: "A full AI-powered SaaS platform for law firms, centralizing all their daily operations: email management, invoicing, contacts, case tracking, scheduling, and document automation.",
    longDescription: "DataNest integrates Nestor, a voice-based AI assistant capable of executing tasks within the platform — such as encoding time entries, creating events, drafting emails, and retrieving case information — simply through voice commands. Goal: Automate repetitive administrative tasks for lawyers using intelligent, context-aware agents.",
    technologies: ["Node.js", "Nuxt", "Azure", "OpenAI", "LangChain", "PostgreSQL", "Voice Assistant APIs"],
    link: "https://datanest.be",
    github: null,
    featured: true
  },
  {
    id: "emate",
    title: "eMate",
    category: "Legal AI",
    description: "An agentic RAG (Retrieval-Augmented Generation) platform designed for lawyers. It can process and analyze doctrine, jurisprudence, and legal documents, and answer case-based queries with detailed, sourced explanations.",
    longDescription: "This project applies LLMs in real-world professional contexts, ensuring both accuracy and explainability for legal research and case analysis.",
    technologies: ["Python", "LLM Agents", "RAG", "Vector Databases", "LangChain"],
    link: null,
    github: null,
    featured: true
  },
  {
    id: "docuralis",
    title: "Docuralis",
    category: "Document AI",
    description: "A RAG-based AI assistant that integrates with OneDrive, SharePoint, and Google Drive to create intelligent search and reasoning over private or professional documents.",
    longDescription: "Exists in two versions: Public version for personal/business documents, and Pro/Enterprise version with preconfigured domain-specific AI agents for medical, legal, and other professional fields. For example, in the medical version, a doctor can input patient parameters and ask for optimal treatment based on verified clinical data.",
    technologies: ["RAG", "LangChain", "Azure", "LLMs", "Vector Search", "Multi-tenant AI Architecture"],
    link: "https://docuralis.com",
    github: null,
    featured: true
  },
  {
    id: "swet",
    title: "SWET",
    category: "Digital Transformation",
    description: "For the Belgian hot sauce company SWET, I developed and deployed a complete digital automation system as a freelance engineer.",
    longDescription: "Using Odoo and custom automations, I digitalized and optimized their invoicing, order management, and shipment workflows, enabling fully automated operations.",
    technologies: ["Odoo", "Python", "Automation APIs", "PostgreSQL", "Self-hosted Infrastructure"],
    link: null,
    github: null,
    featured: false
  },
  {
    id: "infrastructure",
    title: "Infrastructure & DevOps",
    category: "Infrastructure",
    description: "Private infrastructure cluster using Kubernetes (K8S and K3S) for hosting my own services and clients' applications.",
    longDescription: "Includes GitLab CI/CD, ArgoCD, and automated deployment pipelines, ensuring scalable and cost-efficient hosting for all projects.",
    technologies: ["Kubernetes", "GitLab CI/CD", "ArgoCD", "Docker", "Azure", "Linux Administration"],
    link: null,
    github: null,
    featured: false
  }
]

export const skills = {
  ai: {
    title: "Artificial Intelligence",
    items: [
      "LLMs (training, fine-tuning, evaluation)",
      "RAG systems & vector databases",
      "Embedding generation & retrieval",
      "Named Entity Recognition (NER)",
      "Incremental & transfer learning",
      "AI agent design and orchestration"
    ]
  },
  programming: {
    title: "Programming Languages",
    items: ["Python", "Rust", "C", "Java", "Swift", "Node.js"]
  },
  frameworks: {
    title: "Frameworks & Frontend",
    items: ["React", "Svelte", "Nuxt", "OutSystems", "Drupal", "Odoo"]
  },
  devops: {
    title: "DevOps & Cloud",
    items: ["Azure", "Kubernetes (K8S/K3S)", "Docker", "GitLab CI/CD", "ArgoCD"]
  },
  data: {
    title: "Data & Backend",
    items: ["MySQL", "SQL", "DBT", "Volspeed", "REST APIs", "ETL pipelines"]
  },
  other: {
    title: "Other Competencies",
    items: [
      "Digital transformation consulting",
      "Full-stack AI SaaS development",
      "Automation architecture & integration",
      "Voice assistant integration",
      "Secure and privacy-preserving AI systems"
    ]
  }
}

export const quote = "I believe AI should make professionals faster, not replace them — technology should empower, not overwhelm."
