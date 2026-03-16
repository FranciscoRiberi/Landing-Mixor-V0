import { products, categories, getProductAlt } from "@/lib/products"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

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
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Back link */}
        <Link
          href="/#productos"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Volver a productos
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden bg-card border border-border aspect-square">
            <img
              src={product.modalImage ?? product.image}
              alt={getProductAlt(product.name)}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-widest text-primary mb-2">
              {categoryName}
            </p>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>

            <div className="flex flex-wrap gap-3 mb-4">
              {product.code && (
                <span className="px-3 py-1.5 bg-secondary rounded-lg text-xs font-medium border border-border">
                  {product.code}
                </span>
              )}
              {product.kit && (
                <span className="px-3 py-1.5 bg-primary/10 rounded-lg text-xs font-medium text-primary border border-primary/20">
                  {product.kit}
                </span>
              )}
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            {"features" in product && product.features && (
              <div className="space-y-5 mb-8">
                {(product.features as { icon: React.ElementType; title: string; description: string }[]).map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <feature.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <a
              href="/#contacto"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all"
            >
              Consultar Precio Mayorista
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
