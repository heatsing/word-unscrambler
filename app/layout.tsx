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
import {
  getOrganizationSchema,
  getServiceSchema,
  getWebApplicationSchema,
  getWebsiteSchema,
} from "@/lib/structured-data"

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
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Word Unscrambler',
  },
  category: "games",
  applicationName: "Word Unscrambler",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Keep these values in sync with the footer's default display.
  const baseVotes = 2960
  const baseAverage = 4.6

  const organizationSchema = getOrganizationSchema()
  const websiteSchema = getWebsiteSchema()
  const serviceSchema = getServiceSchema()
  const webAppSchema = getWebApplicationSchema({ ratingValue: baseAverage, ratingCount: baseVotes })

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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
