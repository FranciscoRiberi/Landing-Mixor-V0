import { OPCIONES, type Resultado } from "@/lib/eventos/encuesta";

// Los votos van a Upstash (Redis) por su API REST: un hash de votante → nombre elegido.
// Sin base configurada viven en memoria, que alcanza para probar en local.
const BASE = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const CLAVE = "elegi:votos";

const global = globalThis as { __mxVotos?: Map<string, string> };
const memoria = (global.__mxVotos ??= new Map<string, string>());

async function redis(...comandos: string[][]) {
  const res = await fetch(`${BASE}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(comandos),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Upstash respondió ${res.status}`);
  const filas: { result?: unknown; error?: string }[] = await res.json();
  return filas.map((fila) => {
    if (fila.error) throw new Error(fila.error);
    return fila.result;
  });
}

export async function votoDe(votante: string) {
  if (!BASE) return memoria.get(votante) ?? null;
  const [voto] = await redis(["HGET", CLAVE, votante]);
  return (voto as string | null) ?? null;
}

/** Un voto por celular: si ya votó, queda el primero. */
export async function votar(votante: string, opcion: string) {
  if (BASE) {
    const [, voto] = await redis(["HSETNX", CLAVE, votante, opcion], ["HGET", CLAVE, votante]);
    return voto as string;
  }
  // En Vercel la memoria se pierde: sin base es mejor avisar que perder votos.
  if (process.env.NODE_ENV === "production") throw new Error("Falta conectar la base de votos");
  if (!memoria.has(votante)) memoria.set(votante, opcion);
  return memoria.get(votante)!;
}

export const sinVotos = (): Resultado => ({ conteo: Object.fromEntries(OPCIONES.map((o) => [o.id, 0])), total: 0 });

export async function resultado(): Promise<Resultado> {
  const votos = BASE ? ((await redis(["HVALS", CLAVE]))[0] as string[]) : [...memoria.values()];
  const { conteo } = sinVotos();
  let total = 0;
  for (const opcion of votos) {
    if (opcion in conteo) {
      conteo[opcion] += 1;
      total += 1;
    }
  }
  return { conteo, total };
}
