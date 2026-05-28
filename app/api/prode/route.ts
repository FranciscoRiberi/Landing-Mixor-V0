import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const grupos = [
  { nombre: "Grupo A", equipos: ["México", "Sudáfrica", "Corea del Sur", "Rep. Checa"] },
  { nombre: "Grupo B", equipos: ["Canadá", "Bosnia y Herz.", "Qatar", "Suiza"] },
  { nombre: "Grupo C", equipos: ["Brasil", "Marruecos", "Haití", "Escocia"] },
  { nombre: "Grupo D", equipos: ["Estados Unidos", "Paraguay", "Australia", "Turquía"] },
  { nombre: "Grupo E", equipos: ["Alemania", "Curazao", "Costa de Marfil", "Ecuador"] },
  { nombre: "Grupo F", equipos: ["Países Bajos", "Japón", "Suecia", "Túnez"] },
  { nombre: "Grupo G", equipos: ["Bélgica", "Egipto", "Irán", "Nueva Zelanda"] },
  { nombre: "Grupo H", equipos: ["España", "Cabo Verde", "Arabia Saudita", "Uruguay"] },
  { nombre: "Grupo I", equipos: ["Francia", "Senegal", "Irak", "Noruega"] },
  { nombre: "Grupo J", equipos: ["Argentina", "Argelia", "Austria", "Jordania"] },
  { nombre: "Grupo K", equipos: ["Portugal", "RD Congo", "Uzbekistán", "Colombia"] },
  { nombre: "Grupo L", equipos: ["Inglaterra", "Croacia", "Ghana", "Panamá"] },
];

function buildResultadosHtml(resultados: Record<string, { local: string; visitante: string }>) {
  const partidosPorGrupo = grupos.map((grupo) => {
    const e = grupo.equipos;
    const partidos = [
      [e[0], e[1]],
      [e[0], e[2]],
      [e[1], e[2]],
      [e[0], e[3]],
      [e[1], e[3]],
      [e[2], e[3]],
    ];
    const filas = partidos
      .map(([local, visitante]) => {
        const key = `${local}__${visitante}`;
        const score = resultados[key] || { local: "-", visitante: "-" };
        return `
          <tr>
            <td style="padding:6px 8px;text-align:right;color:#111;">${local}</td>
            <td style="padding:6px 8px;text-align:center;font-weight:700;color:#E24B4A;">${score.local} - ${score.visitante}</td>
            <td style="padding:6px 8px;text-align:left;color:#111;">${visitante}</td>
          </tr>`;
      })
      .join("");
    return `
      <tr><td colspan="3" style="padding:10px 8px 4px;font-weight:700;color:#E24B4A;font-size:13px;border-top:2px solid #E24B4A;">${grupo.nombre}</td></tr>
      ${filas}`;
  });
  return `<table style="width:100%;border-collapse:collapse;font-size:13px;">${partidosPorGrupo.join("")}</table>`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, celular, campeon, subcampeon, resultados } = body;

    if (!nombre || !celular) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    const fecha = new Date().toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Enviar email con Resend
    try {
      const resultadosHtml = buildResultadosHtml(resultados || {});
      await resend.emails.send({
        from: "Mixor Prode <onboarding@resend.dev>",
        to: "mkt@mixor.com.ar",
        subject: `Nuevo prode de ${nombre}`,
        html: `
          <div style="font-family:sans-serif;max-width:620px;margin:0 auto;background:#f9f9f9;padding:32px;border-radius:12px;">
            <div style="background:#E24B4A;padding:20px 24px;border-radius:8px;margin-bottom:24px;text-align:center;">
              <h1 style="color:white;margin:0;font-size:22px;">Nuevo Prode — Mundial 2026</h1>
              <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:13px;">Mixor Argentina</p>
            </div>
            <div style="background:white;padding:20px 24px;border-radius:8px;border:1px solid #eee;margin-bottom:16px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr style="border-bottom:1px solid #f0f0f0;">
                  <td style="padding:10px 0;color:#888;font-size:13px;width:140px;">Nombre</td>
                  <td style="padding:10px 0;font-weight:600;color:#111;">${nombre}</td>
                </tr>
                <tr style="border-bottom:1px solid #f0f0f0;">
                  <td style="padding:10px 0;color:#888;font-size:13px;">Celular</td>
                  <td style="padding:10px 0;font-weight:600;color:#111;">${celular}</td>
                </tr>
                <tr style="border-bottom:1px solid #f0f0f0;">
                  <td style="padding:10px 0;color:#888;font-size:13px;">Campeon</td>
                  <td style="padding:10px 0;font-weight:600;color:#E24B4A;">${campeon || "Sin elegir"}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#888;font-size:13px;">Subcampeon</td>
                  <td style="padding:10px 0;font-weight:600;color:#E24B4A;">${subcampeon || "Sin elegir"}</td>
                </tr>
              </table>
            </div>
            <div style="background:white;padding:20px 24px;border-radius:8px;border:1px solid #eee;">
              <h2 style="margin:0 0 12px;font-size:15px;color:#111;">Resultados por grupo</h2>
              ${resultadosHtml}
            </div>
            <p style="margin-top:20px;font-size:12px;color:#aaa;text-align:center;">
              Prode enviado el ${fecha} desde mixor.com.ar/prode
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Error enviando email prode:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error procesando prode:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
