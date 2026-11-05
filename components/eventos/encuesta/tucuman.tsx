"use client";

// Ilustraciones de la encuesta: la Casa Histórica, los cerros, el cañaveral y el lapacho.
// Van como componentes de cliente para no cargar el payload del servidor con tanto SVG.

import type { CSSProperties } from "react";

const BLANCO = "#fbf8f3";
const SOMBRA = "#e6dcd4";
const LINEA = "#c9bab0";
const AZUL = "#1f55a8";
const AZUL_OSCURO = "#143a78";
const CELESTE = "#7db9e8";
const TEJA = "#5a1511";
const TEJA_CLARA = "#8c3a2b";

/** Columna torneada de la portada: anillos apilados entre base y capitel. */
function Columna({ x }: { x: number }) {
  return (
    <g>
      {Array.from({ length: 13 }, (_, i) => (
        <ellipse key={i} cx={x} cy={176 + i * 20} rx="15" ry="11.5" fill={BLANCO} stroke={LINEA} strokeWidth="1.4" />
      ))}
      <rect x={x - 23} y="150" width="46" height="16" fill={BLANCO} stroke={LINEA} strokeWidth="1.4" />
      <rect x={x - 25} y="430" width="50" height="40" fill={BLANCO} stroke={LINEA} strokeWidth="1.4" />
    </g>
  );
}

function Ventana({ x }: { x: number }) {
  return (
    <g>
      <rect x={x - 38} y="314" width="76" height="90" fill={AZUL_OSCURO} stroke={LINEA} strokeWidth="2" />
      {[1, 2, 3, 4, 5].map((i) => (
        <line
          key={i}
          x1={x - 38 + i * 12.7}
          y1="314"
          x2={x - 38 + i * 12.7}
          y2="404"
          stroke={CELESTE}
          strokeWidth="2"
        />
      ))}
      {[1, 2, 3].map((i) => (
        <line
          key={i}
          x1={x - 38}
          y1={314 + i * 22.5}
          x2={x + 38}
          y2={314 + i * 22.5}
          stroke={CELESTE}
          strokeWidth="2"
        />
      ))}
      <path
        d={`M${x - 50} 310 Q${x} 280 ${x + 50} 310 L${x + 50} 320 Q${x} 294 ${x - 50} 320Z`}
        fill={BLANCO}
        stroke={LINEA}
        strokeWidth="1.6"
      />
      <rect x={x - 47} y="404" width="94" height="10" fill={BLANCO} stroke={LINEA} strokeWidth="1.6" />
    </g>
  );
}

function Bandera({ x }: { x: number }) {
  return (
    <g>
      <line x1={x} y1="232" x2={x} y2="330" stroke="#a89a90" strokeWidth="3" strokeLinecap="round" />
      <rect x={x + 2} y="238" width="9" height="74" fill={CELESTE} />
      <rect x={x + 11} y="238" width="9" height="74" fill="#fff" />
      <rect x={x + 20} y="238" width="9" height="74" fill={CELESTE} />
    </g>
  );
}

function Tejas({ x }: { x: number }) {
  return (
    <g>
      <rect x={x} y="150" width="108" height="48" fill={TEJA} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={x + 6 + i * 12} y1="150" x2={x + 6 + i * 12} y2="198" stroke={TEJA_CLARA} strokeWidth="2" />
      ))}
      <rect x={x} y="147" width="108" height="5" fill={TEJA_CLARA} />
    </g>
  );
}

/** La fachada de la Casa Histórica, de frente: paredes blancas, portada y puerta azul. */
export function CasaHistorica({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 492" className={className} role="img" aria-label="Fachada de la Casa Histórica de Tucumán">
      <Tejas x={8} />
      <Tejas x={604} />

      {/* Paredes */}
      <rect x="116" y="92" width="488" height="112" fill={BLANCO} />
      <rect x="106" y="84" width="508" height="12" fill={BLANCO} stroke={LINEA} strokeWidth="1.4" />
      <rect x="10" y="204" width="700" height="286" fill={BLANCO} />
      <rect x="2" y="196" width="716" height="12" fill={BLANCO} stroke={LINEA} strokeWidth="1.4" />
      <rect x="10" y="208" width="700" height="5" fill={SOMBRA} />
      <rect x="0" y="480" width="720" height="11" fill={SOMBRA} />

      <Ventana x={132} />
      <Ventana x={588} />
      <Bandera x={38} />
      <Bandera x={652} />

      {/* Portada */}
      <rect x="226" y="66" width="268" height="414" fill={BLANCO} stroke={LINEA} strokeWidth="1.4" />
      <rect x="216" y="54" width="288" height="15" fill={BLANCO} stroke={LINEA} strokeWidth="1.4" />
      <rect x="226" y="69" width="268" height="5" fill={SOMBRA} />
      <rect x="236" y="150" width="20" height="320" fill={BLANCO} stroke={LINEA} strokeWidth="1.4" />
      <rect x="464" y="150" width="20" height="320" fill={BLANCO} stroke={LINEA} strokeWidth="1.4" />
      <Columna x={276} />
      <Columna x={444} />

      {/* Arco sobre la puerta y escudo */}
      <path d="M298 214 Q360 112 422 214" fill="none" stroke={LINEA} strokeWidth="17" strokeLinecap="round" />
      <path d="M298 214 Q360 112 422 214" fill="none" stroke={BLANCO} strokeWidth="13" strokeLinecap="round" />
      <path
        d="M336 178c-11 16-9 36 8 49M384 178c11 16 9 36-8 49"
        fill="none"
        stroke="#5f7a4a"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M343 196a17 21 0 0 1 34 0Z" fill={CELESTE} />
      <path d="M343 196a17 21 0 0 0 34 0Z" fill="#fff" />
      <ellipse cx="360" cy="196" rx="17" ry="21" fill="none" stroke="#3b3b40" strokeWidth="2.5" />
      <path d="M350 172a10 10 0 0 1 20 0Z" fill="#f0b429" />
      <path
        d="M360 158v-6M349 162l-4-5M371 162l4-5M343 171h-6M377 171h6"
        stroke="#f0b429"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Puerta */}
      <path d="M294 472V250Q360 220 426 250V472Z" fill={BLANCO} stroke={LINEA} strokeWidth="1.6" />
      <path d="M302 472V256Q360 230 418 256V472Z" fill={AZUL} />
      <rect x="315" y="274" width="33" height="82" rx="2" fill="none" stroke={AZUL_OSCURO} strokeWidth="3" />
      <rect x="372" y="274" width="33" height="82" rx="2" fill="none" stroke={AZUL_OSCURO} strokeWidth="3" />
      <rect x="315" y="372" width="33" height="82" rx="2" fill="none" stroke={AZUL_OSCURO} strokeWidth="3" />
      <rect x="372" y="372" width="33" height="82" rx="2" fill="none" stroke={AZUL_OSCURO} strokeWidth="3" />
      <line x1="360" y1="243" x2="360" y2="472" stroke={AZUL_OSCURO} strokeWidth="4" />
    </svg>
  );
}

/** Tres filas de cerros: el Aconquija atrás y la sierra de San Javier adelante. */
export function Cerros({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden>
      <path
        d="M0 210C70 170 120 150 180 176S300 120 372 90 470 130 540 112 640 40 716 76 830 132 900 104 1040 70 1110 118 1170 140 1200 128V400H0Z"
        fill="#a91b24"
      />
      <path
        d="M0 262C120 214 210 228 320 206S520 172 640 196 840 190 960 204 1120 176 1200 214V400H0Z"
        fill="#93161e"
      />
      <path d="M0 330C160 296 330 318 520 306S860 288 1010 306 1140 302 1200 292V400H0Z" fill="#7f131b" />
    </svg>
  );
}

const TALLOS = [
  { x: 26, alto: 214, grueso: 8 },
  { x: 62, alto: 258, grueso: 9 },
  { x: 100, alto: 232, grueso: 8 },
  { x: 138, alto: 272, grueso: 9 },
  { x: 178, alto: 216, grueso: 8 },
  { x: 216, alto: 246, grueso: 8 },
  { x: 254, alto: 204, grueso: 7 },
];
const PENACHO = [-74, -50, -28, -8, 12, 34, 56, 78];

/** Cañaveral: tallos con nudos y penacho de hojas largas, recortados contra el rojo. */
export function Canaveral({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 300 330" overflow="visible" className={className} style={style} aria-hidden>
      {TALLOS.map(({ x, alto, grueso }, t) => {
        const arriba = 330 - alto;
        return (
          <g key={x}>
            <path d={`M${x} 330V${arriba}`} stroke="#5e0d13" strokeWidth={grueso} />
            {Array.from({ length: Math.floor(alto / 32) }, (_, i) => (
              <path
                key={i}
                d={`M${x - grueso / 2 - 1} ${330 - (i + 1) * 32}h${grueso + 2}`}
                stroke="#7f131b"
                strokeWidth="2.5"
              />
            ))}
            {PENACHO.map((giro, i) => (
              <path
                key={giro}
                d="M0 0C5-34 26-70 72-84 34-64 14-34 3 2Z"
                fill={(i + t) % 2 ? "#5e0d13" : "#6e1119"}
                transform={`translate(${x} ${arriba + 6}) rotate(${giro}) scale(${giro < 0 ? -1 : 1} 1)`}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/** Flor de lapacho: una trompeta rosada de boca ondulada y garganta amarilla. */
function Corola() {
  return (
    <>
      <path
        d="M20 39C18 31 12 25 7 21 2 17 4 10 10 11 11 5 17 4 20 8 23 4 29 5 30 11 36 10 38 17 33 21 28 25 22 31 20 39Z"
        fill="#f58cb8"
      />
      <path d="M20 39C18 31 12 25 7 21 11 24 17 27 20 27 23 27 29 24 33 21 28 25 22 31 20 39Z" fill="#df4f91" />
      <path d="M20 26C18 22 15 18 14 14 17 12 23 12 26 14 25 18 22 22 20 26Z" fill="#ffd98a" />
      <path d="M20 25V15M17 22l-2-6M23 22l2-6" stroke="#df4f91" strokeWidth="1" strokeLinecap="round" />
    </>
  );
}

export function FlorLapacho({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden>
      <Corola />
    </svg>
  );
}

const PETALOS = [
  { left: "6%", size: 16, dur: 13, delay: -2 },
  { left: "18%", size: 11, dur: 17, delay: -9 },
  { left: "31%", size: 14, dur: 15, delay: -5 },
  { left: "47%", size: 10, dur: 19, delay: -13 },
  { left: "59%", size: 15, dur: 14, delay: -1 },
  { left: "72%", size: 12, dur: 16, delay: -7 },
  { left: "84%", size: 17, dur: 12, delay: -11 },
  { left: "94%", size: 11, dur: 18, delay: -4 },
];

/** Flores de lapacho que caen despacio sobre la portada. */
export function Petalos() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PETALOS.map((p) => (
        <span
          key={p.left}
          className="xm-petalo"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <FlorLapacho className="h-full w-full" />
        </span>
      ))}
    </div>
  );
}

const RACIMOS = [
  [232, 42],
  [168, 56],
  [104, 42],
  [266, 98],
  [196, 112],
];
const FLORES = [
  [0, 0, 0, 30],
  [-17, -9, -55, 26],
  [17, -10, 55, 26],
  [-20, 11, -115, 25],
  [20, 11, 120, 25],
  [0, 20, 180, 24],
];

/** Rama de lapacho en flor, para una esquina. */
export function RamaLapacho({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 170" className={className} aria-hidden>
      <path
        d="M304 14C250 30 190 40 120 44S50 40 30 30"
        fill="none"
        stroke="#4d0a10"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M216 34c10 24 22 44 40 62M150 42c4 18 20 44 40 62"
        fill="none"
        stroke="#4d0a10"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {RACIMOS.flatMap(([cx, cy], r) =>
        FLORES.map(([dx, dy, giro, tam], f) => (
          <g
            key={`${r}-${f}`}
            transform={`translate(${cx + dx} ${cy + dy}) rotate(${giro}) scale(${tam / 40}) translate(-20 -20)`}
          >
            <Corola />
          </g>
        )),
      )}
    </svg>
  );
}

const TRAZOS: Record<string, React.ReactNode> = {
  azucar: (
    <>
      <path d="M16 3.5 27 9.7v12.6L16 28.5 5 22.3V9.7Z" />
      <path d="M5 9.7 16 16l11-6.3M16 16v12.5" />
      <path d="M10 13.6v.01M13 19.6v.01M20.5 18v.01M23 13.2v.01" />
    </>
  ),
  cana: (
    <>
      <path d="M16 29V12M13.5 24h5M13.5 18h5" />
      <path d="M16 12C15 7 11 4 6 3c3 3 6 6 10 9ZM16 12c1-5 5-8 10-9-3 3-6 6-10 9Z" />
      <path d="M16 12c-4-1-8 0-11 3 4-1 7-2 11-3ZM16 12c4-1 8 0 11 3-4-1-7-2-11-3Z" />
    </>
  ),
  casita: (
    <>
      <path d="M3.5 15 16 4.5 28.5 15" />
      <path d="M7 12.5V28h18V12.5" />
      <path d="M13 28v-7a3 3 0 0 1 6 0v7" />
    </>
  ),
  jardin: (
    <>
      <path d="M16 28V14M8 28h16" />
      <path d="M16 16C16 10 11 6 4.5 6c0 6.5 5 10 11.5 10Z" />
      <path d="M16 21c0-5 4.5-8.5 11.5-8.5 0 6-5 8.5-11.5 8.5Z" />
    </>
  ),
  zafra: (
    <>
      <path d="M16 3.5v25M9 4l7 12-7 12M23 4l-7 12 7 12" />
      <path d="M10.5 16h11" strokeWidth="3" />
    </>
  ),
  libre: (
    <>
      <path d="M6 29V15a10 10 0 0 1 20 0v14Z" />
      <path d="M16 5v24M10 16v7M22 16v7" />
      <path d="M3 29h26" />
    </>
  ),
  lapacho: (
    <>
      <circle cx="16" cy="16" r="3" />
      {[0, 72, 144, 216, 288].map((giro) => (
        <ellipse key={giro} cx="16" cy="7.5" rx="4.3" ry="5.5" transform={`rotate(${giro} 16 16)`} />
      ))}
    </>
  ),
};

/** Un ícono de trazo fino por cada nombre. */
export function IconoOpcion({ id, className }: { id: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {TRAZOS[id]}
    </svg>
  );
}
