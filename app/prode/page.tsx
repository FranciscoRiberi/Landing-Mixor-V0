"use client";

import { useState } from "react";
import { ChevronLeft, Trophy, Send } from "lucide-react";

const grupos = [
  { nombre: "Grupo A", equipos: ["México", "Sudáfrica", "Corea del Sur", "Rep. Checa"] },
  { nombre: "Grupo B", equipos: ["Canadá", "Bosnia y Herz.", "Qatar", "Suiza"] },
  { nombre: "Grupo C", equipos: ["Brasil", "Marruecos", "Haití", "Escocia"] },
  { nombre: "Grupo D", equipos: ["Estados Unidos", "Paraguay", "Australia", "Turquía"] },
  { nombre: "Grupo E", equipos: ["Alemania", "Curazao", "Costa de Marfil", "Ecuador"] },
  { nombre: "Grupo F", equipos: ["Países Bajos", "Japón", "Suecia", "Túnez"] },
  { nombre: "Grupo G", equipos: ["Bélgica", "Egipto", "Irán", "Nueva Zelanda"] },
  { nombre: "Grupo H", equipos: ["España", "Cabo Verde", "Arabia Saudita", "Uruguay"] },
  { nombre: "Grupo I", equipos: ["Francia", "Senegal", "Irak", "Noruega"] },
  { nombre: "Grupo J", equipos: ["Argentina", "Argelia", "Austria", "Jordania"] },
  { nombre: "Grupo K", equipos: ["Portugal", "RD Congo", "Uzbekistán", "Colombia"] },
  { nombre: "Grupo L", equipos: ["Inglaterra", "Croacia", "Ghana", "Panamá"] },
];

const todosLosEquipos = grupos.flatMap((g) => g.equipos).sort();

function getPartidos(equipos: string[]) {
  const [a, b, c, d] = equipos;
  return [
    [a, b],
    [a, c],
    [b, c],
    [a, d],
    [b, d],
    [c, d],
  ];
}

type Resultados = Record<string, { local: string; visitante: string }>;

const inputClass =
  "w-12 h-9 text-center text-sm font-bold bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all";

const selectClass =
  "w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all text-sm font-medium";

export default function ProdePage() {
  const [resultados, setResultados] = useState<Resultados>({});
  const [campeon, setCampeon] = useState("");
  const [subcampeon, setSubcampeon] = useState("");
  const [nombre, setNombre] = useState("");
  const [celular, setCelular] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  function setScore(local: string, visitante: string, side: "local" | "visitante", value: string) {
    const key = `${local}__${visitante}`;
    const num = value.replace(/[^0-9]/g, "").slice(0, 2);
    setResultados((prev) => ({
      ...prev,
      [key]: {
        local: side === "local" ? num : (prev[key]?.local ?? ""),
        visitante: side === "visitante" ? num : (prev[key]?.visitante ?? ""),
      },
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !celular.trim()) {
      setError("Por favor completá tu nombre y celular.");
      return;
    }
    setError("");
    setEnviando(true);
    try {
      const res = await fetch("/api/prode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, celular, campeon, subcampeon, resultados }),
      });
      if (res.ok) {
        setEnviado(true);
      } else {
        setError("Hubo un error al enviar. Intentá de nuevo.");
      }
    } catch {
      setError("Hubo un error al enviar. Intentá de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <img
            src="/images/mixor-mundial-2026-logo.webp"
            alt="Mixor Mundial 2026"
            className="h-32 w-auto mx-auto mb-8 drop-shadow-2xl"
          />
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-3">Prode enviado!</h1>
          <p className="text-muted-foreground mb-6">
            Gracias <strong>{nombre}</strong>, recibimos tu prode. Suerte en el Mundial 2026!
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all"
          >
            <ChevronLeft size={18} />
            Volver al inicio
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <section
        className="relative pt-24 pb-16 px-4 text-center overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #75AADB 0%, #4a8bc4 40%, #1a3a5c 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <img
            src="/images/mixor-mundial-2026-logo.webp"
            alt="Mixor Mundial 2026"
            className="h-28 w-auto mx-auto mb-6 drop-shadow-2xl"
          />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 leading-tight">
            Arma tu Prode{" "}
            <span className="text-yellow-300">Mundial 2026</span>
          </h1>
          <p className="text-white/85 text-lg max-w-xl mx-auto mb-6 leading-relaxed">
            Predeci todos los resultados y gana un regalo sorpresa Mixor en tu proxima compra
          </p>
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 text-yellow-200 px-5 py-2.5 rounded-full text-sm font-semibold">
            <Trophy size={16} className="text-yellow-300" />
            Regalo sorpresa para tu proxima compra
          </div>

          {/* Steps */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { n: "1", label: "Completa los resultados" },
              { n: "2", label: "Elegi campeon y subcampeon" },
              { n: "3", label: "Envia tu prode" },
            ].map((step) => (
              <div key={step.n} className="flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white font-bold text-sm">
                  {step.n}
                </div>
                <p className="text-white/80 text-xs text-center leading-tight">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 pt-12">
        {/* Groups grid */}
        <h2 className="text-2xl font-bold text-foreground mb-6">Fase de grupos</h2>
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {grupos.map((grupo) => {
            const partidos = getPartidos(grupo.equipos);
            return (
              <div
                key={grupo.nombre}
                className="bg-card border border-border rounded-2xl overflow-hidden"
              >
                <div className="px-5 py-3 bg-primary/10 border-b border-border">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-widest">
                    {grupo.nombre}
                  </h3>
                </div>
                <div className="px-4 py-3 space-y-2">
                  {partidos.map(([local, visitante]) => {
                    const key = `${local}__${visitante}`;
                    const score = resultados[key] || { local: "", visitante: "" };
                    return (
                      <div key={key} className="flex items-center gap-2">
                        <span className="flex-1 text-right text-sm text-foreground font-medium truncate">
                          {local}
                        </span>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          value={score.local}
                          onChange={(e) => setScore(local, visitante, "local", e.target.value)}
                          className={inputClass}
                          aria-label={`Goles ${local}`}
                        />
                        <span className="text-muted-foreground text-sm font-semibold">-</span>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          value={score.visitante}
                          onChange={(e) => setScore(local, visitante, "visitante", e.target.value)}
                          className={inputClass}
                          aria-label={`Goles ${visitante}`}
                        />
                        <span className="flex-1 text-left text-sm text-foreground font-medium truncate">
                          {visitante}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Champion selectors */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="text-yellow-500" size={24} />
            <h2 className="text-xl font-bold text-foreground">Quien va a ganar el Mundial?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Campeon
              </label>
              <select
                value={campeon}
                onChange={(e) => setCampeon(e.target.value)}
                className={selectClass}
              >
                <option value="">Selecciona un equipo</option>
                {todosLosEquipos.map((eq) => (
                  <option key={eq} value={eq}>{eq}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Subcampeon
              </label>
              <select
                value={subcampeon}
                onChange={(e) => setSubcampeon(e.target.value)}
                className={selectClass}
              >
                <option value="">Selecciona un equipo</option>
                {todosLosEquipos.map((eq) => (
                  <option key={eq} value={eq}>{eq}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* User data */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Tus datos</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nombre completo <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre y apellido"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Numero de celular <span className="text-primary">*</span>
              </label>
              <input
                type="tel"
                required
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                placeholder="Ej: 3515551234"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-primary text-sm text-center mb-4 font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground font-bold text-base py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-[0_4px_24px_rgba(226,75,74,0.4)] hover:shadow-[0_6px_32px_rgba(226,75,74,0.5)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {enviando ? (
            "Enviando..."
          ) : (
            <>
              <Send size={20} />
              Enviar mi prode
            </>
          )}
        </button>
      </form>
    </main>
  );
}
