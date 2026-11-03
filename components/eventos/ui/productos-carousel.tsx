"use client";

// Apple Cards Carousel — Aceternity UI, vía 21st.dev. Tarjetas altas que se
// deslizan; al tocar una, se expande a la ficha con una transición compartida.

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Plus, X } from "lucide-react";
import { ContactoLink, WhatsAppIcon } from "@/components/eventos/contacto";
import { cn } from "@/lib/utils";

export type ProductoCarrusel = {
  slug: string;
  tipo: string;
  nombre: string;
  completo: string;
  imagen: string;
  alt: string;
  claves: string[];
  kit: string | null;
  descripcion: string;
  features: { title: string; description: string }[];
  wa: string | null;
};

export function ProductosCarousel({ productos }: { productos: ProductoCarrusel[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [puede, setPuede] = useState({ prev: false, next: true });
  const [abierto, setAbierto] = useState<ProductoCarrusel | null>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const origenRef = useRef<HTMLElement | null>(null);

  const medir = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setPuede({ prev: el.scrollLeft > 4, next: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, [medir]);

  function mover(dir: 1 | -1) {
    const el = scroller.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 16) * (window.innerWidth > 768 ? 2 : 1), behavior: "smooth" });
  }

  useEffect(() => {
    if (!abierto) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => cerrarRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(null);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", onKey);
      origenRef.current?.focus();
    };
  }, [abierto]);

  return (
    <div>
      <div
        ref={scroller}
        onScroll={medir}
        className="xm-rail flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-6 pt-2"
        style={{ paddingInline: "var(--xm-gutter)", scrollPaddingInline: "var(--xm-gutter)" }}
      >
        {productos.map((p, i) => (
          <motion.button
            key={p.slug}
            data-card
            type="button"
            layoutId={`xm-card-${p.slug}`}
            onClick={(e) => {
              origenRef.current = e.currentTarget;
              setAbierto(p);
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex h-[440px] w-[76vw] max-w-[330px] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[28px] bg-white text-center shadow-[0_24px_50px_-30px_rgba(60,4,8,.35)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--xm-red)] sm:h-[500px] sm:w-[340px] sm:max-w-none"
            aria-label={`Ver ${p.completo}`}
          >
            <span aria-hidden className="absolute inset-x-[10%] top-[8%] aspect-square rounded-full bg-[radial-gradient(closest-side,rgba(193,31,41,.08),transparent)] transition-transform duration-700 group-hover:scale-110" />
            <motion.div layoutId={`xm-img-${p.slug}`} className="absolute inset-x-8 bottom-[118px] top-8">
              <Image
                src={p.imagen}
                alt={p.alt}
                fill
                sizes="340px"
                className="object-contain transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
              />
            </motion.div>
            <span className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--xm-red)] text-white transition-transform duration-300 group-hover:rotate-90">
              <Plus className="h-5 w-5" aria-hidden />
            </span>
            <div className="relative z-10 border-t border-[var(--xm-line)] px-5 pb-7 pt-5">
              {/* Como «LEYENDA / CARGADOR PD · 65 W» en la pieza del evento. */}
              <motion.h3 layoutId={`xm-name-${p.slug}`} className="xm-tracked text-[24px] font-extrabold tracking-[0.16em] text-[var(--xm-ink)] sm:text-[26px]">
                {p.nombre}
              </motion.h3>
              <p className="xm-caps mt-2 truncate text-[9.5px] text-[var(--xm-mute)]">
                {p.tipo}
                {p.claves[0] ? ` · ${p.claves[0]}` : ""}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-end gap-2" style={{ paddingInline: "var(--xm-gutter)" }}>
        {[
          { dir: -1 as const, Icon: ArrowLeft, label: "Anteriores", on: puede.prev },
          { dir: 1 as const, Icon: ArrowRight, label: "Siguientes", on: puede.next },
        ].map(({ dir, Icon, label, on }) => (
          <button
            key={dir}
            type="button"
            onClick={() => mover(dir)}
            disabled={!on}
            aria-label={label}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--xm-red)] text-white transition hover:bg-[var(--xm-red-ink)] disabled:opacity-25"
          >
            <Icon className="h-5 w-5" aria-hidden />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {abierto && (
          <>
            <motion.div
              key="fondo"
              className="fixed inset-0 z-[70] bg-[rgba(60,6,10,.72)] backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAbierto(null)}
            />
            <div key="ficha" className="pointer-events-none fixed inset-0 z-[71] flex items-end justify-center p-2 sm:items-center sm:p-6">
              <motion.div
                layoutId={`xm-card-${abierto.slug}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="xm-ficha-titulo"
                className="pointer-events-auto relative max-h-[92dvh] w-full max-w-[920px] overflow-y-auto overscroll-contain rounded-[30px] bg-white text-[var(--xm-ink)]"
              >
                <button
                  ref={cerrarRef}
                  type="button"
                  onClick={() => setAbierto(null)}
                  aria-label="Cerrar"
                  className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--xm-ink)] text-white outline-none focus-visible:ring-2 focus-visible:ring-[var(--xm-red)] focus-visible:ring-offset-2"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-square bg-white md:aspect-auto md:min-h-[520px]">
                    <span aria-hidden className="absolute inset-[14%] rounded-full bg-[radial-gradient(closest-side,rgba(193,31,41,.08),transparent)]" />
                    <motion.div layoutId={`xm-img-${abierto.slug}`} className="absolute inset-8">
                      <Image src={abierto.imagen} alt={abierto.alt} fill sizes="(min-width: 768px) 460px, 90vw" className="object-contain" />
                    </motion.div>
                  </div>
                  <motion.div
                    className="flex flex-col p-6 sm:p-9 md:border-l md:border-[var(--xm-line)]"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  >
                    <p className="xm-caps text-[10px] text-[var(--xm-red)]">{abierto.tipo} · Mixor</p>
                    <motion.h2 id="xm-ficha-titulo" layoutId={`xm-name-${abierto.slug}`} className="xm-display mt-3 text-[52px] sm:text-[64px]">
                      {abierto.nombre}
                    </motion.h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-[var(--xm-ink-2)]">{abierto.descripcion}</p>
                    <ul className="mt-6 space-y-3 border-t border-[var(--xm-line)] pt-5">
                      {abierto.features.slice(0, 5).map((f) => (
                        <li key={f.title} className="flex gap-3 text-[14px]">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--xm-red)]" aria-hidden />
                          <span>
                            <b className="font-bold">{f.title}.</b> <span className="text-[var(--xm-ink-2)]">{f.description}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    {abierto.kit && <p className="xm-caps mt-6 text-[9.5px] text-[var(--xm-mute)]">{abierto.kit}</p>}
                    <ContactoLink
                      href={abierto.wa}
                      className={cn(
                        "xm-shine relative mt-6 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--xm-red)] px-6 py-4 text-[15px] font-bold text-white",
                      )}
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      Consultar a Ximaro
                    </ContactoLink>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
