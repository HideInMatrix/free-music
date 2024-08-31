import HeaderBarWrapper from "@/components/share/HeaderBar";
import { cn } from "@/lib/utils";
import { Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Player from "@/components/share/player/Player";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};
export const metadata = {
  title: {
    template: "%s|音乐地带",
    default: "音乐地带",
  },
  description: "一个免费听歌的地方",
  generator: "Next.js",
  manifest: "/pwa/manifest.json",
  keywords: ["music", "music-site"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [{ name: "David" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [{ rel: "icon", url: "icons/favicon.png" }],
};

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <link rel="manifest" href="/pwa/manifest.json" />
      <body
        className={cn(
          "h-dvh bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <HeaderBarWrapper>
          {children} <Player />
        </HeaderBarWrapper>
      </body>
    </html>
  );
}
