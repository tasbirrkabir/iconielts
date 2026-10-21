import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const hind = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Demo IELTS Academy — IELTS Preparation (Demo Platform)",
  description:
    "Demo IELTS Academy helps students prepare from foundation to Band 7.5 and beyond — Bengali-first IELTS teaching, feedback on every script, and mock tests under real pressure.",
  keywords: [
    "Demo IELTS Academy",
    "IELTS Bangladesh",
    "IELTS preparation demo",
    "IELTS course",
    "English course Bangladesh",
    "IELTS Bangla",
    "spoken English",
  ],
  authors: [{ name: "Demo IELTS Academy" }],
  openGraph: {
    title: "Demo IELTS Academy — IELTS Preparation Demo",
    description:
      "বাংলায় সহজে স্বপ্নের IELTS Band Score অর্জনের ডেমো প্ল্যাটফর্ম। Courses, free lessons, mock tests & mentoring.",
    siteName: "Demo IELTS Academy",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf9f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${instrument.variable} ${hind.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
