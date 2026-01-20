import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ErrorBoundary } from "@/components/error-boundary"
import { WebVitals } from "@/components/web-vitals"
import { brandConfig } from "@/lib/brand"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: brandConfig.seo.defaultTitle,
  description: brandConfig.seo.defaultDescription,
  keywords: brandConfig.seo.keywords,
  generator: "v0.app",
  authors: [{ name: brandConfig.identity.name }],
  creator: brandConfig.identity.name,
  publisher: brandConfig.identity.name,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://word-unscrambler.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: brandConfig.seo.defaultTitle,
    description: brandConfig.seo.defaultDescription,
    siteName: brandConfig.identity.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: brandConfig.seo.defaultTitle,
    description: brandConfig.seo.defaultDescription,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <ErrorBoundary>
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
        </ErrorBoundary>
        <Analytics />
        <WebVitals />
      </body>
    </html>
  )
}
