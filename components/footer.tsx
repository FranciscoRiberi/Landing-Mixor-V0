export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* SEO text block — readable by crawlers and AI bots */}
        <p className="text-xs text-muted-foreground/60 text-center max-w-2xl mx-auto mb-6 leading-relaxed">
          <strong className="text-muted-foreground/80">Mixor</strong> — Importador directo de accesorios tecnológicos mayoristas en Argentina. Parlantes Bluetooth, auriculares, smartwatches, cargadores y cables al por mayor para distribuidores. Envíos a Buenos Aires, Córdoba, Rosario, Mendoza y todo el interior del país.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            {"Argentina"}
          </a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Mixor. Todos los derechos reservados.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Privacidad
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
