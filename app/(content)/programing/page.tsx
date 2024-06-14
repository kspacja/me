import { LayoutRightColumn, LayoutLeftColumn } from "common/indexStyles";
import BackLink from "components/BackLink";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <LayoutLeftColumn>
        <Link href="/">
          <h2 className="mb-0">Krzysztof Ciach&apos;s</h2>
          <h4>personal website</h4>
        </Link>
        <h3 className="mb-0">programing stuff</h3>
      </LayoutLeftColumn>
      <LayoutRightColumn className="page">
        <BackLink parentHref="/" />
        <br />
        <br />
        <h3>Articles</h3>
        <Link href="/programing/reusable-fieldsets">
          How to reuse groups of fields / fieldsets of a complex form in React
          with TypeScript and react-hook-form.
        </Link>
        <br />
      </LayoutRightColumn>
    </>
  );
}
