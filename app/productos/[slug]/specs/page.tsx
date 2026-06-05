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
  return {
    title: `${product.name} — Especificaciones técnicas`,
    description: `Especificaciones técnicas completas del ${product.name} (${categoryName}) de Mixor. ${product.description}`,
    alternates: { canonical: `https://mixor.com.ar/productos/${slug}/specs` },
    openGraph: {
      title: `${product.name} — Specs | Mixor`,
      description: product.description,
      url: `https://mixor.com.ar/productos/${slug}/specs`,
    },
  };
}

export default async function ProductSpecsPage({
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

  return (
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
        includes: getIncludes(product.name, (product as { kit?: string }).kit || ""),
        care: getCareGuide(product.category),
        compatibility: getCompatibility(product.category, product.name),
        whyChoose,
        slug,
      }}
    />
  );
}
