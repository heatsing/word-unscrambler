import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

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
    url: 'https://wordunscrambler.cc',
    siteName: 'Word Unscrambler',
    title: 'Word Unscrambler - Solve Wordle, Scrabble & Word Games Fast',
    description: 'Free word unscrambler & anagram solver for Wordle, Scrabble, Words with Friends. Instantly find valid words from letters.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Unscrambler - Solve Wordle, Scrabble & Word Games Fast',
    description: 'Free word unscrambler & anagram solver. Instantly find valid words from letters.',
  },
  alternates: {
    canonical: 'https://wordunscrambler.cc',
  },
  verification: {
    google: 'google-site-verification-code', // 请替换为实际的验证码
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
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://wordunscrambler.cc/word-unscrambler?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
