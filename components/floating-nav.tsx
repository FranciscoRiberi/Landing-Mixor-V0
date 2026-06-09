"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Share2, Phone, Grid, Smartphone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const FloatingNav = () => {
  const pathname = usePathname();
  const [active, setActive] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const items = [
    {
      id: 0,
      icon: (
        <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center overflow-hidden flex-shrink-0">
          <Image
            src="/images/mixor-logo-importador-mayorista-tecnologia-argentina.webp"
            alt="Mixor"
            width={28}
            height={28}
            className="w-5 h-5 object-contain"
          />
        </div>
      ),
      label: "Inicio",
      href: "/"
    },
    { id: 1, icon: <Smartphone size={22} />, label: "Productos", href: "/productos" },
    { id: 2, icon: <Share2 size={22} />, label: "Redes", href: "/#redes" },
    { id: 3, icon: <Phone size={22} />, label: "Asesor", href: "/#contacto" },
    { id: 4, icon: <ShoppingCart size={22} />, label: "Pedido", href: "/#pedido" },
  ];

  // Detectar la página actual y establecer el active
  useEffect(() => {
    if (pathname === "/productos") {
      setActive(1);
    } else if (pathname === "/" || pathname === "/#") {
      setActive(0);
    } else {
      setActive(0);
    }
  }, [pathname]);

  // Update indicator position when active changes or resize
  useEffect(() => {
    const updateIndicator = () => {
      if (btnRefs.current[active] && containerRef.current) {
        const btn = btnRefs.current[active];
        const container = containerRef.current;
        if (!btn) return;
        const btnRect = btn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setIndicatorStyle({
          width: btnRect.width,
          left: btnRect.left - containerRect.left,
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [active]);

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full px-4 pb-6 pt-4">
      <div
        ref={containerRef}
        className="relative flex items-center justify-between bg-background/80 backdrop-blur-xl dark:bg-zinc-900/80 shadow-2xl rounded-full px-2 py-3 border border-primary/20"
      >
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={item.href}
            ref={(el) => (btnRefs.current[index] = el as HTMLButtonElement)}
            onClick={() => setActive(index)}
            className="relative flex flex-col items-center justify-center flex-1 px-2 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            <div className="z-10 text-primary">{item.icon}</div>
            {/* hide labels on small screens */}
            <span className="text-xs mt-1 hidden sm:block">{item.label}</span>
          </Link>
        ))}

        {/* Sliding Active Indicator */}
        <motion.div
          animate={indicatorStyle}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-1 bottom-1 rounded-full bg-primary/10"
        />
      </div>
    </div>
  );
};

export default FloatingNav;
