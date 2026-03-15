"use client";

import { Volume2, Radio, Battery, Wifi, Music, Zap, ChevronRight } from "lucide-react";

export function ImpetProductPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium">
                  Parlante Premium
                </p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                  Parlante
                  <br />
                  <span className="text-gradient-red">Impetu</span>
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Sonido envolvente con personalidad visual. Impetu combina potencia acústica real con una atmósfera luminosa que transforma cualquier espacio.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1">
                  Consultar Disponibilidad
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#especificaciones"
                  className="inline-flex items-center justify-center px-8 py-4 text-foreground border border-border rounded-full font-medium hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  Ver Especificaciones
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">5W x 2</p>
                  <p className="text-sm text-muted-foreground">Potencia de Salida</p>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">1800mAh</p>
                  <p className="text-sm text-muted-foreground">Batería Integrada</p>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-card border border-border hover-lift">
                <img
                  src="/images/impetu-hero.png"
                  alt="Parlante Impetu"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="especificaciones" className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            <div className="text-center space-y-4 mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium">
                Características Principales
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                Diseñado para <span className="text-gradient-red">la experiencia</span>
              </h2>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="group p-8 rounded-2xl border border-border bg-card/50 hover:border-primary/50 transition-all duration-500 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Volume2 className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      Sonido Estéreo Real
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Dos bocinas de 5W (5Wx2) que entregan bajos definidos y agudos claros. Disfruta de una experiencia acústica completa sin compromisos.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Bajos definidos y profundos
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Agudos cristalinos
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Presición en toda la gama
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 rounded-2xl border border-border bg-card/50 hover:border-primary/50 transition-all duration-500 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Zap className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      Atmósfera Visual
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Su panel frontal con luces RGB dinámicas y controles gigantes no solo facilita el uso, sino que ilumina tu entorno con estilo.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Luces RGB personalizables
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Controles grandes e intuitivos
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Diseño compacto
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 rounded-2xl border border-border bg-card/50 hover:border-primary/50 transition-all duration-500 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Wifi className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      Conectividad Total
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Múltiples opciones de conexión para que nunca te quedes sin música. Bluetooth, USB, tarjeta TF o Radio FM.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Bluetooth integrado
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        USB y tarjeta TF
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Radio FM integrada
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group p-8 rounded-2xl border border-border bg-card/50 hover:border-primary/50 transition-all duration-500 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Battery className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      Autonomía Confiable
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Batería de 1800mAh optimizada para uso constante. Música durante todo el día sin interrupciones.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        1800mAh de capacidad
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Carga rápida
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Uso prolongado optimizado
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium">
                Galería
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                Conoce todas las <span className="text-gradient-red">variantes</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-video rounded-3xl overflow-hidden bg-card border border-border hover-lift">
                <img
                  src="/images/impetu-lineup.png"
                  alt="Línea de productos Mixor Impetu"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="aspect-video rounded-3xl overflow-hidden bg-card border border-border hover-lift">
                <img
                  src="/images/impetu-hero.png"
                  alt="Parlante Impetu en acción"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="aspect-video rounded-3xl overflow-hidden bg-card border border-border hover-lift">
                <img
                  src="/images/2.png"
                  alt="Parlante Impetu en acción"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
              ¿Listo para la <span className="text-gradient-red">experiencia?</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Contacta con nuestros asesores para conocer disponibilidad, precios mayoristas y opciones de distribución.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
            >
              Contáctanos Ahora
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#productos"
              className="inline-flex items-center justify-center px-8 py-4 text-foreground border border-border rounded-full font-medium hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              Ver Otros Productos
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
