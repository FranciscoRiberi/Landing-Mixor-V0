import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const BASE_URL = 'https://mixor.com.ar'

const jsonLdOrg = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Mixor',
  url: BASE_URL,
  logo: `${BASE_URL}/images/mixor-logo-importador-mayorista-tecnologia-argentina.webp`,
  description: 'Importadores directos de accesorios tecnológicos en Argentina. Más de 8 años distribuyendo parlantes Bluetooth, auriculares, smartwatches, cargadores y cables al por mayor para distribuidores y mayoristas de todo el país.',
  foundingDate: '2016',
  areaServed: { '@type': 'Country', name: 'Argentina' },
  address: { '@type': 'PostalAddress', addressCountry: 'AR' },
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', availableLanguage: 'Spanish', contactOption: 'TollFree' }],
  sameAs: [
    'https://www.instagram.com/mixoroficial/',
    'https://www.tiktok.com/@mixoroficial',
    'https://www.facebook.com/p/Mixor-61558422137441/',
  ],
  knowsAbout: [
    'Accesorios tecnológicos mayoristas', 'Importación directa de electrónica',
    'Parlantes Bluetooth', 'Auriculares inalámbricos', 'Smartwatches',
    'Cargadores rápidos', 'Cables USB', 'Distribución mayorista Argentina',
  ],
}

const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mixor',
  url: BASE_URL,
  description: 'Importador directo de accesorios tecnológicos para distribuidores y mayoristas en Argentina',
  inLanguage: 'es-AR',
  publisher: { '@type': 'Organization', name: 'Mixor' },
}

const jsonLdProducts = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Catálogo de Accesorios Tecnológicos Mayoristas Mixor',
  description: 'Productos importados directamente disponibles para distribuidores y mayoristas en Argentina',
  itemListElement: [
    { '@type': 'ListItem', position: 1, item: { '@type': 'Product', name: 'Parlantes Bluetooth Mayorista', description: 'Parlantes Bluetooth de alta rotación para distribuidores. Modelos con luces RGB, radio FM y conectividad inalámbrica. Importados directamente por Mixor.', brand: { '@type': 'Brand', name: 'Mixor' }, category: 'Parlantes Bluetooth', offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'ARS', seller: { '@type': 'Organization', name: 'Mixor' } } } },
    { '@type': 'ListItem', position: 2, item: { '@type': 'Product', name: 'Auriculares Inalámbricos Mayorista', description: 'Auriculares TWS y inalámbricos para reventa. Alta rotación con precio mayorista competitivo.', brand: { '@type': 'Brand', name: 'Mixor' }, category: 'Auriculares', offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'ARS', seller: { '@type': 'Organization', name: 'Mixor' } } } },
    { '@type': 'ListItem', position: 3, item: { '@type': 'Product', name: 'Smartwatches Mayorista', description: 'Relojes inteligentes para distribuidores argentinos. Alta rotación y precios mayoristas directos del importador.', brand: { '@type': 'Brand', name: 'Mixor' }, category: 'Smartwatches', offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'ARS', seller: { '@type': 'Organization', name: 'Mixor' } } } },
    { '@type': 'ListItem', position: 4, item: { '@type': 'Product', name: 'Cargadores y Cables Mayorista', description: 'Cargadores rápidos y cables tipo C al por mayor. Importados directamente, ideales para kioscos, distribuidoras y comercios.', brand: { '@type': 'Brand', name: 'Mixor' }, category: 'Cargadores y Cables', offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'ARS', seller: { '@type': 'Organization', name: 'Mixor' } } } },
  ],
}

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '¿Qué es Mixor y qué vende?', acceptedAnswer: { '@type': 'Answer', text: 'Mixor es un importador directo argentino especializado en accesorios tecnológicos de alta rotación. Vende al por mayor parlantes Bluetooth, auriculares inalámbricos, smartwatches, cargadores rápidos y cables a distribuidores y mayoristas de todo Argentina.' } },
    { '@type': 'Question', name: '¿Cómo comprar accesorios tecnológicos al por mayor en Argentina?', acceptedAnswer: { '@type': 'Answer', text: 'Mixor ofrece un programa de distribuidores oficial con precios especiales por volumen, compras a bulto cerrado, material promocional exclusivo y envíos a todo el país. Podés contactar a un asesor de ventas directamente por WhatsApp desde mixor.com.ar.' } },
    { '@type': 'Question', name: '¿Cuál es el monto mínimo de compra mayorista en Mixor?', acceptedAnswer: { '@type': 'Answer', text: 'Mixor trabaja con compras a bulto cerrado. Para conocer el monto mínimo actual y las promociones para nuevos distribuidores, se puede consultar directamente con los asesores de venta por WhatsApp.' } },
    { '@type': 'Question', name: '¿Mixor hace envíos a todo Argentina?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Mixor realiza envíos a todas las provincias de Argentina. Los distribuidores de Buenos Aires, Córdoba, Rosario, Mendoza y el interior del país pueden recibir sus pedidos con logística coordinada.' } },
    { '@type': 'Question', name: '¿Cuáles son los beneficios del programa de distribuidores de Mixor?', acceptedAnswer: { '@type': 'Answer', text: 'Los distribuidores oficiales de Mixor acceden a precios especiales por volumen, material promocional exclusivo, soporte técnico prioritario, capacitación sobre productos y envíos a todo el país.' } },
  ],
}

export const viewport: Viewport = {
  themeColor: '#e63030',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Mixor | Importador Directo de Accesorios Tecnológicos Mayoristas Argentina',
    template: '%s | Mixor - Mayorista Argentina',
  },
  description: 'Importador directo de accesorios tecnológicos mayoristas en Argentina. Parlantes Bluetooth, auriculares, smartwatches, cargadores y cables al por mayor. Envíos a todo el país.',
  keywords: [
    'accesorios tecnológicos mayoristas', 'importador directo argentina',
    'parlantes bluetooth mayorista', 'auriculares mayorista',
    'smartwatch mayorista', 'cargadores mayorista',
    'distribuidores tecnología argentina',
  ],
  authors: [{ name: 'Mixor' }],
  creator: 'Mixor',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: BASE_URL,
    siteName: 'Mixor',
    title: 'Mixor | Importador Directo de Accesorios Tecnológicos Mayoristas',
    description: 'Importador directo de accesorios tecnológicos mayoristas en Argentina. Parlantes, auriculares, smartwatches, cargadores y cables al por mayor.',
    images: [
      {
        url: `${BASE_URL}/images/parlantes-bluetooth-mixor-accesorios-mayoristas-argentina.webp`,
        width: 1200,
        height: 630,
        alt: 'Mixor - Accesorios Tecnológicos Mayoristas Argentina',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mixor | Importador Directo Mayorista Argentina',
    description: 'Accesorios tecnológicos mayoristas importados directamente. Parlantes, auriculares, smartwatches y más.',
    images: [`${BASE_URL}/images/parlantes-bluetooth-mixor-accesorios-mayoristas-argentina.webp`],
    site: '@mixoroficial',
    creator: '@mixorificial',
  },
  other: {
    'application/ld+json:org': JSON.stringify(jsonLdOrg),
    'application/ld+json:web': JSON.stringify(jsonLdWebsite),
    'application/ld+json:products': JSON.stringify(jsonLdProducts),
    'application/ld+json:faq': JSON.stringify(jsonLdFaq),
  },
  icons: {
    icon: [
      { url: '/images/mixor-logo-importador-mayorista-tecnologia-argentina.webp', type: 'image/png', sizes: 'any' },
    ],
    apple: [
      { url: '/images/mixor-logo-importador-mayorista-tecnologia-argentina.webp', type: 'image/png', sizes: '180x180' },
    ],
    shortcut: '/images/mixor-logo-importador-mayorista-tecnologia-argentina.webp',
  },
  verification: {
    google: '',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
