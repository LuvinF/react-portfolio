import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import { SEO_CONFIG } from "../../seo/config";
import {
  formatTitle,
  getCanonicalUrl,
  normalizeKeywords,
  normalizeSchema,
  toAbsoluteUrl,
} from "../../seo/utils";

const SEO = ({
  title,
  description = SEO_CONFIG.defaultDescription,
  keywords = [],
  canonical,
  image = SEO_CONFIG.defaultOgImage,
  type = "website",
  noIndex = false,
  schema,
}) => {
  const { pathname } = useLocation();
  const pageTitle = formatTitle(title);
  const canonicalUrl = getCanonicalUrl(canonical, pathname);
  const imageUrl = toAbsoluteUrl(image);
  const keywordContent = normalizeKeywords(keywords);
  const schemas = normalizeSchema(schema);

  return (
    <Helmet>
      <html lang={SEO_CONFIG.language} />
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {keywordContent && <meta name="keywords" content={keywordContent} />}
      <meta name="author" content={SEO_CONFIG.author} />
      <meta name="theme-color" content={SEO_CONFIG.themeColor} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content={SEO_CONFIG.locale} />

      <meta name="twitter:card" content={SEO_CONFIG.twitterCard} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {SEO_CONFIG.twitter && <meta name="twitter:creator" content={SEO_CONFIG.twitter} />}

      {schemas.map((item, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
