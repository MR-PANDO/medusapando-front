import { Metadata } from "next"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import foundersImage from "../../../../assets/fundadores.jpg"

export const metadata: Metadata = {
  title: "Quiénes Somos | Vita Integral",
  description:
    "Conoce la historia de Vita Integral, un mercado saludable fundado en 2012 en Medellín por Carlos y Patricia, pioneros en alimentación consciente en Colombia.",
}

export default function QuienesSomosPage() {
  return (
    <div className="content-container py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <LocalizedClientLink href="/" className="hover:text-[#5B8C3E]">
          Inicio
        </LocalizedClientLink>
        <span>/</span>
        <span className="text-gray-800 font-medium">Quiénes Somos</span>
      </nav>

      {/* Hero Section with Founders Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <span className="inline-block px-4 py-1 bg-[#5B8C3E]/10 text-[#5B8C3E] text-sm font-medium rounded-full mb-4">
            Nuestra Historia
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Más de <span className="text-[#5B8C3E]">40 años</span> de pasión
            por la alimentación saludable
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Una historia de amor por la vida, la salud y el bienestar que comenzó
            mucho antes de que existiera Vita Integral.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-12 h-12 bg-[#5B8C3E] rounded-full flex items-center justify-center text-white font-bold border-2 border-white">
                C
              </div>
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white">
                P
              </div>
            </div>
            <div>
              <p className="font-bold text-gray-800">Carlos y Patricia</p>
              <p className="text-sm text-gray-500">Fundadores de Vita Integral</p>
            </div>
          </div>
        </div>

        {/* Founders Image */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={foundersImage}
              alt="Carlos y Patricia, fundadores de Vita Integral"
              width={595}
              height={744}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#5B8C3E]/20 rounded-2xl -z-10" />
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-200/30 rounded-full -z-10" />

          {/* Badge */}
          <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg">
            <p className="text-sm text-gray-500">Desde</p>
            <p className="text-2xl font-bold text-[#5B8C3E]">2012</p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-4xl mx-auto mb-16">
        {/* The Beginning */}
        <div className="relative pl-8 pb-12 border-l-2 border-[#5B8C3E]/30">
          <div className="absolute left-0 top-0 w-4 h-4 bg-[#5B8C3E] rounded-full -translate-x-[9px]"></div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
            <span className="text-[#5B8C3E] font-bold text-sm">Los Inicios</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">
              Carlos y Patricia: Pioneros de lo Natural
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Carlos y Patricia, fundadores de esta hermosa empresa, llevan más de{" "}
              <strong>40 años trabajando en el medio de alimentación saludable</strong>.
              Iniciaron con tiendas naturistas en Medellín durante una época cuando
              muy pocas personas buscaban estas alternativas alimenticias.
            </p>
          </div>
        </div>

        {/* International Experience */}
        <div className="relative pl-8 pb-12 border-l-2 border-[#5B8C3E]/30">
          <div className="absolute left-0 top-0 w-4 h-4 bg-[#5B8C3E] rounded-full -translate-x-[9px]"></div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <span className="text-[#5B8C3E] font-bold text-sm">Experiencia Internacional</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">
              Aprendiendo del Mundo
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Después de vivir en el extranjero y conocer diferentes culturas alimentarias,
              los fundadores retornaron a Medellín con una visión clara: crear un espacio
              donde las personas pudieran encontrar todo lo que necesitan para una vida saludable.
            </p>
          </div>
        </div>

        {/* Birth of Vita Integral */}
        <div className="relative pl-8 pb-12 border-l-2 border-[#5B8C3E]/30">
          <div className="absolute left-0 top-0 w-4 h-4 bg-[#5B8C3E] rounded-full -translate-x-[9px]"></div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8">
            <span className="text-orange-600 font-bold text-sm">5 de Junio de 2012</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">
              Nace Vita Integral
            </h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>Vita Integral</strong>, un mercado saludable pionero en Colombia,
              abrió sus puertas con la misión de ofrecer una alta variedad de productos
              saludables a precios justos en un solo lugar.
            </p>
          </div>
        </div>

        {/* Challenges */}
        <div className="relative pl-8 pb-12 border-l-2 border-[#5B8C3E]/30">
          <div className="absolute left-0 top-0 w-4 h-4 bg-[#5B8C3E] rounded-full -translate-x-[9px]"></div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <span className="text-[#5B8C3E] font-bold text-sm">Los Desafíos</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">
              Construyendo un Ecosistema
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Al principio enfrentamos dificultades por la falta de proveedores locales.
              Tuvimos que importar productos o traerlos desde Bogotá mientras desarrollábamos
              relaciones con emprendedores locales que compartían nuestra visión.
            </p>
          </div>
        </div>

        {/* Today */}
        <div className="relative pl-8">
          <div className="absolute left-0 top-0 w-4 h-4 bg-[#5B8C3E] rounded-full -translate-x-[9px]"></div>
          <div className="bg-gradient-to-br from-[#5B8C3E]/10 to-emerald-50 rounded-2xl p-8">
            <span className="text-[#5B8C3E] font-bold text-sm">Hoy</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">
              Un Legado que Crece
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Hoy contamos con múltiples sedes en Medellín y el área metropolitana,
              y hemos ayudado a posicionar proveedores locales a nivel nacional e internacional.
              Nuestra tienda evolucionó para ofrecer una alta variedad de productos saludables
              a precios justos en un solo lugar.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-4xl font-bold text-[#5B8C3E] mb-2">40+</div>
          <div className="text-gray-600 text-sm">Años de Experiencia</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-4xl font-bold text-[#5B8C3E] mb-2">2012</div>
          <div className="text-gray-600 text-sm">Año de Fundación</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-4xl font-bold text-[#5B8C3E] mb-2">3</div>
          <div className="text-gray-600 text-sm">Sedes en Medellín</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-4xl font-bold text-[#5B8C3E] mb-2">500+</div>
          <div className="text-gray-600 text-sm">Productos Disponibles</div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#5B8C3E] to-emerald-600 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Sé parte de nuestra historia
        </h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Visita nuestras tiendas y descubre por qué miles de familias confían en
          Vita Integral para su alimentación saludable.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#5B8C3E] rounded-full
                       font-medium text-sm hover:bg-gray-100 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Explorar Productos
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/sedes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-full
                       font-medium text-sm hover:bg-white/30 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Ver Nuestras Sedes
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
