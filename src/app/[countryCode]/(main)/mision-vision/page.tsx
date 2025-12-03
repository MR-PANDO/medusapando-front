import { Metadata } from "next"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import misionVisionImage from "@/assets/mision-vision.jpg"

export const metadata: Metadata = {
  title: "Misión y Visión | Vita Integral",
  description:
    "Conoce la misión, visión y valores de Vita Integral. Coherencia, consciencia y servir con amor son los pilares de nuestro mercado saludable.",
}

const VALUES = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Coherencia",
    description:
      "Mantenemos consistencia entre nuestra filosofía y acciones cotidianas. Lo que decimos es lo que hacemos.",
    color: "emerald",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Consciencia",
    description:
      "Promovemos la armonía integral del ser humano (cuerpo, mente, espíritu) y el respeto por el medio ambiente.",
    color: "orange",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Servir con Amor",
    description:
      "Cultivamos espacios acogedores donde acompañamos la evolución de nuestros clientes mediante opciones nutricionales saludables.",
    color: "pink",
  },
]

const PRINCIPLES = [
  {
    title: "Evaluación Rigurosa",
    description: "Evaluamos cuidadosamente a nuestros proveedores, considerando ingredientes, información nutricional y procesos productivos.",
  },
  {
    title: "Prácticas Agroecológicas",
    description: "Priorizamos productos de proveedores que siguen prácticas agroecológicas y sostenibles.",
  },
  {
    title: "Productos Funcionales",
    description: "Seleccionamos productos que aportan beneficios reales a la salud y el bienestar.",
  },
  {
    title: "Responsabilidad Ambiental",
    description: "Favorecemos presentaciones y empaques ambientalmente responsables.",
  },
]

export default function MisionVisionPage() {
  return (
    <div className="content-container py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <LocalizedClientLink href="/" className="hover:text-[#5B8C3E]">
          Inicio
        </LocalizedClientLink>
        <span>/</span>
        <span className="text-gray-800 font-medium">Misión y Visión</span>
      </nav>

      {/* Hero Section with Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        {/* Image */}
        <div className="relative order-2 lg:order-1">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={misionVisionImage}
              alt="Equipo Vita Integral"
              width={595}
              height={744}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#5B8C3E]/30 to-transparent" />
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-200/30 rounded-2xl -z-10" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#5B8C3E]/20 rounded-full -z-10" />
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <span className="inline-block px-4 py-1 bg-[#5B8C3E]/10 text-[#5B8C3E] text-sm font-medium rounded-full mb-4">
            Nuestro Propósito
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Misión, Visión y{" "}
            <span className="text-[#5B8C3E]">Valores</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Nuestro compromiso va más allá de vender productos. Queremos ser parte
            de tu camino hacia una vida más saludable y consciente.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-[#5B8C3E]">40+</p>
              <p className="text-xs text-gray-500">Años de experiencia</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-[#5B8C3E]">3</p>
              <p className="text-xs text-gray-500">Sedes</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-[#5B8C3E]">500+</p>
              <p className="text-xs text-gray-500">Productos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Mission */}
        <div className="bg-gradient-to-br from-[#5B8C3E]/10 to-emerald-50 rounded-3xl p-8 md:p-10">
          <div className="w-16 h-16 bg-[#5B8C3E] rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Misión</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Ofrecer a nuestros clientes una{" "}
            <strong>amplia variedad de alimentos naturales</strong> que se alineen
            con las verdaderas necesidades de tu cuerpo,{" "}
            <strong>a precios justos</strong>.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 md:p-10">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Visión</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Que en tu despensa y nevera{" "}
            <strong>siempre hayan productos saludables de Vita Integral</strong>,
            siendo parte fundamental de tu estilo de vida consciente.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Nuestros Valores
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Los principios que guían cada decisión y acción en Vita Integral.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  value.color === "emerald"
                    ? "bg-emerald-100 text-emerald-600"
                    : value.color === "orange"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-pink-100 text-pink-600"
                }`}
              >
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How We Create Value */}
      <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Cómo Creamos Valor
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestro proceso de selección garantiza que cada producto en nuestras
            estanterías cumpla con los más altos estándares de calidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRINCIPLES.map((principle, index) => (
            <div key={principle.title} className="flex items-start gap-4 bg-white rounded-xl p-5">
              <div className="w-10 h-10 bg-[#5B8C3E] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                {index + 1}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">{principle.title}</h3>
                <p className="text-gray-600 text-sm">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#5B8C3E] to-emerald-600 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          ¿Compartes nuestros valores?
        </h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Únete a la comunidad de personas que eligen alimentarse de manera
          consciente y responsable.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#5B8C3E] rounded-full
                       font-medium text-sm hover:bg-gray-100 transition-all duration-300"
          >
            Explorar Productos
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/quienes-somos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-full
                       font-medium text-sm hover:bg-white/30 transition-all duration-300"
          >
            Conocer Nuestra Historia
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
