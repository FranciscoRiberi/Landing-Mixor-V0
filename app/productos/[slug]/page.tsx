import { products, categories, getProductAlt } from "@/lib/products"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

function toSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
}

export async function generateStaticParams() {
  return products
    .filter((p) => p.price !== "Próximamente")
    .map((p) => ({ slug: toSlug(p.name) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => toSlug(p.name) === slug)
  if (!product) return {}
  const categoryName =
    categories.find((c) => c.id === product.category)?.name ?? product.category
  return {
    title: `${product.name} - Mixor ${categoryName} Mayorista Argentina`,
    description: product.description,
    keywords: [
      product.name,
      `${categoryName} mayorista Argentina`,
      "importador directo Argentina",
      "Mixor",
      `${product.name} precio mayorista`,
    ],
    alternates: {
      canonical: `https://mixor.com.ar/productos/${slug}`,
    },
    openGraph: {
      title: `${product.name} | Mixor - Importador Directo Mayorista`,
      description: product.description,
      images: [
        {
          url: product.modalImage ?? product.image,
          alt: getProductAlt(product.name),
        },
      ],
      url: `https://mixor.com.ar/productos/${slug}`,
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = products.find((p) => toSlug(p.name) === slug)
  if (!product) notFound()

  const categoryName =
    categories.find((c) => c.id === product.category)?.name ?? product.category

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Back button — sticky on mobile */}
          <div className="sticky top-20 z-30 mb-6 md:static md:mb-10">
            <Link
              href="/#productos"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors bg-background/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none py-2 pr-4 rounded-full"
            >
              <ArrowLeft size={16} />
              Volver a productos
            </Link>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

            {/* Image — full width on mobile, aspect-square */}
            <div className="rounded-2xl overflow-hidden bg-card border border-border aspect-square w-full">
              <img
                src={product.modalImage ?? product.image}
                alt={getProductAlt(product.name)}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center gap-4">

              {/* Category */}
              <p className="text-xs uppercase tracking-widest text-primary font-semibold">
                {categoryName}
              </p>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {product.code && (
                  <span className="px-3 py-1.5 bg-secondary rounded-lg text-xs font-medium border border-border whitespace-nowrap">
                    {product.code}
                  </span>
                )}
                {product.kit && (
                  <span className="px-3 py-1.5 bg-primary/10 rounded-lg text-xs font-medium text-primary border border-primary/20 whitespace-nowrap">
                    {product.kit}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              {"features" in product && product.features && (
                <div className="space-y-4">
                  {(
                    product.features as {
                      icon: React.ElementType
                      title: string
                      description: string
                    }[]
                  ).map((feature, idx) => (
                    <div key={idx} className="flex gap-3 md:gap-4">
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <feature.icon size={16} className="text-primary md:hidden" />
                        <feature.icon size={20} className="text-primary hidden md:block" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm md:text-base">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              <a
                href="/#contacto"
                className="inline-flex w-full md:w-auto items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-base hover:bg-primary/90 transition-all shadow-[0_2px_12px_rgba(255,49,49,0.4)] hover:shadow-[0_4px_20px_rgba(255,49,49,0.5)] hover:-translate-y-0.5 mt-2"
              >
                Consultar Precio Mayorista
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
