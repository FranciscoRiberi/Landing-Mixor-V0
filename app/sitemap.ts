import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = 'https://mixor.com.ar'

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/#productos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/#nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/#distribuidor`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/#contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Product pages
    ...[
      'parlante-impetu', 'parlante-latido', 'parlante-curvas', 'parlante-mio',
      'parlante-leal', 'parlante-mito', 'parlante-noche', 'parlante-caos',
      'parlante-alma', 'smartwatch-pulso', 'smartwatch-momentos', 'tws-claridad',
      'auriculares-fusion', 'auriculares-sensacion', 'cable-vinculo', 'cable-impulso',
      'cable-vital', 'cargador-leyenda', 'cargador-somos', 'cargador-proton',
      'cargador-quiero', 'cargador-realidad', 'inflador-ruta', 'holder-atrae',
      'cargador-nexo', 'parlante-recuerdo',
    ].map((slug) => ({
      url: `${BASE_URL}/productos/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
