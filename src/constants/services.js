import { backend, creator, mobile, web } from "../assets";

export const portfolioServices = [
  {
    title: "React Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "AI Product Engineer",
    icon: creator,
  },
  {
    title: "Project Manger",
    icon: backend,
  },
];

export const services = [
  {
    title: "AI Integration",
    description:
      "Practical AI features that automate repetitive work, improve decisions, and create better customer experiences.",
    icon: creator,
    outcomes: ["Workflow automation", "AI-powered features", "API integration"],
  },
  {
    title: "Web Application Development",
    description:
      "Fast, scalable web applications built around your users, business goals, and long-term product roadmap.",
    icon: web,
    outcomes: ["React applications", "Responsive interfaces", "Performance-focused builds"],
  },
  {
    title: "Backend & APIs",
    description:
      "Reliable backend systems and APIs that connect your product, data, integrations, and users securely.",
    icon: backend,
    outcomes: ["REST APIs", "Database design", "Third-party integrations"],
  },
  {
    title: "Mobile Development",
    description:
      "Cross-platform mobile experiences that give your customers a polished product on every screen.",
    icon: mobile,
    outcomes: ["React Native apps", "iOS and Android", "App-ready product flows"],
  },
];

export const reasonsToChooseMe = [
  {
    number: "01",
    title: "Business-first thinking",
    description:
      "Every technical decision is tied to a real outcome: clearer workflows, better user experiences, or measurable product growth.",
  },
  {
    number: "02",
    title: "Clear communication",
    description:
      "You get straightforward updates, transparent trade-offs, and a collaborative process from discovery through launch.",
  },
  {
    number: "03",
    title: "Built to scale",
    description:
      "I focus on clean architecture and maintainable code so your product can grow without becoming difficult to change.",
  },
];

export const developmentProcess = [
  {
    step: "01",
    title: "Discover",
    description:
      "We clarify your goals, users, technical needs, timeline, and the most valuable first release.",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "I turn the requirements into a focused solution plan, with clear priorities and practical technical decisions.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "I develop the product in small, visible milestones so you can review progress and give feedback early.",
  },
  {
    step: "04",
    title: "Launch & improve",
    description:
      "We prepare for release, resolve final issues, and identify the best next improvements after real users engage.",
  },
];
