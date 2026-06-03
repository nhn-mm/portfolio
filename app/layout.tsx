import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavigationBar from "@/components/NavigationBar";
import { Providers } from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Naing Htet Naing | Senior Software Engineer",
  description:
    "Portfolio of Naing Htet Naing, a Senior Software Engineer specializing in React, Next.js, Golang, and cloud technologies.",
  openGraph: {
    title: "Naing Htet Naing | Senior Software Engineer",
    description:
      "Portfolio of Naing Htet Naing, a Senior Software Engineer.",
    type: "website",
  },
  alternates: {
    canonical: "https://nhn-portfolio.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-dark-950 text-light-100 font-sans">
        <Providers>
          <NavigationBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
