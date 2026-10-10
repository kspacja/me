import { LayoutRightColumn, LayoutLeftColumn } from "common/indexStyles";
import HomeLink from "components/HomeLink";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "movies stuff",
    template: "%s | movies stuff | Krzysztof Ciach",
  },
  description: "movies stuff by Krzysztof Ciach.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutLeftColumn>
        <HomeLink />
        <h2 className="mb-0">movies stuff</h2>
      </LayoutLeftColumn>
      <LayoutRightColumn className="page">{children}</LayoutRightColumn>
    </>
  );
}
