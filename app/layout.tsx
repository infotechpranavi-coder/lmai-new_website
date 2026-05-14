import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'LMAI - Label Manufacturers Association of India',
  description: 'The official institutional archive and hub for the Indian label manufacturing industry.',
  generator: 'v0.app',
}

import { Toaster } from 'sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <Toaster position="top-right" richColors />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  )
}
