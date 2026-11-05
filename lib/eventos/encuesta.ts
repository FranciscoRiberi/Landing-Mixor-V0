// Encuesta para bautizar el próximo cable Mixor en el evento de Tucumán.
// Es pública a propósito: su QR sale en pantallas y stream, a diferencia del de la tarjeta.

export type Opcion = { id: string; nombre: string; bajada: string };

export const OPCIONES: Opcion[] = [
  { id: "azucar", nombre: "Azúcar", bajada: "Lo más dulce que sale de esta tierra." },
  { id: "cana", nombre: "Caña", bajada: "Fuerte y flexible, como un buen cable." },
  { id: "casita", nombre: "Casita", bajada: "La más querida de Tucumán, la casa de todos." },
  { id: "jardin", nombre: "Jardín", bajada: "Porque esto es el Jardín de la República." },
  { id: "lapacho", nombre: "Lapacho", bajada: "Madera dura y flor rosa: resiste y se luce." },
  { id: "libre", nombre: "Libre", bajada: "Porque acá se declaró la Independencia." },
  { id: "zafra", nombre: "Zafra", bajada: "La época de más laburo y más energía." },
];

export const ENCUESTA_URL = "mixor.com.ar/elegi";
export const COOKIE_VOTANTE = "mx-elegi";

// El ganador se anuncia al cierre del evento: después no se aceptan más votos.
const CIERRE = new Date("2026-11-12T21:00:00-03:00");
export const votacionAbierta = () => Date.now() < CIERRE.getTime();

export type Resultado = { conteo: Record<string, number>; total: number };
