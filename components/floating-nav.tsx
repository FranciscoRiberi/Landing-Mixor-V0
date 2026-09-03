"use client";

import React, { useState, useRef, useEffect } from "react";
import { ShoppingCart, Share2, Phone, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const FloatingNav = () => {
  const pathname = usePathname();
  const [active, setActive] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  // Cada item es un <Link>, o sea un <a>: solo se les mide el ancho y la
  // posicion para mover el indicador.
  const btnRefs = useRef<(HTMLAnchorElement | null)[]>([]);

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
    { id: 1, icon: <BookOpen size={22} />, label: "Productos", href: "/productos" },
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

  // Update indicator position when active changes or resize.
  // El ResizeObserver es necesario ademas del evento de resize: en el primer
  // render la barra todavia no tiene su ancho final (fuentes, imagen del logo),
  // asi que la medicion inicial sale en cero y nunca se corregia.
  useEffect(() => {
    const updateIndicator = () => {
      const btn = btnRefs.current[active];
      const container = containerRef.current;
      if (!btn || !container) return;

      const btnRect = btn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      if (btnRect.width === 0) return;

      setIndicatorStyle({
        width: btnRect.width,
        left: btnRect.left - containerRect.left,
      });
    };

    updateIndicator();

    const observer = new ResizeObserver(updateIndicator);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", updateIndicator);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
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
            ref={(el) => {
              btnRefs.current[index] = el;
            }}
            onClick={() => setActive(index)}
            className="relative flex flex-col items-center justify-center flex-1 px-2 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            <div className="z-10 text-primary">{item.icon}</div>
            {/* hide labels on small screens */}
            <span className="text-xs mt-1 hidden sm:block">{item.label}</span>
          </Link>
        ))}

        {/* Sliding Active Indicator.
            Va con transicion de CSS y no con framer-motion: al animar `width` y
            `left` desde un estado que arranca en cero, framer no llegaba a
            escribir los estilos y el indicador quedaba invisible. */}
        <div
          aria-hidden="true"
          className="absolute top-1 bottom-1 rounded-full bg-primary/10 transition-[width,left] duration-300 ease-out"
          style={{ width: indicatorStyle.width, left: indicatorStyle.left }}
        />
      </div>
    </div>
  );
};

export default FloatingNav;
