"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Sliders, ArrowRight, Sparkles, X } from "lucide-react";
import {
  products,
  categories,
  getProductAlt,
  toSlug,
} from "@/lib/products";

const ALL = "todos";
const filters = [{ id: ALL, name: "Todos" }, ...categories];

export function ProductsCatalog() {
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");
  const [onlyNew, setOnlyNew] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== ALL && p.category !== category) return false;
      if (onlyNew && !(p as { isNew?: boolean }).isNew) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.code ?? "").toLowerCase().includes(q)
      );
    });
  }, [category, query, onlyNew]);

  return (
    <section className="px-4 sm:px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Filter bar */}
        <div className="sticky top-20 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 mb-10">
          {/* Search */}
          <div className="relative mb-4 max-w-md mx-auto">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar producto, código o función…"
              className="w-full pl-11 pr-10 py-3 bg-zinc-900/40 border border-white/10 rounded-full text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category pills + new toggle */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setCategory(f.id)}
                className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 fx-shine ${
                  category === f.id
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                    : "bg-zinc-900/40 border border-white/10 text-white hover:border-cyan-500/50 hover:bg-cyan-500/10"
                }`}
              >
                {f.name}
              </button>
            ))}
            <button
              onClick={() => setOnlyNew((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
                onlyNew
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-zinc-900/40 border border-white/10 text-white hover:border-cyan-500/50 hover:bg-cyan-500/10"
              }`}
            >
              <Sparkles size={14} />
              Nuevos
            </button>
          </div>
        </div>

        {/* Result count */}
        <p className="text-center text-sm text-zinc-400 mb-8">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
          {category !== ALL && (
            <> en <span className="text-cyan-400 font-medium">{filters.find((f) => f.id === category)?.name}</span></>
          )}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-zinc-400">
            <p className="text-lg font-medium mb-1">Sin resultados</p>
            <p className="text-sm">Probá con otra categoría o término de búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filtered.map((product) => {
              const slug = toSlug(product.name);
              const isComingSoon = product.price === "Próximamente";
              const hasSpecs =
                "features" in product &&
                Array.isArray((product as { features?: unknown[] }).features);
              const isNew = (product as { isNew?: boolean }).isNew;
              const cat = categories.find((c) => c.id === product.category);

              return (
                <div
                  key={product.id}
                  className="fx-spotlight group relative flex flex-col rounded-2xl bg-zinc-900/40 border border-white/10 overflow-hidden transition-all duration-500 hover:border-cyan-500/50 hover-lift"
                >
                  {/* Image */}
                  <div className="relative aspect-square block overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={getProductAlt(product.name)}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
                        isComingSoon ? "opacity-60" : ""
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent" />

                    {isNew && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-cyan-500 text-white text-[9px] font-bold tracking-wider">
                        NUEVO
                      </span>
                    )}
                    {isComingSoon && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-zinc-400 text-zinc-950 text-[9px] font-bold tracking-wider">
                        PRÓXIMAMENTE
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 p-3 sm:p-4">
                    <p className="text-[10px] uppercase tracking-widest text-cyan-400 font-semibold mb-1">
                      {cat?.name ?? product.category}
                    </p>
                    <h3 className="text-sm sm:text-base font-semibold text-white leading-tight line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-snug line-clamp-2 flex-1">
                      {product.description}
                    </p>

                    {/* Actions */}
                    <div className="mt-3 pt-3 border-t border-white/10">
                      {!isComingSoon ? (
                        <Link
                          href={`/productos/${slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-cyan-400 transition-colors"
                        >
                          <Sliders size={13} />
                          Conocer más
                          <ArrowRight size={13} className="ml-auto" />
                        </Link>
                      ) : (
                        <span className="text-xs text-zinc-500">Próximamente</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
