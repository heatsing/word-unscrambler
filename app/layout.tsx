import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
// import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { KeyboardShortcutsProvider } from "@/components/keyboard-shortcuts-provider"
import { WebVitals } from "@/components/web-vitals"
import { ServiceWorkerRegister } from "@/components/service-worker-register"
import { Toaster } from "sonner"
import "./globals.css"

// Note: next/font disabled due to build environment network restrictions
// In production, consider using a self-hosted font or enable in deployment
// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
//   preload: true,
//   variable: '--font-inter',
//   fallback: ['system-ui', 'arial'],
// })

export const metadata: Metadata = {
  metadataBase: new URL('https://wordunscrambler.cc'),
  title: {
    default: "Word Unscrambler - Solve Wordle, Scrabble & Word Games Fast",
    template: "%s | Word Unscrambler"
  },
  description:
    "Free word unscrambler & anagram solver for Wordle, Scrabble, Words with Friends. Instantly find valid words from letters, beat any word puzzle game.",
  keywords: [
    "word unscrambler",
    "anagram solver",
    "wordle solver",
    "scrabble word finder",
    "words with friends cheat",
    "unscramble letters",
    "word finder",
    "word game helper",
  ],
  authors: [{ name: "Word Unscrambler" }],
  creator: "Word Unscrambler",
  publisher: "Word Unscrambler",
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['en_GB', 'en_CA', 'en_AU', 'en_NZ'],
    url: 'https://wordunscrambler.cc',
    siteName: 'Word Unscrambler',
    title: 'Word Unscrambler - Solve Wordle, Scrabble & Word Games Fast',
    description: 'Free word unscrambler & anagram solver for Wordle, Scrabble, Words with Friends. Instantly find valid words from letters.',
    images: [
      {
        url: 'https://wordunscrambler.cc/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Word Unscrambler - Word Game Solver',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Unscrambler - Solve Wordle, Scrabble & Word Games Fast',
    description: 'Free word unscrambler & anagram solver. Instantly find valid words from letters.',
    images: ['https://wordunscrambler.cc/opengraph-image'],
  },
  alternates: {
    canonical: 'https://wordunscrambler.cc',
    languages: {
      'en-US': 'https://wordunscrambler.cc',
      'en-GB': 'https://wordunscrambler.cc',
      'en-CA': 'https://wordunscrambler.cc',
      'en-AU': 'https://wordunscrambler.cc',
      'en-NZ': 'https://wordunscrambler.cc',
      'x-default': 'https://wordunscrambler.cc',
    },
  },
  verification: {
    google: 'google-site-verification-code', // 请替换为实际的验证码
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Word Unscrambler',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Word Unscrambler",
    "url": "https://wordunscrambler.cc",
    "logo": "https://wordunscrambler.cc/opengraph-image",
    "description": "Free word unscrambler and anagram solver for word games",
    "foundingDate": "2024",
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "sameAs": [
      // 社交媒体链接
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Word Unscrambler",
    "url": "https://wordunscrambler.cc",
    "description": "Free word unscrambler & anagram solver for Wordle, Scrabble, Words with Friends",
    "inLanguage": ["en-US", "en-GB", "en-CA", "en-AU"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://wordunscrambler.cc/word-unscrambler?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Word Unscrambler Service",
    "description": "Free online word unscrambler and anagram solver tool for word games",
    "provider": {
      "@type": "Organization",
      "name": "Word Unscrambler",
      "url": "https://wordunscrambler.cc"
    },
    "serviceType": "Online Word Game Solver",
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://wordunscrambler.cc",
      "serviceType": "Online"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Hreflang tags for GEO targeting */}
        <link rel="alternate" hreflang="en-US" href="https://wordunscrambler.cc" />
        <link rel="alternate" hreflang="en-GB" href="https://wordunscrambler.cc" />
        <link rel="alternate" hreflang="en-CA" href="https://wordunscrambler.cc" />
        <link rel="alternate" hreflang="en-AU" href="https://wordunscrambler.cc" />
        <link rel="alternate" hreflang="en-NZ" href="https://wordunscrambler.cc" />
        <link rel="alternate" hreflang="x-default" href="https://wordunscrambler.cc" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-FKV97BJX9X"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FKV97BJX9X');
            `,
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <KeyboardShortcutsProvider>
            <ServiceWorkerRegister />
            <WebVitals />
            <SiteHeader />
            <ErrorBoundary>
              <main className="min-h-screen">{children}</main>
            </ErrorBoundary>
            <SiteFooter />
            <Analytics />
            <Toaster position="bottom-right" richColors />
          </KeyboardShortcutsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
