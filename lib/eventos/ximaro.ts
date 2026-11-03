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
  /** Usuario de Instagram sin @. Pendiente. */
  instagram: null as string | null,
  /** WhatsApp con código de país, sin + ni espacios (ej. 5493811234567). Pendiente. */
  whatsapp: null as string | null,
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
  /** Slugs de lib/products.ts que entran en la promo. */
  incluye: string[];
  condicion: string;
  /** Mientras sea un ejemplo, el vale lo dice. Sacarlo cuando la promo esté confirmada. */
  borrador?: boolean;
};

// Ejemplos para armar la estructura: las promos reales las define Mixor.
export const promos: Promo[] = [
  {
    id: "combo",
    etiqueta: "Combo",
    titulo: "Combo del evento",
    detalle: "Parlante, manos libres y cable en un solo pedido, con precio especial para los que vinieron.",
    incluye: ["parlante-impacto", "manos-libres-reencuentro", "cable-nucleo"],
    condicion: "Precio y vigencia a confirmar",
    borrador: true,
  },
  {
    id: "parlantes",
    etiqueta: "Audio",
    titulo: "La familia de parlantes",
    detalle: "Clave, Eco y Óptimo juntos para armar la góndola de audio de tu local.",
    incluye: ["parlante-clave", "parlante-eco", "parlante-optimo"],
    condicion: "Precio y vigencia a confirmar",
    borrador: true,
  },
  {
    id: "carga",
    etiqueta: "Carga",
    titulo: "Kit carga rápida",
    detalle: "Cargador de 45W y cables reforzados: lo que todo cliente pide en el mostrador.",
    incluye: ["cargador-verdad", "cable-nucleo", "cable-pleno"],
    condicion: "Precio y vigencia a confirmar",
    borrador: true,
  },
  {
    id: "primera-compra",
    etiqueta: "Bonus",
    titulo: "Tu primer pedido",
    detalle: "Si es tu primera compra de Mixor con Ximaro, tenés un beneficio extra.",
    incluye: ["smartwatch-pulso"],
    condicion: "Beneficio a confirmar",
    borrador: true,
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
