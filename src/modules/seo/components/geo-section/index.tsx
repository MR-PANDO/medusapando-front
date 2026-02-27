import { SeoMetadata } from "@lib/data/seo"

type GeoSectionProps = {
  seo: SeoMetadata | null
}

const GeoSection = ({ seo }: GeoSectionProps) => {
  if (!seo) return null

  const hasContent =
    seo.geo_entity_summary ||
    (seo.geo_key_attributes && seo.geo_key_attributes.length > 0) ||
    (seo.geo_citations && seo.geo_citations.length > 0)

  if (!hasContent) return null

  return (
    <section className="py-8">
      {/* Entity Summary */}
      {seo.geo_entity_summary && (
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            {seo.geo_entity_summary}
          </p>
        </div>
      )}

      {/* Key Attributes */}
      {seo.geo_key_attributes && seo.geo_key_attributes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">
            Atributos Principales
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {seo.geo_key_attributes.map((attr, idx) => (
              <div key={idx} className="flex gap-x-2">
                <dt className="font-medium text-gray-900">
                  {attr.attribute}:
                </dt>
                <dd className="text-gray-600">{attr.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Citations */}
      {seo.geo_citations && seo.geo_citations.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Fuentes</h3>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {seo.geo_citations.map((cit, idx) => (
              <li key={idx}>
                <a
                  href={cit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {cit.source}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default GeoSection
