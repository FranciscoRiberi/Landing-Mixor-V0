"use client";

import { TrendingUp, Shield, Gem, Target, Eye, Heart } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "El respaldo de la trayectoria",
    description:
      "Más de ocho años como importadores directos, conectando tendencias internacionales con las necesidades locales, con logística impecable y conocimiento profundo del mercado global.",
  },
  {
    icon: Shield,
    title: "Calidad sin compromisos",
    description:
      "Cada producto atraviesa un riguroso proceso de selección y control. No importamos genéricos: curamos un catálogo de excelencia con materiales duraderos, componentes de alto rendimiento y acabados premium.",
  },
  {
    icon: Gem,
    title: "Rentabilidad y confianza",
    description:
      "Casi una década optimizando procesos de importación nos permite trasladar ese valor directamente a nuestros clientes: tecnología probada, productos de alta rotación y una marca que respalda cada venta.",
  },
];

const values = [
  {
    icon: Target,
    label: "Misión",
    text: "Conectar a distribuidores y mayoristas de toda Argentina con tecnología de alta rotación, importada directamente, con calidad garantizada y rentabilidad real. Somos el puente entre las tendencias globales y el mercado local de accesorios tecnológicos mayoristas.",
  },
  {
    icon: Eye,
    label: "Visión",
    text: "Ser la marca de referencia en accesorios tecnológicos para distribuidores mayoristas en Argentina, reconocida por solidez, innovación constante y compromiso con el éxito comercial de cada cliente.",
  },
  {
    icon: Heart,
    label: "Valores",
    text: "Transparencia, excelencia, compromiso y confianza. Creemos en relaciones comerciales duraderas basadas en productos que cumplen lo que prometen y en un equipo que acompaña cada paso del proceso.",
  },
];

export function AboutSection() {
  return (
    <section id="nosotros" className="py-16 lg:py-32 px-4 sm:px-6 bg-secondary/30 border-b border-border">
      <div className="max-w-7xl mx-auto">
        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative group">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-card border border-border hover-lift transition-all duration-500 group-hover:border-primary/30">
              <img
                src="/images/about-team.png"
                alt="Equipo Mixor - 8 años como importadores directos de tecnología en Argentina"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>

            {/* Floating accent */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 lg:-bottom-8 lg:-right-8 bg-card border border-border rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <p className="text-4xl lg:text-5xl font-bold text-gradient-red">8+</p>
              <p className="text-sm text-muted-foreground mt-1">Años de Innovación</p>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:pl-8">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              Quiénes Somos
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
              Experiencia que <span className="text-gradient-red">define el estándar.</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-10">
              Más que accesorios, entregamos certeza.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex gap-4 group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10">
                    <feature.icon size={22} className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="mt-24 lg:mt-32">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Nuestra Identidad</p>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
              Lo que nos <span className="text-gradient-red">mueve</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8">
            {values.map((item) => (
              <div
                key={item.label}
                className="group rounded-2xl border border-border bg-card p-8 hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <item.icon size={22} className="text-primary" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.label}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
