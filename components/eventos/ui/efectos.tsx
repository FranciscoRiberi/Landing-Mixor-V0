"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ContactoLink, WhatsAppIcon } from "@/components/eventos/contacto";

/** Luz roja que sigue al mouse en la portada (en celular queda quieta). */
export function PointerGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const mover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !ref.current) return;
      const r = el.getBoundingClientRect();
      ref.current.style.setProperty("--x", `${e.clientX - r.left}px`);
      ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", mover);
    return () => el.removeEventListener("pointermove", mover);
  }, []);
  return <div ref={ref} aria-hidden className="xm-pointer-glow pointer-events-none absolute inset-0" />;
}

/** Botón fijo de WhatsApp en el celular: aparece después de la portada. */
export function FloatingCta({ href }: { href: string | null }) {
  const [ver, setVer] = useState(false);
  useEffect(() => {
    const check = () => {
      const fin = document.getElementById("pedir");
      const llegoAlFinal = fin ? fin.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
      setVer(window.scrollY > window.innerHeight * 0.7 && !llegoAlFinal);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);
  return (
    <AnimatePresence>
      {ver && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed inset-x-4 bottom-4 z-40 md:hidden"
        >
          <ContactoLink
            href={href}
            className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-[15px] font-bold text-[var(--xm-red)] shadow-[0_18px_40px_-12px_rgba(40,2,6,.6)]"
          >
            <WhatsAppIcon className="h-5 w-5 text-[#1fae54]" />
            Pedir a Ximaro
          </ContactoLink>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
