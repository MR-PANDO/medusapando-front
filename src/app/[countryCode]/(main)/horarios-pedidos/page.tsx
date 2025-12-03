import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Horarios y Pedidos | Vita Integral",
  description:
    "Conoce nuestras modalidades de atención, horarios de tiendas y despachos, y cómo realizar pedidos en Vita Integral.",
}

const DELIVERY_ZONES = [
  {
    zone: "Medellín y Área Metropolitana",
    description: "Domicilios propios desde Caldas hasta Girardota",
    time: "Mismo día o siguiente día hábil",
    cost: "~$6,000 COP",
  },
  {
    zone: "Oriente Antioqueño",
    description: "El Retiro, Rionegro, La Ceja",
    time: "1-2 días hábiles",
    cost: "Según distancia",
  },
  {
    zone: "Envíos Nacionales",
    description: "Todo el país vía transportadora",
    time: "3-5 días hábiles",
    cost: "Según peso y destino",
  },
]

export default function HorariosPedidosPage() {
  return (
    <div className="content-container py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <LocalizedClientLink href="/" className="hover:text-[#5B8C3E]">
          Inicio
        </LocalizedClientLink>
        <span>/</span>
        <span className="text-gray-800 font-medium">Horarios y Pedidos</span>
      </nav>

      {/* Hero Section */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 bg-[#5B8C3E]/10 text-[#5B8C3E] text-sm font-medium rounded-full mb-4">
          Cómo Comprar
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Horarios y{" "}
          <span className="text-[#5B8C3E]">Modalidades</span>
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Múltiples formas de comprar para tu comodidad: visítanos en tienda,
          compra online o llámanos por teléfono.
        </p>
      </div>

      {/* Ordering Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Physical Store */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
          <div className="w-14 h-14 bg-[#5B8C3E] rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Tiendas Físicas</h3>
          <p className="text-gray-600 mb-4">
            Visita nuestras 3 sedes en Medellín. Espacios cálidos y acogedores
            con asesoría personalizada.
          </p>
          <LocalizedClientLink
            href="/sedes"
            className="inline-flex items-center text-[#5B8C3E] font-medium hover:underline"
          >
            Ver ubicaciones
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </LocalizedClientLink>
        </div>

        {/* Online */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Tienda Online</h3>
          <p className="text-gray-600 mb-4">
            Compra 24/7 desde cualquier lugar. Entrega a domicilio
            o recogida en tienda sin costo adicional.
          </p>
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center text-blue-600 font-medium hover:underline"
          >
            Ir a la tienda
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </LocalizedClientLink>
        </div>

        {/* Phone */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8">
          <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Por Teléfono</h3>
          <p className="text-gray-600 mb-4">
            Llámanos de lunes a sábado de 9am a 4pm para pedidos
            con entrega el mismo día.
          </p>
          <a
            href="tel:+576043228482"
            className="inline-flex items-center text-orange-600 font-medium hover:underline"
          >
            604 322 84 82
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm mb-16">
        <div className="bg-gray-50 p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Horarios de Operación</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Servicio</th>
                <th className="text-left p-4 font-medium text-gray-600">Lun - Sáb</th>
                <th className="text-left p-4 font-medium text-gray-600">Dom y Festivos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">Tiendas Físicas</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">9:00 AM - 7:30 PM</td>
                <td className="p-4 text-gray-600">9:30 AM - 4:00 PM</td>
              </tr>
              <tr>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">Despachos Online</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">9:00 AM - 4:00 PM</td>
                <td className="p-4 text-gray-500 italic">No operan</td>
              </tr>
              <tr>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">Atención Telefónica</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">9:00 AM - 4:00 PM</td>
                <td className="p-4 text-gray-500 italic">No disponible</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Delivery Zones */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Zonas de Entrega
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DELIVERY_ZONES.map((zone) => (
            <div key={zone.zone} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-2">{zone.zone}</h3>
              <p className="text-gray-600 text-sm mb-4">{zone.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Tiempo:</span>
                  <span className="font-medium text-gray-800">{zone.time}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Costo:</span>
                  <span className="font-medium text-[#5B8C3E]">{zone.cost}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-16">
        <h3 className="font-bold text-amber-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Información Importante
        </h3>
        <ul className="space-y-3 text-amber-700 text-sm">
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Pedidos realizados en la mañana pueden despacharse el mismo día por la tarde.
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Pedidos de la tarde se envían al siguiente día hábil según disponibilidad.
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Los envíos nacionales se despachan únicamente de lunes a jueves.
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Algunos productos artesanales tienen disponibilidad limitada.
          </li>
        </ul>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-50 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Métodos de Pago Aceptados
        </h2>
        <p className="text-gray-600 mb-8">
          Aceptamos múltiples formas de pago para tu comodidad
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white rounded-xl px-6 py-4 shadow-sm">
            <span className="font-bold text-gray-800">Efectivo</span>
          </div>
          <div className="bg-white rounded-xl px-6 py-4 shadow-sm">
            <span className="font-bold text-blue-600">Transferencia Bancolombia</span>
          </div>
          <div className="bg-white rounded-xl px-6 py-4 shadow-sm">
            <span className="font-bold text-gray-800">Visa / Mastercard</span>
          </div>
          <div className="bg-white rounded-xl px-6 py-4 shadow-sm">
            <span className="font-bold text-[#E91E63]">Nequi</span>
          </div>
          <div className="bg-white rounded-xl px-6 py-4 shadow-sm">
            <span className="font-bold text-orange-600">Sodexo / Bigpass</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-6">
          Nota: No aceptamos Diners Club
        </p>
      </div>
    </div>
  )
}
