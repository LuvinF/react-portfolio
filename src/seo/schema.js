import { SEO_CONFIG } from "./config";
import { toAbsoluteUrl } from "./utils";

const personId = `${SEO_CONFIG.siteUrl}/#person`;
const organizationId = `${SEO_CONFIG.siteUrl}/#organization`;
const websiteId = `${SEO_CONFIG.siteUrl}/#website`;

export const createPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: SEO_CONFIG.author,
  url: SEO_CONFIG.siteUrl,
  email: SEO_CONFIG.email,
  jobTitle: "AI Product Engineer and Full Stack Developer",
  sameAs: [SEO_CONFIG.github, SEO_CONFIG.linkedin].filter(Boolean),
});

export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: SEO_CONFIG.siteName,
  url: SEO_CONFIG.siteUrl,
  email: SEO_CONFIG.email,
  founder: { "@id": personId },
  sameAs: [SEO_CONFIG.github, SEO_CONFIG.linkedin].filter(Boolean),
});

export const createProfessionalServiceSchema = ({
  name = `${SEO_CONFIG.siteName} AI Development Services`,
  description = SEO_CONFIG.defaultDescription,
  url = "/services",
  serviceType = [],
} = {}) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name,
  description,
  url: toAbsoluteUrl(url),
  provider: { "@id": organizationId },
  serviceType,
});

export const createWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: SEO_CONFIG.siteName,
  url: SEO_CONFIG.siteUrl,
  inLanguage: SEO_CONFIG.language,
  publisher: { "@id": organizationId },
});

export const createWebPageSchema = ({
  name,
  description,
  url = "/",
  type = "WebPage",
} = {}) => ({
  "@context": "https://schema.org",
  "@type": type,
  name: name || SEO_CONFIG.defaultTitle,
  description: description || SEO_CONFIG.defaultDescription,
  url: toAbsoluteUrl(url),
  isPartOf: { "@id": websiteId },
  about: { "@id": personId },
  inLanguage: SEO_CONFIG.language,
});

export const createBreadcrumbListSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: toAbsoluteUrl(item.url),
  })),
});

export const createFaqPageSchema = (faqs = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});
