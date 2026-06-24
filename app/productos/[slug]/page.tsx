import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  products,
  categories,
  getProductAlt,
  getProductBySlug,
  getAccent,
  toSlug,
  getUseCases,
  getCareGuide,
  getCompatibility,
  getIncludes,
} from "@/lib/products";
import { ProductSpecsShowcase } from "@/components/ui/product-specs-showcase";

type RawFeature = { icon: { displayName?: string }; title: string; description: string };

function hasFeatures(p: unknown): p is { features: RawFeature[] } {
  return (
    !!p &&
    typeof p === "object" &&
    Array.isArray((p as { features?: unknown }).features)
  );
}

export function generateStaticParams() {
  return products
    .filter((p) => hasFeatures(p))
    .map((p) => ({ slug: toSlug(p.name) }));
}

const productSeo: Record<string, { title: string; description: string }> = {
  "cable-origen": {
    title: "Cable Origen Micro USB (V8) 5.4A Mallado | Mayorista | Mixor",
    description: "Cable USB a Micro USB (V8) mayorista. Malla de nylon trenzado, 1 metro, carga rápida 5.4A. Importado directo, kit cerrado, envíos a todo el país.",
  },
  "cargador-sinergia": {
    title: "Cargador de Auto Sinergia 50W PD USB-C | Mayorista | Mixor",
    description: "Cargador para auto mayorista 50W con carga rápida PD. Doble puerto USB-A + USB-C, portátil. Importado directo, kit cerrado, envíos a todo el país.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const categoryName =
    categories.find((c) => c.id === product.category)?.name ?? product.category;
  const custom = productSeo[slug];
  return {
    title: custom?.title ?? `${product.name} — Especificaciones técnicas`,
    description: custom?.description ?? `Especificaciones técnicas completas del ${product.name} (${categoryName}) de Mixor. ${product.description}`,
    alternates: { canonical: `https://mixor.com.ar/productos/${slug}` },
    openGraph: {
      title: `${product.name} — Mixor`,
      description: product.description,
      url: `https://mixor.com.ar/productos/${slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || !hasFeatures(product)) notFound();

  const accent = getAccent(product.category);
  const categoryName =
    categories.find((c) => c.id === product.category)?.name ?? product.category;
  const image =
    (product as { modalImage?: string }).modalImage ?? product.image;

  const whyChoose = [
    ...product.features.slice(0, 3).map((f) => f.title),
    `Kit x ${(product as { kit?: string }).kit?.match(/\d+/)?.[0] || "1"} unidades`,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "Mixor" },
    mpn: product.code,
    image: `https://mixor.com.ar${image}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "ARS",
      seller: { "@type": "Organization", name: "Mixor" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductSpecsShowcase
        data={{
          name: product.name,
          categoryLabel: categoryName,
          description: product.description,
          image,
          imageAlt: getProductAlt(product.name),
          code: product.code,
          kit: (product as { kit?: string }).kit,
          accentRgb: accent.rgb,
          accentGradient: accent.gradient,
          features: product.features.map((f) => ({
            iconName: f.icon?.displayName ?? "Sparkles",
            title: f.title,
            description: f.description,
          })),
          useCases: getUseCases(product.category),
          includes: getIncludes(product.name, product.category),
          care: getCareGuide(product.category),
          compatibility: getCompatibility(product.category, product.name),
          variants: (product as { variants?: string[] }).variants,
          whyChoose,
          slug,
        }}
      />
    </>
  );
}
