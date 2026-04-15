import { Resend } from "resend";
import { NextResponse } from "next/server";
import { google } from "googleapis";

const resend = new Resend(process.env.RESEND_API_KEY);

const SPREADSHEET_ID = "1TAvREsH3Hr4YsKq04xwevafKTVAAJYCTJctOrZsfPQI";
const SHEET_NAME = "Leads Mixor";

async function appendToSheet(values: string[]) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}"),
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
    ],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:G`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, celular, provincia, asesor, mensaje, formulario, recaptchaToken } = body;

    if (!nombre || !provincia || !asesor) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA v3 token
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: "POST" }
    );
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return NextResponse.json(
        { error: "Verificación de seguridad fallida" },
        { status: 400 }
      );
    }

    const fecha = new Date().toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Guardar en Google Sheets (falla silenciosamente si hay error)
    try {
      await appendToSheet([
        fecha,
        nombre,
        celular || "No proporcionado",
        provincia,
        asesor,
        mensaje || "Sin mensaje",
        formulario || "Formulario Contacto",
      ]);
    } catch (sheetError) {
      console.error("Error guardando en Sheet:", sheetError);
    }

    // Enviar email con Resend
    await resend.emails.send({
      from: "Mixor Leads <onboarding@resend.dev>",
      to: "mkt@mixor.com.ar",
      subject: `Nuevo lead de ${nombre} — ${provincia}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 32px; border-radius: 12px;">
          <div style="background: #E24B4A; padding: 20px 24px; border-radius: 8px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Nuevo Lead — Mixor</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 13px;">Formulario: ${formulario || "Contacto"}</p>
          </div>
          <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #eee;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 0; color: #888; font-size: 13px; width: 140px;">Nombre</td>
                <td style="padding: 12px 0; font-weight: 600; color: #111;">${nombre}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 0; color: #888; font-size: 13px; width: 140px;">Celular</td>
                <td style="padding: 12px 0; font-weight: 600; color: #111;">${celular || "No proporcionado"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 0; color: #888; font-size: 13px;">Provincia</td>
                <td style="padding: 12px 0; font-weight: 600; color: #111;">${provincia}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 0; color: #888; font-size: 13px;">Asesor elegido</td>
                <td style="padding: 12px 0; font-weight: 600; color: #111;">${asesor}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #888; font-size: 13px;">Mensaje</td>
                <td style="padding: 12px 0; color: #111;">${mensaje || "Sin mensaje adicional"}</td>
              </tr>
            </table>
          </div>
          <div style="margin-top: 20px; padding: 16px; background: #fff8f8; border-radius: 8px; border-left: 3px solid #E24B4A;">
            <p style="margin: 0; font-size: 13px; color: #666;">Fecha: ${fecha}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #aaa; text-align: center;">
            Este lead fue generado automáticamente desde mixor.com.ar
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error enviando lead:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
