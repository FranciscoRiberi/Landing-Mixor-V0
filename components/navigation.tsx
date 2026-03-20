"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#novedades", label: "Novedades" },
  { href: "#productos", label: "Productos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#distribuidor", label: "Distribuidor" },
  { href: "#redes", label: "Redes" },
];

const GLASS =
  "border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(0,0,0,0.05)] bg-white/20 backdrop-blur-2xl backdrop-saturate-150";

// Animated hamburger → X icon
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col justify-center items-center w-6 h-6 gap-[5px]">
      <span
        className={cn(
          "block h-[2px] w-6 bg-foreground rounded-full transition-all duration-300 origin-center",
          open && "translate-y-[7px] rotate-45"
        )}
      />
      <span
        className={cn(
          "block h-[2px] w-6 bg-foreground rounded-full transition-all duration-300",
          open && "opacity-0 scale-x-0"
        )}
      />
      <span
        className={cn(
          "block h-[2px] w-6 bg-foreground rounded-full transition-all duration-300 origin-center",
          open && "-translate-y-[7px] -rotate-45"
        )}
      />
    </span>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* ── Desktop ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <nav
          className={cn(
            "hidden md:flex items-center rounded-full pointer-events-auto transition-all duration-500 ease-in-out",
            GLASS,
            isScrolled ? "gap-0 px-3 py-2" : "gap-2 px-3 py-2"
          )}
          style={{ WebkitBackdropFilter: "blur(24px) saturate(150%)" }}
        >
          {/* Logo */}
          <a
            href="#"
            className={cn(
              "flex items-center pl-2 transition-all duration-500",
              isScrolled ? "pr-3 border-r-0 mr-0" : "pr-4 border-r border-white/20 mr-1"
            )}
          >
            <img src="/images/mixor-logo-importador-mayorista-tecnologia-argentina.webp" alt="Mixor - Importador mayorista de tecnología Argentina" className="h-8 w-auto" />
          </a>

          {/* Nav links — collapse when scrolled */}
          <div
            className={cn(
              "flex items-center gap-1 overflow-hidden transition-all duration-500 ease-in-out",
              isScrolled ? "max-w-0 opacity-0 pointer-events-none" : "max-w-xl opacity-100"
            )}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap px-4 py-2 text-sm font-medium text-white/90 hover:text-white rounded-full hover:bg-white/20 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <span
            className={cn(
              "h-5 w-px bg-white/20 transition-all duration-500",
              isScrolled ? "opacity-0 w-0 mx-0" : "opacity-100 mx-1"
            )}
          />

          <a
            href="#pedido"
            className={cn(
              "whitespace-nowrap text-sm font-semibold rounded-full px-5 py-2 ml-1 transition-all duration-300 hover:-translate-y-0.5",
              isScrolled
                ? "border border-primary text-primary hover:bg-primary/10"
                : "bg-white text-primary hover:bg-white/90 shadow-sm"
            )}
          >
            Hace tu pedido
          </a>
          <a
            href="#contacto"
            className="whitespace-nowrap text-sm font-semibold bg-primary text-primary-foreground rounded-full px-5 py-2 ml-1 hover:bg-primary/90 transition-all duration-300 shadow-[0_2px_12px_rgba(255,49,49,0.4)] hover:shadow-[0_4px_20px_rgba(255,49,49,0.5)] hover:-translate-y-0.5"
          >
            Contactanos
          </a>
        </nav>

        {/* ── Mobile top bar ── */}
        <div
          className={cn(
            "md:hidden flex w-full items-center justify-between px-4 py-3 rounded-2xl pointer-events-auto transition-all duration-500",
            GLASS
          )}
          style={{ WebkitBackdropFilter: "blur(24px) saturate(150%)" }}
        >
          <a href="#">
            <img src="/images/mixor-logo-importador-mayorista-tecnologia-argentina.webp" alt="Mixor - Importador mayorista de tecnología Argentina" className="h-9 w-auto" />
          </a>

          <div className="flex items-center gap-2">
            {isScrolled && (
              <a
                href="#contacto"
                className="min-h-[48px] flex items-center px-4 text-xs font-semibold bg-primary text-primary-foreground rounded-full transition-all shadow-[0_2px_8px_rgba(255,49,49,0.4)]"
              >
                Contactanos
              </a>
            )}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full hover:bg-white/20 transition-colors pointer-events-auto"
              aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <HamburgerIcon open={isMobileMenuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay menu ── */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 flex flex-col transition-all duration-400 ease-in-out",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
        style={{
          background: "linear-gradient(160deg, #b30000 0%, #e63030 45%, #7a0000 100%)",
        }}
      >
        {/* Spacer for top bar */}
        <div className="h-20" />

        {/* Links */}
        <nav className="flex flex-col items-center justify-center flex-1 gap-2 px-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center text-[1.5rem] font-semibold text-white/90 hover:text-white py-4 rounded-2xl hover:bg-white/10 transition-all duration-200"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTAs at bottom */}
        <div className="px-8 pb-14 pt-4 flex flex-col gap-3">
          <a
            href="#pedido"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-center min-h-[56px] flex items-center justify-center text-base font-bold bg-white/15 border border-white/40 text-white rounded-full hover:bg-white/25 transition-all"
          >
            Hace tu pedido
          </a>
          <a
            href="#contacto"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-center min-h-[56px] flex items-center justify-center text-base font-bold bg-white text-primary rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.25)] hover:bg-white/90 transition-all"
          >
            Contactanos
          </a>
        </div>
      </div>
    </>
  );
}
