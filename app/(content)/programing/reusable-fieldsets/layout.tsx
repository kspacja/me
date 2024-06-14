import { Metadata } from "next";
import { LayoutRightColumn, LayoutLeftColumn } from "common/indexStyles";
import ContentsTable from "components/ContentsTable";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "% | programing stuff | Krzysztof Ciach",
    default: "programing stuff | Krzysztof Ciach",
  },
};

export default function Layout({
  text,
  contents,
}: {
  text: React.ReactNode;
  contents: React.ReactNode;
}) {
  return (
    <>
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
