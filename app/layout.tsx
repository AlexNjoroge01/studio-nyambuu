import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";

import "./globals.css";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { JsonLd } from "@/components/seo/json-ld";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { organizationSchema } from "@/lib/schema";
import { defaultKeywords } from "@/lib/seo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand.name} — Personal Stylist & Fashion Boutique in Nairobi`,
    template: `%s | ${site.brand.name}`,
  },
  description: site.description,
  keywords: defaultKeywords,
  applicationName: site.brand.name,
  authors: [{ name: site.name, url: `${site.url}/about` }],
  creator: site.name,
  publisher: site.brand.name,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: site.url,
    siteName: site.brand.name,
    title: `${site.brand.name} — Personal Stylist & Fashion Boutique in Nairobi`,
    description: site.description,
    images: [
      {
        url: `${site.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${site.brand.name} — personal styling in Nairobi`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand.name} — Personal Stylist in Nairobi`,
    description: site.description,
    images: [`${site.url}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
  },
  /** TODO(client): add Google Search Console / Bing verification tokens after launch */
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-KE"
      className={cn(cormorant.variable, jost.variable, "antialiased")}
    >
      <body className="min-h-svh bg-paper text-ink">
        <TooltipProvider delayDuration={200}>
          <a
            href="#main"
            className="sr-only z-[100] rounded-full bg-ink px-5 py-3 text-sm text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <CustomCursor />
          <Header />
          <main id="main" className="min-h-svh pt-[72px] md:pt-20">
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
          <Toaster position="bottom-center" richColors closeButton />
        </TooltipProvider>
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
