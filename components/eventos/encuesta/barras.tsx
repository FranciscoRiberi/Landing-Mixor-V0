"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Opcion, Resultado } from "@/lib/eventos/encuesta";
import { IconoOpcion } from "@/components/eventos/encuesta/tucuman";
import { cn } from "@/lib/utils";

/** Barras del resultado: se reordenan solas a medida que entran los votos. */
export function Barras({
  opciones,
  resultado,
  voto,
  grande,
}: {
  opciones: Opcion[];
  resultado: Resultado;
  voto?: string | null;
  /** Tamaños para las pantallas del salón, en función del alto de la pantalla. */
  grande?: boolean;
}) {
  const orden = [...opciones].sort((a, b) => resultado.conteo[b.id] - resultado.conteo[a.id]);
  const maximo = Math.max(...Object.values(resultado.conteo));

  return (
    <ol className={cn("flex flex-col", grande ? "gap-[1.9vh]" : "gap-3.5")}>
      {orden.map((o) => {
        const votos = resultado.conteo[o.id];
        const porcentaje = resultado.total ? Math.round((votos / resultado.total) * 100) : 0;
        const lidera = votos > 0 && votos === maximo;
        return (
          <motion.li key={o.id} layout transition={{ type: "spring", stiffness: 180, damping: 26 }}>
            <div className="flex items-end justify-between gap-3">
              <span className={cn("flex min-w-0 items-center", grande ? "gap-[1.4vh]" : "gap-2.5")}>
                <IconoOpcion id={o.id} className={cn("shrink-0", grande ? "h-[3.9vh] w-[3.9vh]" : "h-6 w-6")} />
                <span className={cn("xm-display", grande ? "text-[4.4vh]" : "text-[26px]")}>{o.nombre}</span>
                {voto === o.id && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[var(--xm-red)]">
                    <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                    <span className="sr-only">Tu voto</span>
                  </span>
                )}
              </span>
              <span
                className={cn(
                  "font-extrabold tabular-nums tracking-[-0.02em]",
                  grande ? "text-[4.4vh] leading-none" : "text-[22px] leading-none",
                )}
              >
                {porcentaje}%
              </span>
            </div>
            <div className={cn("mt-2 overflow-hidden rounded-full bg-white/15", grande ? "h-[1.4vh]" : "h-2.5")}>
              <motion.div
                className={cn("h-full rounded-full", lidera ? "bg-white" : "bg-white/55")}
                initial={{ width: 0 }}
                animate={{ width: `${porcentaje}%` }}
                transition={{ type: "spring", stiffness: 70, damping: 18 }}
              />
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
