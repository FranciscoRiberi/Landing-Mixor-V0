import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProductsCatalog } from "@/components/products-catalog";
import { isMundialTheme } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Catálogo de Productos Mayoristas",
  description:
    "Catálogo completo de accesorios tecnológicos mayoristas Mixor: parlantes Bluetooth, auriculares, smartwatches, cargadores y cables.",
  alternates: { canonical: "https://mixor.com.ar/productos" },
  openGraph: {
    title: "Catálogo de Productos Mayoristas | Mixor",
    description: "Explorá todo el catálogo mayorista de Mixor con filtros y especificaciones técnicas.",
    url: "https://mixor.com.ar/productos",
  },
};

export default function ProductosPage() {
  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col">
      <Navigation isMundial={isMundialTheme} />

      <main className="flex-1 pt-28 sm:pt-32">
        <header className="relative px-4 sm:px-6 pb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] mb-4 text-primary">
            Catálogo Mayorista
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-4">
            Todos nuestros <span className="text-primary">productos</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Filtrá por categoría, buscá lo que necesitás y entrá a las
            especificaciones técnicas de cada producto importado directamente.
          </p>
        </header>

        <ProductsCatalog />
      </main>

      <Footer />
    </div>
  );
}
