import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Nuestras Sedes | Vita Integral",
  description:
    "Encuentra la sede Vita Integral más cercana a ti. Tiendas en Laureles, Poblado y Envigado. Horarios, teléfonos y direcciones.",
}

const SEDES = [
  {
    name: "Vita Integral Laureles",
    area: "Laureles",
    address: "Av. Nutibara Trv. 39B 77-40",
    reference: "Entre La Avenida Jardín y La Consolata",
    city: "Medellín, Antioquia",
    phone: "302 279 8531",
    phoneLink: "573022798531",
    extension: "Ext. 1",
    features: [
      "Sede principal",
      "Panadería artesanal",
      "Gran variedad vegana",
      "Asesoría nutricional",
    ],
    lat: 6.247709459721946,
    lng: -75.59736040892075,
    color: "emerald",
  },
  {
    name: "Vita Integral Poblado",
    area: "El Poblado",
    address: "Carrera 42 #5 Sur 43",
    reference: "Cerca a la Milla de Oro",
    city: "Medellín, Antioquia",
    phone: "300 200 4516",
    phoneLink: "573002004516",
    extension: "Ext. 2",
    features: [
      "Amplia variedad",
      "Productos importados",
      "Suplementos deportivos",
      "Productos orgánicos",
    ],
    lat: 6.2086,
    lng: -75.5659,
    color: "orange",
  },
  {
    name: "Vita Integral Envigado",
    area: "Envigado",
    address: "Carrera 27 #36 Sur 199 LC 103",
    reference: "Centro de Envigado",
    city: "Envigado, Antioquia",
    phone: "324 443 0201",
    phoneLink: "573244430201",
    extension: "Ext. 3",
    features: [
      "Tofu fresco",
      "Papel de arroz",
      "Quesos artesanales",
      "Chocolate oscuro",
    ],
    lat: 6.1710,
    lng: -75.5831,
    color: "pink",
  },
]

export default function SedesPage() {
  return (
    <div className="content-container py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <LocalizedClientLink href="/" className="hover:text-[#5B8C3E]">
          Inicio
        </LocalizedClientLink>
        <span>/</span>
        <span className="text-gray-800 font-medium">Nuestras Sedes</span>
      </nav>

      {/* Hero Section */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 bg-[#5B8C3E]/10 text-[#5B8C3E] text-sm font-medium rounded-full mb-4">
          Encuéntranos
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Nuestras <span className="text-[#5B8C3E]">Sedes</span>
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Visítanos en cualquiera de nuestras tiendas en Medellín y el área metropolitana.
          Espacios cálidos y acogedores con asesoría personalizada para orientar tus decisiones alimentarias.
        </p>
      </div>

      {/* Main Contact */}
      <div className="bg-gradient-to-r from-[#5B8C3E] to-emerald-600 rounded-3xl p-8 md:p-10 text-white mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-white/70 text-sm">Línea Única</p>
              <p className="text-xl font-bold">604 322 84 82</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-white/70 text-sm">Email</p>
              <p className="text-xl font-bold">info@vitaintegral.co</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-white/70 text-sm">Horario</p>
              <p className="text-xl font-bold">Lun-Sáb 9:00-19:30</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sedes with Maps */}
      <div className="space-y-12 mb-16">
        {SEDES.map((sede, index) => (
          <div
            key={sede.name}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Info Card */}
            <div
              className={`order-2 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
            >
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm h-full">
                {/* Header */}
                <div
                  className={`p-6 ${
                    sede.color === "emerald"
                      ? "bg-gradient-to-br from-emerald-500 to-teal-600"
                      : sede.color === "orange"
                      ? "bg-gradient-to-br from-orange-500 to-amber-600"
                      : "bg-gradient-to-br from-pink-500 to-rose-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{sede.name}</h3>
                      <p className="text-white/80 text-sm">{sede.area}</p>
                    </div>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium">
                      {sede.extension}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Address */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">{sede.address}</p>
                      <p className="text-gray-500 text-sm">{sede.reference}</p>
                      <p className="text-gray-500 text-sm">{sede.city}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#25D366]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <a
                      href={`https://wa.me/${sede.phoneLink}`}
                      className="text-[#5B8C3E] font-medium hover:underline text-lg"
                    >
                      {sede.phone}
                    </a>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {sede.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-[#5B8C3E] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <a
                      href={`https://wa.me/${sede.phoneLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-xl text-sm font-medium hover:bg-[#20bd5a] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${sede.lat},${sede.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#5B8C3E] text-white rounded-xl text-sm font-medium hover:bg-[#4A7A2E] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Cómo Llegar
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div
              className={`order-1 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg h-full min-h-[350px]">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${sede.lng}!3d${sede.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTQnNTEuOCJOIDc1wrAzNSc1MC41Ilc!5e0!3m2!1ses!2sco!4v1701000000000!5m2!1ses!2sco`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "350px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa ${sede.name}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Section */}
      <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Horarios de Atención</h2>
          <p className="text-gray-600">Aplica para todas las sedes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-[#5B8C3E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#5B8C3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Lunes a Sábado</h3>
            <p className="text-2xl font-bold text-[#5B8C3E]">9:00 AM - 7:30 PM</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Domingos y Festivos</h3>
            <p className="text-2xl font-bold text-orange-600">9:30 AM - 4:00 PM</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ¿Prefieres comprar desde casa?
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Nuestra tienda online está disponible 24/7 con entrega a domicilio
          en Medellín, área metropolitana y envíos nacionales.
        </p>
        <LocalizedClientLink
          href="/store"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#5B8C3E] text-white rounded-full
                     font-medium hover:bg-[#4A7A2E] transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Comprar Online
        </LocalizedClientLink>
      </div>
    </div>
  )
}
