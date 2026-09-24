import type { Metadata } from "next";
import { fontClasses, themeScript } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shoham Katzav - Portfolio",
  description:
    "Shoham Katzav, full stack developer and QA automation engineer. Projects include We Communicate, a Next.js chat app, and the Playwright suite that tests it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontClasses} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
