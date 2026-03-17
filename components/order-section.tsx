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
// Lightning bolt effect — bolts strike down from the top edge
// ---------------------------------------------------------------------------

// Build a jagged lightning path from (x, y0) down to (x, y1)
function buildBolt(
  x: number,
  y0: number,
  y1: number,
  segments: number,
  spread: number
): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [{ x, y: y0 }];
  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    pts.push({
      x: x + (Math.random() - 0.5) * spread,
      y: y0 + t * (y1 - y0),
    });
  }
  pts.push({ x, y: y1 });
  return pts;
}

function LightningCanvas() {
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

    type Bolt = {
      pts: { x: number; y: number }[];
      alpha: number;       // current opacity
      decay: number;       // fade speed
      width: number;       // stroke width
      branches: { pts: { x: number; y: number }[]; alpha: number }[];
      life: number;        // frames alive (for flicker)
    };

    const bolts: Bolt[] = [];
    let frame = 0;
    let nextSpawn = 20 + Math.random() * 50;

    const spawnBolt = () => {
      const x = 20 + Math.random() * (canvas.width - 40);
      const height = 60 + Math.random() * 120;
      const segs = 8 + Math.floor(Math.random() * 6);
      const pts = buildBolt(x, 0, height, segs, 18);

      // 1-2 small branches off a random mid-segment
      const branches: Bolt["branches"] = [];
      const branchCount = Math.random() < 0.6 ? 1 : 2;
      for (let b = 0; b < branchCount; b++) {
        const srcIdx = 2 + Math.floor(Math.random() * (pts.length - 3));
        const src = pts[srcIdx];
        const bLen = 20 + Math.random() * 40;
        const bPts = buildBolt(src.x, src.y, src.y + bLen, 4, 10);
        branches.push({ pts: bPts, alpha: 1 });
      }

      bolts.push({
        pts,
        alpha: 0.25 + Math.random() * 0.2,
        decay: 0.018 + Math.random() * 0.02,
        width: 1 + Math.random() * 1.2,
        branches,
        life: 0,
      });
    };

    const drawBoltPath = (
      pts: { x: number; y: number }[],
      alpha: number,
      width: number
    ) => {
      if (pts.length < 2) return;
      // Glow pass
      ctx.save();
      ctx.strokeStyle = `rgba(255, 80, 80, ${alpha * 0.25})`;
      ctx.lineWidth = width * 4;
      ctx.lineJoin = "round";
      ctx.shadowColor = "rgba(220, 40, 40, 0.8)";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
      ctx.restore();

      // Core line
      ctx.save();
      ctx.strokeStyle = `rgba(255, 140, 140, ${alpha})`;
      ctx.lineWidth = width;
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (frame >= nextSpawn) {
        spawnBolt();
        nextSpawn = frame + 30 + Math.random() * 70;
      }

      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        b.life++;

        // Flicker: skip drawing on some frames for electric feel
        const flicker = b.life < 3 ? (Math.random() > 0.3) : true;

        if (flicker) {
          drawBoltPath(b.pts, b.alpha, b.width);
          for (const br of b.branches) {
            drawBoltPath(br.pts, b.alpha * 0.6, b.width * 0.6);
          }
        }

        b.alpha -= b.decay;
        if (b.alpha <= 0) bolts.splice(i, 1);
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
      className="absolute inset-x-0 top-0 w-full h-64 pointer-events-none z-0"
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
      <LightningCanvas />
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
