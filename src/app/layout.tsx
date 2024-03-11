import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// shadcn/ui style additions
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider";

// shadcn/ui font
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "trivia night",
  description: "test your knowledge across a variety of categories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable)}>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
      </body>
    </html>
  );
}
