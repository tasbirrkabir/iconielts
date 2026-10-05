import type { Metadata, Viewport } from "next";
import { Fraunces, Archivo, Noto_Serif_Bengali, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bnSerif = Noto_Serif_Bengali({
  variable: "--font-bn-serif",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800"],
});

const hind = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ICON English Center — IELTS, taught in Bangla",
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
    title: "ICON English Center — IELTS, taught in Bangla",
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
        className={`${fraunces.variable} ${archivo.variable} ${bnSerif.variable} ${hind.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
