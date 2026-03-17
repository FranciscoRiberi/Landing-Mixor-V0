"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, ShoppingBag, MessageCircle } from "lucide-react";

const salesAdvisors = [
  { name: "Alejandra", phone: "+5491137994825" },
  { name: "Marcelo", phone: "+5493518698065" },
  { name: "German", phone: "+5491158979196" },
];

const provinces = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
  "Ciudad Autónoma de Buenos Aires",
];

// ---------------------------------------------------------------------------
// Lava drip effect — slow thick drops falling from the top edge
// ---------------------------------------------------------------------------
function LavaDrips() {
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

    // A drip is a slow elongated blob that stretches as it falls
    type Drip = {
      x: number;       // fixed horizontal position
      y: number;       // current tip y
      vy: number;      // fall speed (slow)
      r: number;       // blob radius
      tail: number;    // how long the tail streaks back up
      alpha: number;   // opacity
      decay: number;   // fade rate
      phase: number;   // wobble phase
    };

    const drips: Drip[] = [];
    let frame = 0;
    // Spawn roughly every 40-80 frames — sparse, like real lava
    let nextSpawn = 40 + Math.random() * 40;

    const spawn = () => {
      const r = 3 + Math.random() * 5;
      drips.push({
        x: 30 + Math.random() * (canvas.width - 60),
        y: 0,
        vy: 0.25 + Math.random() * 0.35,   // very slow
        r,
        tail: r * (2.5 + Math.random() * 2),
        alpha: 0.18 + Math.random() * 0.14,
        decay: 0.00025 + Math.random() * 0.0003,
        phase: Math.random() * Math.PI * 2,
      });
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (frame >= nextSpawn) {
        spawn();
        nextSpawn = frame + 40 + Math.random() * 60;
      }

      for (let i = drips.length - 1; i >= 0; i--) {
        const d = drips[i];
        d.y += d.vy;
        d.alpha -= d.decay;

        if (d.alpha <= 0 || d.y > canvas.height + d.tail) {
          drips.splice(i, 1);
          continue;
        }

        // Slight side-wobble — very subtle
        const wobbleX = Math.sin(frame * 0.03 + d.phase) * 0.6;

        // Draw the tail (streak going upward from the blob)
        const tailLen = d.tail;
        const grad = ctx.createLinearGradient(
          d.x + wobbleX, d.y - tailLen,
          d.x + wobbleX, d.y
        );
        grad.addColorStop(0, `rgba(200, 30, 30, 0)`);
        grad.addColorStop(1, `rgba(210, 35, 35, ${d.alpha * 0.6})`);

        ctx.beginPath();
        ctx.moveTo(d.x + wobbleX - d.r * 0.4, d.y - tailLen);
        ctx.quadraticCurveTo(
          d.x + wobbleX + d.r * 0.5, d.y - tailLen * 0.5,
          d.x + wobbleX, d.y - d.r * 0.5
        );
        ctx.quadraticCurveTo(
          d.x + wobbleX - d.r * 0.5, d.y - tailLen * 0.5,
          d.x + wobbleX - d.r * 0.4, d.y - tailLen
        );
        ctx.fillStyle = grad;
        ctx.fill();

        // Draw the rounded blob tip
        const blobGrad = ctx.createRadialGradient(
          d.x + wobbleX, d.y, 0,
          d.x + wobbleX, d.y, d.r
        );
        blobGrad.addColorStop(0, `rgba(240, 60, 60, ${d.alpha})`);
        blobGrad.addColorStop(1, `rgba(180, 20, 20, ${d.alpha * 0.4})`);

        ctx.beginPath();
        ctx.arc(d.x + wobbleX, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = blobGrad;
        ctx.fill();
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
      className="absolute inset-x-0 top-0 w-full h-48 pointer-events-none z-0"
    />
  );
}

const inputClass =
  "w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 text-sm";

export function OrderSection() {
  const [formData, setFormData] = useState({
    name: "",
    province: "Buenos Aires",
    advisor: "Alejandra",
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const advisor = salesAdvisors.find((a) => a.name === formData.advisor);
    if (!advisor) return;
    const text = `Hola ${formData.advisor}, soy ${formData.name} de ${formData.province} y quiero hacer un pedido.${formData.note ? ` ${formData.note}` : ""}`;
    window.open(
      `https://wa.me/${advisor.phone}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <section
      id="pedido"
      className="relative py-16 lg:py-28 px-4 sm:px-6 border-b border-border overflow-hidden"
    >
      <LavaDrips />
      <div className="relative z-10 max-w-xl mx-auto">
        {/* Header */}
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

        {/* Form card */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
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

            {/* Province + Advisor */}
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

            {/* Optional note */}
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

            {/* Submit */}
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
