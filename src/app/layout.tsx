import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Kenny Zhang",
  description:
    "Software engineer specializing in full-stack development, with a strong foundation in mathematics and computer science. Explore my portfolio to see my projects and industry experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://xysaswoufwhmmdoyufwh.supabase.co" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="image"
          href="https://xysaswoufwhmmdoyufwh.supabase.co/storage/v1/object/public/kennytrbl/volunteering.webp"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${notoSans.className} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
