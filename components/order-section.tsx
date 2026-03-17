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
// Lightning — 3-phase: STRIKE (reveal top→bottom) → HOLD (flicker) → FADE
// ---------------------------------------------------------------------------

function buildBolt(x: number, y0: number, y1: number, segs: number, spread: number) {
  const pts: { x: number; y: number }[] = [{ x, y: y0 }];
  for (let i = 1; i < segs; i++) {
    const t = i / segs;
    pts.push({ x: x + (Math.random() - 0.5) * spread, y: y0 + t * (y1 - y0) });
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

    type Pt = { x: number; y: number };
    type Bolt = {
      pts: Pt[];
      branches: { pts: Pt[] }[];
      width: number;
      strikeF: number; // frames to reveal (fast, feels instant)
      holdF: number;   // frames to stay bright with flicker
      fadeF: number;   // frames for slow quadratic fade
      life: number;
      peakAlpha: number;
    };

    const bolts: Bolt[] = [];
    let frame = 0;
    let nextSpawn = 45 + Math.random() * 65;

    const spawn = () => {
      const x = 20 + Math.random() * (canvas.width - 40);
      const h = 90 + Math.random() * 160;
      const pts = buildBolt(x, 0, h, 10 + Math.floor(Math.random() * 7), 24);
      const branches: { pts: Pt[] }[] = [];
      for (let b = 0; b < (Math.random() < 0.5 ? 1 : 2); b++) {
        const idx = 3 + Math.floor(Math.random() * Math.max(1, pts.length - 5));
        const src = pts[idx];
        branches.push({
          pts: buildBolt(src.x, src.y, src.y + 30 + Math.random() * 55, 5, 14),
        });
      }
      bolts.push({
        pts,
        branches,
        width: 1.5 + Math.random() * 1.8,
        strikeF: 5 + Math.floor(Math.random() * 4),
        holdF: 22 + Math.floor(Math.random() * 28),
        fadeF: 50 + Math.floor(Math.random() * 35),
        life: 0,
        peakAlpha: 0.48 + Math.random() * 0.27,
      });
    };

    const drawPath = (pts: Pt[], vis: number, alpha: number, w: number) => {
      const n = Math.min(Math.ceil(vis), pts.length);
      if (n < 2 || alpha <= 0) return;

      // Outer glow
      ctx.save();
      ctx.strokeStyle = `rgba(200,20,20,${alpha * 0.18})`;
      ctx.lineWidth = w * 10;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.shadowColor = "rgba(255,40,40,1)";
      ctx.shadowBlur = 28;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < n; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
      ctx.restore();

      // Mid glow
      ctx.save();
      ctx.strokeStyle = `rgba(255,65,65,${alpha * 0.45})`;
      ctx.lineWidth = w * 3.5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < n; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
      ctx.restore();

      // Hot white-pink core
      ctx.save();
      ctx.strokeStyle = `rgba(255,210,210,${alpha})`;
      ctx.lineWidth = w * 0.6;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < n; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (frame >= nextSpawn) {
        spawn();
        nextSpawn = frame + 55 + Math.random() * 90;
      }

      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        b.life++;
        const { strikeF, holdF, fadeF, peakAlpha, pts, branches, width } = b;
        if (b.life > strikeF + holdF + fadeF) { bolts.splice(i, 1); continue; }

        let alpha: number;
        let vf: number;

        if (b.life <= strikeF) {
          // STRIKE: bolt shoots downward segment by segment
          vf = b.life / strikeF;
          alpha = vf * peakAlpha;
        } else if (b.life <= strikeF + holdF) {
          // HOLD: full bolt, electric flicker
          vf = 1;
          const r = Math.random();
          alpha = r < 0.10 ? peakAlpha * 0.10
                : r < 0.20 ? peakAlpha * 0.55
                : peakAlpha;
        } else {
          // FADE: quadratic ease-out, no flicker
          vf = 1;
          const t = (b.life - strikeF - holdF) / fadeF;
          alpha = peakAlpha * (1 - t) * (1 - t);
        }

        drawPath(pts, vf * pts.length, alpha, width);
        for (const br of branches) {
          const brVis = b.life <= strikeF
            ? Math.max(0, (vf - 0.25) * br.pts.length)
            : br.pts.length;
          drawPath(br.pts, brVis, alpha * 0.58, width * 0.5);
        }
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
      className="absolute inset-x-0 top-0 w-full h-72 pointer-events-none z-0"
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
