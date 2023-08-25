import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProider } from "@/providers/modal-provider";

import "./globals.css";
import { TosterProvider } from "@/providers/toast-provider";
import { Loader } from "@/components/ui/loader";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <TosterProvider />
            <ModalProider />

            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
