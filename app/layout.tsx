import { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import NightSwitch from "components/NightSwitch/index";
import { Canvas, CanvasWrapper } from "components/Canvas";
import { navigationMenuLD, pageLD } from "./json-ld";

import "common/globals.css";
import "common/code.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
  variable: "--inter-font",
});

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
  variable: "--inter-tight-font",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ciachu.site/"
  ),
  title: {
    default: "Krzysztof Ciach - Resume page",
    template: "%s | Krzysztof Ciach",
  },
  description: "Krzysztof Ciach - Web Developer - Resume page",
  keywords: ["web developer", "resume", "portfolio", "cv", "krzysztof ciach"],
  openGraph: {
    siteName: "Krzysztof Ciach - Resume page",
    type: "website",
    title: "Krzysztof Ciach - Resume page",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const className = `${inter.variable} ${interTight.variable}`;

  return (
    <html lang="pl" className={className}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([pageLD, navigationMenuLD]),
          }}
        />
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          ></script>
        )}
        <CanvasWrapper>
          <NightSwitch />
          <Canvas>{children}</Canvas>
        </CanvasWrapper>
      </body>
    </html>
  );
}
