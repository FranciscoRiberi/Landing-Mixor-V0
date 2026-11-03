"use client";

// Estado del pase: las promos quedan bloqueadas hasta que se raspa la tarjeta.
// Se recuerda en el teléfono para que, si vuelven a entrar, no tengan que raspar otra vez.

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Lock, Sparkles } from "lucide-react";

const CLAVE_LOCAL = "xm-ximaro-pase-raspado";

type Pase = { revelado: boolean; revelar: () => void };
const PaseContext = createContext<Pase | null>(null);

export function PaseProvider({ children }: { children: React.ReactNode }) {
  const [revelado, setRevelado] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(CLAVE_LOCAL) === "1") setRevelado(true);
    } catch {
      // Sin almacenamiento (modo privado): se raspa cada vez.
    }
  }, []);

  const revelar = useCallback(() => {
    setRevelado(true);
    try {
      localStorage.setItem(CLAVE_LOCAL, "1");
    } catch {}
  }, []);

  return <PaseContext.Provider value={{ revelado, revelar }}>{children}</PaseContext.Provider>;
}

export function usePase(): Pase {
  const pase = useContext(PaseContext);
  if (!pase) throw new Error("usePase va dentro de <PaseProvider>");
  return pase;
}

/** Los vales se ven borrosos y no se pueden tocar hasta raspar el pase. */
export function PromosBloqueadas({ children, total }: { children: React.ReactNode; total: number }) {
  const { revelado } = usePase();
  return (
    <div className="relative">
      <motion.div
        initial={false}
        animate={
          revelado
            ? { filter: "blur(0px)", opacity: 1, scale: 1 }
            : { filter: "blur(18px)", opacity: 0.5, scale: 0.96 }
        }
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!revelado}
        inert={!revelado}
        className={revelado ? undefined : "pointer-events-none select-none"}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {!revelado && (
          <motion.div
            key="candado"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 z-10 flex items-center justify-center px-5"
          >
            <div className="w-full max-w-[420px] rounded-[28px] border border-white/25 bg-[rgba(110,12,18,.62)] p-7 text-center text-white shadow-[0_40px_80px_-30px_rgba(40,2,6,.9)] backdrop-blur-xl sm:p-9">
              <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-[var(--xm-red)]">
                <span className="absolute inset-0 animate-ping rounded-full bg-white opacity-25" />
                <Lock className="relative h-6 w-6" aria-hidden />
              </span>
              <p className="xm-display xm-chrome mt-5 text-[40px]">Bloqueadas</p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                Raspá tu pase para desbloquear tus {total} promos.
              </p>
              <a
                href="#pase"
                className="xm-shine xm-shine-red relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-[14.5px] font-bold text-[var(--xm-red)]"
              >
                <Sparkles className="h-4 w-4" aria-hidden />
                Ir a mi pase
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Botón principal de la portada: primero manda a raspar, después a las promos. */
export function HeroCta() {
  const { revelado } = usePase();
  return (
    <a
      href={revelado ? "#promos" : "#pase"}
      className="xm-shine xm-shine-red relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-4 text-[15px] font-bold text-[var(--xm-red)] shadow-[0_18px_40px_-16px_rgba(60,4,8,.6)] transition-transform hover:-translate-y-0.5"
    >
      {revelado ? (
        <>
          Ver las promos
          <ArrowDown className="h-4 w-4" aria-hidden />
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" aria-hidden />
          Raspá tu pase
        </>
      )}
    </a>
  );
}
