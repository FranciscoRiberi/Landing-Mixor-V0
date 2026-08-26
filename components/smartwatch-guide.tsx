"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BatteryCharging,
  Download,
  Bluetooth,
  PhoneCall,
  Check,
  X,
  ChevronDown,
  AlertTriangle,
  HeartPulse,
  Droplets,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

type ModelId = "pulso" | "momentos" | "activo";

const MODELS: {
  id: ModelId;
  name: string;
  slug: string;
  code: string;
  shape: string;
  /** Los Momentos y Activo suman la segunda conexion para audio. */
  audio: boolean;
}[] = [
  {
    id: "pulso",
    name: "Pulso",
    slug: "smartwatch-pulso",
    code: "MODM-00GP",
    shape: "Redondo · 2.09''",
    audio: true,
  },
  {
    id: "momentos",
    name: "Momentos",
    slug: "smartwatch-momentos",
    code: "MODM-00ED",
    shape: "Cuadrado",
    audio: true,
  },
  {
    id: "activo",
    name: "Activo",
    slug: "smartwatch-activo",
    code: "MODM-00II",
    shape: "Cuadrado",
    audio: true,
  },
];

const COMPARISON: { label: string; pulso: boolean; momentos: boolean; activo: boolean }[] = [
  { label: "Contar pasos y distancia", pulso: true, momentos: true, activo: true },
  { label: "Medir el sueño", pulso: true, momentos: true, activo: true },
  { label: "Pulsaciones, presión y oxígeno", pulso: true, momentos: true, activo: true },
  { label: "Medición ECG", pulso: true, momentos: true, activo: true },
  { label: "Hablar por teléfono desde el reloj", pulso: true, momentos: true, activo: true },
  { label: "Escuchar música desde el reloj", pulso: true, momentos: true, activo: true },
  { label: "Control remoto de cámara", pulso: true, momentos: true, activo: true },
  { label: "Buscar el celular", pulso: false, momentos: false, activo: true },
  { label: "Clima del día", pulso: false, momentos: false, activo: true },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "El reloj no aparece en la aplicación",
    a: (
      <p>
        Revisá que tenga batería, que el Bluetooth esté prendido y que no haya
        quedado conectado a otro celular.
      </p>
    ),
  },
  {
    q: "No puedo instalar la aplicación en el iPhone",
    a: (
      <p>
        Wearfit Pro necesita iPhone con iOS 13.4 o más nuevo. En modelos
        anteriores no se puede instalar y el reloj no va a poder conectarse.
      </p>
    ),
  },
  {
    q: "Veo los mensajes pero no puedo atender llamadas",
    a: (
      <p>
        Falta la segunda conexión: volvé al <strong>Paso 4</strong>. Los tres
        modelos permiten atender llamadas, pero hace falta conectar el reloj
        una segunda vez desde los ajustes de Bluetooth del celular.
      </p>
    ),
  },
  {
    q: "Después de un rato dejan de llegar los mensajes",
    a: (
      <p>
        Suele pasar en Android, porque el celular apaga la aplicación para
        ahorrar batería. Entrá a los ajustes de batería, buscá Wearfit Pro y
        permitile funcionar en segundo plano.
      </p>
    ),
  },
  {
    q: "No aparecen los nombres de quienes me llaman",
    a: (
      <p>
        La aplicación no tiene permiso para ver los contactos. Desconectá el
        reloj desde los ajustes de Bluetooth y volvé a conectarlo aceptando el
        permiso.
      </p>
    ),
  },
  {
    q: "Se desconecta solo",
    a: (
      <p>
        El reloj y el celular tienen que estar a menos de diez metros, sin
        paredes gruesas en el medio.
      </p>
    ),
  },
  {
    q: "Los pasos no coinciden con lo que caminé",
    a: (
      <p>
        Cargá tu edad, altura y peso en la aplicación e indicá en qué muñeca lo
        usás. De esos datos depende el cálculo.
      </p>
    ),
  },
  {
    q: "Perdí el fondo de pantalla que había puesto",
    a: (
      <p>
        Puede pasar si el reloj se descargó por completo. Volvé a elegirlo desde
        la aplicación.
      </p>
    ),
  },
];

function Cell({ ok }: { ok: boolean }) {
  return ok ? (
    <Check size={17} className="mx-auto text-emerald-400" aria-label="Sí" />
  ) : (
    <X size={17} className="mx-auto text-zinc-600" aria-label="No" />
  );
}

export function SmartwatchGuide() {
  const [model, setModel] = useState<ModelId>("momentos");
  const [open, setOpen] = useState<number | null>(null);

  const active = MODELS.find((m) => m.id === model)!;

  const steps = [
    {
      icon: BatteryCharging,
      title: "Cargá el reloj",
      body: (
        <>
          <p>
            Antes de usarlo por primera vez, cargalo por completo.
          </p>
          <ol className="mt-3 space-y-2">
            <li>
              Apoyá el cable de carga en la parte de atrás del reloj. Los imanes
              lo acomodan solos en la posición correcta.
            </li>
            <li>
              Enchufá el otro extremo a un cargador de celular común o a una
              computadora.
            </li>
            <li>
              En la pantalla vas a ver el dibujo de la batería llenándose.
              Cuando llegue a 100, desenchufalo.
            </li>
          </ol>
          <p className="mt-3 font-medium text-amber-300/90">
            No cargues el reloj si está mojado. Secá bien la parte de atrás
            antes de apoyar el cable.
          </p>
        </>
      ),
    },
    {
      icon: Download,
      title: "Descargá Wearfit Pro",
      body: (
        <>
          <ol className="space-y-2">
            <li>
              Entrá a la tienda de aplicaciones de tu celular:{" "}
              <strong>Play Store</strong> si es Android,{" "}
              <strong>App Store</strong> si es iPhone.
            </li>
            <li>
              Buscá <strong>Wearfit Pro</strong>.
            </li>
            <li>Tocá &ldquo;Instalar&rdquo;. La aplicación es gratuita.</li>
          </ol>
          <p className="mt-3">
            Ocupa bastante espacio, así que conviene descargarla con wifi.
          </p>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="mb-2 font-semibold text-white">
              Al abrirla te va a pedir permisos. Aceptá todos:
            </p>
            <ul className="space-y-1.5">
              <li>
                <strong>Bluetooth:</strong> es lo que conecta el reloj con el
                celular.
              </li>
              <li>
                <strong>Ubicación:</strong> Android la pide para buscar aparatos
                cercanos. No es para saber dónde estás.
              </li>
              <li>
                <strong>Notificaciones:</strong> permite que los mensajes
                lleguen al reloj.
              </li>
              <li>
                <strong>Contactos:</strong> permite ver los nombres de quienes
                te llaman.
              </li>
            </ul>
          </div>
        </>
      ),
    },
    {
      icon: Bluetooth,
      title: "Conectá el reloj al celular",
      body: (
        <>
          <ol className="space-y-2">
            <li>Prendé el reloj.</li>
            <li>Fijate que el Bluetooth del celular esté activado.</li>
            <li>
              Abrí Wearfit Pro y tocá <strong>Agregar dispositivo</strong>.
            </li>
            <li>Va a aparecer una lista. Elegí el nombre de tu reloj.</li>
            <li>
              Si el celular pregunta si querés vincularte, tocá{" "}
              <strong>Aceptar</strong>.
            </li>
          </ol>
          <p className="mt-3 text-emerald-300/90">
            Listo. Ya vas a ver la hora, los pasos y los mensajes en el reloj.
          </p>
        </>
      ),
    },
    {
      icon: PhoneCall,
      title: "Activá las llamadas y la música",
      onlyAudio: true,
      body: (
        <>
          <p>
            Estos relojes se conectan <strong>dos veces</strong> al mismo
            celular. Suena raro, pero es así:
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              La <strong>primera conexión</strong> (la del paso 3) sirve para
              los datos: pasos, sueño, mensajes.
            </li>
            <li>
              La <strong>segunda</strong> sirve para el sonido: es la que
              permite hablar y escuchar música desde el reloj.
            </li>
          </ul>
          <p className="mt-3">
            Si no la hacés, el reloj funciona igual, pero cuando te llamen vas a
            ver el aviso sin poder atender.
          </p>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="mb-2 font-semibold text-white">Cómo hacerla:</p>
            <ol className="space-y-2">
              <li>
                Salí de la aplicación y entrá a los <strong>Ajustes</strong> del
                celular.
              </li>
              <li>
                Buscá la sección <strong>Bluetooth</strong>.
              </li>
              <li>
                En la lista va a aparecer un nombre parecido al del reloj, pero
                distinto al que ya conectaste. Tocalo.
              </li>
              <li>Si pregunta si querés compartir los contactos, aceptá.</li>
            </ol>
          </div>
          <p className="mt-3 text-sm text-zinc-500">
            Si ese segundo nombre no aparece en la lista, revisá que el reloj
            esté prendido y cerca. Si aun así no figura, escribinos y lo vemos.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-16">
      {/* ===== Selector de modelo ===== */}
      <section id="modelo" className="scroll-mt-28">
        <h2 className="mb-1 text-sm font-bold uppercase tracking-[0.18em] text-red-500">
          Paso previo
        </h2>
        <p className="mb-5 text-2xl font-bold text-white">
          ¿Cuál de los tres tenés?
        </p>
        <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
          Los tres se conectan igual y los cuatro pasos aplican a todos. Elegí
          el tuyo para ver sus datos y que se resalte su columna en la tabla de
          más abajo. El <strong className="text-zinc-200">Activo</strong> es el
          único que suma buscar el celular y clima del día.
        </p>

        <div
          role="group"
          aria-label="Elegí tu modelo de smartwatch"
          className="grid gap-3 sm:grid-cols-3"
        >
          {MODELS.map((m) => {
            const isActive = m.id === model;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setModel(m.id)}
                aria-pressed={isActive}
                className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                  isActive
                    ? "border-red-500/60 bg-red-500/10 shadow-lg shadow-red-900/20"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                }`}
              >
                <span className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white">{m.name}</span>
                  {isActive && (
                    <Check size={18} className="text-red-400" aria-hidden="true" />
                  )}
                </span>
                <span className="mt-1 block text-xs text-zinc-500">
                  {m.shape} · {m.code}
                </span>
                <span className="mt-2 block text-xs text-zinc-400">
                  {m.id === "activo"
                    ? "Suma buscar el celular y clima"
                    : "Llamadas, música y ECG"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ===== Requisitos ===== */}
      <section id="requisitos" className="scroll-mt-28">
        <h2 className="mb-4 text-2xl font-bold text-white">Antes de empezar</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Un celular compatible", "Android 5.0 o más nuevo, o iPhone con iOS 13.4 o más nuevo."],
            ["Conexión a internet", "Preferentemente wifi, porque la app ocupa bastante."],
            ["Unos 15 minutos", "No hace falta saber de tecnología."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="font-semibold text-white">{t}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/[0.07] p-4">
          <AlertTriangle
            size={20}
            className="mt-0.5 shrink-0 text-amber-400"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-amber-100/80">
            <strong className="text-amber-200">iPhone antiguos:</strong> la
            aplicación no se puede instalar en versiones anteriores a iOS 13.4.
            Si el celular es muy viejo, el reloj no va a poder conectarse.
          </p>
        </div>
      </section>

      {/* ===== Pasos ===== */}
      <section id="pasos" className="scroll-mt-28">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Conectarlo, paso a paso
        </h2>

        <ol className="space-y-4">
          {steps.map((step, i) => {
            const skipped = step.onlyAudio && !active.audio;
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className={`rounded-3xl border p-5 sm:p-6 transition-opacity ${
                  skipped
                    ? "border-white/[0.07] bg-white/[0.015] opacity-60"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      skipped
                        ? "bg-white/5 text-zinc-600"
                        : "bg-red-600/15 text-red-400"
                    }`}
                  >
                    <Icon size={20} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
                      Paso {i + 1}
                    </p>
                    <h3 className="mt-0.5 text-lg font-bold text-white">
                      {step.title}
                    </h3>

                    {skipped ? (
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        <strong className="text-zinc-300">
                          El {active.name} no necesita este paso.
                        </strong>{" "}
                        Este modelo no permite hablar ni escuchar música desde
                        el reloj. Con el paso 3 ya lo tenés funcionando.
                      </p>
                    ) : (
                      <div className="mt-3 space-y-1 text-[15px] leading-relaxed text-zinc-300 [&_li]:ml-5 [&_li]:list-decimal [&_ol]:space-y-2 [&_strong]:font-semibold [&_strong]:text-white [&_ul_li]:list-disc">
                        {step.onlyAudio && (
                          <p className="mb-3 inline-flex rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-300">
                            Para los tres modelos
                          </p>
                        )}
                        {step.body}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ===== Comparativa ===== */}
      <section id="modelos" className="scroll-mt-28">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Qué hace cada modelo
        </h2>
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.03]">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-5 py-4 text-left font-semibold text-zinc-400">
                  Función
                </th>
                {MODELS.map((m) => (
                  <th
                    key={m.id}
                    className={`px-4 py-4 text-center font-bold ${
                      m.id === model ? "text-red-400" : "text-white"
                    }`}
                  >
                    {m.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="px-5 py-3 text-zinc-300">{row.label}</td>
                  <td className={`px-4 py-3 ${model === "pulso" ? "bg-white/[0.03]" : ""}`}>
                    <Cell ok={row.pulso} />
                  </td>
                  <td className={`px-4 py-3 ${model === "momentos" ? "bg-white/[0.03]" : ""}`}>
                    <Cell ok={row.momentos} />
                  </td>
                  <td className={`px-4 py-3 ${model === "activo" ? "bg-white/[0.03]" : ""}`}>
                    <Cell ok={row.activo} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link
          href={`/productos/${active.slug}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-400 transition-colors hover:text-red-300"
        >
          Ver la ficha del {active.name}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </section>

      {/* ===== Configuracion desde la app ===== */}
      <section id="configuracion" className="scroll-mt-28">
        <h2 className="mb-2 text-2xl font-bold text-white">
          Qué se configura desde la aplicación
        </h2>
        <p className="mb-5 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
          Casi todo se ajusta desde el celular, no desde el reloj.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Tus datos", "Edad, altura, peso y sexo. Cargalos apenas conectes el reloj: de eso dependen el cálculo de pasos y calorías."],
            ["Meta de pasos por día", "El objetivo diario que querés alcanzar."],
            ["Qué aplicaciones avisan", "WhatsApp, llamadas y mensajes."],
            ["Vibración", "Prenderla o apagarla."],
            ["En qué muñeca lo usás", "Mejora la precisión del conteo."],
            ["Fondos de pantalla", "Vienen varios y se pueden descargar más."],
            ["Actualizaciones del reloj", "Dejalo cargando y cerca del celular mientras se actualiza."],
            ["Borrar todo y empezar de nuevo", "Borra los datos del reloj. No se puede deshacer."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="font-semibold text-white">{t}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Problemas frecuentes ===== */}
      <section id="problemas" className="scroll-mt-28">
        <h2 className="mb-5 text-2xl font-bold text-white">
          Si algo no funciona
        </h2>
        <div className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
                >
                  <span className="font-semibold text-white">{f.q}</span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`shrink-0 text-zinc-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-[15px] leading-relaxed text-zinc-400 [&_strong]:font-semibold [&_strong]:text-zinc-200">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== Salud y cuidados ===== */}
      <section id="cuidados" className="scroll-mt-28 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
            <HeartPulse size={19} className="text-red-400" aria-hidden="true" />
            Sobre las mediciones de salud
          </h2>
          <div className="space-y-3 text-[15px] leading-relaxed text-zinc-400">
            <p>
              Las pulsaciones, la presión, el oxígeno en sangre y el ECG sirven
              como <strong className="text-zinc-200">referencia para acompañar tus hábitos</strong>,
              no como diagnóstico.
            </p>
            <p>
              No son mediciones médicas y pueden diferir de un aparato clínico.
              <strong className="text-zinc-200">
                {" "}
                No tomes decisiones sobre tu salud ni cambies una medicación en
                base a lo que muestra el reloj.
              </strong>{" "}
              Ante cualquier síntoma o duda, consultá con un profesional.
            </p>
            <p>
              Para que la medición sea más pareja, usá el reloj ajustado sin
              apretar, unos dos dedos por encima de la muñeca, y quedate quieto
              mientras mide.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
            <Droplets size={19} className="text-sky-400" aria-hidden="true" />
            Cuidados
          </h2>
          <ul className="space-y-2 text-[15px] leading-relaxed text-zinc-400 [&>li]:pl-4 [&>li]:relative">
            {[
              "No lo lleves a la ducha, a la pileta ni al mar. Ninguno de los tres modelos está preparado para sumergirse.",
              "Evitá golpes y caídas.",
              "No lo cargues si está mojado.",
              "Limpiá la malla con un paño húmedo o agua tibia. No uses alcohol ni productos de limpieza.",
              "Mantené limpia la parte de atrás: si tiene suciedad, las mediciones fallan.",
              "Si vas a guardarlo sin usar, cargalo una vez por mes.",
              "Si te irrita la piel, sacátelo y dejá descansar la muñeca.",
            ].map((c) => (
              <li
                key={c}
                className="before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-zinc-600"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Garantia ===== */}
      <section
        id="garantia"
        className="scroll-mt-28 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
      >
        <h2 className="mb-3 text-2xl font-bold text-white">
          Garantía y contacto
        </h2>
        <p className="mb-2 text-[15px] leading-relaxed text-zinc-400">
          Los smartwatches Mixor tienen{" "}
          <strong className="text-white">90 días de garantía</strong>. Si el
          reloj falla dentro de ese plazo, comunicate primero con el comercio
          donde lo compraste.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-zinc-400">
          Si sos distribuidor y necesitás ayuda con un producto, escribinos a{" "}
          <a
            href="mailto:mkt@mixor.com.ar"
            className="text-red-400 underline underline-offset-2 hover:text-red-300"
          >
            mkt@mixor.com.ar
          </a>{" "}
          o por el formulario de contacto.
        </p>
        <Link
          href="/#contacto"
          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-red-500"
        >
          <MessageCircle size={17} aria-hidden="true" />
          Contactar a Mixor
        </Link>
      </section>
    </div>
  );
}
