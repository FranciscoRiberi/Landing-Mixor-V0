"use client";

import { Instagram, MessageCircle, ExternalLink, Facebook } from "lucide-react";

// Real TikTok SVG icon
function TikTokIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}

const socialLinks = [
  {
    name: "Instagram",
    icon: "instagram",
    href: "https://www.instagram.com/mixoroficial/",
    color: "from-primary via-pink-400 to-pink-500",
    description: "Sigue nuestras últimas novedades",
  },
  {
    name: "TikTok",
    icon: "tiktok",
    href: "https://www.tiktok.com/@mixoroficial?lang=es-419",
    color: "from-primary to-rose-600",
    description: "Contenido viral y tendencias",
  },
  {
    name: "Facebook",
    icon: "facebook",
    href: "https://www.facebook.com/p/Mixor-61558422137441/",
    color: "from-blue-500 to-blue-600",
    description: "Conéctate con nuestra comunidad",
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    href: "https://whatsapp.com/channel/0029VbAxfBeKGGGLGTOYMx0g",
    color: "from-green-400 to-green-600",
    description: "Canal exclusivo de actualizaciones",
  },
];

function SocialIcon({ name, size = 32 }: { name: string; size?: number }) {
  if (name === "tiktok") return <TikTokIcon size={size} />;
  if (name === "instagram") return <Instagram size={size} />;
  if (name === "facebook") return <Facebook size={size} />;
  if (name === "whatsapp") return <MessageCircle size={size} />;
  return null;
}

export function SocialSection() {
  return (
    <section id="redes" className="py-16 lg:py-32 px-4 sm:px-6 border-b border-border">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Conecta con Nosotros
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Síguenos en <span className="text-gradient-red">Redes Sociales</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Mantente actualizado con las últimas novedades, promociones y contenido exclusivo de Mixor
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 sm:p-8 transition-all duration-500 hover:border-primary/50 hover-lift"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${social.color}`} />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon container with animated glow */}
                  <div className="mb-4 p-4 rounded-xl bg-card border border-border group-hover:border-primary/30 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <span className="text-muted-foreground group-hover:text-primary transition-colors duration-500">
                      <SocialIcon name={social.icon} size={32} />
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {social.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 group-hover:text-foreground transition-colors duration-300">
                    {social.description}
                  </p>

                  {/* CTA Arrow */}
                  <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                    <span className="text-xs font-medium uppercase tracking-widest">Visita</span>
                    <ExternalLink size={16} />
                  </div>
                </div>

                {/* Top border accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            ¿Preguntas o sugerencias? No dudes en contactarnos
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-foreground border border-border px-8 py-4 rounded-full font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group hover:shadow-lg hover:shadow-primary/25 animate-fade-in-up opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
          >
            Ir a Contacto
            <ExternalLink
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
