import Link from "next/link";
import {
  Instagram,
  MessageCircle,
  Facebook,
  Music4,
  ArrowUpRight,
} from "lucide-react";
import { isMundialTheme } from "@/lib/theme";

// Acento según el tema: default = rojo Mixor · mundial = celeste/cyan Argentina.
const accentText = isMundialTheme ? "text-cyan-400" : "text-red-500";
const accentHover = isMundialTheme
  ? "hover:text-cyan-400"
  : "hover:text-red-500";
const accentRule = isMundialTheme
  ? "via-cyan-500/60"
  : "via-red-600/60";

// Redes secundarias. Instagram va aparte: es la que queremos empujar.
const secondarySocials = [
  {
    href: "https://www.tiktok.com/@mixoroficial",
    icon: Music4,
    label: "Seguinos en TikTok",
  },
  {
    href: "https://www.facebook.com/p/Mixor-61558422137441/",
    icon: Facebook,
    label: "Seguinos en Facebook",
  },
  {
    // Contacto general. Antes: +5491137994825 (Alejandra, desactivada)
    href: "https://wa.me/5491158979196",
    icon: MessageCircle,
    label: "Escribinos por WhatsApp",
  },
];

const productLinks = [
  { href: "/productos", label: "Catálogo completo" },
  { href: "/#novedades", label: "Novedades" },
  { href: "/#productos", label: "Destacados" },
];

const companyLinks = [
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#distribuidor", label: "Ser distribuidor" },
  { href: "/#pedido", label: "Hacer un pedido" },
  { href: "/#contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="carbon-fiber relative text-white">
      {/* Hairline superior: separa el footer del contenido y refuerza el acento. */}
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${accentRule} to-transparent`}
      />

      {/* Capa de brillo: da volumen al tejido sin sumar peso. */}
      <div className="carbon-sheen pointer-events-none absolute inset-0" />

      <div className="relative max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Marca + CTA principal */}
          <div className="lg:col-span-5">
            <h3 className={`text-2xl font-bold ${accentText}`}>MIXOR</h3>
            <p className="mt-2 max-w-xs text-sm text-zinc-400">
              Importador directo de accesorios tecnológicos mayoristas.
            </p>

            {/* Instagram = canal principal. Card grande, no un ícono más. */}
            <a
              href="https://www.instagram.com/mixoroficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 sm:max-w-sm"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] shadow-lg shadow-black/40 transition-transform duration-300 group-hover:scale-105"
              >
                <Instagram size={24} className="text-white" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                  Seguinos en Instagram
                </span>
                <span className="block truncate text-base font-semibold text-white">
                  @mixoroficial
                </span>
              </span>

              <ArrowUpRight
                size={20}
                aria-hidden="true"
                className="shrink-0 text-zinc-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
              />
            </a>

            {/* Redes secundarias, deliberadamente más chicas. */}
            <div className="mt-5 flex items-center gap-2">
              {secondarySocials.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav
            aria-label="Productos"
            className="lg:col-span-3 lg:col-start-8"
          >
            <h4
              className={`mb-4 text-xs font-bold uppercase tracking-widest ${accentText}`}
            >
              Productos
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-sm text-zinc-400 transition-colors ${accentHover}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Empresa" className="lg:col-span-2">
            <h4
              className={`mb-4 text-xs font-bold uppercase tracking-widest ${accentText}`}
            >
              Empresa
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-sm text-zinc-400 transition-colors ${accentHover}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-xs text-zinc-500 sm:flex-row sm:justify-between">
          <p className="text-center sm:text-left">
            Mixor — Importador directo de accesorios tecnológicos mayoristas en
            Argentina.
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className={`transition-colors ${accentHover}`}>
              Privacidad
            </a>
            <span aria-hidden="true" className="text-zinc-700">
              •
            </span>
            <a href="/terms" className={`transition-colors ${accentHover}`}>
              Términos
            </a>
            <span aria-hidden="true" className="text-zinc-700">
              •
            </span>
            <span>&copy; {new Date().getFullYear()} Mixor</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
