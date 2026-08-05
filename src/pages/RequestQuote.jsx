import { Link } from "react-router-dom";

import RequestQuoteForm from "../components/services/RequestQuoteForm";
import SEO from "../components/shared/SEO";
import { styles } from "../styles";
import { createBreadcrumbListSchema, createWebPageSchema } from "../seo/schema";

const quoteSchema = [
  createWebPageSchema({
    name: "Request a Quote",
    description:
      "Request a tailored project quote for web development, AI applications, automation, and custom software services.",
    url: "/services/request-quote",
  }),
  createBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Request a Quote", url: "/services/request-quote" },
  ]),
];

const RequestQuote = () => (
  <>
    <SEO
      title="Request a Quote"
      description="Submit your project details to receive a tailored quote for web development, AI applications, and custom software services."
      canonical="/services/request-quote"
      schema={quoteSchema}
    />

    <main className={`${styles.padding} mx-auto max-w-4xl`}>
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-secondary">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/services" className="transition hover:text-white">
              Services
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-white" aria-current="page">
            Request a Quote
          </li>
        </ol>
      </nav>

      <RequestQuoteForm />
    </main>
  </>
);

export default RequestQuote;
