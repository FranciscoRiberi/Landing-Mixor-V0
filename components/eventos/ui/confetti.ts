// Ráfaga de confeti en un canvas temporal. Liviano a propósito (sin dependencias).

const COLORES = ["#e63030", "#ffffff", "#f2efe8", "#ff8a7a", "#121212"];

export function confettiBurst(x: number, y: number, cantidad = 150) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "80",
  });
  document.body.appendChild(canvas);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas.remove();
  ctx.scale(dpr, dpr);

  const piezas = Array.from({ length: cantidad }, (_, i) => {
    const angulo = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1;
    const v = 6 + Math.random() * 10;
    return {
      x,
      y,
      vx: Math.cos(angulo) * v,
      vy: Math.sin(angulo) * v,
      w: 5 + Math.random() * 6,
      h: 8 + Math.random() * 10,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.35,
      color: COLORES[i % COLORES.length],
    };
  });

  const DURACION = 2600;
  const inicio = performance.now();
  const frame = (t: number) => {
    const pasado = t - inicio;
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = Math.max(0, 1 - pasado / DURACION);
    for (const p of piezas) {
      p.vx *= 0.986;
      p.vy = p.vy * 0.986 + 0.3;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r * 2)));
      ctx.restore();
    }
    if (pasado < DURACION) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}
