import Link from "next/link";
import { Instagram, MessageCircle, Send, Music4 } from "lucide-react";
import { isMundialTheme } from "@/lib/theme";

// Acento según el tema: default = rojo Mixor · mundial = celeste/cyan Argentina.
const accentText = isMundialTheme ? "text-cyan-400" : "text-red-500";
const accentHover = isMundialTheme ? "hover:text-cyan-400" : "hover:text-red-500";
const accentHoverBright = isMundialTheme ? "hover:text-cyan-300" : "hover:text-red-400";

export function Footer() {
  return (
    <footer className="relative bg-zinc-950 border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div>
            <h3 className={`text-2xl font-bold ${accentText} mb-2`}>MIXOR</h3>
            <p className="text-sm text-zinc-400">
              Importador directo de accesorios tecnológicos mayoristas.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-widest ${accentText} mb-4`}>Productos</h4>
            <ul className="space-y-2">
              <li><Link href="/productos" className={`text-sm text-zinc-400 ${accentHover}`}>Todos</Link></li>
              <li><Link href="/productos" className={`text-sm text-zinc-400 ${accentHover}`}>Parlantes</Link></li>
              <li><Link href="/productos" className={`text-sm text-zinc-400 ${accentHover}`}>Auriculares</Link></li>
              <li><Link href="/productos" className={`text-sm text-zinc-400 ${accentHover}`}>Smartwatch</Link></li>
              <li><Link href="/productos" className={`text-sm text-zinc-400 ${accentHover}`}>Cables</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-widest ${accentText} mb-4`}>Empresa</h4>
            <ul className="space-y-2">
              <li><Link href="/" className={`text-sm text-zinc-400 ${accentHover}`}>Inicio</Link></li>
              <li><Link href="/" className={`text-sm text-zinc-400 ${accentHover}`}>Distribuidor</Link></li>
              <li><Link href="/productos" className={`text-sm text-zinc-400 ${accentHover}`}>Catálogo</Link></li>
              <li><Link href="/" className={`text-sm text-zinc-400 ${accentHover}`}>Contacto</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-widest ${accentText} mb-4`}>Síguenos</h4>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/mixoroficial/" target="_blank" rel="noopener noreferrer" className={`${accentText} ${accentHoverBright} transition-colors`}>
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@mixoroficial" target="_blank" rel="noopener noreferrer" className={`${accentText} ${accentHoverBright} transition-colors`}>
                <Music4 size={20} />
              </a>
              <a href="https://www.facebook.com/p/Mixor-61558422137441/" target="_blank" rel="noopener noreferrer" className={`${accentText} ${accentHoverBright} transition-colors`}>
                <Send size={20} />
              </a>
              {/* Contacto general. Antes: +5491137994825 (Alejandra, desactivada) */}
              <a href="https://wa.me/5491158979196" target="_blank" rel="noopener noreferrer" className={`${accentText} ${accentHoverBright} transition-colors`}>
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-zinc-600">
          <p className="mb-4">Mixor — Importador directo de accesorios tecnológicos mayoristas en Argentina.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="/privacy" className={`text-zinc-500 ${accentHover}`}>Privacidad</a>
            <span>•</span>
            <a href="/terms" className={`text-zinc-500 ${accentHover}`}>Términos</a>
            <span>•</span>
            <span>&copy; {new Date().getFullYear()} Mixor</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
