import { Metadata } from "next";
import { LayoutRightColumn, LayoutLeftColumn } from "common/indexStyles";
import ContentsTable from "components/ContentsTable";
import Link from "next/link";
import { createArticleLD, createBreadcrumbLD } from "app/json-ld";

const metaKeywords = [
  "react",
  "typescript",
  "react-hook-form",
  "zod",
  "form",
  "form reusability",
  "complex forms",
  "schema validation",
  "useformcontext",
  "type inference",
  "component refactoring",
  "strong typing",
  "developer experience",
  "form handling best practices",
  "field reusability",
  "form schema",
  "generic components",
];

export const metadata: Metadata = {
  title:
    "How to reuse groups of fields / fieldsets of a complex form in React with TypeScript and react-hook-form. | programing stuff ",
  keywords: metaKeywords,
  alternates: {
    canonical: "/programing/reusable-fieldsets",
  },
  openGraph: {
    title: "Reuable form fieldsets?",
    description:
      "How to reuse groups of fields / fieldsets of a complex form in React with TypeScript and react-hook-form.",
    siteName: "Krzysztof Ciach's personal website",
    type: "article",
    locale: "en_US",
  },
};

const articleLD = createArticleLD(
  "How to reuse groups of fields / fieldsets of a complex form in React with TypeScript and react-hook-form.",
  "How to reuse groups of fields / fieldsets of a complex form in React with TypeScript and react-hook-form.",
  "/programing/reusable-fieldsets"
);

const breadcrumbLD = createBreadcrumbLD([
  { name: "Home", path: "/" },
  { name: "Programming", path: "/programing" },
  {
    name: "Reusable form fieldsets",
    path: "/programing/reusable-fieldsets",
  },
]);

export default function Layout({
  text,
  contents,
}: {
  text: React.ReactNode;
  contents: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleLD, breadcrumbLD]) }}
      />
      <LayoutLeftColumn>
        <Link href="/">
          <h2 className="mb-0">Krzysztof Ciach&apos;s</h2>
          <h4>personal website</h4>
        </Link>
        <h3 className="mb-0">programing stuff</h3>
        {contents && (
          <div>
            <ContentsTable>
              <h3>Table of contents:</h3>
              {contents}
            </ContentsTable>
          </div>
        )}
      </LayoutLeftColumn>
      <LayoutRightColumn className="page">{text}</LayoutRightColumn>
    </>
  );
}
