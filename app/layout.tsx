// app/layout.tsx
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar"; 
import Footer from "./components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "India Wapsi | Connect Back to India",
  description: "Concierge Services for NRIs and Overseas Indians",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          
          <Navbar /> 
          <main className="p-4">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
