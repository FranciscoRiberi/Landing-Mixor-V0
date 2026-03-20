"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products, categories } from "@/lib/products";

const newProducts = products.filter((p) => (p as { isNew?: boolean }).isNew);

function toSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

const TICKER_ITEMS = [
  "Nuevos ingresos cada mes",
  "Stock disponible de inmediato",
  "Importado directamente",
  "Envíos a todo el país",
  "Precios mayoristas",
  "Alta rotación garantizada",
];

export function NewArrivalsSection() {
  // Triple the cards so the CSS animation resets on the 1/3 mark seamlessly.
  // With 5 products × 3 = 15 cards, the track is wide enough that the loop
  // reset (translateX -33.333%) is never visible at any screen width.
  const loopedProducts = [...newProducts, ...newProducts, ...newProducts];
  const loopedTicker = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section
      id="novedades"
      className="relative py-16 border-t border-b border-border overflow-hidden bg-background"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(var(--primary) / 0.10) 0%, transparent 100%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between px-8 md:px-10 mb-10">
        <div className="flex flex-col gap-3">
          {/* Pulsing dot + label */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-30" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs tracking-widest text-primary uppercase font-semibold">
              Este mes
            </span>
          </div>

          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Nuevos{" "}
            <span className="text-primary">Ingresos</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Productos que llegaron al depósito este mes
          </p>
        </div>

        <p className="text-xs text-muted-foreground/40 max-w-[160px] text-right hidden md:block">
          Agregá isNew: true en products.ts y aparece acá
        </p>
      </div>

      {/* Scroll track */}
      <div className="relative z-10">
        {/* Edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{
            background:
              "linear-gradient(to right, hsl(var(--background)), transparent)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{
            background:
              "linear-gradient(to left, hsl(var(--background)), transparent)",
          }}
        />

        {/* Inner track */}
        <div
          className="flex gap-4 px-8 w-max"
          style={{ animation: "scroll 22s linear infinite" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLDivElement).style.animationPlayState =
              "paused")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLDivElement).style.animationPlayState =
              "running")
          }
        >
          {loopedProducts.map((product, idx) => {
            const cat = categories.find((c) => c.id === product.category);
            const p = product as typeof product & {
              arrivedAt?: string;
              isNew?: boolean;
            };

            return (
              <Link
                key={`${product.id}-${idx}`}
                href={`/productos/${toSlug(product.name)}`}
                className="group relative w-48 flex-shrink-0 rounded-[22px] overflow-hidden transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(255,255,255,0.07)";
                  el.style.border = "1px solid rgba(226,75,74,0.40)";
                  el.style.boxShadow = "0 8px 32px rgba(226,75,74,0.10)";
                  el.style.transform = "translateY(-6px) scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(255,255,255,0.04)";
                  el.style.border = "1px solid rgba(255,255,255,0.09)";
                  el.style.boxShadow = "";
                  el.style.transform = "";
                }}
              >
                {/* Glass highlight line */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-3 right-3 h-px z-10"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.20), transparent)",
                  }}
                />

                {/* Badge NUEVO */}
                <div
                  className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full text-white text-[9px] font-bold tracking-wider"
                  style={{
                    background: "rgba(226,75,74,0.85)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  NUEVO
                </div>

                {/* Badge arrivedAt */}
                {p.arrivedAt && (
                  <div
                    className="absolute top-2.5 right-2.5 z-10 px-2 py-1 rounded-full text-white/45 text-[9px]"
                    style={{
                      background: "rgba(0,0,0,0.50)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {p.arrivedAt}
                  </div>
                )}

                {/* Image */}
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="192px"
                  />
                  {/* Image overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.50) 100%)",
                    }}
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-[10px] text-primary uppercase tracking-widest font-semibold mb-1">
                    {cat?.name ?? product.category}
                  </p>
                  <p className="text-[15px] font-semibold text-foreground leading-tight">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-snug line-clamp-1">
                    {product.description}
                  </p>

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between mt-3 pt-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <span className="text-xs text-muted-foreground/50">
                      Consultar
                    </span>
                    <button
                      aria-label={`Ver ${product.name}`}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs transition-all duration-200 hover:scale-110"
                      style={{
                        background: "rgba(226,75,74,0.90)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                      onMouseEnter={(e) =>
                        ((
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "rgb(226,75,74)")
                      }
                      onMouseLeave={(e) =>
                        ((
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "rgba(226,75,74,0.90)")
                      }
                    >
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Ticker */}
      <div className="relative z-10 mt-7 pt-3 border-t border-border overflow-hidden">
        <div
          className="flex gap-9 w-max"
          style={{ animation: "scroll 14s linear infinite" }}
        >
          {loopedTicker.map((text, idx) => (
            <span
              key={idx}
              className="flex items-center gap-2 text-[11px] text-muted-foreground/25 whitespace-nowrap"
            >
              <span className="w-1 h-1 rounded-full bg-primary inline-block flex-shrink-0" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
