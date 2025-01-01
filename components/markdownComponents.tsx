import Link from "next/link";

export const components = {
  a: ({ node, children, href, ...props }: any) => {
    // remove from `href` "page", "app" and all segments with round bracket
    const normalizedHref = href?.replace(/app\/|\/page(\.(ts|md)x)?|\(.*?\)\//g, "");

    return (
      <Link href={normalizedHref} {...props}>
        {children}
      </Link>
    );
  },
};