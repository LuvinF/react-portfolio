import { Contact, StarsCanvas } from "../components/home";
import CTA from "../components/services/CTA";
import FAQ from "../components/services/FAQ";
import Process from "../components/services/Process";
import Pricing from "../components/services/Pricing";
import ServicesGrid from "../components/services/ServicesGrid";
import ServicesHero from "../components/services/ServicesHero";
import WhyChooseMe from "../components/services/WhyChooseMe";
import SEO from "../components/shared/SEO";
import { faqs } from "../constants/faq";
import { PAGE_SEO } from "../seo/config";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createProfessionalServiceSchema,
  createWebPageSchema,
} from "../seo/schema";

const servicesSchema = [
  createWebPageSchema({
    name: PAGE_SEO.services.title,
    description: PAGE_SEO.services.description,
    url: PAGE_SEO.services.canonical,
  }),
  createProfessionalServiceSchema({
    description: PAGE_SEO.services.description,
    serviceType: [
      "AI development",
      "Custom software development",
      "React development",
      "Next.js development",
      "Node.js backend development",
      "API development",
      "Business automation",
      "LLM integration",
    ],
  }),
  createBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]),
  createFaqPageSchema(faqs),
];

const Services = () => {
  return (
    <>
      <SEO {...PAGE_SEO.services} schema={servicesSchema} />
      <main>
        <ServicesHero />
        <ServicesGrid />
        <WhyChooseMe />
        <Process />
        <Pricing />
        <FAQ />
        <CTA />
      </main>

      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
    </>
  );
};

export default Services;
