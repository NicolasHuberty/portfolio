export type ExperienceType = "work" | "education"

export interface Experience {
    id: string
    type: ExperienceType
    period: string
    title: string
    company: string
    description: string
    technologies: string[]
    logo?: string
    color: string
}

export const experiences: Experience[] = [
    {
        id: "uclouvain-ai",
        type: "work",
        period: "2025 - Present",
        title: "AI Engineer",
        company: "UCLouvain",
        description: "Leading AI initiatives. Designing RAG systems, fine-tuning LLMs, and deploying production AI solutions.",
        technologies: ["Azure AI", "RAG", "LLMs", "Python"],
        logo: "/images/uclouvain-logo.png",
        color: "from-blue-500 to-indigo-600",
    },
    {
        id: "smals",
        type: "work",
        period: "2024 - 2025",
        title: "Data Engineer",
        company: "Smals (ONEM)",
        description: "Built data pipelines and ETL systems for Belgium's national employment office.",
        technologies: ["DBT", "SQL", "Python", "ETL"],
        logo: "/images/smals-logo.webp",
        color: "from-emerald-500 to-teal-600",
    },
    {
        id: "uclouvain-master",
        type: "education",
        period: "2022 - 2024",
        title: "Master's in Computer Science",
        company: "UCLouvain",
        description: "Specialized in AI, Cybersecurity, and Data Science. Thesis on clinical document de-identification.",
        technologies: ["AI", "ML", "NER", "Privacy"],
        logo: "/images/uclouvain-logo.png",
        color: "from-violet-500 to-purple-600",
    },
    {
        id: "uclouvain-bachelor",
        type: "education",
        period: "2019 - 2022",
        title: "Bachelor's in Computer Science",
        company: "UCLouvain",
        description: "Strong foundation in algorithms, data structures, and software engineering.",
        technologies: ["Algorithms", "Databases", "Systems"],
        logo: "/images/uclouvain-logo.png",
        color: "from-cyan-500 to-blue-600",
    },
]

// Extended details for each experience
export const experienceDetails: Record<string, {
    duration: string
    role: string
    location: string
    overview: string
    responsibilities: string[]
    achievements: string[]
    skills: string[]
    learnings: string[]
    gallery?: string[]
    programLink?: string
}> = {
    "uclouvain-ai": {
        duration: "Ongoing",
        role: "AI Technical Lead",
        location: "Louvain-la-Neuve, Belgium",
        overview: "As the **AI Technical Lead**, I manage the university's central AI initiative from conception to deployment. I collaborate extensively with **Research Centers (Labs)**, **Technical Teams**, and **Communication Departments** to ensure our AI strategy aligns with both scientific rigor and institutional needs. My goal is to build a **Sovereign, Model-Agnostic Infrastructure** that empowers the entire academic community without relying on any single provider.",
        responsibilities: [
            "**Managed the full project lifecycle**, coordinating between developers, researchers, and stakeholders",
            "Collaborated with **Research Centers** to translate complex scientific requirements into technical features",
            "Architected a **Model-Agnostic Platform** ensuring flexibility and preventing vendor lock-in",
            "Implemented **Sovereign RAG pipelines** to safely connect AI with sensitive proprietary data",
            "Led cross-functional meetings with **Communication teams** to ensure proper adoption",
        ],
        achievements: [
            "Successfully unified AI access for the university, managing diverse stakeholder expectations",
            "Established a collaborative ecosystem connecting Labs, IT, and Administration",
            "Delivered a production-grade infrastructure that scales with the university's needs",
            "Democratized access to advanced AI capabilities while maintaining strict data governance",
        ],
        skills: ["Technical Leadership", "Project Management", "Stakeholder Management", "Sovereign AI", "System Design", "RAG"],
        learnings: [
            "Managing the intersection of cutting-edge technology and large-scale organizational needs",
            "The importance of aligning technical execution with communication strategy",
            "Bridging the gap between academic research goals and production engineering",
            "Leading diverse teams towards a unified digital transformation vision",
        ],
    },
    "smals": {
        duration: "1 year",
        role: "Data Engineer",
        location: "Brussels, Belgium",
        overview: "At Smals, I engineered the critical data infrastructure for Belgium's national employment office (ONEM). My core focus was implementing a robust **Data Vault** architecture to handle complex historical data and automating massive ETL pipelines. I bridged the gap between raw data and actionable insights, delivering both the backend engineering (Airflow/DBT) and frontend reporting (Power BI).",
        responsibilities: [
            "Designed and implemented high-volume **ETL pipelines** using **Apache Airflow** and **Python**",
            "Modeled complex government data using the **Data Vault** methodology for historical tracking",
            "Wrote and optimized complex **SQL** transformations for large-scale data processing",
            "Managed data transformation logic with **DBT** (Data Build Tool)",
            "Created interactive **Power BI** dashboards and reports for business stakeholders",
        ],
        achievements: [
            "Successfully operationalized the Data Vault model for tracking employment history",
            "Automated daily reporting workflows reducing manual effort by 100%",
            "Optimized critical SQL queries reducing execution time by 40%",
            "Established a reliable Data Quality framework catching 99% of anomalies",
        ],
        skills: ["Data Vault", "Apache Airflow", "DBT", "Advanced SQL", "Python", "Power BI", "PostgreSQL"],
        learnings: [
            "The rigor required for managing national-scale government data",
            "Implementing Data Vault for auditability and historical accuracy",
            "Orchestrating complex dependencies in distributed data flows",
            "Translating technical data models into clear business reports",
        ],
    },
    "uclouvain-master": {
        duration: "2 years",
        role: "Graduate Student",
        location: "Louvain-la-Neuve, Belgium",
        programLink: "https://uclouvain.be/prog-2025-sinf2m",
        overview: "Graduated with **Distinction**. I chose the unique combination of **AI and Cybersecurity** with a clear goal: to be able to build not just 'smart' systems, but **enterprise-grade, GDPR-compliant, and sovereign AI solutions**. In a world where data privacy is paramount, this dual expertise allows me to deploy AI that respects strict regulatory frameworks and security standards by design.",
        responsibilities: [
            "AI Specialization: Computational Linguistics (LINFO2263), Constraint Programming (LINFO2365), Mining Patterns (LINFO2364)",
            "Cybersecurity Specialization: Privacy Enhancing Tech (LELEC2770), Secured Systems Engineering (LINFO2144), Computer System Security (LINFO2347)",
            "Master Thesis (ILA): 'Clinical Document De-identification' under Prof. Sébastien Jodogne. (See ILA Project for details)",
            "Core Engineering: Cloud Computing (LINFO2145), Architecture & Performance (LINFO2241)",
        ],
        achievements: [
            "Achieved Distinction grade for the Master's degree",
            "Thesis on [ILA (Clinical NER)](/projects/ila) directly addressed sovereign data privacy challenges",
            "Learned to conceive systems where Security is a foundational requirement, not an afterthought",
            "Bridged the gap between powerful LLMs and strict compliance requirements (RGPD)",
        ],
        skills: ["Deep Learning", "NLP", "GDPR/RGPD", "Sovereign AI", "Privacy Engineering", "Secure Architecture"],
        learnings: [
            "Security must be integrated at the conception phase ('Security by Design')",
            "How to build AI systems that are transparent, compliant, and production-ready",
            "The critical importance of data sovereignty in modern European tech",
            "Rigorous evaluation of ML models in safety-critical contexts",
        ],
    },
    "uclouvain-bachelor": {
        duration: "3 years",
        role: "Undergraduate Student",
        location: "Louvain-la-Neuve, Belgium",
        programLink: "https://uclouvain.be/prog-2025-sinf1ba",
        overview: "My Bachelor's in Computer Science provided a rigorous technical foundation, which I chose to supplement with a Minor in Entrepreneurship (Esprit d'Entreprendre). This unique combination allowed me to bridge the gap between technical implementation and business value. While the core curriculum gave me the tools to build complex systems, the entrepreneurship minor taught me to identify client needs deeply. It shifted my mindset from 'how do I code this?' to 'what problem are we actually solving?', ensuring I build useful, insightful projects linked to real-world challenges.",
        responsibilities: [
            "Core AI & Algorithms: Artificial Intelligence (LINFO1361), Computability (LINFO1123), Algorithmic Structures (LINFO1121)",
            "Systems & Security: Computer System Security (LINFO2347), Computer Systems (LINFO1252), Networks",
            "Software Engineering: Completed 4 intensive full-stack projects (LINFO1001-1002, LEPL1503-1509)",
            "Entrepreneurship Minor: Applied lean startup principles to validate business ideas and understand market fit",
        ],
        achievements: [
            "Combined technical excellence with business strategy through the Entrepreneurship Minor",
            "Developed multiple end-to-end applications solving concrete problems",
            "Mastered the full software lifecycle from requirements gathering to deployment",
            "Built a strong foundation in both low-level systems and high-level application design",
        ],
        skills: ["Algorithms", "Software Architecture", "System Security", "Entrepreneurship", "Client Analysis", "Java/Python"],
        learnings: [
            "The importance of validating the 'Why' before building the 'How'",
            "How to explore and define problem spaces before writing code",
            "Translating client needs into technical specifications",
            "Deploying understanding of user needs to develop useful products",
        ],
    },
}
