import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter, Parisienne } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const parisienne = Parisienne({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-parisienne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Olhares que Transformam | Formação em Desenvolvimento Infantil',
  description:
    'Formação online com a psicóloga e neuropsicóloga Shirlei de Vargas Saldanha para professoras da Educação Infantil: aprenda a identificar sinais de alerta no desenvolvimento infantil com segurança. Dias 03 e 04 de agosto.',
  generator: 'v0.app',
  icons: {
    // Browsers/cache-friendly
    icon: [
      {
        url: '/favicon.png',
        sizes: 'any',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      },
    ],
    apple: {
      url: '/favicon.png',
      sizes: 'any',
    },
    shortcut: {
      url: '/favicon.png',
      sizes: 'any',
    },
  },
}


export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#faf6ee',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`light ${inter.variable} ${fraunces.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
