export type Project = {
  title: string;
  description: string;
  tech: string[];
  links?: {
    github?: string;
    live?: string;
  };
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  url?: string;
  work?: string[];
};

export const site: {
  name: string;
  role: string;
  location: string;
  tagline: string;
  about: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
  };
  experience: Experience[];
  skills: string[];
  projects: Project[];
  githubUsername: string;
} = {
  name: "Shreyas Nikam",
  role: "Developer",
  location: "India",
  tagline: "I build clean, fast web experiences and AI agents.",
  about:
    "I’m a developer who enjoys building AI agents and shipping minimal, thoughtful web experiences. I like working across the stack, focusing on UX, performance, and maintainable code.",
  email: "nikamshreyas565@gmail.com",
  socials: {
    github: "https://github.com/dafto1",
    linkedin: "https://www.linkedin.com/in/shreyas-nikam-b9685b289/",
  },
  experience: [
    {
      company: "ikione",
      role: "Software Developer Intern",
      period: "Jan 2025 – May 2025",
      location: "India",
      url: "https://www.linkedin.com/company/ikionesystems/",
      work: [
        "Built a notes classification system using CNNs to automatically categorize content across an existing bank notes marketplace.",
        "Developed an automated workflow that converts financial documents and reports into interactive video reports, streamlining data presentation for end users.",
      ],
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "Git",
  ],
  projects: [
    {
      title: "Utility",
      description: "A premium, minimalist academic workspace designed for university students. Built with Next.js 15, Supabase, and advanced AI integration to transform how students interact with their study materials. In collaboration with [Aryan Dani](https://www.aryandani.com/).",
      tech: ["Next.js", "Supabase", "Tailwind CSS"],
      links: { github: "https://github.com/aryan-dani/Utility" },
    },
    {
      title: "Scribe",
      description: "An agentic AI research assistant that autonomously searches the web, reads pages & PDFs, generates visual diagrams, and delivers structured, cited answers.",
      tech: ["React", "Node.js"],
      links: { github: "https://github.com/dafto1/Scribe" },
    },
    {
      title: "Fraud Lens",
      description: "AI-based fraud transaction detection system using FastAPI backend and Next.js frontend with XGBoost machine learning algorithm.",
      tech: ["Next.js", "FastAPI", "Python"],
      links: { github: "https://github.com/dafto1/fraud-lens/tree/master" },
    },
    {
      title: "PoseFlow",
      description: "An exercise monitoring system based on MediaPipe and OpenCV.",
      tech: ["Python"],
      links: { github: "https://github.com/OpenFlo/PoseFlow" },
    },
  ],
  githubUsername:
    process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "dafto1",
};

