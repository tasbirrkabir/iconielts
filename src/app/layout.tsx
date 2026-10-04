import type { Metadata, Viewport } from "next";
import { Sora, Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const hind = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ICON English Center — Achieve Your Dream IELTS Band Score",
  description:
    "ICON English Center is Bangladesh's trusted companion for IELTS success. Bengali-first IELTS courses, free daily lessons, mock tests and personal mentoring for Listening, Reading, Writing & Speaking.",
  keywords: [
    "ICON English Center",
    "IELTS Bangladesh",
    "IELTS preparation",
    "IELTS course",
    "English course Bangladesh",
    "IELTS Bangla",
    "spoken English",
  ],
  authors: [{ name: "ICON English Center" }],
  openGraph: {
    title: "ICON English Center — Achieve Your Dream IELTS Band Score",
    description:
      "বাংলায় সহজে স্বপ্নের IELTS Band Score অর্জনের নির্ভরযোগ্য সঙ্গী। Courses, free lessons, mock tests & mentoring.",
    siteName: "ICON English Center",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#e31e24",
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
        className={`${sora.variable} ${inter.variable} ${hind.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
