import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalPage,
  LegalSection,
  LEGAL_EMAIL,
} from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Mixor",
  description:
    "Condiciones de uso de mixor.com.ar: alcance del catálogo mayorista, precios, kits cerrados, pedidos, garantía y propiedad intelectual.",
  alternates: { canonical: "https://mixor.com.ar/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Términos y Condiciones"
      intro="Estas condiciones regulan el uso del sitio mixor.com.ar. Al navegarlo o al enviarnos una consulta, aceptás lo que sigue."
    >
      <LegalSection title="1. Qué es este sitio">
        <p>
          mixor.com.ar es el sitio institucional y catálogo de{" "}
          <strong>Mixor</strong>, importador y distribuidor mayorista de
          accesorios tecnológicos en Argentina.
        </p>
        <p>
          <strong>Es un catálogo, no una tienda online.</strong> No se puede
          comprar ni pagar desde el sitio. Los formularios sirven para iniciar
          una conversación con un asesor de ventas; toda operación se cierra
          después, por fuera del sitio.
        </p>
      </LegalSection>

      <LegalSection title="2. Venta exclusivamente mayorista">
        <p>
          Vendemos a comercios, revendedores y distribuidores. Los productos se
          comercializan en <strong>kits cerrados</strong>, cuya cantidad de
          unidades se indica en cada ficha. No vendemos al público minorista ni
          por unidad.
        </p>
      </LegalSection>

      <LegalSection title="3. Precios">
        <p>
          El sitio no publica precios: cada ficha indica{" "}
          <strong>&ldquo;Consultar&rdquo;</strong>. Los valores se informan por
          el canal de contacto, son mayoristas, están sujetos a modificación sin
          aviso previo y no constituyen una oferta vinculante hasta que se
          confirme el pedido.
        </p>
      </LegalSection>

      <LegalSection title="4. Información de los productos">
        <p>
          Trabajamos para que las especificaciones, imágenes y descripciones
          sean exactas. Aun así, las fotos son ilustrativas y pueden existir
          diferencias de color, packaging o detalles de terminación entre lo
          publicado y el producto recibido, así como cambios introducidos por el
          fabricante.
        </p>
        <p>
          La disponibilidad de stock que se muestre en el sitio es orientativa y
          se confirma al momento de tomar el pedido.
        </p>
      </LegalSection>

      <LegalSection title="5. Pedidos">
        <p>
          Enviar un formulario no genera una compra ni reserva stock. Un asesor
          se contacta para confirmar disponibilidad, precios, forma de pago y
          envío. El pedido queda cerrado recién cuando ambas partes lo
          confirman por el canal acordado.
        </p>
      </LegalSection>

      <LegalSection title="6. Garantía">
        <p>
          Los productos cuentan con la garantía legal por defectos de
          fabricación que corresponda según la normativa vigente y las
          condiciones acordadas en cada operación. Quedan excluidos los daños
          por mal uso, golpes, humedad, manipulación por terceros o desgaste
          normal.
        </p>
        <p>
          Para gestionar una garantía, contactá al asesor con el que hiciste la
          operación o escribinos a{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
        </p>
      </LegalSection>

      <LegalSection title="7. Uso del sitio">
        <p>Al usar mixor.com.ar te comprometés a no:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Cargar datos falsos o de terceros sin su autorización.</li>
          <li>
            Extraer el catálogo de forma automatizada para reproducirlo o
            revenderlo como propio.
          </li>
          <li>
            Intentar vulnerar la seguridad del sitio o interferir con su
            funcionamiento.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Propiedad intelectual">
        <p>
          La marca Mixor, el logo, los textos, las fotografías de producto y el
          diseño del sitio son de titularidad de Mixor o se usan con
          autorización. Nuestros clientes pueden usar las imágenes y fichas para
          revender los productos adquiridos; queda prohibido cualquier otro uso
          sin permiso escrito.
        </p>
      </LegalSection>

      <LegalSection title="9. Enlaces y servicios de terceros">
        <p>
          El sitio enlaza a Instagram, TikTok, Facebook y WhatsApp. No
          controlamos esas plataformas ni respondemos por sus contenidos o
          políticas.
        </p>
      </LegalSection>

      <LegalSection title="10. Limitación de responsabilidad">
        <p>
          El sitio se ofrece tal como está. No garantizamos que esté disponible
          de forma ininterrumpida ni libre de errores, y no respondemos por
          daños derivados de su uso o de la imposibilidad de usarlo. Nada de
          esto limita las responsabilidades que la ley no permite excluir.
        </p>
      </LegalSection>

      <LegalSection title="11. Privacidad">
        <p>
          El tratamiento de los datos personales que nos dejes se rige por
          nuestra <Link href="/privacy">Política de Privacidad</Link>.
        </p>
      </LegalSection>

      <LegalSection title="12. Cambios y ley aplicable">
        <p>
          Podemos modificar estas condiciones en cualquier momento; la versión
          publicada es la que rige, y la fecha de arriba indica la última
          revisión.
        </p>
        <p>
          Estas condiciones se rigen por las leyes de la República Argentina.
          Cualquier controversia se somete a los tribunales ordinarios que
          correspondan según la normativa aplicable.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
