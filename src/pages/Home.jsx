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

const About = lazy(() => import("../components/home/About"));
const Experience = lazy(() => import("../components/home/Experience"));
const Tech = lazy(() => import("../components/home/Tech"));
const Works = lazy(() => import("../components/home/Works"));
const Feedbacks = lazy(() => import("../components/home/Feedbacks"));
const Contact = lazy(() => import("../components/home/Contact"));
const StarsCanvas = lazy(() => import("../components/canvas/Stars"));

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

const Home = () => {
  return (
    <>
      <SEO {...PAGE_SEO.home} schema={homeSchema} />
      <Hero />
      <Suspense fallback={null}>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />

        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </Suspense>
    </>
  );
};

export default Home;
