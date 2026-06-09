"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, MessageCircle, Info, type LucideIcon,
  Volume2, Sparkles, Wifi, Battery, Radio, Zap, Usb, Lightbulb, Mic,
  Settings, Watch, Activity, Heart, Phone, Shield, Car, Gauge, Laptop,
  MapPin, Package, ShieldAlert, Zap as Plug, Star, CheckCircle2,
} from "lucide-react";

// Registro de iconos: se resuelve por nombre (string) porque los componentes
// de icono no se pueden pasar como props desde un Server Component.
const ICONS: Record<string, LucideIcon> = {
  Volume2, Sparkles, Wifi, Battery, Radio, Zap, Usb, Lightbulb, Mic,
  Settings, Watch, Activity, Heart, Phone, Shield, Car, Gauge, Laptop,
};

// =========================================
// Tipos
// =========================================
export interface SpecFeature {
  iconName: string;
  title: string;
  description: string;
}

export interface ProductSpecsData {
  name: string;
  categoryLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  code?: string;
  kit?: string;
  accentRgb: string;
  accentGradient: string;
  features: SpecFeature[];
  useCases?: string[];
  includes?: string[];
  care?: string[];
  compatibility?: string[];
  whyChoose?: string[];
  slug: string;
}

// =========================================
// Animaciones
// =========================================
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const imageVariants: Variants = {
  initial: { opacity: 0, scale: 1.4, filter: "blur(15px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 220, damping: 22 },
  },
};

// =========================================
// Componente
// =========================================
export function ProductSpecsShowcase({ data }: { data: ProductSpecsData }) {
  // Usar rojo Mixor como color principal en todas las specs
  const accent = "226, 75, 74"; // Rojo Mixor

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-zinc-100 selection:bg-zinc-800">
      {/* Background glow + grid */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 0%, rgba(${accent},0.18), transparent 55%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, #000 20%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, #000 20%, transparent 90%)",
          }}
        />
      </div>

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-5 sm:px-8 py-5">
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Volver al catálogo
        </Link>
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500">
          <Info size={13} />
          Conoce más
        </span>
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-32 pt-6 lg:pt-10">
        {/* ===== HERO SECTION ===== */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Visual */}
          <div className="relative flex justify-center shrink-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-8%] rounded-full border border-dashed border-white/10"
            />
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute inset-[6%] rounded-full bg-gradient-to-br ${data.accentGradient} blur-3xl opacity-30`}
            />
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-[420px] md:w-[420px] rounded-full border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden bg-black/30 backdrop-blur-sm">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative z-10 h-full w-full flex items-center justify-center"
              >
                <motion.img
                  src={data.image}
                  alt={data.imageAlt}
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  className="h-full w-full object-cover p-1 drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                  draggable={false}
                />
              </motion.div>
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="flex items-center gap-2 rounded-full border border-white/5 bg-zinc-950/80 px-4 py-2 text-xs uppercase tracking-widest text-zinc-400 backdrop-blur">
                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ background: `rgb(${accent})` }}
                />
                {data.kit ?? "Disponible"}
              </div>
            </div>
          </div>

          {/* Details */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.div variants={item} className="flex items-center gap-3 mb-3">
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: `rgb(${accent})` }}
              >
                {data.categoryLabel}
              </span>
              {data.code && (
                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-zinc-400">
                  {data.code}
                </span>
              )}
            </motion.div>

            <motion.h1
              variants={item}
              className="mb-3 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-4xl md:text-5xl font-bold tracking-tight text-transparent"
            >
              {data.name}
            </motion.h1>

            <motion.p
              variants={item}
              className="mb-8 max-w-lg leading-relaxed text-zinc-400"
            >
              {data.description}
            </motion.p>

            {/* Main features grid */}
            <motion.div variants={item} className="space-y-3 mb-8">
              {data.features.map((feature, idx) => {
                const Icon = ICONS[feature.iconName] ?? Sparkles;
                return (
                  <motion.div
                    key={`${feature.title}-${idx}`}
                    variants={item}
                    className="flex gap-4 rounded-2xl border border-white/5 bg-zinc-900/40 p-4 backdrop-blur-sm transition-colors hover:border-white/15"
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10"
                      style={{ background: `rgba(${accent},0.12)` }}
                    >
                      <Icon size={20} style={{ color: `rgb(${accent})` }} />
                    </div>
                    <div>
                      <h3 className="mb-0.5 text-sm font-semibold text-zinc-100">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-zinc-400">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="/#contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{
                  background: `rgb(${accent})`,
                  boxShadow: `0 10px 30px -8px rgba(${accent},0.6)`,
                }}
              >
                <MessageCircle size={17} />
                Consultar precio mayorista
              </a>
              <Link
                href={`/productos/${data.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/5"
              >
                Ver producto
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ===== ADDITIONAL SECTIONS ===== */}
        <div className="space-y-12">
          {/* Por qué elegir */}
          {data.whyChoose && data.whyChoose.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center"
                  style={{ background: `rgba(${accent},0.2)` }}
                >
                  <Star size={24} style={{ color: `rgb(${accent})` }} />
                </div>
                <h2 className="text-2xl font-bold text-white">Por qué elegir este producto</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.whyChoose.map((reason, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-3 items-start"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-1 shrink-0"
                      style={{ color: `rgb(${accent})` }}
                    />
                    <p className="text-zinc-300">{reason}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Casos de uso */}
          {data.useCases && data.useCases.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center"
                  style={{ background: `rgba(${accent},0.2)` }}
                >
                  <MapPin size={24} style={{ color: `rgb(${accent})` }} />
                </div>
                <h2 className="text-2xl font-bold text-white">Casos de uso</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.useCases.map((useCase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-2xl border border-white/5 bg-zinc-800/50 p-4 flex items-center gap-3"
                  >
                    <div
                      className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `rgba(${accent},0.15)` }}
                    >
                      <span
                        className="text-lg font-bold"
                        style={{ color: `rgb(${accent})` }}
                      >
                        ✓
                      </span>
                    </div>
                    <p className="text-zinc-200 font-medium">{useCase}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Qué incluye */}
          {data.includes && data.includes.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center"
                  style={{ background: `rgba(${accent},0.2)` }}
                >
                  <Package size={24} style={{ color: `rgb(${accent})` }} />
                </div>
                <h2 className="text-2xl font-bold text-white">Qué incluye</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.includes.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 rounded-xl bg-zinc-800/30 p-3"
                  >
                    <div
                      className="h-2 w-2 rounded-full flex-shrink-0"
                      style={{ background: `rgb(${accent})` }}
                    />
                    <p className="text-zinc-300">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Compatibilidades */}
          {data.compatibility && data.compatibility.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center"
                  style={{ background: `rgba(${accent},0.2)` }}
                >
                  <Wifi size={24} style={{ color: `rgb(${accent})` }} />
                </div>
                <h2 className="text-2xl font-bold text-white">Compatibilidades</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.compatibility.map((comp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-2xl border border-white/5 bg-gradient-to-br from-zinc-800/50 to-zinc-900/30 p-4 flex items-center gap-3"
                  >
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `rgba(${accent},0.15)` }}
                    >
                      <Plug size={18} style={{ color: `rgb(${accent})` }} />
                    </div>
                    <p className="text-zinc-200">{comp}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Cuidados & Mantenimiento */}
          {data.care && data.care.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center"
                  style={{ background: `rgba(${accent},0.2)` }}
                >
                  <ShieldAlert size={24} style={{ color: `rgb(${accent})` }} />
                </div>
                <h2 className="text-2xl font-bold text-white">Cuidados & Mantenimiento</h2>
              </div>
              <div className="space-y-3">
                {data.care.map((care, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-2xl border border-white/5 bg-zinc-800/30 p-4 flex gap-4 items-start"
                  >
                    <div
                      className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ background: `rgba(${accent},0.2)` }}
                    >
                      <span
                        className="text-xs font-bold"
                        style={{ color: `rgb(${accent})` }}
                      >
                        {idx + 1}
                      </span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">{care}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>
    </div>
  );
}
