"use client";

import HeaderBarWrapper from "@/components/share/HeaderBar";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body
        className={cn(
          "h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <HeaderBarWrapper>{children}</HeaderBarWrapper>
      </body>
    </html>
  );
}
