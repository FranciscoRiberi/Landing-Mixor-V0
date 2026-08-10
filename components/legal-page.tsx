import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";

/** Fecha de ultima actualizacion, compartida por Privacidad y Terminos. */
export const LEGAL_UPDATED_AT = "10 de agosto de 2026";

/** Canal de contacto real del sitio para consultas y ejercicio de derechos. */
export const LEGAL_EMAIL = "mkt@mixor.com.ar";

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-xl font-bold text-foreground">{title}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_li]:leading-relaxed [&_strong]:text-foreground [&_strong]:font-semibold">
        {children}
      </div>
    </section>
  );
}

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-20 sm:pt-32">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Volver al inicio
        </Link>

        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Mixor
        </p>
        <h1 className="mb-4 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mb-2 text-base leading-relaxed text-muted-foreground">
          {intro}
        </p>
        <p className="mb-12 text-sm text-muted-foreground/70">
          Última actualización: {LEGAL_UPDATED_AT}
        </p>

        {children}
      </div>

      <Footer />
    </main>
  );
}
