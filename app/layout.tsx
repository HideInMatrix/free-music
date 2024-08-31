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

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <link rel="manifest" href="/manifest.json" />
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
