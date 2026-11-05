import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Canaveral, CasaHistorica, Cerros, Petalos, RamaLapacho } from "@/components/eventos/encuesta/tucuman";
import { Votacion } from "@/components/eventos/encuesta/votacion";
import { Lockup } from "@/components/eventos/ximaro";
import { COOKIE_VOTANTE, OPCIONES, votacionAbierta, type Opcion } from "@/lib/eventos/encuesta";
import { resultado, sinVotos, votoDe } from "@/lib/eventos/encuesta-votos";
import "../ximaro/[clave]/ximaro.css";
import "./encuesta.css";

const sans = Inter({ subsets: ["latin"], variable: "--xm-sans" });
const mano = Caveat({ subsets: ["latin"], weight: "700", variable: "--xm-mano" });

// Cada visitante ve los nombres en otro orden, para que el primero no gane por estar arriba.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Elegí el nombre del próximo cable Mixor" },
  description: "El próximo cable Mixor se bautiza en Tucumán. Votá su nombre.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

const FRANJA = [
  "Jardín de la República",
  "Cuna de la Independencia",
  "Tierra del azúcar",
  "Mixor × Ximaro",
  "Tierra del limón",
];

function mezclar(lista: Opcion[]) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export default async function Elegi() {
  const votante = (await cookies()).get(COOKIE_VOTANTE)?.value;
  // Si la base falla un momento, la página igual abre.
  const [voto, inicial] = await Promise.all([
    votante ? votoDe(votante).catch(() => null) : null,
    resultado().catch(sinVotos),
  ]);

  return (
    <main className={`xm ${sans.variable} ${mano.variable} min-h-screen overflow-x-clip`}>
      <section className="xm-rojo relative overflow-hidden">
        <div aria-hidden className="xm-haz absolute inset-0" />
        <RamaLapacho className="absolute -right-4 -top-3 z-[1] w-[44vw] max-w-[300px]" />
        <Petalos />

        <div className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center px-5 pt-6 text-center">
          <Lockup tone="white" className="self-start text-[22px] sm:self-center sm:text-[26px]" />
          <p className="xm-caps mt-12 text-[9.5px] text-white/90 sm:text-[10.5px]">Tucumán · Jardín de la República</p>

          <h1 className="mt-4 flex flex-col items-center">
            <span className="xm-tracked max-w-[20em] text-[clamp(14px,3.9vw,22px)] leading-snug">
              El próximo cable Mixor se bautiza en Tucumán
            </span>
            <span className="xm-display xm-chrome-shadow mt-4 text-[clamp(56px,16.5vw,120px)]">
              <span className="xm-chrome">Elegí su</span>
              <br />
              <span className="xm-chrome">nombre</span>
            </span>
          </h1>
          <p className="xm-mano mt-3 -rotate-2 text-[27px] leading-none sm:text-[32px]">
            ¡Dale, que lo bautizamos acá!
          </p>
        </div>

        {/* El paisaje: cerros, cañaveral detrás y la Casa adelante */}
        <div className="relative mt-4 h-[clamp(240px,70vw,430px)]">
          <Cerros className="absolute inset-0 h-full w-full" />
          <Canaveral className="absolute -left-[6vw] bottom-0 h-[92%] w-auto" />
          <Canaveral className="absolute -right-[6vw] bottom-0 h-[84%] w-auto" style={{ transform: "scaleX(-1)" }} />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-[8%] bg-[var(--xm-red-deep)]" />
          <CasaHistorica className="absolute bottom-[6%] left-1/2 w-[min(84vw,540px)] -translate-x-1/2 drop-shadow-[0_18px_22px_rgba(50,4,8,.45)]" />
        </div>
      </section>

      <div aria-hidden className="xm-randa bg-[var(--xm-red-deep)]" />

      <Votacion
        opciones={mezclar(OPCIONES)}
        votoInicial={voto}
        resultadoInicial={inicial}
        abierta={votacionAbierta()}
      />

      {/* Franja que corre */}
      <div aria-hidden className="overflow-hidden border-y border-white/15 bg-[var(--xm-red)] py-3.5 text-white">
        <div className="xm-tape-track">
          {[0, 1].map((copia) => (
            <div key={copia} className="flex shrink-0 items-center">
              {[...FRANJA, ...FRANJA].map((t, i) => (
                <span
                  key={`${copia}-${i}`}
                  className="xm-caps flex items-center gap-8 pr-8 text-[11.5px] font-semibold"
                >
                  {t}
                  <span className="opacity-50">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pie: la franja blanca de la pieza */}
      <footer className="bg-[var(--xm-band)] pb-32 pt-8 text-center text-[var(--xm-ink)]">
        <div aria-hidden className="xm-randa-roja mb-6" />
        <div className="flex flex-col items-center px-5">
          <Lockup className="text-[26px]" />
          <p className="mt-4 max-w-[28rem] text-[12.5px] leading-relaxed text-[var(--xm-mute)]">Un voto por celular.</p>
        </div>
      </footer>
    </main>
  );
}
