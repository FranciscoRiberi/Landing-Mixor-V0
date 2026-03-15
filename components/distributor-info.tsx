"use client";

import { Check, ArrowRight, TrendingUp, Shield, Truck, BookOpen, Package } from "lucide-react";

const benefits = [
  { icon: TrendingUp, text: "Precios especiales por volumen" },
  { icon: Shield, text: "Material promocional exclusivo" },
  { icon: BookOpen, text: "Soporte técnico prioritario" },
  { icon: BookOpen, text: "Capacitación sobre productos" },
  { icon: Truck, text: "Envíos a todo el país" },
];

export function DistributorInfo() {
  return (
    <section
      id="distribuidor"
      className="relative py-28 lg:py-40 px-4 sm:px-6 border-b border-border overflow-hidden bg-primary"
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Top/bottom fade */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70 font-medium mb-4">
            ACCESORIOS TECNOLOGICOS 
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-primary-foreground text-balance leading-none mb-6">
            Programa de Distribuidores Mayoristas 
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/70 max-w-xl mx-auto leading-relaxed">
            Sumate al ecosistema de distribuidores más grande de Argentina, oficiales y accedé a beneficios exclusivos para hacer crecer tu negocio y ofrecer los mejores productos tecnológicos del pais.       
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* Minimum Purchase Card */}
          <div className="rounded-2xl p-6 sm:p-8 lg:p-10 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-500 hover-lift group flex flex-col items-center text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
              Monto mínimo de compra
            </h3>
            <p className="text-primary-foreground/70 leading-relaxed mb-6 text-sm sm:text-base tracking-wide max-w-sm">
              Para realizar compras mayoristas, con montos a bulto cerrado. Consultá por promociones especiales para nuevos distribuidores.
            </p>
            <div className="mt-auto w-full flex justify-center">
              <div className="py-5 px-8 sm:py-6 sm:px-12 rounded-2xl border-2 border-primary-foreground/30 bg-primary-foreground/10 flex flex-col items-center gap-1">
                <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60">Monto mínimo</p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">
                  Consultar
                </p>
                <p className="text-xs text-primary-foreground/50">a bulto cerrado</p>
              </div>
            </div>
          </div>

          {/* Benefits Card */}
          <div className="rounded-2xl p-6 sm:p-8 lg:p-10 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-500 hover-lift group flex flex-col items-center text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-foreground mb-6">
              Beneficios para distribuidores
            </h3>
            <ul className="space-y-3 w-full max-w-sm">
              {benefits.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 group/item">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-foreground/15 flex items-center justify-center group-hover/item:bg-primary-foreground/25 transition-colors duration-300">
                    <Check size={12} className="text-primary-foreground" strokeWidth={2.5} />
                  </span>
                  <span className="text-primary-foreground/70 group-hover/item:text-primary-foreground transition-colors duration-300 text-left text-sm sm:text-base">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-3 bg-primary-foreground text-primary px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold hover:bg-primary-foreground/90 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-foreground/20 hover:-translate-y-1"
          >
            Quiero ser distribuidor
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <p className="text-primary-foreground/50 text-sm mt-4">
            Te contactamos en menos de 24 horas
          </p>
        </div>
      </div>
    </section>
  );
}
