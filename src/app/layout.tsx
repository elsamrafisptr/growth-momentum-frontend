import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layouts from "@/components/layouts/Layouts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "Growth Momentum",
  appleWebApp: {
    title: "growthmomentum",
    capable: true,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  description:
    "Growth Momentum Research for Recommender System that including Novelty and Diversity",
  keywords: [
    "growth",
    "momentum",
    "education",
    "online course",
    "research",
    "recommender system",
  ],
  creator: "Elsam Rafi Saputra",
  authors: {
    name: "Elsam Rafi Saputra",
    url: "https://elsamrafisptr.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layouts>{children}</Layouts>
      </body>
    </html>
  );
}
