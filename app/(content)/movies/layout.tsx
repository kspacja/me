import { LayoutRightColumn, LayoutLeftColumn } from "common/indexStyles";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "movies stuff",
    template: "%s | movies stuff | Krzysztof Ciach",
  },
  description: "movies stuff by Krzysztof Ciach.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL + "movies",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutLeftColumn>
        <Link href="/">
          <h2 className="mb-0">Krzysztof Ciach&apos;s</h2>
          <h4>personal website</h4>
        </Link>
        <h2 className="mb-0">movies stuff</h2>
      </LayoutLeftColumn>
      <LayoutRightColumn className="page">{children}</LayoutRightColumn>
    </>
  );
}
