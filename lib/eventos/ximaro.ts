import { getProductBySlug, getProductAlt } from "@/lib/products";

/**
 * Página privada «Mixor × Ximaro» para el evento de Tucumán. Se entra solo con
 * el QR de la tarjeta (o el link): /ximaro/<clave>. No está linkeada en el
 * sitio ni en el sitemap, y lleva noindex.
 *
 * El repo es público, así que acá va el SHA-256 de la clave y no la clave.
 * Para cambiarla: generar una nueva, poner su hash y reimprimir el QR.
 */
export const CLAVE_SHA256 = "762d0521ca72da06dab8c9ee3ae2a0f0c2b07c862e816048b8ece8e2babe6d7f";

export const EVENTO = {
  lugar: "Tucumán",
  fecha: "Noviembre 2026",
};

// Todo contacto termina en Ximaro: en esta página Mixor no muestra su número.
export const XIMARO = {
  nombre: "Ximaro",
  /** Usuario de Instagram sin @. */
  instagram: "ximaromayorista" as string | null,
  /** WhatsApp con código de país, sin + ni espacios. Es el de «clientes nuevos» de ximaro.com.ar (el otro, 5493816368026, es para clientes activos). */
  whatsapp: "5493816292066" as string | null,
};

export const MENSAJE_BASE = "Hola Ximaro! Vengo del evento de Mixor en Tucumán";

export function whatsappHref(mensaje: string): string | null {
  if (!XIMARO.whatsapp) return null;
  return `https://wa.me/${XIMARO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export function instagramHref(): string | null {
  if (!XIMARO.instagram) return null;
  return `https://www.instagram.com/${XIMARO.instagram}/`;
}

export type Promo = {
  id: string;
  /** Lo grande del vale: «Combo», «−15%», «2×1»… */
  etiqueta: string;
  titulo: string;
  detalle: string;
  /** Lo que trae el combo, tal como lo lee el cliente. */
  items: string[];
  /** Slugs de lib/products.ts que entran en la promo (para las fotos). */
  incluye: string[];
  /** Precio del combo para el evento, ya con el descuento. */
  precio: number;
  /** Precio de lista del combo, sin descuento. */
  precioLista: number;
  condicion: string;
  /** Mientras sea un ejemplo, el vale lo dice. Sacarlo cuando la promo esté confirmada. */
  borrador?: boolean;
};

export const DESCUENTO_EVENTO = 0.05;
const conDescuento = (lista: number) => Math.round(lista * (1 - DESCUENTO_EVENTO) * 100) / 100;

export const formatoPrecio = (n: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

// Combos de la planilla «Combos MIXOR Ximaro» (12/11/2026), con el 5 % menos para el evento.
export const promos: Promo[] = [
  {
    id: "primer-contacto",
    etiqueta: "Combo 1",
    titulo: "Mixor primer contacto",
    detalle: "Para empezar con lo que más sale: cargadores, cables y un auricular. Cinco productos.",
    items: [
      "Cargador Quiero 2 USB + cable V8",
      "Cargador Somos 1 USB + cable Tipo C",
      "Cable Intenso USB a V8",
      "Cable Impulso Tipo C",
      "Auricular Alegría",
    ],
    incluye: ["cargador-quiero", "cargador-somos", "cable-impulso"],
    precioLista: 8436.69,
    precio: conDescuento(8436.69),
    condicion: "Inversión económica · 5 productos",
  },
  {
    id: "explora-mas",
    etiqueta: "Combo 2",
    titulo: "Mixor explorá más",
    detalle: "Carga, cables y accesorios para armar un surtido completo de mostrador. Diez productos.",
    items: [
      "Cargador Verdad 45W Tipo C + cable",
      "Cargador Realidad 2 USB + cable Tipo C",
      "Cargador Realidad 45W 2 USB + cable V8",
      "Cable Impulso Tipo C",
      "Cable Intenso USB a V8",
      "Auricular Emoción 3,5 mm",
      "Soporte Atrae magnético",
      "Mouse Ágil",
      "Cable Eternidad Tipo C",
      "Cable Vínculo Tipo C a Tipo C",
    ],
    incluye: ["cargador-verdad", "cargador-realidad", "holder-atrae", "mouse-agil"],
    precioLista: 24567.41,
    precio: conDescuento(24567.41),
    condicion: "Inversión económica · 10 productos",
  },
  {
    id: "experiencia-total",
    etiqueta: "Combo 3",
    titulo: "Mixor experiencia total",
    detalle: "Lo más vendido de cada categoría: carga rápida, audio Bluetooth, parlante y smartwatch. Diez productos.",
    items: [
      "Cargador Cumbre 65W USB + Tipo C + cable",
      "Cargador Verdad 45W Tipo C + cable",
      "Cable Vínculo Tipo C a Tipo C",
      "Cable Eternidad Tipo C",
      "Auricular Reencuentro Tipo C",
      "Auricular Bluetooth Fusión",
      "Soporte Atrae magnético",
      "Parlante Ímpetu",
      "Smartwatch Momentos",
      "Mouse Ágil",
    ],
    incluye: ["cargador-cumbre", "auriculares-fusion", "parlante-impetu", "smartwatch-momentos"],
    precioLista: 59035.27,
    precio: conDescuento(59035.27),
    condicion: "Inversión media · 10 productos",
  },
  {
    id: "descubri",
    etiqueta: "Combo 4",
    titulo: "Mixor descubrí",
    detalle: "La línea premium: Sensación, Pulso, Recuerdo, Nexo y Cumbre, más cables y memoria. Diez productos.",
    items: [
      "Cable Núcleo USB a Tipo C",
      "Cable Eternidad Tipo C",
      "Auricular Reencuentro Tipo C",
      "Auricular Bluetooth Sensación",
      "Memoria 64 GB Clase 10",
      "Cargador notebook Nexo 9 pines",
      "Smartwatch Pulso",
      "Parlante Recuerdo",
      "Cargador Cumbre 65W USB + Tipo C + cable",
      "Cargador Verdad 45W Tipo C + cable",
    ],
    incluye: ["auriculares-sensacion", "smartwatch-pulso", "parlante-recuerdo", "cargador-nexo"],
    precioLista: 69820.22,
    precio: conDescuento(69820.22),
    condicion: "Inversión alta · 10 productos",
  },
];

/** Los productos que se muestran en «Lo mejor de Mixor», en este orden. */
export const destacados = [
  "parlante-impacto",
  "parlante-clave",
  "parlante-eco",
  "smartwatch-pulso",
  "manos-libres-reencuentro",
  "cargador-verdad",
];

export type ProductoEvento = {
  slug: string;
  tipo: string; // «Parlante»
  nombre: string; // «Impacto»
  completo: string; // «Parlante Impacto»
  imagen: string;
  alt: string;
  claves: string[];
  kit: string | null;
  descripcion: string;
  features: { title: string; description: string }[];
};

export function productoEvento(slug: string): ProductoEvento | null {
  const p = getProductBySlug(slug);
  if (!p) return null;
  const partes = p.name.split(" ");
  // Solo texto: los íconos de lib/products.ts no pueden pasar a componentes de cliente.
  const features = ((p as { features?: { title: string; description: string }[] }).features ?? []).map((f) => ({
    title: f.title,
    description: f.description,
  }));
  return {
    slug,
    tipo: partes.slice(0, -1).join(" "),
    nombre: partes[partes.length - 1],
    completo: p.name,
    imagen: p.image,
    alt: getProductAlt(p.name),
    claves: features.slice(0, 2).map((f) => f.title),
    kit: (p as { kit?: string }).kit ?? null,
    descripcion: p.description,
    features,
  };
}
