: import { Analytics } from '@vercel/analytics/next'
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
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    shortcut: {
      url: '/favicon.ico',
      sizes: 'any',
    },
  },
}



export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#faf6ee',
}

// Extra hardening for favicon in some browsers/cases
// (Next metadata usually handles this, but we also provide explicit tags.)


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`light ${inter.variable} ${fraunces.variable} bg-background`}>
      <head>
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-192x192.png" sizes="192x192" />
        <link rel="icon" href="/favicon-512x512.png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

