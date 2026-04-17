export type Social = {
  label: string;
  url: string;
};

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  domain: string;
  outcome: string;
  stack: string[];
  highlights: string[];
  links: ProjectLink[];
  status: string;
  featured?: boolean;
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  note: string;
};

export type LinkedinPost = {
  title: string;
  url: string;
  image: string;
  label: string;
};

export type ExperienceEntry = {
  title: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type EducationEntry = {
  institution: string;
  degree: string;
  period: string;
  location: string;
};

export type PortfolioContent = {
  name: string;
  role: string;
  tagline: string;
  heroSummary: string;
  bio: string[];
  contactNote: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  blog: string;
  resumeUrl?: string;
  socials: Social[];
  statusLines: string[];
  currentFocus: string[];
  experiences: ExperienceEntry[];
  education: EducationEntry[];
  languages: string[];
  projects: Project[];
  skills: SkillCategory[];
  certifications: Certification[];
  linkedinPosts: LinkedinPost[];
};

export const portfolio: PortfolioContent = {
  name: "ACHRAF OUAZZANI CHAHIDI",
  role: "AI Security Student",
  tagline:
    "AI security and application security student with hands-on experience in web exploitation, vulnerability research, and security tooling.",
  heroSummary:
    "I build security tools that combine static analysis, offensive-security thinking, and AI-assisted detection, grounded in strong Python, C, and systems-level programming foundations.",
  bio: [
    "My path into security started with practical labs, Linux tooling, and a strong curiosity about how web applications and networked systems behave under real constraints. That early curiosity became a durable foundation in reconnaissance, vulnerability testing, and careful debugging.",
    "I later deepened that foundation through software engineering work in C and Python. Projects like a custom shell and printf implementation taught me to reason from system behavior upward rather than relying on abstraction alone.",
    "Today I am applying that same mindset to AI security and application security. I stay close to real exploitation, active CTF practice, and tool building so research ideas remain grounded in how systems actually fail.",
  ],
  contactNote:
    "I am looking for security engineering, application security, or AI-security opportunities where hands-on testing, systems understanding, and tool building all matter.",
  email: "21@achux21.com",
  phone: "+86 135 9131 8052",
  location: "Dalian, China",
  github: "https://github.com/ACHUX21",
  linkedin: "https://www.linkedin.com/in/achux21",
  blog: "https://blog.achux21.com",
  resumeUrl: "/resume.html",
  socials: [
    { label: "GitHub", url: "https://github.com/ACHUX21" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/achux21" },
    { label: "Blog", url: "https://blog.achux21.com" },
    { label: "CTFTime", url: "https://ctftime.org/team/107202" },
    { label: "Email", url: "mailto:21@achux21.com" },
  ],
  statusLines: [
    "Building AI-assisted security tooling",
    "Testing web application behavior",
    "Writing exploitation notes and writeups",
    "Exploring static analysis for package risk",
  ],
  currentFocus: [
    "Supply chain security",
    "Static analysis",
    "AI-assisted detection",
    "Application security research",
  ],
  experiences: [
    {
      title: "Junior Penetration Tester",
      organization: "Swift IT",
      location: "Casablanca, Morocco",
      period: "Jan 2025 - Mar 2025",
      summary:
        "Performed authorized web and systems assessments with a focus on validating exploitable behavior and producing clear technical reporting.",
      highlights: [
        "Validated issues including SQL injection, XSS, and IDOR during real assessments",
        "Built a Python tool to automate detection of HTTP request smuggling behavior",
        "Delivered proof-of-concepts, impact analysis, and remediation guidance",
      ],
    },
  ],
  education: [
    {
      institution: "Dalian Polytechnic University",
      degree: "B.Sc. in Computer Science (in progress)",
      period: "2025 - 2029",
      location: "Dalian, China",
    },
    {
      institution: "Specialized Institute of Management and Computer Science",
      degree: "Technician Degree in Cybersecurity",
      period: "2023 - 2025",
      location: "Casablanca, Morocco",
    },
  ],
  languages: [
    "Arabic (Native)",
    "English (Fluent)",
    "French (Fluent)",
    "Mandarin Chinese (Basic, HSK 1)",
  ],
  projects: [
    {
      id: "packguard",
      title: "PackGuard",
      summary:
        "An AI-powered package security scanner for npm and PyPI focused on spotting malicious packages and supply-chain attacks.",
      description:
        "PackGuard combines static analysis, heuristic detection, and local AI models to flag suspicious behavior such as typosquatting patterns and package-level supply-chain risk. It reflects the direction I want to keep pushing in AI-assisted security tooling.",
      domain: "AI Security",
      outcome: "Brings static analysis and AI-assisted detection together for package risk review.",
      stack: ["Python", "Static Analysis", "AI", "Supply Chain Security"],
      highlights: [
        "Targets malicious-package patterns in npm and PyPI ecosystems",
        "Uses heuristic detection alongside local AI models",
        "Focused on typosquatting and supply-chain abuse scenarios",
      ],
      links: [{ label: "GitHub Profile", url: "https://github.com/ACHUX21" }],
      status: "Current Focus",
      featured: true,
    },
    {
      id: "http-request-smuggling-detector",
      title: "HTTP Request Smuggling Detector",
      summary:
        "A Python tool that automates crafted-request testing for HTTP desynchronization behavior during web assessments.",
      description:
        "Built to speed up manual verification during testing engagements, this project focuses on helping surface request-smuggling behavior with less repeated setup. It reflects my interest in subtle protocol behavior and offensive tooling that saves analyst time.",
      domain: "Application Security",
      outcome: "Reduced manual overhead while validating HTTP desynchronization issues.",
      stack: ["Python", "HTTP", "AppSec", "Security Tooling"],
      highlights: [
        "Automates crafted-request testing for request smuggling checks",
        "Supports faster validation during web-application assessments",
        "Built from real engagement needs rather than as a toy demo",
      ],
      links: [{ label: "GitHub Profile", url: "https://github.com/ACHUX21" }],
      status: "Recent Build",
      featured: true,
    },
    {
      id: "vulnerability-scanner-suite",
      title: "Vulnerability Scanner Suite",
      summary:
        "A collection of Python and Bash utilities for reconnaissance, endpoint discovery, and lightweight fuzzing.",
      description:
        "This toolkit is designed to support faster application-security workflows by reducing repetition during early-stage testing. It reflects the kind of practical automation that becomes valuable across repeated lab and assessment work.",
      domain: "Security Automation",
      outcome: "Improved speed and repeatability during web testing workflows.",
      stack: ["Python", "Bash", "Reconnaissance", "Fuzzing"],
      highlights: [
        "Utilities for endpoint discovery and lightweight fuzzing",
        "Focus on repeatable workflows instead of one-off scripts",
        "Supports reconnaissance and validation during web testing",
      ],
      links: [{ label: "GitHub Profile", url: "https://github.com/ACHUX21" }],
      status: "Active",
      featured: true,
    },
    {
      id: "simple-shell",
      title: "Custom Shell in C",
      summary:
        "A Unix-like shell built in C to understand command parsing, process management, and execution flow.",
      description:
        "Building the shell from scratch strengthened my understanding of system behavior, parsing discipline, child processes, and the limits of low-level tooling. It remains one of the clearest examples of how I learn by implementing fundamentals directly.",
      domain: "Systems Programming",
      outcome: "Built a functional shell and strengthened core systems reasoning.",
      stack: ["C", "Unix", "Linux", "System Programming"],
      highlights: [
        "Custom command execution pipeline",
        "Argument parsing and process lifecycle control",
        "Hands-on debugging of low-level behavior",
      ],
      links: [{ label: "Repository", url: "https://github.com/ACHUX21/simple_shell" }],
      status: "Completed",
      featured: true,
    },
    {
      id: "imperial-petroleum-pos",
      title: "Imperial Petroleum POS",
      summary:
        "A Flask and MySQL web application used to deepen understanding of authentication, sessions, and input validation in realistic workflows.",
      description:
        "This project combined backend structure, authentication flows, and operational logic in a more product-like setting. It was especially useful for understanding how real application logic creates both engineering and security constraints.",
      domain: "Full-Stack Web",
      outcome: "Applied security-aware thinking to a realistic academic web application.",
      stack: ["Flask", "MySQL", "Jinja2", "Authentication"],
      highlights: [
        "Worked through authentication and session-handling flows",
        "Used database-backed application logic in realistic scenarios",
        "Improved understanding of validation and trust boundaries",
      ],
      links: [{ label: "Repository", url: "https://github.com/ACHUX21/SEINFA-Project" }],
      status: "Completed",
      featured: false,
    },
  ],
  skills: [
    {
      category: "Programming",
      items: ["Python", "C", "Bash", "JavaScript"],
    },
    {
      category: "Security",
      items: ["Web Exploitation", "SQLi", "XSS", "SSRF", "IDOR", "Application Security", "OWASP"],
    },
    {
      category: "AI Security",
      items: ["Supply Chain Security", "Static Analysis", "AI-Assisted Detection"],
    },
    {
      category: "Tools",
      items: ["Burp Suite", "Nmap", "ffuf", "sqlmap", "Metasploit", "Docker", "Linux"],
    },
    {
      category: "Security Research",
      items: ["CTF Writeups", "Challenge Authoring", "Vulnerability Research", "Technical Reporting"],
    },
  ],
  certifications: [
    {
      title: "eJPTv2",
      issuer: "INE",
      date: "Certified",
      note: "Practical junior penetration testing certification with emphasis on hands-on offensive skills.",
    },
    {
      title: "Cisco Networking Academy Coursework",
      issuer: "Cisco Networking Academy",
      date: "Completed",
      note: "Completed Introduction to Networks and Switching & Routing coursework.",
    },
    {
      title: "MCSCv12 CTF 2025 - 1st Place",
      issuer: "CTF Competition",
      date: "2025",
      note: "First-place finish in MCSCv12 CTF 2025.",
    },
    {
      title: "IDEHv6 CTF 2025 - 1st Place",
      issuer: "CTF Competition",
      date: "2025",
      note: "First-place finish in IDEHv6 CTF 2025.",
    },
    {
      title: "AISEC CTF 2025 - 1st Place",
      issuer: "CTF Competition",
      date: "2025",
      note: "First-place finish in AISEC CTF 2025.",
    },
    {
      title: "Top 15 - HTB Cyber Apocalypse 2024",
      issuer: "Team L3ak",
      date: "2024",
      note: "Placed in the top 15 with Team L3ak during HTB Cyber Apocalypse 2024.",
    },
    {
      title: "Cyber Odyssey CTF 2024 - 2nd Place",
      issuer: "CTF Competition",
      date: "2024",
      note: "Second-place finish in Cyber Odyssey CTF 2024.",
    },
  ],
  linkedinPosts: [
    {
      title: "AISEC CTF 2025 - 1st Place",
      url: "https://lnkd.in/p/eR5RrN28",
      image: "/images/ensa_kech.jpg",
      label: "View on LinkedIn",
    },
    {
      title: "IDEHv6 CTF 2025 - 1st Place",
      url: "https://lnkd.in/p/eMeuEvzd",
      image: "/images/ideh.jpg",
      label: "View on LinkedIn",
    },
    {
      title: "MCSCv12 CTF 2025 - 1st Place",
      url: "https://lnkd.in/p/eFRsxUCH",
      image: "/images/ensias.jpg",
      label: "View on LinkedIn",
    },
    {
      title: "Cyber Odyssey CTF 2024 - 2nd Place",
      url: "https://lnkd.in/p/eySUR32K",
      image: "/images/odyssey.jpg",
      label: "View on LinkedIn",
    },
    {
      title: "0xGCD CTF 2024 - Hosting",
      url: "https://lnkd.in/p/e9akjiwf",
      image: "/images/org_ensa.jpg",
      label: "View on LinkedIn",
    },
  ],
};
