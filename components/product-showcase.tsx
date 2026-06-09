"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { products, getProductAlt } from "@/lib/products";

function toSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-");
}

export function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredProducts = products.filter((p) => p.price !== "Próximamente").slice(0, 6);
  const carouselProducts = [
    featuredProducts[0],
    featuredProducts[2],
    featuredProducts[4],
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselProducts.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length);
  };

  const currentProduct = carouselProducts[currentIndex];

  return (
    <section id="productos" className="py-16 lg:py-32 px-4 sm:px-6 relative border-b border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div data-reveal className="text-center mb-16 lg:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Nuestra Colección
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
            Diseñados para la <span className="text-gradient-red">Excelencia</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mt-5 leading-relaxed">
            Explorá nuestros productos más destacados de <strong className="text-foreground">accesorios tecnológicos mayoristas</strong>: parlantes Bluetooth, auriculares, smartwatches, cargadores y cables importados directamente.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-12 lg:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="relative group">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-card border border-border">
                <img
                  src={currentProduct.image}
                  alt={getProductAlt(currentProduct.name)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  Producto Destacado
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  {currentProduct.name}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  {currentProduct.description}
                </p>

                {currentProduct.code && (
                  <div className="flex gap-3 mb-4">
                    <span className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-foreground border border-border">
                      {currentProduct.code}
                    </span>
                    {currentProduct.kit && (
                      <span className="px-4 py-2 bg-primary/10 rounded-lg text-sm font-medium text-primary border border-primary/20">
                        {currentProduct.kit}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prev}
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex-1 flex items-center justify-center gap-2">
                  {carouselProducts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? "w-8 bg-primary"
                          : "w-2 bg-border hover:bg-primary/50"
                      }`}
                      aria-label={`Producto ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  aria-label="Siguiente"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* View Product Link */}
              <Link
                href={`/productos/${toSlug(currentProduct.name)}`}
                className="fx-shine inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all duration-300 w-fit"
              >
                Ver Especificaciones
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center border-t border-border pt-12 lg:pt-16">
          <Link
            href="/productos"
            className="fx-shine group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-primary/25"
          >
            Ver Catálogo Completo
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            {products.filter((p) => p.price !== "Próximamente").length} productos con filtros y especificaciones técnicas
          </p>
        </div>
      </div>
    </section>
  );
}
