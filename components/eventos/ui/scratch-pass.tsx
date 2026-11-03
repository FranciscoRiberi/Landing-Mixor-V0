"use client";

// Pase para raspar — Scratch To Reveal de Magic UI (MIT), vía 21st.dev, con la
// tarjeta holográfica que se inclina con el mouse. Al raspar la mitad se
// destapan las promos y sale confeti.

import { useCallback, useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Wordmark } from "@/components/mixor-wordmark";
import { confettiBurst } from "./confetti";
import { usePase } from "./pase";

const UMBRAL = 0.48;

export function ScratchPass({ lugar, fecha, promos }: { lugar: string; fecha: string; promos: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fontRef = useRef<HTMLSpanElement>(null);
  const ultimo = useRef<{ x: number; y: number } | null>(null);
  const trazos = useRef(0);
  const raspando = useRef(false);
  const { revelado: listo, revelar: revelarPase } = usePase();

  // Inclinación y reflejo (solo mouse).
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 140, damping: 18 };
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), spring);
  const gx = useTransform(px, (v) => v * 100);
  const gy = useTransform(py, (v) => v * 100);
  const reflejo = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,.7), transparent 42%)`;
  // Tornasol suave sobre el blanco de la tarjeta.
  const holo = useMotionTemplate`linear-gradient(115deg, transparent ${useTransform(px, (v) => 20 + v * 30)}%, rgba(255,170,160,.22) ${useTransform(px, (v) => 34 + v * 30)}%, rgba(170,210,255,.2) ${useTransform(px, (v) => 44 + v * 30)}%, transparent ${useTransform(px, (v) => 58 + v * 30)}%)`;

  const pintarLamina = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    if (!r.width) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(r.width * dpr);
    c.height = Math.round(r.height * dpr);
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    const g = ctx.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, "#cfcfcb");
    g.addColorStop(0.3, "#f6f6f3");
    g.addColorStop(0.5, "#b4b4af");
    g.addColorStop(0.75, "#ededea");
    g.addColorStop(1, "#a5a5a0");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, r.width, r.height);

    // Trama diagonal con la marca, como las raspaditas de verdad.
    ctx.save();
    ctx.translate(r.width / 2, r.height / 2);
    ctx.rotate(-0.28);
    const familia = fontRef.current ? getComputedStyle(fontRef.current).fontFamily : "Helvetica, Arial, sans-serif";
    ctx.font = `600 9px ${familia}`;
    ctx.fillStyle = "rgba(40,40,38,.16)";
    for (let y = -r.height, fila = 0; y < r.height; y += 20, fila++) {
      for (let x = -r.width; x < r.width; x += 104) ctx.fillText("MIXOR × XIMARO", x + (fila % 2) * 52, y);
    }
    ctx.restore();

    // Brillitos.
    for (let k = 0; k < 90; k++) {
      ctx.fillStyle = `rgba(255,255,255,${0.35 + Math.random() * 0.5})`;
      ctx.fillRect(Math.random() * r.width, Math.random() * r.height, 1.4, 1.4);
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#1b1b1a";
    ctx.font = `900 ${Math.round(r.height * 0.27)}px ${familia}`;
    ctx.fillText("RASPÁ ACÁ", r.width / 2, r.height / 2 - r.height * 0.05);
    ctx.font = `600 ${Math.max(9, Math.round(r.height * 0.075))}px ${familia}`;
    ctx.fillStyle = "rgba(27,27,26,.6)";
    ctx.fillText("C O N   E L   D E D O   O   E L   M O U S E", r.width / 2, r.height / 2 + r.height * 0.25);
  }, []);

  useEffect(() => {
    if (listo) return;
    let vivo = true;
    document.fonts?.ready.then(() => vivo && pintarLamina());
    pintarLamina();
    const ro = new ResizeObserver(() => {
      if (!trazos.current) pintarLamina();
    });
    if (canvasRef.current) ro.observe(canvasRef.current);
    return () => {
      vivo = false;
      ro.disconnect();
    };
  }, [listo, pintarLamina]);

  const revelar = useCallback(() => {
    if (listo) return;
    revelarPase();
    const r = cardRef.current?.getBoundingClientRect();
    if (r) confettiBurst(r.left + r.width / 2, r.top + r.height * 0.7);
  }, [listo, revelarPase]);

  function medir() {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d", { willReadFrequently: true });
    if (!c || !ctx) return;
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    let limpio = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 23) {
      total++;
      if (data[i] < 40) limpio++;
    }
    if (total && limpio / total > UMBRAL) revelar();
  }

  function rasparEn(e: React.PointerEvent<HTMLCanvasElement>) {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const r = c.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = Math.max(26, r.height * 0.24);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    const desde = ultimo.current ?? { x, y };
    ctx.moveTo(desde.x, desde.y);
    ctx.lineTo(x + 0.01, y);
    ctx.stroke();
    ultimo.current = { x, y };
    if (++trazos.current % 6 === 0) medir();
  }

  return (
    <div className="relative">
      <span ref={fontRef} className="xm-display pointer-events-none absolute opacity-0" aria-hidden>
        A
      </span>

      <motion.div
        ref={cardRef}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || raspando.current || !cardRef.current) return;
          const r = cardRef.current.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        style={{ rotateX, rotateY, transformPerspective: 1100 }}
        className="xm-pass relative aspect-[1.586/1] w-full overflow-hidden rounded-[24px] border border-white/70 text-[var(--xm-ink)] shadow-[0_40px_80px_-30px_rgba(60,4,8,.7)]"
      >
        <motion.div aria-hidden className="absolute inset-0 mix-blend-multiply" style={{ background: holo }} />
        <div aria-hidden className="xm-holo-idle absolute inset-0" />

        <div className="relative flex h-full flex-col p-[5.5%]">
          <div className="flex items-start justify-between">
            <span className="inline-flex items-center gap-2 text-[clamp(16px,4.2vw,22px)]">
              <Wordmark className="h-[0.8em] w-auto" title="Mixor" />
              <span className="text-[0.7em] opacity-50">×</span>
              <span className="text-[0.86em] font-black uppercase leading-none tracking-[0.04em]">Ximaro</span>
            </span>
          </div>
          <p className="xm-caps mt-[3%] text-[8.5px] text-[var(--xm-mute)] sm:text-[9.5px]">
            Evento {lugar}
            <span className="hidden sm:inline"> · {fecha}</span>
          </p>

          <div className="xm-rojo relative mt-auto h-[50%] overflow-hidden rounded-[14px]">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="xm-display xm-chrome xm-chrome-shadow text-[clamp(30px,8.6vw,50px)]">{promos} promos</p>
              <p className="xm-caps mt-2 text-[8.5px] text-white/85 sm:text-[9.5px]">desbloqueadas para vos</p>
            </div>
            <AnimatePresence>
              {!listo && (
                <motion.canvas
                  ref={canvasRef}
                  key="lamina"
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
                  onPointerDown={(e) => {
                    raspando.current = true;
                    ultimo.current = null;
                    e.currentTarget.setPointerCapture(e.pointerId);
                    rasparEn(e);
                  }}
                  onPointerMove={(e) => raspando.current && rasparEn(e)}
                  onPointerUp={() => {
                    raspando.current = false;
                    ultimo.current = null;
                    medir();
                  }}
                  onPointerCancel={() => {
                    raspando.current = false;
                    ultimo.current = null;
                  }}
                  aria-label="Lámina para raspar"
                  role="img"
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: reflejo }} />
      </motion.div>
      <div aria-hidden className="xm-piso mx-auto -mt-2 h-8 w-[78%]" />

      <div className="mt-3 flex min-h-[48px] items-center justify-center" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {listo ? (
            <motion.p
              key="ver"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="xm-caps inline-flex items-center gap-2 text-[10px] text-white"
            >
              ¡Desbloqueadas! Bajá para verlas
              <ArrowDown className="h-3.5 w-3.5" aria-hidden />
            </motion.p>
          ) : (
            <motion.button
              key="saltar"
              type="button"
              onClick={revelar}
              exit={{ opacity: 0 }}
              className="xm-caps text-[9.5px] text-white/65 underline-offset-4 hover:text-white hover:underline"
            >
              ¿No podés raspar? Revelar
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
