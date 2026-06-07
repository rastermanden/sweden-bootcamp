import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Natur Bootcamp Sverige | 3 dages velvære i naturen',
  description:
    '3 dages velvære-bootcamp i Sveriges smukke natur. Tabata, pilates, yoga, mindfulness og sunde måltider for 50+, alle køn.',
  keywords: 'bootcamp, Sverige, natur, fitness, yoga, pilates, tabata, mindfulness, 50+, velvære',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-warm-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
