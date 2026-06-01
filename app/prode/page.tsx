"use client";

import { useState } from "react";
import { ChevronLeft, Trophy, Send, CheckCircle2 } from "lucide-react";

const CELESTE = "#75AADB";
const GOLD = "#E8C547";
const NAVY = "#1a3a5c";

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
        window.scrollTo({ top: 0, behavior: "smooth" });
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
      <main
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${CELESTE} 60%, #a8cde8 100%)` }}
      >
        <div className="text-center max-w-md">
          <img
            src="/images/mixor-mundial-2026-logo.webp"
            alt="Mixor Mundial 2026"
            className="h-36 w-auto mx-auto mb-8 drop-shadow-2xl"
          />
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: GOLD }}
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 leading-tight">Prode enviado!</h1>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Gracias <strong className="text-white">{nombre}</strong>, recibimos tu prode.{" "}
            Mucha suerte en el Mundial 2026!
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5"
            style={{ background: GOLD, color: NAVY }}
          >
            <ChevronLeft size={18} />
            Volver al inicio
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: "#f8fafc" }}>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${NAVY} 0%, #1e4d80 50%, ${CELESTE} 100%)` }}
      >
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle, white 1.5px, transparent 1.5px)`,
            backgroundSize: "28px 28px",
          }}
        />
        {/* Diagonal stripe accents */}
        <div
          className="absolute top-0 right-0 w-96 h-96 opacity-10"
          style={{
            background: `conic-gradient(from 45deg, ${GOLD}, transparent 60%)`,
            borderRadius: "0 0 0 100%",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-10 pb-14 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors mb-8"
          >
            <ChevronLeft size={16} />
            Volver al inicio
          </a>

          <img
            src="/images/mixor-mundial-2026-logo.webp"
            alt="Mixor Mundial 2026"
            className="h-28 sm:h-36 w-auto mx-auto mb-6 drop-shadow-2xl"
          />

          <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
            Arma tu{" "}
            <span style={{ color: GOLD }}>Prode</span>
            <br />
            Mundial 2026
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Predeci todos los resultados, elegí tu campeon y ganá un{" "}
            <strong className="text-white">regalo sorpresa Mixor</strong> en tu proxima compra.
          </p>

          {/* Steps */}
          <div className="flex items-center justify-center gap-0 max-w-sm mx-auto">
            {[
              { n: "1", label: "Resultados" },
              { n: "2", label: "Campeon" },
              { n: "3", label: "Tus datos" },
            ].map((step, i) => (
              <div key={step.n} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm"
                    style={{ background: GOLD, color: NAVY }}
                  >
                    {step.n}
                  </div>
                  <span className="text-white/70 text-xs font-medium">{step.label}</span>
                </div>
                {i < 2 && (
                  <div className="w-12 h-px mb-4 mx-1" style={{ background: "rgba(255,255,255,0.25)" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Wave bottom */}
        <div className="relative h-10 overflow-hidden" style={{ marginTop: "-1px" }}>
          <svg viewBox="0 0 1440 40" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 40 L0 20 Q360 0 720 20 Q1080 40 1440 20 L1440 40 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 pt-10 pb-24">

        {/* Section heading */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
            style={{ background: NAVY, color: GOLD }}
          >
            1
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Fase de grupos</h2>
        </div>

        {/* Groups grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-14">
          {grupos.map((grupo) => {
            const partidos = getPartidos(grupo.equipos);
            return (
              <div
                key={grupo.nombre}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Group header */}
                <div
                  className="px-4 py-2.5 flex items-center gap-2"
                  style={{ background: NAVY }}
                >
                  <span className="text-xs font-black text-white tracking-widest uppercase">
                    {grupo.nombre}
                  </span>
                  <div
                    className="ml-auto w-4 h-4 rounded-full flex-shrink-0"
                    style={{ background: GOLD, opacity: 0.9 }}
                  />
                </div>

                {/* Matches */}
                <div className="px-3 py-2 space-y-1">
                  {partidos.map(([local, visitante]) => {
                    const key = `${local}__${visitante}`;
                    const score = resultados[key] || { local: "", visitante: "" };
                    const hasScore = score.local !== "" && score.visitante !== "";
                    return (
                      <div
                        key={key}
                        className="flex items-center gap-2 py-1.5 px-2 rounded-lg transition-colors"
                        style={{ background: hasScore ? `${CELESTE}12` : "transparent" }}
                      >
                        <span className="flex-1 text-right text-xs font-semibold text-gray-700 truncate leading-tight">
                          {local}
                        </span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <input
                            type="number"
                            min={0}
                            max={20}
                            value={score.local}
                            onChange={(e) => setScore(local, visitante, "local", e.target.value)}
                            className="w-9 h-8 text-center text-sm font-black bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 transition-all"
                            style={{ focusRingColor: CELESTE } as React.CSSProperties}
                            aria-label={`Goles ${local}`}
                          />
                          <span className="text-gray-400 text-xs font-bold">-</span>
                          <input
                            type="number"
                            min={0}
                            max={20}
                            value={score.visitante}
                            onChange={(e) => setScore(local, visitante, "visitante", e.target.value)}
                            className="w-9 h-8 text-center text-sm font-black bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 transition-all"
                            aria-label={`Goles ${visitante}`}
                          />
                        </div>
                        <span className="flex-1 text-left text-xs font-semibold text-gray-700 truncate leading-tight">
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

        {/* Champion section */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
            style={{ background: NAVY, color: GOLD }}
          >
            2
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Quien va a ganar?</h2>
        </div>

        <div
          className="rounded-2xl overflow-hidden mb-14 shadow-sm"
          style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1e4d80 100%)` }}
        >
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="flex-shrink-0" size={22} style={{ color: GOLD }} />
              <p className="text-white/80 text-sm leading-snug">
                Selecciona el campeon y subcampeon del Mundial 2026
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { label: "Campeon", value: campeon, setter: setCampeon },
                { label: "Subcampeon", value: subcampeon, setter: setSubcampeon },
              ].map(({ label, value, setter }) => (
                <div key={label}>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-2">
                    {label}
                  </label>
                  <div className="relative">
                    <select
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl text-sm font-semibold appearance-none focus:outline-none focus:ring-2 transition-all pr-10"
                      style={{
                        background: "rgba(255,255,255,0.12)",
                        color: value ? "white" : "rgba(255,255,255,0.45)",
                        border: `1.5px solid rgba(255,255,255,0.2)`,
                      }}
                    >
                      <option value="" style={{ color: "#333", background: "white" }}>
                        Selecciona un equipo
                      </option>
                      {todosLosEquipos.map((eq) => (
                        <option key={eq} value={eq} style={{ color: "#333", background: "white" }}>
                          {eq}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1l5 5 5-5" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User data section */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
            style={{ background: NAVY, color: GOLD }}
          >
            3
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Tus datos</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm mb-6">
            Necesitamos tus datos para contactarte si ganas el regalo sorpresa.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { label: "Nombre completo", value: nombre, setter: setNombre, type: "text", placeholder: "Tu nombre y apellido" },
              { label: "Numero de celular", value: celular, setter: setCelular, type: "tel", placeholder: "Ej: 3515551234" },
            ].map(({ label, value, setter, type, placeholder }) => (
              <div key={label}>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  {label} <span style={{ color: CELESTE }}>*</span>
                </label>
                <input
                  type={type}
                  required
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all text-sm font-medium"
                />
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full flex items-center justify-center gap-3 font-black text-base py-5 rounded-2xl transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 shadow-lg hover:shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${NAVY} 0%, #1e4d80 100%)`,
            color: "white",
            boxShadow: `0 8px 30px rgba(26, 58, 92, 0.35)`,
          }}
        >
          {enviando ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Enviando...
            </span>
          ) : (
            <>
              <Send size={20} style={{ color: GOLD }} />
              Enviar mi prode
              <Trophy size={18} style={{ color: GOLD }} />
            </>
          )}
        </button>
      </form>
    </main>
  );
}
