"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { products, categories, getProductAlt } from "@/lib/products";

function toSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export function ProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("parlantes");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <>
      <section id="productos" className="py-16 lg:py-32 px-4 sm:px-6 relative border-b border-border">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-20">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              Nuestra Colección
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
              Diseñados para la <span className="text-gradient-red">Excelencia</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mt-5 leading-relaxed">
              Cada mes renovamos nuestro catálogo de <strong className="text-foreground">accesorios tecnológicos mayoristas</strong>: parlantes Bluetooth, auriculares inalámbricos, smartwatches, cargadores rápidos y cables. Importados directamente, listos para abastecer distribuidores y mayoristas con los mejores precios de Argentina.
            </p>
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:grid sm:grid-cols-3 lg:grid-cols-6 lg:gap-4 mb-10 lg:mb-20">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2.5 sm:px-6 sm:py-4 text-sm sm:text-base rounded-xl font-medium text-center transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                    : "bg-card border border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div key={selectedCategory} className="animate-scale-in">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
              {filteredProducts.map((product, index) => {
                const isActive = product.price !== "Próximamente";
                const slug = toSlug(product.name);

                const cardContent = (
                  <>
                    <div className="relative aspect-square">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={getProductAlt(product.name)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/50 via-card/15 to-transparent" />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6">
                      <div className="flex items-end justify-between gap-1">
                        <div className="min-w-0">
                          <h3 className="text-sm sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight truncate">
                            {product.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{product.price}</p>
                        </div>
                        {isActive && (
                          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg shadow-primary/25">
                            <ArrowRight size={14} className="sm:hidden" />
                            <ArrowRight size={18} className="hidden sm:block" />
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </>
                );

                if (isActive) {
                  return (
                    <Link
                      key={product.id}
                      href={`/productos/${slug}`}
                      className="group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-500 hover:border-primary/50 hover-lift"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {cardContent}
                    </Link>
                  );
                }

                return (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-500 cursor-default opacity-70"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Product Modal — kept for non-navigable cards if needed, driven by selectedProduct */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-card rounded-3xl border border-border shadow-2xl overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2 gap-6 p-5 sm:p-8 lg:p-12">
              <div className="relative aspect-[4/3] md:aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-background to-secondary/20">
                <img
                  src={"modalImage" in selectedProduct ? (selectedProduct.modalImage ?? selectedProduct.image) : selectedProduct.image}
                  alt={getProductAlt(selectedProduct.name)}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  {categories.find((c) => c.id === selectedProduct.category)?.name}
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {selectedProduct.name}
                </h2>

                <div className="flex flex-wrap gap-3 mb-4">
                  {selectedProduct.code && (
                    <span className="px-3 py-1.5 bg-secondary rounded-lg text-xs font-medium text-foreground border border-border">
                      {selectedProduct.code}
                    </span>
                  )}
                  {selectedProduct.kit && (
                    <span className="px-3 py-1.5 bg-primary/10 rounded-lg text-xs font-medium text-primary border border-primary/20">
                      {selectedProduct.kit}
                    </span>
                  )}
                </div>

                <p className="text-2xl font-semibold text-primary mb-8">{selectedProduct.price}</p>

                {"features" in selectedProduct && selectedProduct.features && (
                  <div className="space-y-6 mb-8">
                    {(selectedProduct.features as { icon: React.ElementType; title: string; description: string }[]).map((feature, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <feature.icon size={20} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <a
                  href="#contacto"
                  onClick={() => setSelectedProduct(null)}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                >
                  Consultar Precio
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
