import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Watch } from "lucide-react";
import { SmartwatchGuide } from "@/components/smartwatch-guide";
import { Footer } from "@/components/footer";

const URL = "https://mixor.com.ar/guias/conectar-smartwatch";

export const metadata: Metadata = {
  title: "Cómo conectar tu smartwatch Mixor al celular | Guía paso a paso",
  description:
    "Guía para conectar los smartwatches Mixor Pulso, Momentos y Activo al celular con la app Wearfit Pro. Cuatro pasos, permisos, llamadas y música, y solución de problemas.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Cómo conectar tu smartwatch Mixor al celular",
    description:
      "Guía paso a paso para los modelos Pulso, Momentos y Activo con la app Wearfit Pro.",
    url: URL,
    type: "article",
  },
};

/** Indice lateral. Los ids coinciden con las <section> de SmartwatchGuide. */
const TOC = [
  { id: "modelo", label: "Elegí tu modelo" },
  { id: "requisitos", label: "Antes de empezar" },
  { id: "pasos", label: "Paso a paso" },
  { id: "modelos", label: "Qué hace cada uno" },
  { id: "configuracion", label: "Ajustes de la app" },
  { id: "problemas", label: "Si algo no funciona" },
  { id: "cuidados", label: "Salud y cuidados" },
  { id: "garantia", label: "Garantía" },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo conectar un smartwatch Mixor al celular",
  description:
    "Pasos para vincular los smartwatches Mixor Pulso, Momentos y Activo con un celular Android o iPhone usando la aplicación Wearfit Pro.",
  totalTime: "PT15M",
  supply: [
    { "@type": "HowToSupply", name: "Smartwatch Mixor" },
    { "@type": "HowToSupply", name: "Celular Android 5.0+ o iPhone iOS 13.4+" },
    { "@type": "HowToSupply", name: "Cable de carga magnético" },
  ],
  tool: [{ "@type": "HowToTool", name: "Aplicación Wearfit Pro" }],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Cargá el reloj",
      text: "Apoyá el cable magnético en la parte de atrás del reloj y enchufalo a un cargador común hasta llegar al 100%. No lo cargues si está mojado.",
      url: `${URL}#pasos`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Descargá Wearfit Pro",
      text: "Buscá Wearfit Pro en Play Store o App Store e instalala. Al abrirla, aceptá los permisos de Bluetooth, ubicación, notificaciones y contactos.",
      url: `${URL}#pasos`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Conectá el reloj al celular",
      text: "Con el Bluetooth activado, abrí Wearfit Pro, tocá Agregar dispositivo, elegí el nombre de tu reloj en la lista y aceptá la vinculación.",
      url: `${URL}#pasos`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Activá las llamadas y la música",
      text: "Solo para Momentos y Activo. Entrá a los Ajustes de Bluetooth del celular y conectá el segundo nombre del reloj, distinto al que ya vinculaste.",
      url: `${URL}#pasos`,
    },
  ],
};

export default function ConectarSmartwatchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <main className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="mx-auto max-w-6xl px-6 pt-28 pb-20 sm:pt-32">
          <Link
            href="/productos"
            className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-red-400"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Volver al catálogo
          </Link>

          {/* Encabezado */}
          <header className="mb-14 max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-red-400">
              <Watch size={13} aria-hidden="true" />
              Guía de uso
            </p>
            <h1 className="mb-4 text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight text-white text-balance">
              Cómo conectar tu smartwatch al celular
            </h1>
            <p className="text-lg leading-relaxed text-zinc-400">
              Sirve para los tres relojes de Mixor: Pulso, Momentos y Activo.
              Los tres usan la misma aplicación gratuita,{" "}
              <strong className="text-zinc-200">Wearfit Pro</strong>. Seguí los
              pasos en orden: no hace falta saber de tecnología.
            </p>
          </header>

          <div className="lg:flex lg:gap-12">
            {/* Indice pegajoso, solo escritorio */}
            <nav
              aria-label="Contenido de la guía"
              className="hidden lg:block lg:w-56 lg:shrink-0"
            >
              <div className="sticky top-28">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                  En esta guía
                </p>
                <ul className="space-y-1 border-l border-white/10">
                  {TOC.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-zinc-400 transition-colors hover:border-red-500 hover:text-white"
                      >
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="min-w-0 flex-1">
              <SmartwatchGuide />
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
