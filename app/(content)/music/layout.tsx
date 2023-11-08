import { LayoutRightColumn } from "common/indexStyles";
import { LayoutLeftColumn } from "../../../common/indexStyles";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutLeftColumn>
        <h2 className="mb-0">Krzysztof Ciach&apos;s</h2>
        <h4>personal website</h4>
        <h2 className="mb-0">music stuff</h2>
        <Link href="/articles">articles</Link>
      </LayoutLeftColumn>
      <LayoutRightColumn>{children}</LayoutRightColumn>
    </>
  );
}
