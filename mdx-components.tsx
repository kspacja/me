import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: (props) => {
      const { href, children } = props;
      const isExternal = href && (href.startsWith("http") || href.startsWith("mailto:"));
      if (isExternal) {
        return (
          <a href={href} data-ciach="external-link">
            {children}
          </a>
        );
      }

      return <Link href={href ?? ''} data-ciach="internal-link">{children}</Link>;
    }
  };
}
