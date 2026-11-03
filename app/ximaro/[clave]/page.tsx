import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { MessageCircle, QrCode, Ticket } from "lucide-react";
import { Wordmark } from "@/components/mixor-wordmark";
import { ContactoLink, InstagramIcon, WhatsAppIcon } from "@/components/eventos/contacto";
import { Lockup, Sello, Vale } from "@/components/eventos/ximaro";
import { BlurFade } from "@/components/fx/blur-fade";
import { FlipWords } from "@/components/eventos/ui/flip-words";
import { ScratchPass } from "@/components/eventos/ui/scratch-pass";
import { Tilt } from "@/components/eventos/ui/tilt";
import { ValesCarousel } from "@/components/eventos/ui/vales-carousel";
import { ProductosCarousel, type ProductoCarrusel } from "@/components/eventos/ui/productos-carousel";
import { PedidoBeams } from "@/components/eventos/ui/pedido-beams";
import { FloatingCta, PointerGlow } from "@/components/eventos/ui/efectos";
import { HeroCta, PaseProvider, PromosBloqueadas } from "@/components/eventos/ui/pase";
import { claveValida } from "@/lib/eventos/acceso";
import {
  CLAVE_SHA256,
  EVENTO,
  MENSAJE_BASE,
  XIMARO,
  destacados,
  instagramHref,
  productoEvento,
  promos,
  whatsappHref,
  type ProductoEvento,
} from "@/lib/eventos/ximaro";
import "./ximaro.css";

// La pieza del evento usa una grotesca tipo Helvetica: Inter cubre del regular al negro.
const sans = Inter({ subsets: ["latin"], variable: "--xm-sans" });

type Props = { params: Promise<{ clave: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { clave } = await params;
  const privada = { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } };
  // Con la clave mal no se dice nada de la página.
  if (!claveValida(clave, CLAVE_SHA256)) return { robots: privada };
  return {
    title: { absolute: "Mixor × Ximaro — Promos del evento" },
    description: `Promos exclusivas de Mixor con Ximaro para los que vinieron al evento en ${EVENTO.lugar}.`,
    robots: privada,
    alternates: { canonical: null },
    openGraph: {
      title: "Mixor × Ximaro — Promos del evento",
      description: "Pase exclusivo para los que vinieron al evento. Pedí directo a Ximaro.",
      images: [{ url: "/images/parlantes-bluetooth-mixor-accesorios-mayoristas-argentina.webp", width: 1200, height: 630 }],
    },
  };
}

const FRANJA = ["Pase exclusivo", "Mixor × Ximaro", `Evento ${EVENTO.lugar}`, "Solo con tarjeta", "Pedíselo a Ximaro"];

/** Título de sección como en la pieza: línea chica espaciada + palabra gigante. */
function Titulo({
  chico,
  grande,
  tono = "blanco",
  className,
}: {
  chico: string;
  grande: string;
  tono?: "blanco" | "rojo";
  className?: string;
}) {
  return (
    <h2 className={`flex flex-col items-center text-center ${className ?? ""}`}>
      <span className={`xm-tracked text-[clamp(18px,4.6vw,30px)] ${tono === "blanco" ? "text-white" : "text-[var(--xm-ink)]"}`}>
        {chico}
      </span>
      <span
        className={`xm-display mt-2 text-[clamp(60px,15vw,150px)] ${
          tono === "blanco" ? "xm-chrome-shadow" : "text-[var(--xm-red)]"
        }`}
      >
        <span className={tono === "blanco" ? "xm-chrome" : undefined}>{grande}</span>
      </span>
    </h2>
  );
}

export default async function XimaroEvento({ params }: Props) {
  const { clave } = await params;
  if (!claveValida(clave, CLAVE_SHA256)) notFound();

  const productos: ProductoCarrusel[] = destacados
    .map(productoEvento)
    .filter((p): p is ProductoEvento => p !== null)
    .map((p) => ({ ...p, wa: whatsappHref(`${MENSAJE_BASE} y quiero consultar por el ${p.completo}.`) }));
  const wa = whatsappHref(`${MENSAJE_BASE} y quiero hacer un pedido.`);
  const ig = instagramHref();

  const datos = [
    { Icon: Ticket, valor: String(promos.length), label: "Promos" },
    { Icon: QrCode, valor: "QR", label: "Exclusivo" },
    { Icon: MessageCircle, valor: "Directo", label: "Con Ximaro" },
  ];
  const pasos = ["Elegí una promo o un producto.", "Escribile a Ximaro por WhatsApp o Instagram.", "Coordinás precio, pago y entrega con él."];

  return (
    <main className={`xm ${sans.variable} min-h-screen overflow-x-clip`}>
      <PaseProvider>
        {/* Portada: centrada, como la pieza del evento */}
        <section className="xm-rojo relative overflow-hidden">
          <div aria-hidden className="xm-haz absolute inset-0" />
          <PointerGlow />

          <header className="xm-container relative z-10 flex items-center justify-between py-5">
            <span className="xm-caps whitespace-nowrap text-[9.5px] text-white/80">
              Evento {EVENTO.lugar}
              <span className="hidden sm:inline"> · {EVENTO.fecha}</span>
            </span>
            <span className="xm-caps inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/30 px-3 py-1.5 text-[9px] text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              Pase exclusivo
            </span>
          </header>

          <div className="xm-container relative z-10 flex flex-col items-center pb-20 pt-8 text-center md:pb-28 md:pt-10">
            <div className="xm-rise">
              <Wordmark className="mx-auto h-[46px] w-auto text-white sm:h-[68px]" />
              <p className="xm-caps mt-5 text-[10px] text-white/90 sm:text-[11px]">
                Accesorios tecnológicos <span className="mx-1.5 opacity-60">×</span> {XIMARO.nombre}
              </p>
            </div>

            <h1 className="mt-14 flex flex-col items-center sm:mt-20">
              <span className="xm-tracked text-[clamp(20px,5.2vw,40px)]">Tu tarjeta tiene</span>
              <span className="xm-display xm-chrome-shadow mt-2 text-[clamp(64px,18.5vw,184px)]">
                <FlipWords words={["premio", "promos"]} duration={3000} letterClassName="xm-chrome" />
              </span>
            </h1>
            <p className="mt-6 text-[18px] text-white/95 sm:text-[22px]">Raspá. Elegí. Pedí.</p>

            <span aria-hidden className="mt-10 h-px w-full max-w-[640px] bg-white/25" />
            <dl className="mt-8 grid w-full max-w-[640px] grid-cols-3">
              {datos.map(({ Icon, valor, label }, i) => (
                <div key={label} className={`flex flex-col items-center px-2 ${i > 0 ? "border-l border-white/20" : ""}`}>
                  <Icon className="order-1 h-7 w-7 text-white" strokeWidth={1.3} aria-hidden />
                  <dt className="order-3 mt-1 text-[12.5px] text-white/85 sm:text-[15px]">{label}</dt>
                  <dd className="order-2 mt-3 text-[24px] font-extrabold tracking-[-0.02em] sm:text-[34px]">{valor}</dd>
                </div>
              ))}
            </dl>

            <div id="pase" className="relative mx-auto mt-16 w-full max-w-[460px] scroll-mt-28 text-left">
              <Sello className="absolute -right-3 -top-10 z-20 h-24 w-24 drop-shadow-[0_10px_20px_rgba(60,4,8,.4)] sm:-right-10 sm:-top-12 sm:h-28 sm:w-28" />
              <ScratchPass lugar={EVENTO.lugar} fecha={EVENTO.fecha} promos={promos.length} />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <HeroCta />
              <ContactoLink
                href={wa}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-4 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Escribir a Ximaro
              </ContactoLink>
            </div>
          </div>
        </section>

        {/* Franja que corre */}
        <div aria-hidden className="overflow-hidden border-y border-white/15 bg-[var(--xm-red-deep)] py-4 text-white">
          <div className="xm-tape-track">
            {[0, 1].map((copia) => (
              <div key={copia} className="flex shrink-0 items-center">
                {[...FRANJA, ...FRANJA].map((t, i) => (
                  <span key={`${copia}-${i}`} className="xm-caps flex items-center gap-8 pr-8 text-[12px] font-semibold sm:text-[13px]">
                    {t}
                    <span className="opacity-50">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Promos */}
        <section id="promos" className="xm-rojo relative scroll-mt-2 overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24">
          <div aria-hidden className="xm-haz absolute inset-0" />
          <BlurFade className="xm-container relative">
            <p className="xm-caps text-center text-[10px] text-white/80">Vales del evento</p>
            <Titulo chico={`Tus ${promos.length} vales`} grande="Promos" className="mt-6" />
            <p className="mx-auto mt-6 max-w-[30rem] text-center text-[15.5px] leading-relaxed text-white/85">
              Se desbloquean cuando raspás tu pase. Tocá «La quiero» y le llega a Ximaro por WhatsApp con la promo elegida.
            </p>
          </BlurFade>
          <div className="relative mt-10">
            <PromosBloqueadas total={promos.length}>
              <ValesCarousel>
                {promos.map((p, i) => (
                  <Tilt key={p.id}>
                    <Vale promo={p} numero={i + 1} total={promos.length} />
                  </Tilt>
                ))}
              </ValesCarousel>
            </PromosBloqueadas>
          </div>
        </section>

        {/* Productos: la franja clara de la pieza */}
        <section id="productos" className="bg-[var(--xm-band)] py-20 md:py-28">
          <BlurFade className="xm-container">
            <p className="xm-caps text-center text-[10px] text-[var(--xm-red)]">Lo mejor de Mixor</p>
            <Titulo chico="Los que más" grande="Salen" tono="rojo" className="mt-6" />
            <p className="mx-auto mt-6 max-w-[30rem] text-center text-[15.5px] leading-relaxed text-[var(--xm-ink-2)]">
              Tocá cada producto para ver la ficha y consultarlo con Ximaro.
            </p>
          </BlurFade>
          <div className="mt-12">
            <ProductosCarousel productos={productos} />
          </div>
        </section>

        {/* Cómo pedir */}
        <section id="pedir" className="xm-rojo relative overflow-hidden py-20 md:py-28">
          <div aria-hidden className="xm-haz absolute inset-0" />
          <div className="xm-container relative">
            <BlurFade>
              <p className="xm-caps text-center text-[10px] text-white/80">Cómo pedir</p>
              <Titulo chico="Pedíselo a" grande={XIMARO.nombre} className="mt-6" />
            </BlurFade>

            <div className="mx-auto mt-12 max-w-[640px]">
              <PedidoBeams />
            </div>

            <span aria-hidden className="mx-auto mt-12 block h-px w-full max-w-[760px] bg-white/25" />
            <ol className="mx-auto mt-8 grid max-w-[760px] gap-6 sm:grid-cols-3 sm:gap-0">
              {pasos.map((paso, i) => (
                <li key={paso} className={`flex flex-col items-center px-4 text-center ${i > 0 ? "sm:border-l sm:border-white/20" : ""}`}>
                  <span className="text-[30px] font-extrabold tracking-[-0.02em]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-1 text-[14.5px] leading-snug text-white/85">{paso}</span>
                </li>
              ))}
            </ol>

            <div className="mx-auto mt-12 flex max-w-[560px] flex-col gap-3 sm:flex-row">
              <ContactoLink
                href={wa}
                className="xm-shine xm-shine-red relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 py-4 text-[15px] font-bold text-[var(--xm-red)] shadow-[0_18px_40px_-16px_rgba(60,4,8,.6)]"
              >
                <WhatsAppIcon className="h-5 w-5 text-[#1fae54]" />
                WhatsApp
              </ContactoLink>
              <ContactoLink
                href={ig}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/50 px-6 py-4 text-[15px] font-bold text-white transition-colors hover:bg-white/10"
              >
                <InstagramIcon className="h-5 w-5" />
                {XIMARO.instagram ? `@${XIMARO.instagram}` : "Instagram"}
              </ContactoLink>
            </div>
          </div>
        </section>

        {/* Pie: la franja blanca de la pieza */}
        <footer className="bg-[var(--xm-band)] pb-28 pt-12 text-center text-[var(--xm-ink)] md:pb-14">
          <div className="xm-container flex flex-col items-center">
            <p className="xm-tracked text-[14px] font-bold sm:text-[15px]">Raspá, elegí y pedí</p>
            <Lockup className="mt-3 text-[30px] sm:text-[36px]" />
            <p className="mt-6 max-w-[34rem] text-[12.5px] leading-relaxed text-[var(--xm-mute)]">
              Página exclusiva para los que vinieron al evento de Ximaro en {EVENTO.lugar}. Promos sujetas a stock. Mixor es
              el importador; las ventas, precios y entregas las maneja Ximaro.
            </p>
          </div>
        </footer>

        <FloatingCta href={wa} />
      </PaseProvider>
    </main>
  );
}
