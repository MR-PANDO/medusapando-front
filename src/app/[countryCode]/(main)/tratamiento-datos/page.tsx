import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Política de Tratamiento de Datos | Vita Integral",
  description:
    "Conoce cómo Vita Integral recopila, usa y protege tus datos personales conforme a la Ley 1581 de 2012.",
}

export default function TratamientoDatosPage() {
  return (
    <div className="content-container py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <LocalizedClientLink href="/" className="hover:text-[#5B8C3E]">
          Inicio
        </LocalizedClientLink>
        <span>/</span>
        <span className="text-gray-800 font-medium">Política de Privacidad</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Política de Tratamiento de Datos Personales
        </h1>
        <p className="text-gray-600">
          Última actualización: Diciembre 2024
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="bg-[#5B8C3E]/5 border-l-4 border-[#5B8C3E] p-6 rounded-r-xl mb-8">
          <p className="text-gray-700 m-0">
            Esta política describe cómo Vita Integral SAS (NIT: 900779886) recopila, utiliza,
            almacena y protege tus datos personales, en cumplimiento de la Ley 1581 de 2012
            y sus decretos reglamentarios.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Responsable del Tratamiento</h2>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-600 m-0">
              <strong>Razón Social:</strong> Vita Integral SAS<br />
              <strong>NIT:</strong> 900779886<br />
              <strong>Dirección:</strong> Av. Nutibara Trv. 39B 77-40, Medellín, Antioquia<br />
              <strong>Email:</strong> info@vitaintegral.co<br />
              <strong>Teléfono:</strong> 604 322 84 82
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Datos que Recopilamos</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Recopilamos los siguientes tipos de datos personales:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><strong>Datos de identificación:</strong> Nombre completo, número de identificación (cédula o NIT)</li>
            <li><strong>Datos de contacto:</strong> Dirección, teléfono, correo electrónico</li>
            <li><strong>Datos de pago:</strong> Información de tarjetas o cuentas bancarias (para reembolsos)</li>
            <li><strong>Datos de navegación:</strong> Cookies, historial de compras, preferencias</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Finalidades del Tratamiento</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Utilizamos tus datos personales para:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Procesar y entregar tus pedidos</li>
            <li>Procesar pagos y reembolsos</li>
            <li>Crear y mantener tu cuenta de cliente</li>
            <li>Enviarte información sobre promociones, eventos y novedades (con tu consentimiento)</li>
            <li>Mejorar nuestros servicios y experiencia de compra</li>
            <li>Realizar análisis estadísticos y de mercado</li>
            <li>Cumplir con obligaciones legales y contractuales</li>
            <li>Gestionar programas de fidelización y concursos</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Uso de Cookies</h2>
          <p className="text-gray-600 leading-relaxed">
            Nuestro sitio web utiliza cookies para reconocer a los visitantes y mantener
            información entre sesiones de navegación. Esto nos permite personalizar tu
            experiencia y evitar que pierdas información durante la navegación.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Enlaces a Terceros</h2>
          <p className="text-gray-600 leading-relaxed">
            Nuestro sitio puede contener enlaces a páginas de terceros. Una vez que hagas
            clic en estos enlaces y salgas de nuestra página, dejamos de tener control sobre
            el sitio al que te rediriges. No somos responsables de los términos, privacidad
            o protección de datos de sitios externos. Te recomendamos revisar las políticas
            de privacidad de cualquier sitio que visites.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Compartir Datos con Terceros</h2>
          <p className="text-gray-600 leading-relaxed">
            Podemos compartir tus datos personales con terceros y organizaciones aliadas
            únicamente cuando sea necesario para cumplir con las finalidades descritas,
            excepto cuando la ley lo prohíba o cuando hayas revocado tu consentimiento.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Seguridad de los Datos</h2>
          <p className="text-gray-600 leading-relaxed">
            Implementamos medidas de seguridad técnicas, administrativas y físicas para
            proteger tus datos personales contra acceso no autorizado, alteración, divulgación
            o destrucción. Sin embargo, ningún método de transmisión por Internet es 100%
            seguro.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Derechos del Titular</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Como titular de los datos, tienes derecho a:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Conocer, actualizar y rectificar tus datos personales</li>
            <li>Solicitar la eliminación de tus datos cuando no exista obligación legal de conservarlos</li>
            <li>Revocar la autorización para el tratamiento de datos</li>
            <li>Acceder gratuitamente a tus datos personales</li>
            <li>Presentar quejas ante la Superintendencia de Industria y Comercio</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Ejercicio de Derechos</h2>
          <p className="text-gray-600 leading-relaxed">
            Para ejercer tus derechos, puedes contactarnos a través de:
          </p>
          <div className="bg-gray-50 rounded-xl p-6 mt-4">
            <p className="text-gray-600 m-0">
              <strong>Email:</strong> vitaintegral1@gmail.com<br />
              <strong>Teléfono:</strong> 604 322 84 82 ext. 4<br />
              <strong>Dirección:</strong> Av. Nutibara Trv. 39B 77-40, Medellín
            </p>
          </div>
          <p className="text-gray-600 leading-relaxed mt-4">
            Tu solicitud debe incluir: nombre completo, datos de contacto, documento de
            identidad y descripción clara de la solicitud.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Modificaciones a esta Política</h2>
          <p className="text-gray-600 leading-relaxed">
            Vita Integral SAS se reserva el derecho de modificar esta política de privacidad
            en cualquier momento. Los cambios serán publicados en nuestro sitio web y, cuando
            sea significativo, te lo notificaremos por correo electrónico.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Marco Legal</h2>
          <p className="text-gray-600 leading-relaxed">
            Esta política se rige por la Ley 1581 de 2012 (Ley de Protección de Datos Personales)
            y sus decretos reglamentarios, especialmente el Decreto 1377 de 2013.
          </p>
        </section>
      </div>

      {/* Related Links */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="font-bold text-gray-800 mb-4">Documentos Relacionados</h3>
        <div className="flex flex-wrap gap-4">
          <LocalizedClientLink
            href="/habeas-data"
            className="text-[#5B8C3E] hover:underline"
          >
            Política de Habeas Data
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/terminos-condiciones"
            className="text-[#5B8C3E] hover:underline"
          >
            Términos y Condiciones
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
