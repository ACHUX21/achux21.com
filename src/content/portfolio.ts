export type Social = { label: string; url: string };
export type ProjectLink = { label: string; url: string };

export type Project = {
  num: string;
  title: string;
  tagline: string;
  desc: string;
  stack: string[];
  status: string;
  peek: string[];
};

export type SkillCategory = {
  icon: string;
  head: string;
  title: string;
  items: { name: string; level: number }[];
};

export type ExperienceEntry = {
  date: string;
  status?: string;
  role: string;
  org: string;
  desc: string;
  stack: string[];
};

export type EducationEntry = {
  title: string;
  meta: string;
  sub: string;
};

export type CertEntry = {
  title: string;
  meta: string;
  sub: string;
};

export type LangEntry = {
  name: string;
  level: number;
};

export type TrophyData = {
  rank: string;
  count: string;
  suffix: string;
  label: string;
  sub: string;
};

export type PortfolioContent = {
  identity: {
    fullName: string;
    handle: string;
    title: string;
    location: string;
    email: string;
    statusLines: string[];
  };
  trophies: TrophyData[];
  about: {
    paragraphs: string[];
    profile: Record<string, string>;
  };
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certs: CertEntry[];
  langs: LangEntry[];
  projects: Project[];
  skills: SkillCategory[];
  contact: {
    meta: Record<string, string>;
  };
};

export const portfolio: PortfolioContent = {
  identity: {
    fullName: "ACHRAF OUAZZANI CHAHIDI",
    handle: "achux21",
    title: "AI Security Engineer",
    location: "Dalian · CN",
    email: "21@achux21.com",
    statusLines: [
      "auditing model weight provenance chains",
      "fuzzing a parser written at 03:14 last tuesday",
      "tracing supply-chain artifacts back to origin",
      "reading CVE-2025-* over coffee",
    ],
  },

  trophies: [
    {
      rank: "1ST PLACE",
      count: "3",
      suffix: "×",
      label: "International CTF wins",
      sub: "MCSCv12 · IDEHv6 · AISEC 2025",
    },
    {
      rank: "CERTIFIED",
      count: "2",
      suffix: "+",
      label: "Active certifications",
      sub: "eJPTv2 · Cisco Networking Academy",
    },
    {
      rank: "DISCLOSED",
      count: "03",
      suffix: "",
      label: "Responsibly reported (prelim)",
      sub: "Python · HTTP · supply-chain",
    },
  ],

  about: {
    paragraphs: [
      "I'm a cybersecurity student splitting time between <mark>offensive research</mark> on web exploitation and the systems plumbing that lets attacks scale. Most weeks I'm reading parser code, the rest I'm writing it.",
      "Lately: AI-assisted security tooling, static analysis for supply-chain risk, and CTF challenge authoring. I publish what's safe to publish.",
    ],
    profile: {
      Role: "AI Security Student",
      Studying: "B.Sc. — CS @ DLU",
      Based: "Dalian, China",
      Status: "Open to intern · 2026",
      Stack: "Python · C · Go · Bash",
      Github: "@ACHUX21",
      Email: "21@achux21.com",
    },
  },

  experience: [
    {
      date: "2025 — PRESENT",
      status: "current",
      role: "Junior Penetration Tester",
      org: "Swift IT · Casablanca",
      desc: "Performed authorized web and systems assessments with a focus on validating exploitable behavior and producing clear technical reporting.",
      stack: ["Python", "Burp Suite", "SQLi", "XSS"],
    },
    {
      date: "2024 — 2025",
      role: "Cybersecurity Intern",
      org: "Independent / CTF Research",
      desc: "Disclosed issues across web applications. Co-authored CTF challenges. Built a Python tool to automate detection of HTTP request smuggling behavior during assessments.",
      stack: ["Python", "Nmap", "ffuf", "CTF"],
    },
    {
      date: "2023 — 2024",
      role: "Technician — Cybersecurity",
      org: "ISM Cybersecurity Program",
      desc: "Completed hands-on coursework in network security, Linux administration, and ethical hacking. Built foundational skills in vulnerability assessment and penetration testing.",
      stack: ["Linux", "Networking", "OWASP", "Metasploit"],
    },
  ],

  education: [
    { title: "B.Sc. Computer Science", meta: "2025 — 2029", sub: "Dalian Polytechnic University" },
    { title: "Technician Cybersecurity", meta: "2023 — 2025", sub: "ISM Casablanca · Highest honours" },
  ],

  certs: [
    { title: "eJPTv2", meta: "2025", sub: "INE · Junior Penetration Tester" },
    { title: "Cisco Networking", meta: "2024", sub: "CCNA Intro to Networks" },
  ],

  langs: [
    { name: "Arabic", level: 100 },
    { name: "English", level: 95 },
    { name: "French", level: 90 },
    { name: "Mandarin Chinese", level: 30 },
  ],

  projects: [
    {
      num: "01",
      title: "PackGuard",
      tagline: "AI-powered package security scanner",
      desc: "A static analyzer that combines heuristic detection and local AI models to flag malicious packages and typosquatting across npm and PyPI. Reflects my push into AI-assisted security tooling.",
      stack: ["Python", "AI", "Static Analysis"],
      status: "active",
      peek: [
        "Heuristic + AI detection pipeline",
        "Targets npm and PyPI ecosystems",
        "Typosquatting and supply-chain patterns",
        "Local inference, no external API",
      ],
    },
    {
      num: "02",
      title: "HTTP Request Smuggling Detector",
      tagline: "Desync-fuzzing automation tool",
      desc: "A Python tool that automates crafted-request testing for HTTP desynchronization behavior during web assessments. Built from real engagement needs instead of toy scenarios.",
      stack: ["Python", "HTTP", "AppSec"],
      status: "active",
      peek: [
        "Automates request-smuggling checks",
        "Reduces manual testing overhead",
        "Built from real engagement needs",
      ],
    },
    {
      num: "03",
      title: "Vulnerability Scanner Suite",
      tagline: "Reconnaissance & fuzzing toolkit",
      desc: "Collection of Python and Bash utilities for endpoint discovery, recon, and lightweight fuzzing. Designed to speed up early-stage web testing workflows.",
      stack: ["Python", "Bash", "Recon"],
      status: "active",
      peek: [
        "Endpoint discovery + fuzzing utils",
        "Focus on repeatable workflows",
        "Designed for appsec testing speed",
      ],
    },
    {
      num: "04",
      title: "Custom Shell in C",
      tagline: "Unix-like shell from scratch",
      desc: "Built to deepen understanding of command parsing, process management, and execution flow. One of the clearest examples of learning by implementing fundamentals directly.",
      stack: ["C", "Unix", "Linux"],
      status: "completed",
      peek: [
        "Custom command execution pipeline",
        "Process lifecycle control",
        "Hands-on low-level debugging",
      ],
    },
  ],

  skills: [
    {
      icon: "⌗",
      head: "OFFENSIVE",
      title: "Offensive Security",
      items: [
        { name: "Web Exploitation", level: 82 },
        { name: "SQLi / XSS / SSRF", level: 78 },
        { name: "Reconnaissance", level: 85 },
        { name: "CTF Challenge Solving", level: 80 },
      ],
    },
    {
      icon: "{}",
      head: "SYSTEMS",
      title: "Systems & Tooling",
      items: [
        { name: "Python", level: 90 },
        { name: "C", level: 70 },
        { name: "Bash / Linux", level: 82 },
        { name: "Burp Suite / Nmap", level: 78 },
      ],
    },
    {
      icon: "∆",
      head: "AI / ML SEC",
      title: "AI & ML Security",
      items: [
        { name: "Supply Chain Security", level: 75 },
        { name: "Static Analysis", level: 80 },
        { name: "AI-Assisted Detection", level: 73 },
        { name: "Security Tool Building", level: 85 },
      ],
    },
  ],

  contact: {
    meta: {
      EMAIL: "21@achux21.com",
      GITHUB: "github.com/ACHUX21",
      LINKEDIN: "linkedin.com/in/achux21",
      TIMEZONE: "UTC+8 (CST)",
    },
  },
};
