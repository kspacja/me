import GlobalStyles from "common/globalStyles";
import StyledComponentsRegistry from "lib/styled-component-registry";

import { Metadata } from "next";
import { Outfit } from "next/font/google";
import NightSwitch from "components/NightSwitch/index";
import { Canvas, CanvasWrapper } from "components/Canvas";
import { navigationMenuLD, pageLD } from "./json-ld";

// If loading a variable font, you don't need to specify the font weight
const dmSans = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--dm-sans-font",
});

const dmSerifDisplay = Outfit({
  subsets: ["latin"],
  weight: "700",
  variable: "--dm-serif-display-font",
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
  const className = `${dmSans.variable} ${dmSerifDisplay.variable}`;

  return (
    <html lang="pl" className={className}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([pageLD, navigationMenuLD]),
          }}
        />
        <StyledComponentsRegistry>
          <GlobalStyles />
          <CanvasWrapper>
            <NightSwitch />
            <Canvas>{children}</Canvas>
          </CanvasWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
