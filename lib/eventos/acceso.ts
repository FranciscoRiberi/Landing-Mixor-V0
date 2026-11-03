import { createHash, timingSafeEqual } from "node:crypto";

/** Compara la clave de la URL contra el SHA-256 guardado, sin exponer la clave en el repo. */
export function claveValida(clave: string, sha256Hex: string): boolean {
  const recibida = createHash("sha256").update(clave).digest();
  const esperada = Buffer.from(sha256Hex, "hex");
  return recibida.length === esperada.length && timingSafeEqual(recibida, esperada);
}
