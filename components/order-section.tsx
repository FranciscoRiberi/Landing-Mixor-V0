"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, ShoppingBag, MessageCircle } from "lucide-react";

const salesAdvisors = [
  { name: "Alejandra", phone: "+5491137994825" },
  { name: "Marcelo", phone: "+5493518698065" },
  { name: "German", phone: "+5491158979196" },
];

const provinces = [
  "Buenos Aires","Catamarca","Chaco","Chubut","Córdoba","Corrientes",
  "Entre Ríos","Formosa","Jujuy","La Pampa","La Rioja","Mendoza",
  "Misiones","Neuquén","Río Negro","Salta","San Juan","San Luis",
  "Santa Cruz","Santa Fe","Santiago del Estero","Tierra del Fuego",
  "Tucumán","Ciudad Autónoma de Buenos Aires",
];

// ---------------------------------------------------------------------------
// Minimal floating particles — very small, grey/white, slow drift
// ---------------------------------------------------------------------------
function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = ["#cccccc", "#dddddd", "#eeeeee", "#ffffff"];

    type Particle = {
      x: number;
      y: number;
      r: number;         // 1–3px
      vx: number;        // very slow horizontal drift
      vy: number;        // very slow vertical float
      alpha: number;     // 0.3–0.5
      phase: number;     // for sinusoidal wobble
    };

    // Build 25 static particles distributed across the canvas
    const COUNT = 25;
    const particles: Particle[] = [];

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * (canvas.width || 800),
          y: Math.random() * (canvas.height || 400),
          r: 0.8 + Math.random() * 2,
          vx: (Math.random() - 0.5) * 0.12,
          vy: -0.06 - Math.random() * 0.1, // float upward gently
          alpha: 0.3 + Math.random() * 0.2,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };
    init();

    let frame = 0;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      for (const p of particles) {
        // Gentle sinusoidal side-sway
        p.x += p.vx + Math.sin(frame * 0.008 + p.phase) * 0.08;
        p.y += p.vy;

        // Wrap around edges
        if (p.y < -4) p.y = canvas.height + 4;
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;

        const color = COLORS[Math.floor(Math.random() * COLORS.length) % COLORS.length];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}

const inputClass =
  "w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 text-sm";

export function OrderSection() {
  const [formData, setFormData] = useState({
    name: "",
    celular: "",
    province: "Buenos Aires",
    advisor: "Alejandra",
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const advisor = salesAdvisors.find((a) => a.name === formData.advisor);
    if (!advisor) return;

    // Open WhatsApp immediately — must be synchronous to avoid popup blockers
    const text = `Hola ${formData.advisor}, soy ${formData.name} de ${formData.province} y quiero hacer un pedido.${formData.note ? ` ${formData.note}` : ""}`;
    window.open(`https://wa.me/${advisor.phone}?text=${encodeURIComponent(text)}`, "_blank");

    // Capture lead in background — never blocks the user
    const payload = {
      nombre: formData.name,
      celular: formData.celular,
      provincia: formData.province,
      asesor: formData.advisor,
      mensaje: formData.note,
      formulario: "Formulario Hace tu Pedido",
    };

    (async () => {
      try {
        const recaptchaToken: string = await new Promise((resolve, reject) => {
          (window as any).grecaptcha.ready(() => {
            (window as any).grecaptcha
              .execute("6LcERrksAAAAAL3iEOmDXVYbilWHfRaeDvnE7Jvo", { action: "order_form" })
              .then(resolve)
              .catch(reject);
          });
        });
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, recaptchaToken }),
        });
      } catch {
        // Silently ignore — lead capture is best-effort
      }
    })();
  };

  return (
    <section
      id="pedido"
      className="relative py-16 lg:py-28 px-4 sm:px-6 border-b border-border overflow-hidden"
      style={{
        backgroundImage: "url('/images/pedido-bg-auriculares-smartwatch-mixor.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* z-0: bg image is the section itself */}

      {/* Minimal particles — z-10 */}
      <FloatingParticles />

      {/* Content — z-20 */}
      <div className="relative z-20 max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5">
            <ShoppingBag size={13} />
            Pedidos mayoristas
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance mb-4">
            Hace tu pedido
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Completá el formulario y te vamos a contactar por WhatsApp para coordinar tu pedido.
          </p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="order-name" className="block text-sm font-medium text-foreground mb-1.5">
                Nombre o razón social
              </label>
              <input
                id="order-name"
                type="text"
                required
                placeholder="Tu nombre o el de tu negocio"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="order-celular" className="block text-sm font-medium text-foreground mb-1.5">
                Número de celular{" "}
                <span className="text-muted-foreground font-normal">(opcional)</span>
              </label>
              <input
                id="order-celular"
                type="tel"
                placeholder="Ej: 3515551234"
                value={formData.celular}
                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="order-province" className="block text-sm font-medium text-foreground mb-1.5">
                  Provincia
                </label>
                <select
                  id="order-province"
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className={inputClass}
                  required
                >
                  {provinces.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="order-advisor" className="block text-sm font-medium text-foreground mb-1.5">
                  Asesor de ventas
                </label>
                <select
                  id="order-advisor"
                  value={formData.advisor}
                  onChange={(e) => setFormData({ ...formData, advisor: e.target.value })}
                  className={inputClass}
                  required
                >
                  {salesAdvisors.map((a) => (
                    <option key={a.name} value={a.name}>{a.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="order-note" className="block text-sm font-medium text-foreground mb-1.5">
                Nota adicional{" "}
                <span className="text-muted-foreground font-normal">(opcional)</span>
              </label>
              <textarea
                id="order-note"
                rows={3}
                placeholder="Ej: Quiero información sobre parlantes y cargadores..."
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-base hover:bg-primary/90 transition-all duration-300 shadow-[0_2px_12px_rgba(255,49,49,0.35)] hover:shadow-[0_4px_20px_rgba(255,49,49,0.45)] hover:-translate-y-0.5 mt-1"
            >
              <MessageCircle size={18} />
              Enviar pedido por WhatsApp
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Te responden en menos de 24 horas hábiles
        </p>
      </div>
    </section>
  );
}
