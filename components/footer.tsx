"use client";

import Link from "next/link";
import { Instagram, MessageCircle, Send, Music4 } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-zinc-950 border-t border-white/10 text-white">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand section */}
            <div className="md:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                  MIXOR
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Importador directo de accesorios tecnológicos mayoristas. Parla​ntes, auriculares, smartwatches y cables.
                </p>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-4">Productos</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/productos?category=parlantes" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    Parlantes
                  </Link>
                </li>
                <li>
                  <Link href="/productos?category=auriculares" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    Auriculares
                  </Link>
                </li>
                <li>
                  <Link href="/productos?category=smartwatch" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    Smartwatch
                  </Link>
                </li>
                <li>
                  <Link href="/productos?category=cables" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    Cables
                  </Link>
                </li>
                <li>
                  <Link href="/productos?category=cargadores" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    Cargadores
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-4">Empresa</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/#nosotros" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/#distribuidor" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    Sé Distribuidor
                  </Link>
                </li>
                <li>
                  <Link href="/productos" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    Catálogo
                  </Link>
                </li>
                <li>
                  <Link href="/#contacto" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-4">Síguenos</h4>
              <div className="flex gap-3 mb-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
                  aria-label="TikTok"
                >
                  <Music4 size={18} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
                  aria-label="Facebook"
                >
                  <Send size={18} />
                </a>
                <a
                  href="https://wa.me/5491234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
              <p className="text-xs text-zinc-500">
                Mantenete actualizado con nuestras últimas novedades y promociones.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mb-8" />

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* SEO text */}
            <p className="text-xs text-zinc-500 text-center md:text-left max-w-md leading-relaxed">
              <strong className="text-zinc-400">Mixor</strong> — Importador directo de accesorios tecnológicos mayoristas en Argentina. Parlantes, auriculares, smartwatches, cargadores y cables. Envíos a todo el país.
            </p>

            {/* Copyright */}
            <p className="text-xs text-zinc-600">
              &copy; {new Date().getFullYear()} Mixor. Todos los derechos reservados.
            </p>

            {/* Legal links */}
            <div className="flex items-center gap-4">
              <a href="/privacy" className="text-xs text-zinc-500 hover:text-cyan-400 transition-colors">
                Privacidad
              </a>
              <span className="text-zinc-700">•</span>
              <a href="/terms" className="text-xs text-zinc-500 hover:text-cyan-400 transition-colors">
                Términos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
