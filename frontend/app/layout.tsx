import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/lib/UserContext";

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
    <UserProvider> {/* Wrap the entire application to make the user data global */}
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </UserProvider>
  );
}
