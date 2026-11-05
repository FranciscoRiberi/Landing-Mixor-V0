"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Barras } from "@/components/eventos/encuesta/barras";
import { IconoOpcion } from "@/components/eventos/encuesta/tucuman";
import { confettiBurst } from "@/components/eventos/ui/confetti";
import { FlipWords } from "@/components/eventos/ui/flip-words";
import type { Opcion, Resultado } from "@/lib/eventos/encuesta";
import { cn } from "@/lib/utils";

/** El cable que sale del borde y enchufa en el nombre elegido. */
function CableLinea({ conectado }: { conectado: boolean }) {
  return (
    <svg viewBox="0 0 600 60" className="mx-auto mt-4 block w-full max-w-[520px]" fill="none" aria-hidden>
      <defs>
        <linearGradient id="xm-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.5" stopColor="#c9ccd1" />
          <stop offset="1" stopColor="#8d9299" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-8 38C90 6 150 64 250 34S400 18 470 30"
        stroke="#fff"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: "easeInOut" }}
      />
      <rect x="468" y="19" width="56" height="22" rx="7" fill="#fff" />
      <rect x="524" y="24" width="9" height="12" fill="#dcdcdc" />
      <rect x="533" y="23" width="40" height="14" rx="6" fill="url(#xm-metal)" />
      <motion.path
        d="M581 18l8-8M584 30h12M581 42l8 8"
        stroke="#ffe0a3"
        strokeWidth="3.5"
        strokeLinecap="round"
        animate={{ opacity: conectado ? 1 : 0 }}
      />
    </svg>
  );
}

export function Votacion({
  opciones,
  votoInicial,
  resultadoInicial,
  abierta,
}: {
  opciones: Opcion[];
  votoInicial: string | null;
  resultadoInicial: Resultado;
  abierta: boolean;
}) {
  const [elegida, setElegida] = useState<string | null>(null);
  const [voto, setVoto] = useState(votoInicial);
  const [resultado, setResultado] = useState(resultadoInicial);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const seccion = useRef<HTMLElement>(null);
  const lista = useRef<HTMLFieldSetElement>(null);

  const votando = abierta && !voto;
  const nombreDe = (id: string | null) => opciones.find((o) => o.id === id)?.nombre;

  // Con el voto hecho, los resultados se van actualizando solos.
  useEffect(() => {
    if (votando) return;
    const t = setInterval(() => {
      fetch("/api/elegi", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((r) => r && setResultado(r))
        .catch(() => {});
    }, 5000);
    return () => clearInterval(t);
  }, [votando]);

  async function votar() {
    if (!elegida || enviando) return;
    setEnviando(true);
    setError(null);
    try {
      const res = await fetch("/api/elegi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opcion: elegida }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setVoto(data.voto);
      setResultado(data.resultado);
      seccion.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      confettiBurst(window.innerWidth / 2, window.innerHeight * 0.45, 170);
    } catch {
      setError("No pudimos guardar tu voto. Revisá la señal y probá de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section ref={seccion} id="votar" className="relative scroll-mt-0 bg-[var(--xm-red-deep)] pb-14 pt-8 text-white">
      <div className="mx-auto w-full max-w-[640px] px-5">
        <AnimatePresence mode="wait" initial={false}>
          {votando ? (
            <motion.div key="votar" exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              <div aria-hidden className="text-center">
                <p className="xm-tracked text-[16px] sm:text-[20px]">Cable</p>
                <p className="xm-display xm-chrome-shadow mt-2 min-h-[0.9em] text-[clamp(58px,17vw,104px)]">
                  {elegida ? (
                    <FlipWords key={elegida} words={[nombreDe(elegida)!]} letterClassName="xm-chrome xm-letra" />
                  ) : (
                    <FlipWords
                      words={opciones.map((o) => o.nombre)}
                      duration={1900}
                      letterClassName="xm-chrome xm-letra"
                    />
                  )}
                </p>
                <CableLinea conectado={!!elegida} />
              </div>

              <fieldset ref={lista} className="mt-6 scroll-mt-4">
                <legend className="xm-caps mb-4 block w-full text-center text-[10.5px] text-white/85">
                  Tocá el que más te guste
                </legend>
                <div className="flex flex-col gap-2.5">
                  {opciones.map((o) => {
                    const activa = elegida === o.id;
                    return (
                      <label
                        key={o.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-3.5 rounded-2xl border px-4 py-3 transition-all duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-white",
                          activa
                            ? "scale-[1.015] border-white bg-white text-[var(--xm-red)] shadow-[0_18px_40px_-16px_rgba(30,2,6,.8)]"
                            : "border-white/25 bg-white/[0.08] text-white",
                        )}
                      >
                        <input
                          type="radio"
                          name="nombre"
                          value={o.id}
                          checked={activa}
                          onChange={() => setElegida(o.id)}
                          className="sr-only"
                        />
                        <IconoOpcion id={o.id} className="h-9 w-9 shrink-0" />
                        <span className="min-w-0 flex-1">
                          <span className="xm-display block text-[30px]">{o.nombre}</span>
                          <span
                            className={cn(
                              "mt-1 block text-[13.5px] leading-snug",
                              activa ? "text-[var(--xm-ink-2)]" : "text-white/80",
                            )}
                          >
                            {o.bajada}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                            activa ? "border-[var(--xm-red)] bg-[var(--xm-red)] text-white" : "border-white/40",
                          )}
                        >
                          {activa && <Check className="h-3.5 w-3.5" strokeWidth={3.5} />}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </motion.div>
          ) : (
            <motion.div
              key="resultado"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center">
                {voto ? (
                  <>
                    <p className="xm-tracked text-[15px] sm:text-[18px]">Tu voto fue para</p>
                    <p className="xm-display xm-chrome-shadow mt-3 text-[clamp(52px,15vw,96px)]">
                      <span className="xm-chrome">{nombreDe(voto)}</span>
                    </p>
                    <p className="xm-mano mt-3 text-[28px] leading-none">¡Gracias por bautizarlo!</p>
                  </>
                ) : (
                  <>
                    <p className="xm-tracked text-[15px] sm:text-[18px]">La votación cerró</p>
                    <p className="xm-mano mt-3 text-[28px] leading-none">¡Gracias, Tucumán!</p>
                  </>
                )}
              </div>

              <div className="mt-9 rounded-3xl border border-white/15 bg-white/[0.06] p-5 sm:p-6">
                <p className="xm-caps text-[10px] text-white/85">Así viene Tucumán</p>
                <div className="mt-5">
                  <Barras opciones={opciones} resultado={resultado} voto={voto} />
                </div>
                <p className="mt-6 border-t border-white/15 pt-4 text-center text-[13.5px] text-white/85">
                  {resultado.total} {resultado.total === 1 ? "voto" : "votos"} hasta ahora. El ganador se anuncia al
                  cierre del evento.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {votando && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-[#4d0a10] via-[#4d0a10]/85 to-transparent px-5 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-8">
          <div className="pointer-events-auto mx-auto w-full max-w-[600px]">
            {error && (
              <p role="alert" className="mb-2 text-center text-[13px] font-semibold text-white">
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={() =>
                elegida ? votar() : lista.current?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              disabled={enviando}
              className={cn(
                "relative w-full overflow-hidden rounded-full py-4 text-[16px] font-extrabold transition-all",
                elegida
                  ? "xm-shine xm-shine-red bg-white text-[var(--xm-red)] shadow-[0_18px_40px_-16px_rgba(30,2,6,.9)]"
                  : "bg-white/20 text-white/75",
              )}
            >
              {enviando ? "Guardando tu voto…" : elegida ? `Votar por ${nombreDe(elegida)}` : "Elegí un nombre"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
