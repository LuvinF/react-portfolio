import { Suspense, lazy } from "react";

import Hero from "../components/home/Hero";
import SEO from "../components/shared/SEO";
import { PAGE_SEO } from "../seo/config";
import {
  createOrganizationSchema,
  createPersonSchema,
  createWebPageSchema,
  createWebSiteSchema,
} from "../seo/schema";

// Lazy-loaded sections
const About = lazy(() => import("../components/home/About"));
const Experience = lazy(() => import("../components/home/Experience"));
const Tech = lazy(() => import("../components/home/Tech"));
const Works = lazy(() => import("../components/home/Works"));
const Feedbacks = lazy(() => import("../components/home/Feedbacks"));
const Contact = lazy(() => import("../components/home/Contact"));
const StarsCanvas = lazy(() => import("../components/canvas/Stars"));

// Structured Data
const homeSchema = [
  createWebSiteSchema(),
  createOrganizationSchema(),
  createPersonSchema(),
  createWebPageSchema({
    name: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    url: PAGE_SEO.home.canonical,
  }),
];

// Lightweight reusable loading placeholder
const SectionLoader = () => (
  <div className="flex justify-center items-center py-16">
    <div className="h-2 w-32 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 animate-pulse" />
  </div>
);

const Home = () => {
  return (
    <>
      <SEO {...PAGE_SEO.home} schema={homeSchema} />

      {/* Hero loads immediately */}
      <Hero />

      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Experience />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Tech />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Works />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Feedbacks />
      </Suspense>

      <div className="relative z-0">
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>

        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
      </div>
    </>
  );
};

export default Home;