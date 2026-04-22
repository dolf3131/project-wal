import React from "react"
import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { SiteTransitionProvider } from "@/components/site-transition-provider"
import { withAssetHost } from "@/lib/asset-url"

export const metadata: Metadata = {
  title: 'Physics & Quantum Computing Researcher',
  description: 'Portfolio of a Physics major and Software Developer specializing in Quantum AI and Blockchain',
  generator: 'v0.app',
  icons: {
    icon: [{ url: withAssetHost('/icon.svg'), type: 'image/svg+xml' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-cmds-grid text-foreground min-h-screen">
        <SiteTransitionProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <FooterSection />
          </div>
        </SiteTransitionProvider>
      </body>
    </html>
  )
}
