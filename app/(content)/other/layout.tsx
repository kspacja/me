import { LayoutRightColumn, LayoutLeftColumn } from "common/indexStyles";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "other stuff",
    template: "%s | other stuff | Krzysztof Ciach",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutLeftColumn>
        <Link href="/">
          <h2 className="mb-0">Krzysztof Ciach&apos;s</h2>
          <h4>personal website</h4>
        </Link>
        <h2 className="mb-0">music stuff</h2>
        <ul>
          <li>
            <Link href="/music/lists">lists</Link>
          </li>
          <li>
            <Link href="/music/artists">artists</Link>
          </li>
        </ul>
      </LayoutLeftColumn>
      <LayoutRightColumn className="page">{children}</LayoutRightColumn>
    </>
  );
}
