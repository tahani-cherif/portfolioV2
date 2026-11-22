import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tahani Cherif | Full-Stack JavaScript Engineer",
  description:
    "Portfolio of Tahani Cherif, full-stack JavaScript engineer (Next.js, React, Node.js, NestJS) and Cloud & DevOps engineer based in Tunis.",
  openGraph: {
    title: "Tahani Cherif | Full-Stack JavaScript Engineer",
    description:
      "Next.js, React, Node.js and NestJS applications, shipped to production with Docker, Nginx and CI/CD.",
    images: ["/photo.jpeg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + " overflow-x-hidden bg-slate-950 text-slate-300 antialiased"}>
        {children}
      </body>
    </html>
  );
}
