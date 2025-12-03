import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Vita Integral",
  description:
    "Términos y condiciones de uso de la tienda online Vita Integral. Políticas de compra, envío, devoluciones y garantías.",
}

export default function TerminosCondicionesPage() {
  return (
    <div className="content-container py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <LocalizedClientLink href="/" className="hover:text-[#5B8C3E]">
          Inicio
        </LocalizedClientLink>
        <span>/</span>
        <span className="text-gray-800 font-medium">Términos y Condiciones</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Términos y Condiciones
        </h1>
        <p className="text-gray-600">
          Última actualización: Diciembre 2024
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="bg-[#5B8C3E]/5 border-l-4 border-[#5B8C3E] p-6 rounded-r-xl mb-8">
          <p className="text-gray-700 m-0">
            Al utilizar nuestra tienda online y/o realizar compras en Vita Integral SAS
            (NIT: 900779886), aceptas los siguientes términos y condiciones. Te recomendamos
            leerlos detenidamente.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Información General</h2>
          <p className="text-gray-600 leading-relaxed">
            Vita Integral SAS es una empresa colombiana dedicada a la comercialización de
            productos saludables, naturales y orgánicos. Nuestra sede principal está ubicada
            en Av. Nutibara Trv. 39B 77-40, Medellín, Antioquia.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Política de Devoluciones</h2>

          <h3 className="text-xl font-bold text-gray-700 mt-6 mb-3">2.1 Productos Dañados o Vencidos</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Si recibes un producto dañado o vencido, tienes un plazo de <strong>48 horas</strong> desde
            el momento de la recepción del pedido para reportarlo.
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Contacta nuestra línea de atención: 604 322 84 82 extensión 4</li>
            <li>Presenta la factura original del pedido</li>
            <li>El producto debe estar en su empaque original completo</li>
            <li>El cambio será por el mismo artículo o se ofrecerá un saldo a favor</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-700 mt-6 mb-3">2.2 Producto Incorrecto</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Si recibiste un producto diferente al ordenado, tienes <strong>48 horas</strong> para
            reportarlo. Realizaremos el cambio por el producto correcto o el reembolso del
            artículo incorrecto.
          </p>

          <h3 className="text-xl font-bold text-gray-700 mt-6 mb-3">2.3 Derecho de Retracto</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Conforme a la normativa colombiana de protección al consumidor, tienes derecho a
            retractarte de tu compra dentro de los <strong>5 días hábiles</strong> posteriores
            a la recepción del producto, siempre que:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>El producto no haya sido abierto ni consumido</li>
            <li>El producto no sea de uso personal</li>
            <li>Mantenga etiquetas, accesorios y empaques originales</li>
            <li>No presente signos de uso o deterioro</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            <strong>Nota:</strong> El costo del envío de devolución corre por cuenta del cliente.
            No se aceptan devoluciones de productos perecederos.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Política de Envíos</h2>

          <h3 className="text-xl font-bold text-gray-700 mt-6 mb-3">3.1 Envíos Locales</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Realizamos domicilios propios en Medellín y el área metropolitana (desde Caldas
            hasta Girardota) y en algunos municipios del Oriente Antioqueño (El Retiro,
            Rionegro, La Ceja).
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Costo aproximado: $6,000 COP</li>
            <li>Horario de despachos: Lunes a Sábado, 9:00 AM - 4:00 PM</li>
            <li>Pedidos de la mañana pueden entregarse el mismo día</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-700 mt-6 mb-3">3.2 Envíos Nacionales</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Los envíos a nivel nacional se realizan a través de transportadora tercerizada.
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Despachos únicamente de lunes a jueves</li>
            <li>El costo depende del peso, tamaño y destino</li>
            <li>No nos hacemos responsables de productos perecederos que requieran cadena
              de frío si llegan dañados, ya que el transporte es tercerizado</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-700 mt-6 mb-3">3.3 Recogida en Tienda</h3>
          <p className="text-gray-600 leading-relaxed">
            Puedes recoger tu pedido sin costo adicional en cualquiera de nuestras sedes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Responsabilidad en la Entrega</h2>
          <p className="text-gray-600 leading-relaxed">
            Vita Integral no se hace responsable de quién recibe tu pedido. Se considera
            autorizada a cualquier persona presente en la dirección registrada al momento
            de la entrega.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Métodos de Pago</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Aceptamos los siguientes métodos de pago:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Efectivo</li>
            <li>Transferencia Bancolombia</li>
            <li>Tarjetas de débito y crédito (Visa, Mastercard)</li>
            <li>Sodexo y Bigpass</li>
            <li>Nequi</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            <strong>Nota:</strong> No aceptamos Diners Club.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Propiedad Intelectual</h2>
          <p className="text-gray-600 leading-relaxed">
            Todo el contenido del sitio web, incluyendo textos, imágenes, logotipos,
            fotografías, material multimedia y publicitario, pertenece exclusivamente a
            Vita Integral SAS. Su reproducción o distribución requiere autorización escrita.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Modificaciones</h2>
          <p className="text-gray-600 leading-relaxed">
            Vita Integral SAS se reserva el derecho de modificar estos términos y condiciones
            en cualquier momento. Las modificaciones serán efectivas desde su publicación en
            el sitio web.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Contacto</h2>
          <p className="text-gray-600 leading-relaxed">
            Para cualquier consulta o reclamación relacionada con estos términos, puedes
            contactarnos a través de:
          </p>
          <ul className="list-none pl-0 text-gray-600 space-y-2 mt-4">
            <li><strong>Teléfono:</strong> 604 322 84 82, extensión 4</li>
            <li><strong>Email:</strong> info@vitaintegral.co</li>
            <li><strong>Dirección:</strong> Av. Nutibara Trv. 39B 77-40, Medellín, Antioquia</li>
          </ul>
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
            href="/habeas-data"
            className="text-[#5B8C3E] hover:underline"
          >
            Habeas Data
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/servicio-cliente"
            className="text-[#5B8C3E] hover:underline"
          >
            Servicio al Cliente
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
