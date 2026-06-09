import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { ProductsCatalog } from "@/components/products-catalog";
import FloatingNav from "@/components/floating-nav";
import { isMundialTheme } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Catálogo de Productos Mayoristas",
  description:
    "Catálogo completo de accesorios tecnológicos mayoristas Mixor: parlantes Bluetooth, auriculares, smartwatches, cargadores y cables. Filtrá por categoría y consultá las especificaciones de cada producto.",
  alternates: { canonical: "https://mixor.com.ar/productos" },
  openGraph: {
    title: "Catálogo de Productos Mayoristas | Mixor",
    description:
      "Explorá todo el catálogo mayorista de Mixor con filtros y especificaciones técnicas de cada producto.",
    url: "https://mixor.com.ar/productos",
  },
};

export default function ProductosPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Aurora Glow - Celeste Argentina */}
        <div
          className="absolute inset-0"
          style={{
            background: isMundialTheme
              ? "radial-gradient(circle at 50% 0%, rgba(117, 170, 219, 0.15), transparent 55%)"
              : "radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15), transparent 55%)",
          }}
        />
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, #000 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, #000 20%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <FloatingNav />

        <main className="flex-1 pt-28 sm:pt-32">
          {/* Hero header */}
          <header className="relative px-4 sm:px-6 pb-12 text-center">
            <p className={`text-xs uppercase tracking-[0.3em] mb-4 ${
              isMundialTheme ? "text-cyan-400" : "text-blue-400"
            }`}>
              Catálogo Mayorista
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-4 text-white">
              Todos nuestros <span className="fx-text-shimmer" style={{
                background: isMundialTheme
                  ? "linear-gradient(135deg, #75AADB 0%, #F5D547 100%)"
                  : "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>productos</span>
            </h1>
            <p className="text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Filtrá por categoría, buscá lo que necesitás y entrá a las
              especificaciones técnicas de cada producto importado directamente.
            </p>
          </header>

          <ProductsCatalog />
        </main>

        <Footer />
      </div>
    </div>
  );
}
