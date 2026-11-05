import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_VOTANTE, OPCIONES, votacionAbierta } from "@/lib/eventos/encuesta";
import { resultado, votar } from "@/lib/eventos/encuesta-votos";

export const dynamic = "force-dynamic";

// Todos los celulares y las pantallas consultan seguido: el CDN responde y la base se lee cada 3 segundos.
export async function GET() {
  try {
    return NextResponse.json(await resultado(), {
      headers: { "Cache-Control": "no-store", "Vercel-CDN-Cache-Control": "max-age=3" },
    });
  } catch (error) {
    console.error("Encuesta:", error);
    return NextResponse.json({ error: "No se pudo leer el resultado." }, { status: 503 });
  }
}

export async function POST(req: Request) {
  if (!votacionAbierta()) return NextResponse.json({ error: "La votación cerró." }, { status: 403 });

  const body = await req.json().catch(() => null);
  const opcion = OPCIONES.find((o) => o.id === body?.opcion);
  if (!opcion) return NextResponse.json({ error: "Ese nombre no está en la encuesta." }, { status: 400 });

  const votante = (await cookies()).get(COOKIE_VOTANTE)?.value ?? randomUUID();
  try {
    const voto = await votar(votante, opcion.id);
    const res = NextResponse.json({ voto, resultado: await resultado() });
    res.cookies.set(COOKIE_VOTANTE, votante, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 60,
      path: "/",
    });
    return res;
  } catch (error) {
    console.error("Encuesta:", error);
    return NextResponse.json({ error: "No se pudo guardar el voto." }, { status: 503 });
  }
}
