"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 55;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.18,
      dy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.35 + 0.08,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
    />
  );
}

export function HeroSection() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-32">

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/parlantes-bluetooth-mixor-accesorios-mayoristas-argentina.webp"
          alt="Parlantes Bluetooth Mixor con luces RGB - Accesorios tecnológicos mayoristas"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,0,0,0.35) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--background)/0.55) 0%, transparent 18%, transparent 80%, hsl(var(--background)/0.65) 100%)",
          }}
        />
      </div>

      {/* Speaker overlay — mobile only, behind particles */}
      <div className="sm:hidden absolute inset-0 z-[0] pointer-events-none overflow-hidden flex items-end justify-center">
        <img
          src="/images/mixor-parlante-hero-overlay.webp"
          alt=""
          aria-hidden="true"
          className="w-[75%] object-contain opacity-30 mix-blend-luminosity"
          style={{ filter: "saturate(0.4) brightness(1.1)" }}
        />
      </div>

      {/* Particles layer */}
      <ParticleCanvas />

      {/* Text content card */}
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        <div
          className="bg-background/88 backdrop-blur-xl rounded-3xl px-5 py-8 sm:px-8 sm:py-10 shadow-2xl border border-border/60 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          {/* Mobile: slightly larger title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground text-balance leading-[1.1] font-sans font-bold mb-4">
            <span className="text-gradient-red">Nuevas tendencias,</span>
            <br />
            la mejor rotación.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            {"En Mixor, contamos con:\nParlantes Bluetooth, auriculares, smartwatches, cargadores y muchos mas productos de alta rotación. Precios mayoristas directos del importador para distribuidores de todo el país."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#productos"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground w-full sm:w-auto px-8 py-4 min-h-[52px] rounded-full text-base font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
            >
              Explorar Productos
              <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground w-full sm:w-auto px-8 py-4 min-h-[52px] text-base font-medium transition-all duration-300 border border-border rounded-full hover:border-primary/50 hover:bg-primary/5"
            >
              Contactanos
            </a>
          </div>
        </div>


      </div>

      {/* "Conocé más" banner */}
      <div
        className="mt-8 sm:mt-8 w-full max-w-xl mx-auto text-center animate-fade-in-up opacity-0 relative z-10 mb-20"
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        <div className="rounded-2xl px-6 py-5 sm:py-5 backdrop-blur-md bg-background/80 border border-border/50 border-t-[3px] border-t-primary">
          <p className="uppercase tracking-[0.2em] text-primary mb-1 text-xs">
            CONOCÉ MAS
          </p>
          <p className="text-lg sm:text-lg font-bold mb-1 text-foreground">
            {"¿QUÉ PRODUCTOS IMPORTA MIXOR?"}
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            {"Todo los meses llegan a nuestros depositos nuevos produtos para que puedas actualizar tu stock cuando vos quieras."}
          </p>
          {/* Bouncing chevron */}
          <ChevronDown
            size={20}
            className="mx-auto text-primary"
            style={{ animation: "bounce 1.4s ease-in-out infinite" }}
          />
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border z-10" />

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => setShowMessage(!showMessage)}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-white/70">Desliza</span>
        <ChevronDown size={20} className="animate-bounce text-white/80" />
      </div>

      {/* Message popup */}
      {showMessage && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 max-w-md w-full mx-4 bg-card border border-border rounded-2xl p-6 shadow-2xl animate-fade-in-up z-50">
          <button
            onClick={() => setShowMessage(false)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Nuevos productos todos los meses. Consultá con nuestros vendedores o seguinos en redes sociales.
          </p>
        </div>
      )}

      {/* Floating animation keyframe + bounce */}
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: rotate(-3deg) translateY(0px); }
          50%       { transform: rotate(-3deg) translateY(-6px); }
        }
      `}</style>
    </section>
  );
}
