import Link from "next/link";
import BackLink from "./BackLink";

export default function pageLayout(backUrl: string) {
  return function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <BackLink parentHref={backUrl} />
        <br />
        <br />
        {children}
        <br />
        <a href="#">&uarr; top</a> | <BackLink parentHref={backUrl} />
      </>
    );
  };
}
