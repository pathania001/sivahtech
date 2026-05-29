import type { Metadata } from "next";
import Script from "next/script";
import "../styles.css";
import { SiteInteractions } from "./site-interactions";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sivahtech.com"),
  title: {
    default: "Sivah Tech | Global Web Development, SEO & UI/UX Agency",
    template: "%s"
  },
  description:
    "Sivah Tech is a global digital agency for website development, SEO, UI/UX design, mobile apps, Shopify, WordPress, Laravel, Next.js and long-term website maintenance."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <SiteInteractions />
        <Script id="no-js-warning" strategy="afterInteractive">
          {`document.documentElement.classList.add('js-ready');`}
        </Script>
      </body>
    </html>
  );
}
