import Image from "next/image";
import { Wordmark } from "@/components/mixor-wordmark";
import { ContactoLink, WhatsAppIcon } from "@/components/eventos/contacto";
import {
  EVENTO,
  MENSAJE_BASE,
  formatoPrecio,
  productoEvento,
  whatsappHref,
  type ProductoEvento,
  type Promo,
} from "@/lib/eventos/ximaro";
import { cn } from "@/lib/utils";

/** «MIXOR × XIMARO». El logo de Ximaro va acá cuando lo tengamos; por ahora, el nombre. */
export function Lockup({ className, tone = "ink" }: { className?: string; tone?: "ink" | "white" }) {
  return (
    <span className={cn("inline-flex items-center gap-3", tone === "white" ? "text-white" : "text-[var(--xm-ink)]", className)}>
      <Wordmark className="h-[0.78em] w-auto" title="Mixor" />
      <span className="text-[0.7em] font-light opacity-60" aria-hidden>
        ×
      </span>
      <span className="text-[0.86em] font-black uppercase leading-none tracking-[0.04em]">Ximaro</span>
    </span>
  );
}

/** Sello blanco del pase, con el texto girando alrededor. */
export function Sello({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <path id="xm-sello-circulo" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
      </defs>
      <circle cx="100" cy="100" r="98" fill="#fff" />
      <g className="xm-spin" style={{ transformOrigin: "100px 100px" }}>
        <text fill="var(--xm-red)" fontSize="15.5" fontWeight="600" letterSpacing="3.6">
          <textPath href="#xm-sello-circulo">{`PASE EXCLUSIVO · EVENTO ${EVENTO.lugar.toUpperCase()} · `}</textPath>
        </text>
      </g>
      <path d="M84 84 L116 116 M116 84 L84 116" stroke="var(--xm-red)" strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}

/** Vale troquelado: talón con número y código de barras, cuerpo con la promo. */
export function Vale({ promo, numero, total }: { promo: Promo; numero: number; total: number }) {
  const productos = promo.incluye.map(productoEvento).filter((p): p is ProductoEvento => p !== null);
  const n = String(numero).padStart(2, "0");
  return (
    <div className="xm-vale-sombra h-full">
      <article className="xm-vale grid h-full grid-cols-[var(--stub)_1fr]">
        <div className="flex flex-col items-center justify-between gap-4 py-6">
          <span className="text-[28px] font-black tracking-[-0.04em] text-[var(--xm-red)] sm:text-[34px]">{n}</span>
          <span className="xm-caps xm-vertical text-[9px] text-[var(--xm-mute)]">
            Vale {n} de {String(total).padStart(2, "0")}
          </span>
          <span className="xm-barcode-v h-20 w-5 opacity-80" aria-hidden />
        </div>

        <div className="xm-vale-perf flex min-w-0 flex-col p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <p className="xm-caps text-[9.5px] text-[var(--xm-mute)]">Mixor × Ximaro</p>
            {promo.borrador && (
              <span className="xm-caps shrink-0 rounded-full border border-dashed border-[var(--xm-red)] px-2.5 py-1 text-[8.5px] text-[var(--xm-red-ink)]">
                Ejemplo
              </span>
            )}
          </div>
          <p className="xm-display mt-4 text-[44px] text-[var(--xm-red)] sm:text-[56px]">{promo.etiqueta}</p>
          <h3 className="xm-tracked mt-3 text-[15px] font-bold sm:text-[16px]">{promo.titulo}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--xm-ink-2)]">{promo.detalle}</p>

          <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-1">
            <p className="text-[34px] font-black leading-none tracking-[-0.03em] text-[var(--xm-ink)] sm:text-[40px]">
              {formatoPrecio(promo.precio)}
            </p>
            <p className="pb-1 text-[13px] text-[var(--xm-mute)]">
              <span className="line-through">{formatoPrecio(promo.precioLista)}</span>
              <span className="ml-2 font-bold text-[var(--xm-red)]">−5% en el evento</span>
            </p>
          </div>

          {productos.length > 0 && (
            <div className="mt-5 grid grid-cols-4 gap-2">
              {productos.slice(0, 4).map((p) => (
                <figure key={p.slug} className="min-w-0">
                  <span className="relative block aspect-square overflow-hidden rounded-xl bg-white ring-1 ring-[var(--xm-line)]">
                    <Image src={p.imagen} alt={p.completo} fill sizes="120px" className="object-contain p-1.5" />
                  </span>
                  <figcaption className="mt-1.5 truncate text-center text-[11px] font-semibold leading-tight">{p.nombre}</figcaption>
                </figure>
              ))}
            </div>
          )}

          <p className="xm-caps mt-4 text-[8.5px] font-medium text-[var(--xm-mute)]">Incluye</p>
          <ul className="mt-1.5 grid gap-x-4 gap-y-1 text-[12.5px] font-medium leading-snug sm:grid-cols-2">
            {promo.items.map((item) => (
              <li key={item} className="flex gap-1.5">
                <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--xm-red)]" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-1 items-end">
            <div className="flex w-full flex-wrap items-center justify-between gap-3 border-t border-[var(--xm-line)] pt-4">
              <p className="xm-caps text-[9px] text-[var(--xm-mute)]">{promo.condicion}</p>
              <ContactoLink
                href={whatsappHref(`${MENSAJE_BASE} y me interesa la promo "${promo.titulo}".`)}
                className="xm-shine relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--xm-red)] px-5 py-2.5 text-[13.5px] font-bold text-white transition-colors hover:bg-[var(--xm-red-ink)]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                La quiero
              </ContactoLink>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
