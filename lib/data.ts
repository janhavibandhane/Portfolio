export const profile = {
  name: "Janhavi Bandhane",
  firstName: "JANHAVI",
  role: "Full Stack Developer",
  location: "Mumbai, India",
  email: "janhavibandhane@email.com",
  github: "https://github.com/janhavibandhane",
  linkedin: "https://www.linkedin.com/in/janhavi-bandhane-b6362b255",
  leetcode: "https://leetcode.com/u/janhavibandhane/",
};

export const bio = [
  "I'm a developer based in Mumbai who enjoys turning complex requirements into clean, responsive interfaces.",
  "I work mostly in React.js and Next.js, with Express.js and MongoDB on the backend and React Native basics for mobile.",
];

// "Files" on the desktop: each opens a window (see components/Windows.tsx). `key` is the keyboard shortcut.
export const apps = [
  { id: "projects", n: "01", key: "1", file: "projects.vol", label: "Projects", desc: "the projects" },
  { id: "experience", n: "02", key: "2", file: "career.log", label: "Experience", desc: "the résumé" },
  { id: "profile", n: "03", key: "3", file: "profile.sys", label: "Profile", desc: "the profile" },
  { id: "contact", n: "04", key: "4", file: "contact.app", label: "Contact", desc: "write to me" },
] as const;

export type AppId = (typeof apps)[number]["id"];

export const stats = [
  { value: "3", label: "Companies" },
  { value: "5", label: "Projects shipped" },
  { value: "8+", label: "Technologies" },
];

export type Skill = { name: string; level: "Expert" | "Advanced" | "Intermediate"; group: string };

export const skills: Skill[] = [
  { name: "Tailwind CSS", level: "Expert", group: "Frontend" },
  { name: "React.js", level: "Advanced", group: "Frontend" },
  { name: "Next.js", level: "Advanced", group: "Frontend" },
  { name: "JavaScript", level: "Advanced", group: "Language" },
  { name: "React Native", level: "Intermediate", group: "Mobile" },
  { name: "Node.js", level: "Intermediate", group: "Backend" },
  { name: "Express.js", level: "Intermediate", group: "Backend" },
  { name: "MongoDB", level: "Intermediate", group: "Database" },
];

export const levelValue = { Expert: 95, Advanced: 85, Intermediate: 65 } as const;

export const marquee = [
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "React Native",
  "REST APIs",
  "ERP Systems",
];

export const experience = [
  {
    role: "Full Stack Developer",
    company: "Yanisa",
    period: "Jul 2026 — Present",
    meta: "Full-time",
    current: true,
    points: ["Building the Yanisa HRMS web app with Next.js."],
    tech: ["Next.js", "React.js", "Tailwind CSS"],
  },
  {
    role: "Frontend Developer",
    company: "LNV Digital System",
    period: "Apr 2025 — May 2026",
    meta: "Full-time · On-site",
    current: false,
    points: [
      "Built ERP system modules with Next.js and React.js.",
      "Implemented responsive, performant UIs with Next.js and Tailwind CSS.",
      "Collaborated with cross-functional teams on ERP modules and features.",
      "Picked up React Native for mobile development.",
      "Contributed to code optimization and best practices.",
    ],
    tech: ["Next.js", "React.js", "React Native", "Tailwind CSS"],
  },
  {
    role: "Web Developer",
    company: "Adecho Technologies",
    period: "Dec 2023 — Dec 2024",
    meta: "Full-time · Remote",
    current: false,
    points: [
      "Developed full-stack web apps with React.js, Express.js and MongoDB.",
      "Built responsive, dynamic UIs with React.js and Tailwind CSS.",
      "Designed and implemented RESTful APIs with Express.js.",
      "Handled MongoDB database design, queries and data modeling.",
      "Delivered features with the team in an agile environment.",
    ],
    tech: ["React.js", "Express.js", "MongoDB", "Tailwind CSS"],
  },
];

export const projects = [
  {
    file: "adecho-site.app",
    title: "Adecho Technologies Website",
    kind: "Corporate website",
    description: "A corporate website built with React and modern UI/UX principles.",
    tech: ["React.js", "Tailwind CSS"],
    href: null as string | null,
  },
  {
    file: "700-form.app",
    title: "700 Form Application",
    kind: "Form management",
    description: "A form management system with dynamic fields and validation.",
    tech: ["React.js", "Express.js", "MongoDB"],
    href: null as string | null,
  },
  {
    file: "avayaan-infra.app",
    title: "Avayaan Infra-Structure",
    kind: "Infrastructure platform",
    description:
      "An infrastructure management platform for construction and real estate projects.",
    tech: ["React.js", "Tailwind CSS"],
    href: "https://github.com/VAPStechnology/AvayaanInfra-Structure" as string | null,
  },
];
