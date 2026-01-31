import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/redux/StoreProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mirall Technology - Premium Electronics Store | Nairobi, Kenya",
  description: "Discover premium electronics from leading brands at Mirall Technology, Nairobi's trusted electronics destination. Authorized reseller with 30-day returns and free shipping on orders over KES 10,000.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen antialiased">
        <StoreProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
