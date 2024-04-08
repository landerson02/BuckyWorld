import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "./components/ClientProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuckyWorld",
  description: "Explore the city of Madison, Wisconsin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClientProvider>
  );
}
