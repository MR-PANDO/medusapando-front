import { SeoMetadata } from "@lib/data/seo"

type SxoIntentLayoutProps = {
  seo: SeoMetadata | null
}

function isSafeHref(url: string): boolean {
  try {
    const parsed = new URL(url, "https://placeholder.com")
    return ["http:", "https:"].includes(parsed.protocol)
  } catch {
    return url.startsWith("/")
  }
}

const SxoIntentLayout = ({ seo }: SxoIntentLayoutProps) => {
  if (!seo) return null

  const links = Array.isArray(seo.sxo_internal_links)
    ? seo.sxo_internal_links
    : []
  const hasCta = !!seo.sxo_cta_text
  const hasLinks = links.length > 0

  if (!hasCta && !hasLinks) return null

  return (
    <section className="py-8">
      {/* CTA Block */}
      {hasCta && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
          <a
            href="#product-actions"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            {seo.sxo_cta_text}
          </a>
        </div>
      )}

      {/* Internal Links */}
      {hasLinks && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Tambien te puede interesar
          </h3>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {links
              .filter((link) => link.target_url && isSafeHref(link.target_url))
              .map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.target_url}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {link.anchor_text}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default SxoIntentLayout
