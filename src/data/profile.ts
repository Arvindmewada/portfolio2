export interface SkillItem {
  name: string;
  level: number; // 1 to 10
  yrs: string;
}

export interface SkillBand {
  key: string;
  title: string;
  note: string;
  items: SkillItem[];
}

export interface EducationItem {
  type: 'degree' | 'cert';
  year: string;
  title: string;
  org: string;
  desc?: string;
  chips?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  sub: string;
  year: string;
  category: 'Full Stack' | 'Frontend' | 'Backend';
  tech: string[];
  link: string;
  demoLink?: string;
  img: string;
  desc: string;
  highlights?: string[];
}

export interface SocialLink {
  label: string;
  url: string;
  handle?: string;
}

export interface ProfileData {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  badge: string;
  location: string;
  locationShort: string;
  email: string;
  phone: string;
  status: string;
  photo: string;
  tagline: string;
  roles: string[];
  about: string[];
  facts: [string, string][];
  education: EducationItem[];
  certifications: EducationItem[];
  skills: SkillBand[];
  projects: ProjectItem[];
  socials: SocialLink[];
  marquee: string[];
}

import portraitImg from '@/src/assets/images/arvind_mewada_portrait_1790623226990.jpg';
import project1Img from '@/src/assets/images/zenonapp_marketplace_1790623243007.jpg';
import project2Img from '@/src/assets/images/terminal_digital_clock_1790623256355.jpg';
import project3Img from '@/src/assets/images/codesnippet_studio_app_1790622508639.jpg';

export const DEFAULT_PROFILE: ProfileData = {
  name: "Arvind Mewada",
  firstName: "ARVIND",
  lastName: "Mewada",
  initials: "AM",
  badge: "CSE-AIML · 2024-2028 · BIST",
  location: "Bhopal, Madhya Pradesh, India",
  locationShort: "BHOPAL, IN",
  email: "itsravimewada@gmail.com",
  phone: "9977628981",
  status: "OPEN TO INTERNSHIPS & TECH ROLES — CSE-AIML",
  photo: portraitImg,
  tagline: "Ambitious and dedicated Artificial Intelligence & Machine Learning Engineering student at Bansal Institute of Science and Technology. Building software solutions with Python, C++, JavaScript, and modern web architectures.",
  roles: [
    "Software Engineer",
    "CSE-AIML Undergrad",
    "Python & C++ Developer",
    "Web Developer (React & JS)",
    "Problem Solver"
  ],
  about: [
    "I am an ambitious and dedicated Artificial Intelligence & Machine Learning Engineering student at Bansal Institute of Science and Technology, Bhopal (Batch 2024–2028). I have strong foundational skills in C, C++, Python, HTML5, CSS, and JavaScript.",
    "Driven by curiosity in software engineering, intelligent systems, and scalable backend workflows, I actively build full-stack web applications like ZenonApp (Python & PostgreSQL) and terminal utilities. Seeking to contribute to dynamic engineering teams and gain practical experience in high-impact professional environments."
  ],
  facts: [
    ["Name", "Arvind Mewada"],
    ["College", "Bansal Institute of Science and Technology, Bhopal"],
    ["Branch", "CSE-AIML (Artificial Intelligence & ML)"],
    ["Batch", "2024 – 2028"],
    ["CGPA", "6.55 / 10"],
    ["Schooling", "Jai Hind H.S. School, Nandni (86% XII, 89.6% X)"],
    ["Primary Stack", "Python · C++ · C · PostgreSQL · JavaScript · HTML5/CSS3 · Git"]
  ],
  education: [
    {
      type: "degree",
      year: "2024 – 2028",
      title: "Bachelor of Science in Computer Science / CSE-AIML",
      org: "Bansal Institute of Science and Technology, Bhopal",
      desc: "Specializing in Artificial Intelligence & Machine Learning. Core academic studies in Data Structures in C++, Object-Oriented Systems, Computer Architecture, and Modern Web Development.",
      chips: ["CGPA: 6.55", "Branch: CSE-AIML", "Batch: 2024 – 2028"]
    },
    {
      type: "degree",
      year: "2023",
      title: "Class XII (Senior Secondary)",
      org: "Jai Hind Higher Secondary School, Nandni (MP)",
      desc: "Completed Higher Secondary education with distinction in Science stream.",
      chips: ["Score: 86%", "MP Board", "Year: 2023"]
    },
    {
      type: "degree",
      year: "2021",
      title: "Class X (High School)",
      org: "Jai Hind Higher Secondary School, Nandni (MP)",
      desc: "Completed High School education with outstanding distinction across Mathematics and Sciences.",
      chips: ["Score: 89.6%", "MP Board", "Year: 2021"]
    }
  ],
  certifications: [
    {
      type: "cert",
      year: "2024",
      title: "C and C++ Certified",
      org: "Technical Certification Authority",
      desc: "Validated proficiency in memory management, pointers, object-oriented concepts, and systems programming."
    },
    {
      type: "cert",
      year: "2024",
      title: "JavaScript Essential 1",
      org: "Scaler",
      desc: "Foundational mastery of ES6+, closures, asynchronous JavaScript, DOM manipulation, and functional patterns."
    },
    {
      type: "cert",
      year: "2024",
      title: "Data Structure in C++ Course",
      org: "Scaler",
      desc: "Comprehensive coursework in algorithms, arrays, linked lists, stacks, queues, trees, recursion, and time complexity."
    },
    {
      type: "cert",
      year: "2024",
      title: "30 Days Python Micro Course",
      org: "SkillCourse",
      desc: "Intensive 30-day curriculum covering Python syntax, data types, modules, file I/O, and programmatic problem solving."
    },
    {
      type: "cert",
      year: "2024",
      title: "Introduction to Cloud Computing",
      org: "SkillsBuild",
      desc: "Core concepts of cloud deployment models, virtualization, infrastructure scalability, and cloud architecture."
    }
  ],
  skills: [
    {
      key: "A",
      title: "Programming Languages",
      note: "Core systems & logic",
      items: [
        { name: "Python", level: 9, yrs: "2 yrs" },
        { name: "C++", level: 8, yrs: "2 yrs" },
        { name: "C Language", level: 8, yrs: "2 yrs" },
        { name: "JavaScript", level: 8, yrs: "1.5 yrs" }
      ]
    },
    {
      key: "B",
      title: "Web Technologies & DB",
      note: "Full-stack & data persistence",
      items: [
        { name: "HTML5 & CSS3", level: 9, yrs: "2 yrs" },
        { name: "PostgreSQL", level: 7, yrs: "1 yr" },
        { name: "React & Bootstrap", level: 7, yrs: "1 yr" },
        { name: "Responsive UI Design", level: 8, yrs: "2 yrs" }
      ]
    },
    {
      key: "C",
      title: "Tools & Platforms",
      note: "Development & analytics",
      items: [
        { name: "Git & GitHub", level: 8, yrs: "2 yrs" },
        { name: "VS Code & Antigravity", level: 9, yrs: "2 yrs" },
        { name: "Power BI", level: 7, yrs: "1 yr" },
        { name: "Figma & Canva", level: 8, yrs: "2 yrs" },
        { name: "Windows & Linux OS", level: 8, yrs: "2 yrs" }
      ]
    }
  ],
  projects: [
    {
      id: "zenon-app",
      title: "ZenonApp",
      sub: "Full-Stack Web Application (Python & PostgreSQL)",
      year: "2024",
      category: "Full Stack",
      tech: ["Python", "PostgreSQL", "HTML5", "CSS", "JavaScript"],
      link: "https://github.com/Arvindmewada",
      demoLink: "https://github.com/Arvindmewada",
      img: project1Img,
      desc: "ZenonApp is a user-friendly digital marketplace that connects buyers and sellers, simplifying product discovery, buying, and selling through an intuitive and responsive interface. Designed with robust relational database schema modeling in PostgreSQL and structured backend business logic in Python.",
      highlights: [
        "Full-stack digital marketplace connecting buyers and sellers seamlessly",
        "PostgreSQL relational schema modeling for listings, seller accounts, and transactions",
        "Responsive, accessible front-end interface built with semantic HTML5, CSS, and JavaScript"
      ]
    },
    {
      id: "terminal-digital-clock",
      title: "Terminal Based Digital Clock",
      sub: "Python System Timekeeping Utility",
      year: "2024",
      category: "Backend",
      tech: ["Python", "OS Module", "Time Module", "CLI"],
      link: "https://github.com/Arvindmewada",
      demoLink: "https://github.com/Arvindmewada",
      img: project2Img,
      desc: "Created a terminal based digital clock utilizing Python os and time modules. Implements continuous time rendering with screen refresh cycles, formatted date/time displays, and cross-platform compatibility without heavy external dependencies.",
      highlights: [
        "Leveraged Python built-in 'os' and 'time' modules for real-time console updates",
        "Clean terminal display formatting with continuous background polling",
        "Lightweight, portable architecture runnable on any standard Python environment"
      ]
    },
    {
      id: "developer-portfolio",
      title: "Personal Developer Portfolio",
      sub: "HTML, React, JavaScript, Bootstrap, CSS3, Vercel",
      year: "2024",
      category: "Frontend",
      tech: ["React", "JavaScript", "Bootstrap", "CSS3", "Vercel"],
      link: "https://github.com/Arvindmewada",
      demoLink: "https://arvind-portfolio-cllg.vercel.app",
      img: project3Img,
      desc: "A personal developer portfolio showcasing technical skills, projects, and achievements in software development, AI, and Machine Learning, designed to highlight my work, academic journey, and verified certifications.",
      highlights: [
        "Modular React component design with styled Bootstrap & CSS3 elements",
        "Live deployment on Vercel with production asset optimization",
        "Comprehensive showcase of coursework, projects, and LeetCode problem solving"
      ]
    }
  ],
  socials: [
    { label: "GitHub", url: "https://github.com/Arvindmewada", handle: "Arvindmewada" },
    { label: "LinkedIn", url: "https://linkedin.com/in/arvind-mewada-9bb48b32b", handle: "arvind-mewada" },
    { label: "LeetCode", url: "https://leetcode.com/u/arvindmewada", handle: "arvindmewada" },
    { label: "Live Portfolio", url: "https://arvind-portfolio-cllg.vercel.app", handle: "vercel.app" },
    { label: "Email", url: "mailto:itsravimewada@gmail.com", handle: "itsravimewada@gmail.com" }
  ],
  marquee: [
    "Arvind Mewada",
    "Software Engineer",
    "Bansal Institute of Science & Technology",
    "CSE-AIML",
    "Python",
    "C++ & C",
    "PostgreSQL",
    "ZenonApp",
    "React & JS",
    "Data Structures",
    "HTML5 & CSS3"
  ]
};
