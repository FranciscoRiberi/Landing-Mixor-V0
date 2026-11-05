"use client";

import { useEffect, useState } from "react";
import { Barras } from "@/components/eventos/encuesta/barras";
import type { Opcion, Resultado } from "@/lib/eventos/encuesta";

/** Resultado en vivo para las pantallas del salón y el stream. */
export function Tablero({ opciones, inicial }: { opciones: Opcion[]; inicial: Resultado }) {
  const [resultado, setResultado] = useState(inicial);

  useEffect(() => {
    const t = setInterval(() => {
      fetch("/api/elegi", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((r) => r && setResultado(r))
        .catch(() => {});
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="xm-tracked text-[2.4vh]">Así viene Tucumán</p>
        <p className="text-[2.4vh] font-semibold tabular-nums">
          {resultado.total} {resultado.total === 1 ? "voto" : "votos"}
        </p>
      </div>
      <div className="mt-[3vh]">
        <Barras opciones={opciones} resultado={resultado} grande />
      </div>
    </div>
  );
}
