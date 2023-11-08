import GlobalStyles from "common/globalStyles";
import StyledComponentsRegistry from "lib/styled-component-registry";

import { DM_Sans, DM_Serif_Display } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--dm-sans-font",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--dm-serif-display-font",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const className = `${dmSans.variable} ${dmSerifDisplay.variable}`;

  return (
    <html lang="pl" className={className}>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
