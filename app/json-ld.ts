import { Article, BreadcrumbList, Person, WithContext } from "schema-dts";

export const pageLD: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Krzysztof Ciach",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  email: "krzysztof.ciach@gmail.com",
  jobTitle: "Front-end Web Developer",
  gender: "male",
  knowsAbout: [
    "web development",
    "software engineering",
    "music",
    "react",
    "nextjs",
  ],
  knowsLanguage: ["pl", "en"],
};

export const navigationPages: [string, string][] = [
  ["/music", "Music stuff"],
  ["/movies", "Movies stuff"],
];

export const navigationMenuLD: WithContext<BreadcrumbList> = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: navigationPages.map(([page, name], index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
    item: `${process.env.NEXT_PUBLIC_SITE_URL}${page.replace("/", "")}`,
  })),
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ciachu.site";

export function createBreadcrumbLD(
  items: { name: string; path: string }[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function createArticleLD(
  title: string,
  description: string,
  path: string
): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${siteUrl}${path}`,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: "Krzysztof Ciach",
      url: siteUrl,
    },
  };
}
