import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/lib/UserContext";
import ClientProvider from "./components/ClientProvider";
import { Toaster } from "react-hot-toast";


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
        <body className={inter.className}>
        <UserProvider> {/* Wrap the entire application to make the user data global */}
          <Toaster />
          {children}
        </UserProvider>
        </body>
      </html>
    </ClientProvider>
  );
}
