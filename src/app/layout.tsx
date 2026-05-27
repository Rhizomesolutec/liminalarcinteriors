import type { Metadata } from "next";
import { Geist, Geist_Mono, Epilogue, Manrope } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "@/lib/lenis";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "Liminal Arc ",
  description:
    "Discover top-quality services and solutions tailored to your needs. Stay ahead with our innovative platform and expert insights.",
  
  verification: {
    google: "QoPHiL7DLNUwfkqLtV7Muo3CMHkNMy4VEX1ccDibz_k", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3L760462ZP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3L760462ZP');
          `}
        </Script>
      </head>
      <ReactLenis root>
        <Analytics />
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${epilogue.variable} ${manrope.variable} antialiased`}
        >
        
            {children}
            <Toaster richColors theme="dark" position="top-center" />
          
        </body>
      </ReactLenis>
    </html>
  );
}
