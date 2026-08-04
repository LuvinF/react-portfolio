import { SEO_CONFIG } from "./config";

const isAbsoluteUrl = (value) => /^https?:\/\//i.test(value);

export const toAbsoluteUrl = (value = "/") => {
  if (isAbsoluteUrl(value)) return value;

  const baseUrl = `${SEO_CONFIG.siteUrl.replace(/\/$/, "")}/`;
  const siteUrl = new URL(baseUrl);
  const sitePath = siteUrl.pathname.replace(/\/$/, "");

  if (value.startsWith(`${sitePath}/`)) {
    return new URL(value, siteUrl.origin).toString();
  }

  return new URL(value.replace(/^\//, ""), baseUrl).toString();
};

export const getCanonicalUrl = (canonical, pathname = "/") => {
  const path = canonical || pathname || "/";
  return toAbsoluteUrl(path.split(/[?#]/)[0]);
};

export const formatTitle = (title) => {
  if (!title || title === SEO_CONFIG.defaultTitle) return SEO_CONFIG.defaultTitle;
  return `${title} | ${SEO_CONFIG.siteName}`;
};

export const normalizeKeywords = (keywords = []) =>
  Array.isArray(keywords) ? keywords.join(", ") : keywords;

export const normalizeSchema = (schema) =>
  (Array.isArray(schema) ? schema : [schema]).filter(Boolean);
