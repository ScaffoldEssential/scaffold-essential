import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ScaffoldEssentialAppWithProviders } from "@/components/ScaffoldEssentialAppWithProviders";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Essential App",
  description: "Mono repo template for Essential App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScaffoldEssentialAppWithProviders>
          {children}
        </ScaffoldEssentialAppWithProviders>
      </body>
    </html>
  );
}
