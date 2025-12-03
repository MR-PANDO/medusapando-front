import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Política Habeas Data | Vita Integral",
  description:
    "Política de Habeas Data de Vita Integral SAS conforme a la Ley 1581 de 2012. Conoce tus derechos sobre el tratamiento de tus datos personales.",
}

export default function HabeasDataPage() {
  return (
    <div className="content-container py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <LocalizedClientLink href="/" className="hover:text-[#5B8C3E]">
          Inicio
        </LocalizedClientLink>
        <span>/</span>
        <span className="text-gray-800 font-medium">Habeas Data</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Política de Habeas Data
        </h1>
        <p className="text-gray-600">
          Conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="bg-[#5B8C3E]/5 border-l-4 border-[#5B8C3E] p-6 rounded-r-xl mb-8">
          <p className="text-gray-700 m-0">
            El derecho de Habeas Data es un derecho fundamental que te permite conocer,
            actualizar y rectificar la información que sobre ti se haya recogido en bases
            de datos. Vita Integral SAS garantiza el ejercicio pleno de este derecho.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Información del Responsable</h2>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-600 m-0">
              <strong>Razón Social:</strong> Vita Integral SAS<br />
              <strong>NIT:</strong> 900779886<br />
              <strong>Dirección:</strong> Av. Nutibara Trv. 39B 77-40, Medellín, Antioquia, Colombia<br />
              <strong>Email para Habeas Data:</strong> vitaintegral1@gmail.com<br />
              <strong>Teléfono:</strong> 604 322 84 82
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Finalidades del Tratamiento</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Vita Integral SAS recopila y trata datos personales para las siguientes finalidades:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800">Gestión de Pedidos</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Nombre, dirección, teléfono, email y número de identificación para procesar y entregar tu pedido.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800">Procesamiento de Pagos</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Datos bancarios únicamente para procesar reembolsos cuando corresponda.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800">Marketing y Comunicaciones</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Promociones, eventos, programas de fidelización y concursos (con tu consentimiento).
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800">Análisis y Mejora</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Comprender preferencias de clientes y mejorar nuestros servicios.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Tus Derechos como Titular</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Como titular de los datos personales, tienes los siguientes derechos:
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-[#5B8C3E] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">1</div>
              <div>
                <h3 className="font-bold text-gray-800">Derecho de Acceso</h3>
                <p className="text-gray-600 text-sm">Conocer qué datos personales tenemos sobre ti y cómo los estamos utilizando.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-[#5B8C3E] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">2</div>
              <div>
                <h3 className="font-bold text-gray-800">Derecho de Actualización y Rectificación</h3>
                <p className="text-gray-600 text-sm">Solicitar la corrección de datos incompletos, inexactos o desactualizados.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-[#5B8C3E] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">3</div>
              <div>
                <h3 className="font-bold text-gray-800">Derecho de Supresión</h3>
                <p className="text-gray-600 text-sm">Solicitar la eliminación de tus datos cuando no exista deber legal o contractual de conservarlos.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-[#5B8C3E] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">4</div>
              <div>
                <h3 className="font-bold text-gray-800">Derecho de Revocación</h3>
                <p className="text-gray-600 text-sm">Revocar la autorización otorgada para el tratamiento de tus datos personales.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-[#5B8C3E] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">5</div>
              <div>
                <h3 className="font-bold text-gray-800">Derecho de Queja</h3>
                <p className="text-gray-600 text-sm">Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Cómo Ejercer tus Derechos</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Para ejercer cualquiera de tus derechos, envía una solicitud escrita a:
          </p>
          <div className="bg-[#5B8C3E]/10 rounded-xl p-6">
            <p className="text-gray-700 m-0">
              <strong>Email:</strong> vitaintegral1@gmail.com<br /><br />
              <strong>Tu solicitud debe incluir:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-4 space-y-1">
              <li>Nombre completo</li>
              <li>Número de identificación (cédula o NIT)</li>
              <li>Datos de contacto (teléfono y correo electrónico)</li>
              <li>Descripción clara de la solicitud y los datos sobre los que deseas actuar</li>
              <li>Documentos que soporten la solicitud (si aplica)</li>
            </ul>
          </div>
          <p className="text-gray-600 leading-relaxed mt-4">
            Responderemos tu solicitud en un plazo máximo de <strong>10 días hábiles</strong>
            contados a partir de la fecha de recepción.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Obligaciones de Vita Integral</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Como responsable del tratamiento, nos comprometemos a:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Solicitar y conservar autorización expresa antes de recopilar datos personales</li>
            <li>Informar claramente la finalidad del tratamiento de datos</li>
            <li>Garantizar la seguridad de la información</li>
            <li>Actualizar la información cuando sea solicitado</li>
            <li>Rectificar datos incorrectos</li>
            <li>Respetar las solicitudes de supresión cuando procedan</li>
            <li>Permitir el acceso a los datos cuando sea solicitado</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Vigencia y Modificaciones</h2>
          <p className="text-gray-600 leading-relaxed">
            Esta política entra en vigencia a partir de su publicación y permanecerá vigente
            mientras Vita Integral SAS continúe sus operaciones. Nos reservamos el derecho
            de modificar esta política, notificándote cualquier cambio significativo.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Autoridad de Vigilancia</h2>
          <p className="text-gray-600 leading-relaxed">
            La Superintendencia de Industria y Comercio (SIC) es la autoridad competente
            para vigilar el cumplimiento de la legislación en materia de protección de
            datos personales en Colombia.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 mt-4">
            <p className="text-gray-600 m-0">
              <strong>Superintendencia de Industria y Comercio</strong><br />
              Página web: www.sic.gov.co<br />
              Línea de atención: 018000 910165
            </p>
          </div>
        </section>
      </div>

      {/* Related Links */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="font-bold text-gray-800 mb-4">Documentos Relacionados</h3>
        <div className="flex flex-wrap gap-4">
          <LocalizedClientLink
            href="/tratamiento-datos"
            className="text-[#5B8C3E] hover:underline"
          >
            Política de Tratamiento de Datos
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
