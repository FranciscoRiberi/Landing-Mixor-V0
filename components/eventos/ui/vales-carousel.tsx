"use client";

// Carrusel de vales con escala y opacidad según la distancia al centro
// (Embla «tween scale», el que usan los carousels de 21st.dev / shadcn).

import { Children, useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>;

export function ValesCarousel({ children }: { children: React.ReactNode }) {
  const slides = Children.toArray(children);
  const [viewportRef, api] = useEmblaCarousel({ align: "center", containScroll: false, skipSnaps: false });
  const nodos = useRef<(HTMLDivElement | null)[]>([]);
  const [actual, setActual] = useState(0);
  const [progreso, setProgreso] = useState(0);
  const [puede, setPuede] = useState({ prev: false, next: true });

  const tween = useCallback((e: EmblaCarouselType) => {
    const snaps = e.scrollSnapList();
    const p = e.scrollProgress();
    const factor = Math.max(1, snaps.length - 1);
    snaps.forEach((s, i) => {
      const t = Math.max(0, 1 - Math.abs(s - p) * factor);
      const el = nodos.current[i];
      if (!el) return;
      el.style.transform = `scale(${0.86 + 0.14 * t})`;
      el.style.opacity = String(0.42 + 0.58 * t);
    });
  }, []);

  useEffect(() => {
    if (!api) return;
    const alSeleccionar = () => {
      setActual(api.selectedScrollSnap());
      setPuede({ prev: api.canScrollPrev(), next: api.canScrollNext() });
    };
    const alScrollear = () => {
      tween(api);
      setProgreso(Math.min(1, Math.max(0, api.scrollProgress())));
    };
    alSeleccionar();
    alScrollear();
    api.on("select", alSeleccionar).on("reInit", alSeleccionar).on("scroll", alScrollear).on("reInit", alScrollear);
    return () => {
      api.off("select", alSeleccionar).off("reInit", alSeleccionar).off("scroll", alScrollear).off("reInit", alScrollear);
    };
  }, [api, tween]);

  const total = slides.length;
  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Vales del evento"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") api?.scrollPrev();
        if (e.key === "ArrowRight") api?.scrollNext();
      }}
    >
      <div ref={viewportRef} className="overflow-hidden py-6">
        <div className="flex touch-pan-y">
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="vale"
              aria-label={`${i + 1} de ${total}`}
              className="min-w-0 shrink-0 grow-0 basis-[86%] px-2 sm:basis-[62%] sm:px-3 lg:basis-[44%]"
              onClickCapture={(e) => {
                // Tocar un vale de costado lo trae al centro en vez de abrir su botón.
                if (api && i !== api.selectedScrollSnap()) {
                  e.preventDefault();
                  e.stopPropagation();
                  api.scrollTo(i);
                }
              }}
            >
              <div
                ref={(el) => {
                  nodos.current[i] = el;
                }}
                className="h-full origin-center will-change-transform"
              >
                {slide}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="xm-container mt-6 flex items-center justify-between gap-6">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <span className="xm-caps shrink-0 text-white/80">
            {String(actual + 1).padStart(2, "0")} <span className="text-white/30">/ {String(total).padStart(2, "0")}</span>
          </span>
          <span className="relative h-[2px] w-full max-w-[240px] overflow-hidden rounded-full bg-white/15">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-white transition-[width] duration-150"
              style={{ width: `${Math.max(1 / total, progreso) * 100}%` }}
            />
          </span>
        </div>
        <div className="flex gap-2">
          {[
            { dir: "prev" as const, Icon: ArrowLeft, label: "Vale anterior", on: puede.prev, fn: () => api?.scrollPrev() },
            { dir: "next" as const, Icon: ArrowRight, label: "Vale siguiente", on: puede.next, fn: () => api?.scrollNext() },
          ].map(({ dir, Icon, label, on, fn }) => (
            <button
              key={dir}
              type="button"
              onClick={fn}
              disabled={!on}
              aria-label={label}
              className={cn(
                "inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur transition",
                "hover:border-white/40 hover:bg-white/[0.12] disabled:pointer-events-none disabled:opacity-30",
              )}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
