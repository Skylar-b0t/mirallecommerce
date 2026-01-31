import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/redux/StoreProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mirall.vercel.app'),
  title: {
    default: "Mirall Technology - Premium Electronics Store | Nairobi, Kenya",
    template: "%s | Mirall Technology"
  },
  description: "Discover premium electronics from leading brands at Mirall Technology, Nairobi's trusted electronics destination. Shop laptops, smartphones, audio, cameras & more. Authorized reseller with 30-day returns and free shipping on orders over KES 10,000.",
  keywords: [
    "electronics store Nairobi",
    "buy laptops Kenya",
    "smartphones Nairobi",
    "audio equipment Kenya",
    "cameras Nairobi",
    "premium electronics",
    "authorized Apple reseller Kenya",
    "Samsung store Nairobi",
    "tech store Kenya",
    "online electronics shopping",
    "M-Pesa payment",
    "free shipping Kenya"
  ],
  authors: [{ name: "Mirall Technology" }],
  creator: "Mirall Technology",
  publisher: "Mirall Technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://mirall.vercel.app",
    siteName: "Mirall Technology",
    title: "Mirall Technology - Premium Electronics Store in Nairobi",
    description: "Shop premium electronics from leading brands. Authorized reseller with 30-day returns and free shipping on orders over KES 10,000.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mirall Technology - Premium Electronics Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mirall Technology - Premium Electronics Store",
    description: "Shop premium electronics from leading brands in Nairobi, Kenya",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen antialiased bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <StoreProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </StoreProvider>
          </AuthProvider>
        </ThemeProvider>
        <JsonLd />
      </body>
    </html>
  );
}
