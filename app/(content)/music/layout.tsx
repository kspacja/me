import { LayoutRightColumn, LayoutLeftColumn } from "common/indexStyles";
import Link from "next/link";
import HomeLink from "components/HomeLink";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "music stuff",
    template: "%s | music stuff | Krzysztof Ciach",
  },
  description:
    "music stuff by Krzysztof Ciach. Features, lists, playlists, articles about my favorite music.",
  keywords: [
    "music",
    "lists",
    "artists",
    "favorites",
    "features",
    "playlists",
    "articles",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutLeftColumn>
        <HomeLink />
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
