import Link from "next/link";

export default function pageLayout(backUrl: string) {
  return function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <Link href={backUrl}>&lt; back</Link>
        <br />
        <br />
        {children}
        <br />
        <Link href="#">&uarr; top</Link> | <Link href={backUrl}>&lt; back</Link>
      </>
    );
  };
}
