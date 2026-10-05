import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/structuredData";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  // Lets every page use a relative path for alternates.canonical and resolves
  // it to a full https://staywithrentico.com/... URL.
  metadataBase: new URL(SITE_URL),
  title: "Stay with Rentico | Holiday Homes in Dubai – Book Direct",
  description:
    "Book luxury holiday homes in Downtown, Business Bay, Palm Jumeirah, Dubai Marina and Dubai Hills directly with Stay with Rentico. Best price when you book direct.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
