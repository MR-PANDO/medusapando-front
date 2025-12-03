import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Footer navigation data
const FOOTER_LINKS = {
  empresa: {
    title: "Empresa",
    links: [
      { name: "Quiénes Somos", href: "/quienes-somos" },
      { name: "Misión y Visión", href: "/mision-vision" },
      { name: "Nuestras Sedes", href: "/sedes" },
    ],
  },
  ayuda: {
    title: "Ayuda",
    links: [
      { name: "Servicio al Cliente", href: "/servicio-cliente" },
      { name: "Horarios y Pedidos", href: "/horarios-pedidos" },
      { name: "Preguntas Frecuentes", href: "/servicio-cliente#faq" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Términos y Condiciones", href: "/terminos-condiciones" },
      { name: "Política de Privacidad", href: "/tratamiento-datos" },
      { name: "Habeas Data", href: "/habeas-data" },
    ],
  },
  tienda: {
    title: "Tienda",
    links: [
      { name: "Todos los Productos", href: "/store" },
      { name: "Ofertas", href: "/store?tags=ofertas" },
      { name: "Nuevos", href: "/store?tags=nuevo" },
      { name: "Marcas", href: "/brands" },
      { name: "Recetas", href: "/recetas" },
    ],
  },
}

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/VitaintegralMedellin",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/vitaintegralmedellin",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/573122018760",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
]

export default async function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
      {/* Decorative top border with brand color */}
      <div className="h-1 bg-gradient-to-r from-[#5B8C3E] via-[#7AB356] to-[#5B8C3E]" />

      {/* Main Footer */}
      <div className="content-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <LocalizedClientLink href="/" className="inline-block mb-6">
              <Image
                src="/logo.svg"
                alt="Vita Integral"
                width={180}
                height={50}
              />
            </LocalizedClientLink>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">
              Mercado saludable desde 2012. Ofrecemos una amplia variedad de productos naturales
              que se alinean con las verdaderas necesidades de tu cuerpo a precios justos.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#5B8C3E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#5B8C3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-gray-600 text-sm">
                  Av. Nutibara Trv. 39B 77-40<br />
                  Medellín, Antioquia
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#5B8C3E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#5B8C3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-gray-600 text-sm">604 322 84 82 ext. 4</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#5B8C3E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#5B8C3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:info@vitaintegral.co" className="text-gray-600 text-sm hover:text-[#5B8C3E] transition-colors">
                  info@vitaintegral.co
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center
                             text-gray-500 hover:bg-[#5B8C3E] hover:border-[#5B8C3E] hover:text-white
                             transition-all duration-300 shadow-sm"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-gray-800 font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#5B8C3E] rounded-full" />
              {FOOTER_LINKS.empresa.title}
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.empresa.links.map((link) => (
                <li key={link.name}>
                  <LocalizedClientLink
                    href={link.href}
                    className="text-gray-600 text-sm hover:text-[#5B8C3E] transition-colors"
                  >
                    {link.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-800 font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#5B8C3E] rounded-full" />
              {FOOTER_LINKS.ayuda.title}
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.ayuda.links.map((link) => (
                <li key={link.name}>
                  <LocalizedClientLink
                    href={link.href}
                    className="text-gray-600 text-sm hover:text-[#5B8C3E] transition-colors"
                  >
                    {link.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>

            <h4 className="text-gray-800 font-bold mb-4 mt-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#5B8C3E] rounded-full" />
              {FOOTER_LINKS.legal.title}
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.links.map((link) => (
                <li key={link.name}>
                  <LocalizedClientLink
                    href={link.href}
                    className="text-gray-600 text-sm hover:text-[#5B8C3E] transition-colors"
                  >
                    {link.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-800 font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#5B8C3E] rounded-full" />
              {FOOTER_LINKS.tienda.title}
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.tienda.links.map((link) => (
                <li key={link.name}>
                  <LocalizedClientLink
                    href={link.href}
                    className="text-gray-600 text-sm hover:text-[#5B8C3E] transition-colors"
                  >
                    {link.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>

            {/* Horarios */}
            <div className="mt-8 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <h4 className="text-gray-800 font-bold mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#5B8C3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Horarios
              </h4>
              <div className="text-gray-600 text-sm space-y-1">
                <p className="flex justify-between">
                  <span>Lun - Sáb:</span>
                  <span className="font-medium">9:00 - 19:30</span>
                </p>
                <p className="flex justify-between">
                  <span>Dom y Festivos:</span>
                  <span className="font-medium">9:30 - 16:00</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white/50">
        <div className="content-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2025 Vita Integral SAS. NIT: 900779886. Todos los derechos reservados.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs mr-2">Métodos de pago:</span>
              <div className="flex items-center gap-2">
                <div className="bg-white border border-gray-200 rounded px-2.5 py-1.5 shadow-sm">
                  <span className="text-blue-600 text-xs font-bold">VISA</span>
                </div>
                <div className="bg-white border border-gray-200 rounded px-2.5 py-1.5 shadow-sm">
                  <span className="text-orange-500 text-xs font-bold">MC</span>
                </div>
                <div className="bg-white border border-gray-200 rounded px-2.5 py-1.5 shadow-sm">
                  <span className="text-[#5B8C3E] text-xs font-bold">PSE</span>
                </div>
                <div className="bg-[#E91E63] rounded px-2.5 py-1.5 shadow-sm">
                  <span className="text-white text-xs font-bold">Nequi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
