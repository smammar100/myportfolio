import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import { CursorTrail } from "@/components/cursor-trail";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Echo - Modern Next.js Template",
  description:
    "Full-stack developer who loves building things from idea to launch.",
  icons: {
    icon: [
      { url: "/seo/favicon.ico", sizes: "any" },
      { url: "/seo/favicon.svg", type: "image/svg+xml" },
      { url: "/seo/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/seo/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${funnelSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="noise-bg" aria-hidden="true" />
          <CursorTrail />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
