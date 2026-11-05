import type { Metadata } from "next";
import Image from "next/image";
import { Caveat, Inter } from "next/font/google";
import { Tablero } from "@/components/eventos/encuesta/tablero";
import { Canaveral, CasaHistorica, Cerros, Petalos, RamaLapacho } from "@/components/eventos/encuesta/tucuman";
import { Lockup } from "@/components/eventos/ximaro";
import { ENCUESTA_URL, OPCIONES } from "@/lib/eventos/encuesta";
import { resultado, sinVotos } from "@/lib/eventos/encuesta-votos";
import "../../ximaro/[clave]/ximaro.css";
import "../encuesta.css";

const sans = Inter({ subsets: ["latin"], variable: "--xm-sans" });
const mano = Caveat({ subsets: ["latin"], weight: "700", variable: "--xm-mano" });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Mixor — Votación en vivo" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

/** Para las pantallas del salón y el stream: 16:9, medidas en función del alto. */
export default async function Pantalla() {
  return (
    <main
      className={`xm ${sans.variable} ${mano.variable} xm-rojo relative h-screen w-screen overflow-hidden text-white`}
    >
      <div aria-hidden className="xm-haz absolute inset-0" />
      <Cerros className="absolute inset-x-0 bottom-0 h-[52vh] w-full" />
      <Canaveral className="absolute -left-[3vh] bottom-0 h-[46vh] w-auto" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[6vh] bg-[var(--xm-red-deep)]" />
      <Petalos />
      <RamaLapacho className="absolute -right-[1vh] -top-[1vh] w-[34vh]" />

      <div className="relative z-10 grid h-full grid-cols-[33%_22%_1fr] gap-[4vh] px-[6vh] py-[5vh]">
        <div className="flex min-h-0 flex-col">
          <Lockup tone="white" className="text-[4.2vh]" />
          <p className="xm-tracked mt-[4.5vh] max-w-[20em] text-[2.4vh] leading-snug">
            El próximo cable Mixor se bautiza en Tucumán
          </p>
          <p className="xm-display xm-chrome-shadow mt-[2vh] text-[11.5vh]">
            <span className="xm-chrome">Elegí su</span>
            <br />
            <span className="xm-chrome">nombre</span>
          </p>
          <CasaHistorica className="mt-auto h-[36vh] w-auto self-start drop-shadow-[0_2vh_3vh_rgba(50,4,8,.45)]" />
        </div>

        <div className="flex flex-col items-center justify-end pb-[3vh] text-center">
          <p className="xm-mano -rotate-2 text-[5.4vh] leading-none">¡Escaneá y votá!</p>
          <div className="mt-[2.4vh] rounded-[2vh] bg-white p-[1.4vh] shadow-[0_3vh_6vh_-2vh_rgba(40,3,6,.7)]">
            <Image
              src="/eventos/qr-elegi.svg"
              alt={`Código QR a ${ENCUESTA_URL}`}
              width={320}
              height={320}
              className="h-[33vh] w-[33vh]"
            />
          </div>
          <p className="mt-[2.2vh] text-[2.9vh] font-extrabold tracking-[-0.01em]">{ENCUESTA_URL}</p>
        </div>

        <div className="flex flex-col justify-center">
          <div className="rounded-[3vh] border border-white/15 bg-[#5e0d13]/55 p-[4vh] backdrop-blur-sm">
            <Tablero opciones={OPCIONES} inicial={await resultado().catch(sinVotos)} />
          </div>
        </div>
      </div>
    </main>
  );
}
