import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  logo1,
  logo2,
  logo4,
  logo5,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "React Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Project Manger",
    icon: backend,
  },
  {
    title: "Video Editor",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
];

const experiences = [
  {
    title: "Technical Faculty",
    company_name: "Jetking Institue",
    icon: logo5,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Taught web applications using React.js and other related technologies.",
      "Collaboration wok shops with cross-functional teams including designers, product managers, and other developers to create high-quality teaching.",
      "Teaching responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback with the students.",
      "Delivered training on front-end development",
      "Mentored students through 10+ academic projects",
    ],
  },
  {
    title: "Technology Associate",
    company_name: "Cornelia Chambers",
    icon: logo2,
    iconBg: "#E6DEDD",
    date: "March 2022 - February 2023",
    points: [
        "Built cross-platform mobile apps using React, integrating with Appwrite's backend services.",
        "Improved web app performance and user experience through code optimization and testing.",
        "Coordinated with the product team to implement features based on feedback.",
        "Designed and implemented responsive UI for B2B platforms in React.",
        "Collaborated on No Grey platform – created wireframes and functional layouts.",
      ],
  },
  {
    title: "IT L2 Engineer",
    company_name: "Air India",
    icon: logo4,
    iconBg: "#383E56",
    date: "June 2023 - Jul 2024",
    points: [
      "Led the development of Network applications, focusing on scalability.",
        "Worked with Network engineers to integrate Cisco Routers for seamlessly work flow with the sytems on the network.",
        "Implemented departmental network interfaces and cloud solutions.",
        "Upgraded network infrastructure and maintained protocols.",
    ],
  },
  {
    title: "Software Developer | Project Manger",
    company_name: "Contract Projects",
    icon: logo1,
    iconBg: "#E6DEDD",
    date: "Aug 2024 - Present",
    points: [
      "Developed and maintained user-facing features for the Hostinger website.",
        "Collaborated closely with UI/UX designers to ensure seamless user experiences.",
        "Led development of 25+ front-end projects using React, Next.js, and Tailwind CSS.",
        "Integrated secure APIs and managed project life cycle.",
        "Optimized web applications for maximum speed and scalability.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Admin Dashboard",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
