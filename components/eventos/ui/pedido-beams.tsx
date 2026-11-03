"use client";

// Diagrama de «cómo pedir»: de tu tarjeta a Ximaro, por WhatsApp o Instagram.

import { useRef } from "react";
import { QrCode, Store } from "lucide-react";
import { AnimatedBeam } from "./animated-beam";
import { InstagramIcon, WhatsAppIcon } from "@/components/eventos/contacto";
import { cn } from "@/lib/utils";

function Nodo({
  refEl,
  label,
  className,
  children,
}: {
  refEl: React.RefObject<HTMLDivElement | null>;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-2">
      <div
        ref={refEl}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full bg-white text-[var(--xm-ink)] shadow-[0_10px_30px_-10px_rgba(0,0,0,.45)] sm:h-16 sm:w-16",
          className,
        )}
      >
        {children}
      </div>
      <span className="xm-caps whitespace-nowrap text-[8px] text-white/85 sm:text-[8.5px]">{label}</span>
    </div>
  );
}

export function PedidoBeams() {
  const box = useRef<HTMLDivElement>(null);
  const vos = useRef<HTMLDivElement>(null);
  const wa = useRef<HTMLDivElement>(null);
  const ig = useRef<HTMLDivElement>(null);
  const xim = useRef<HTMLDivElement>(null);
  const local = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={box}
      className="relative mx-auto flex h-[260px] w-full max-w-[560px] items-center justify-between rounded-[28px] border border-white/20 bg-white/[0.07] px-5 backdrop-blur-sm sm:h-[300px] sm:px-10"
    >
      <Nodo refEl={vos} label="Tarjeta">
        <QrCode className="h-6 w-6" aria-hidden />
      </Nodo>
      <div className="flex flex-col gap-10">
        <Nodo refEl={wa} label="WhatsApp">
          <WhatsAppIcon className="h-6 w-6 text-[#1fae54]" />
        </Nodo>
        <Nodo refEl={ig} label="Instagram">
          <InstagramIcon className="h-6 w-6" />
        </Nodo>
      </div>
      <Nodo refEl={xim} label="Ximaro" className="h-[72px] w-[72px] bg-[var(--xm-ink)] text-white sm:h-20 sm:w-20">
        <span className="xm-display text-[30px] leading-none sm:text-[34px]">X</span>
      </Nodo>
      <Nodo refEl={local} label="Tu local">
        <Store className="h-6 w-6" aria-hidden />
      </Nodo>

      <AnimatedBeam containerRef={box} fromRef={vos} toRef={wa} curvature={30} />
      <AnimatedBeam containerRef={box} fromRef={vos} toRef={ig} curvature={-30} delay={0.4} />
      <AnimatedBeam containerRef={box} fromRef={wa} toRef={xim} curvature={-30} delay={0.9} />
      <AnimatedBeam containerRef={box} fromRef={ig} toRef={xim} curvature={30} delay={1.3} />
      <AnimatedBeam containerRef={box} fromRef={xim} toRef={local} delay={1.8} />
    </div>
  );
}
