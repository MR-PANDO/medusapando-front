import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Servicio al Cliente | Vita Integral",
  description:
    "Centro de ayuda Vita Integral. Políticas de devolución, cambios, derecho de retracto y toda la información que necesitas para una excelente experiencia de compra.",
}

const FAQ_ITEMS = [
  {
    question: "¿Cuál es el tiempo de entrega en Medellín?",
    answer: "Los pedidos realizados antes de las 12:00 PM pueden ser entregados el mismo día. Los pedidos de la tarde se despachan al siguiente día hábil. El costo de domicilio en Medellín y área metropolitana es aproximadamente $6,000 COP.",
  },
  {
    question: "¿Hacen envíos a nivel nacional?",
    answer: "Sí, realizamos envíos a todo el país a través de transportadora. Los despachos nacionales se realizan de lunes a jueves únicamente. El costo depende del peso, tamaño y destino del pedido.",
  },
  {
    question: "¿Puedo recoger mi pedido en tienda?",
    answer: "Sí, puedes elegir la opción de recogida en tienda al realizar tu pedido. No tiene costo adicional y puedes recogerlo en cualquiera de nuestras sedes.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos efectivo, transferencia Bancolombia, y tarjetas de débito/crédito (Visa, Mastercard). También aceptamos Sodexo y Bigpass. No aceptamos Diners Club.",
  },
  {
    question: "¿Qué hago si recibo un producto dañado?",
    answer: "Tienes 48 horas desde la recepción del pedido para reportar productos dañados o vencidos. Contáctanos con tu factura y fotos del producto. Realizaremos el cambio o te daremos un saldo a favor.",
  },
  {
    question: "¿Tienen productos refrigerados?",
    answer: "Sí, manejamos productos que requieren cadena de frío. Para envíos nacionales, ten en cuenta que el transporte es tercerizado y no nos hacemos responsables si los productos perecederos llegan en mal estado.",
  },
]

export default function ServicioClientePage() {
  return (
    <div className="content-container py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <LocalizedClientLink href="/" className="hover:text-[#5B8C3E]">
          Inicio
        </LocalizedClientLink>
        <span>/</span>
        <span className="text-gray-800 font-medium">Servicio al Cliente</span>
      </nav>

      {/* Hero Section */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 bg-[#5B8C3E]/10 text-[#5B8C3E] text-sm font-medium rounded-full mb-4">
          Centro de Ayuda
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          ¿En qué podemos{" "}
          <span className="text-[#5B8C3E]">ayudarte</span>?
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Estamos aquí para brindarte la mejor experiencia. Encuentra respuestas
          a tus preguntas o contáctanos directamente.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <a
          href="tel:+576043228482"
          className="bg-gradient-to-br from-[#5B8C3E]/10 to-emerald-50 rounded-2xl p-8 text-center
                     hover:shadow-lg transition-all duration-300 group"
        >
          <div className="w-16 h-16 bg-[#5B8C3E] rounded-2xl flex items-center justify-center mx-auto mb-4
                          group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Llámanos</h3>
          <p className="text-[#5B8C3E] font-bold text-lg mb-1">604 322 84 82</p>
          <p className="text-gray-500 text-sm">Extensión 4 - Administrativo</p>
          <p className="text-gray-500 text-sm">Lun - Sáb: 9am - 4pm</p>
        </a>

        <a
          href="https://wa.me/573122018760"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center
                     hover:shadow-lg transition-all duration-300 group"
        >
          <div className="w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center mx-auto mb-4
                          group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">WhatsApp</h3>
          <p className="text-[#25D366] font-bold text-lg mb-1">312 201 8760</p>
          <p className="text-gray-500 text-sm">Respuesta rápida</p>
          <p className="text-gray-500 text-sm">Lun - Sáb: 9am - 4pm</p>
        </a>

        <a
          href="mailto:info@vitaintegral.co"
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center
                     hover:shadow-lg transition-all duration-300 group"
        >
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4
                          group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
          <p className="text-blue-600 font-bold text-lg mb-1">info@vitaintegral.co</p>
          <p className="text-gray-500 text-sm">Respuesta en 24-48 horas</p>
        </a>
      </div>

      {/* Policies Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Políticas de Devolución y Cambios
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Damaged Products */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Productos Dañados o Vencidos</h3>
            <p className="text-gray-600 text-sm mb-4">
              Tienes <strong>48 horas</strong> desde la recepción para reportar productos
              en mal estado.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#5B8C3E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Requiere factura original
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#5B8C3E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Empaque original completo
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#5B8C3E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Cambio por mismo producto o saldo a favor
              </li>
            </ul>
          </div>

          {/* Wrong Item */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Producto Incorrecto</h3>
            <p className="text-gray-600 text-sm mb-4">
              Si recibiste un producto diferente al ordenado, tienes <strong>48 horas</strong> para reportarlo.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#5B8C3E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Cambio por el producto correcto
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#5B8C3E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Reembolso del producto incorrecto
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#5B8C3E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Sin costo adicional para ti
              </li>
            </ul>
          </div>

          {/* Right of Retraction */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Derecho de Retracto</h3>
            <p className="text-gray-600 text-sm mb-4">
              Conforme a la ley colombiana, tienes <strong>5 días hábiles</strong> para retractarte de tu compra.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#5B8C3E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Producto sin abrir ni usar
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#5B8C3E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Empaque y etiquetas originales
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                No aplica para perecederos
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16" id="faq">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Preguntas Frecuentes
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <details
              key={index}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden group"
            >
              <summary className="p-6 cursor-pointer flex items-center justify-between font-medium text-gray-800 hover:bg-gray-50">
                {item.question}
                <svg
                  className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          ¿No encontraste lo que buscabas?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Nuestro equipo de servicio al cliente está listo para ayudarte
          con cualquier duda o inquietud.
        </p>
        <a
          href="https://wa.me/573122018760"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-full
                     font-medium hover:bg-[#20bd5a] transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Escríbenos por WhatsApp
        </a>
      </div>
    </div>
  )
}
