"use client";

import { useEffect, useRef } from "react";

/**
 * White confetti/paper pieces floating down — World Cup celebration style
 */
export function MundialConfetti() {
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

    type Confetti = {
      x: number;
      y: number;
      w: number;
      h: number;
      rotation: number;
      rotationSpeed: number;
      vy: number;
      vx: number;
      alpha: number;
      color: string;
    };

    const COLORS = ["#ffffff", "#f0f0f0", "#e8e8e8", "#75AADB", "#F5D547"]; // White + celeste + gold
    const COUNT = 40;
    const confetti: Confetti[] = [];

    const init = () => {
      confetti.length = 0;
      for (let i = 0; i < COUNT; i++) {
        confetti.push({
          x: Math.random() * (canvas.width || 800),
          y: Math.random() * (canvas.height || 600) - (canvas.height || 600),
          w: 4 + Math.random() * 8,
          h: 6 + Math.random() * 10,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.08,
          vy: 0.4 + Math.random() * 0.8,
          vx: (Math.random() - 0.5) * 0.5,
          alpha: 0.5 + Math.random() * 0.4,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };
    init();

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const c of confetti) {
        c.y += c.vy;
        c.x += c.vx + Math.sin(c.y * 0.01) * 0.3;
        c.rotation += c.rotationSpeed;

        // Reset when off screen
        if (c.y > canvas.height + 20) {
          c.y = -20;
          c.x = Math.random() * canvas.width;
        }
        if (c.x < -20) c.x = canvas.width + 20;
        if (c.x > canvas.width + 20) c.x = -20;

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation);
        ctx.globalAlpha = c.alpha;
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

/**
 * Argentina flag SVG component
 */
export function ArgentinaFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 500"
      className={className}
      aria-label="Bandera de Argentina"
    >
      <rect width="800" height="500" fill="#74ACDF" />
      <rect y="166.67" width="800" height="166.67" fill="#FFFFFF" />
      {/* Sol de Mayo */}
      <circle cx="400" cy="250" r="35" fill="#F6B40E" />
      <g fill="#F6B40E">
        {[...Array(16)].map((_, i) => (
          <polygon
            key={i}
            points="400,180 395,215 405,215"
            transform={`rotate(${i * 22.5} 400 250)`}
          />
        ))}
        {[...Array(16)].map((_, i) => (
          <polygon
            key={`w${i}`}
            points="400,190 397,210 403,210"
            transform={`rotate(${i * 22.5 + 11.25} 400 250)`}
          />
        ))}
      </g>
      <circle cx="400" cy="250" r="25" fill="#F6B40E" />
    </svg>
  );
}
