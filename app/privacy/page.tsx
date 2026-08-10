import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalPage,
  LegalSection,
  LEGAL_EMAIL,
} from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Política de Privacidad | Mixor",
  description:
    "Cómo Mixor recolecta, usa y protege los datos personales de quienes visitan mixor.com.ar o completan sus formularios de contacto y pedido.",
  alternates: { canonical: "https://mixor.com.ar/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Política de Privacidad"
      intro="Esta política explica qué datos recolectamos cuando usás mixor.com.ar, para qué los usamos, con quién los compartimos y cómo podés pedirnos que los corrijamos o los borremos."
    >
      <LegalSection title="1. Quién es responsable de tus datos">
        <p>
          El responsable del tratamiento es <strong>Mixor</strong>, importador
          y distribuidor mayorista de accesorios tecnológicos en Argentina, a
          través del sitio mixor.com.ar.
        </p>
        <p>
          Para cualquier consulta sobre esta política o sobre tus datos podés
          escribirnos a <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> o
          usar el <Link href="/#contacto">formulario de contacto</Link>.
        </p>
      </LegalSection>

      <LegalSection title="2. Qué datos recolectamos">
        <p>
          <strong>Datos que nos das vos.</strong> Cuando completás el
          formulario de contacto o el de pedido te pedimos:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Nombre</li>
          <li>Número de celular</li>
          <li>Provincia</li>
          <li>El asesor de ventas que elegís</li>
          <li>El mensaje o nota que quieras dejarnos</li>
        </ul>
        <p>
          Junto con eso guardamos la fecha y hora del envío y desde qué
          formulario se originó. No pedimos ni almacenamos datos de tarjetas,
          claves ni documentos de identidad: el sitio no procesa pagos.
        </p>
        <p>
          <strong>Datos que se recolectan solos.</strong> Si aceptás las
          cookies de marketing, herramientas de terceros registran datos de
          navegación como páginas visitadas, dispositivo aproximado y origen
          de la visita. El detalle está en la sección 5.
        </p>
      </LegalSection>

      <LegalSection title="3. Para qué los usamos">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Responder tu consulta y contactarte por WhatsApp, teléfono o correo.
          </li>
          <li>Armar y gestionar tu pedido mayorista.</li>
          <li>
            Derivarte al asesor de ventas que elegiste y que pueda darte
            seguimiento.
          </li>
          <li>
            Entender qué productos generan más interés y mejorar el sitio y el
            catálogo.
          </li>
        </ul>
        <p>
          La base para tratar estos datos es tu propio consentimiento al enviar
          el formulario, y el interés legítimo de responder a una consulta
          comercial que iniciaste vos.
        </p>
      </LegalSection>

      <LegalSection title="4. Con quién los compartimos">
        <p>
          No vendemos ni alquilamos tus datos. Los compartimos únicamente con
          los proveedores que necesitamos para que el sitio funcione:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Google (Sheets y Drive):</strong> los envíos de formulario
            se registran en una planilla interna de Mixor.
          </li>
          <li>
            <strong>Resend:</strong> envía a nuestro equipo el aviso por correo
            de cada consulta nueva.
          </li>
          <li>
            <strong>Vercel:</strong> aloja el sitio y provee sus métricas de
            tráfico.
          </li>
          <li>
            <strong>Meta (Facebook e Instagram):</strong> solo si aceptaste las
            cookies de marketing, según la sección 5.
          </li>
          <li>
            <strong>WhatsApp:</strong> al enviar el formulario se abre una
            conversación con el asesor elegido. Lo que escribas ahí se rige por
            las políticas de WhatsApp.
          </li>
        </ul>
        <p>
          Algunos de estos proveedores alojan información fuera de Argentina.
          Al usar el sitio entendés que tus datos pueden tratarse en esos
          servidores.
        </p>
      </LegalSection>

      <LegalSection title="5. Cookies y tecnologías de seguimiento">
        <p>
          Cuando entrás por primera vez te mostramos un cartel con dos
          categorías:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Esenciales:</strong> necesarias para que el sitio funcione y
            para recordar tu propia elección de cookies. No se pueden desactivar
            y no te identifican.
          </li>
          <li>
            <strong>Marketing:</strong> habilitan el píxel de Meta, que permite
            medir el resultado de nuestras campañas en Facebook e Instagram y
            mostrar avisos a públicos similares.
          </li>
        </ul>
        <p>
          <strong>El píxel de Meta no se carga si no lo aceptás.</strong> Solo
          se activa cuando elegís aceptar todas las cookies; si elegís
          &ldquo;Prefiero no&rdquo;, nunca llega a ejecutarse.
        </p>
        <p>
          Tu preferencia queda guardada en el almacenamiento local de tu
          navegador. Para cambiarla, borrá los datos del sitio desde la
          configuración de tu navegador y volvé a entrar: el cartel aparece de
          nuevo.
        </p>
        <p>
          Usamos además Vercel Analytics, que mide el tráfico de forma agregada
          y sin cookies de seguimiento.
        </p>
      </LegalSection>

      <LegalSection title="6. Cuánto tiempo los guardamos">
        <p>
          Conservamos los datos de contacto mientras exista una relación
          comercial o una consulta abierta, y luego el tiempo necesario para
          cumplir obligaciones legales y contables. Si nos pedís que los
          borremos y no hay una obligación que lo impida, los eliminamos.
        </p>
      </LegalSection>

      <LegalSection title="7. Tus derechos">
        <p>
          Según la Ley 25.326 de Protección de los Datos Personales, podés
          pedirnos en cualquier momento acceder a tus datos, corregirlos,
          actualizarlos o suprimirlos. Escribinos a{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> y te respondemos.
        </p>
        <p>
          La Agencia de Acceso a la Información Pública, en su carácter de
          órgano de control de la Ley 25.326, atiende las denuncias y reclamos
          de quienes consideren afectados sus derechos.
        </p>
      </LegalSection>

      <LegalSection title="8. Menores de edad">
        <p>
          Mixor vende exclusivamente a comercios y distribuidores. El sitio no
          está dirigido a menores de 18 años y no recolectamos sus datos a
          sabiendas.
        </p>
      </LegalSection>

      <LegalSection title="9. Cambios en esta política">
        <p>
          Podemos actualizar esta política cuando cambien nuestras prácticas o
          las herramientas que usamos. La fecha de arriba indica la última
          revisión. Si el cambio es sustancial, lo vamos a informar en el sitio.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
