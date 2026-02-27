import { SeoMetadata } from "@lib/data/seo"

type SeoHeadProps = {
  seo: SeoMetadata | null
}

const SeoHead = ({ seo }: SeoHeadProps) => {
  if (!seo) return null

  const scripts: { type: string; data: Record<string, any> }[] = []

  // Custom structured data
  if (
    seo.structured_data_json &&
    typeof seo.structured_data_json === "object" &&
    Object.keys(seo.structured_data_json).length > 0
  ) {
    scripts.push({
      type: seo.structured_data_type || "Thing",
      data: seo.structured_data_json,
    })
  }

  // FAQPage from aeo_faqs
  if (seo.aeo_faqs && seo.aeo_faqs.length > 0) {
    scripts.push({
      type: "FAQPage",
      data: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: seo.aeo_faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    })
  }

  // HowTo from aeo_howto_steps
  if (seo.aeo_howto_steps && seo.aeo_howto_steps.length > 0) {
    scripts.push({
      type: "HowTo",
      data: {
        "@context": "https://schema.org",
        "@type": "HowTo",
        step: seo.aeo_howto_steps.map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
          ...(step.image ? { image: step.image } : {}),
        })),
      },
    })
  }

  if (scripts.length === 0) return null

  return (
    <>
      {scripts.map((script, idx) => (
        <script
          key={`seo-jsonld-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(script.data),
          }}
        />
      ))}
    </>
  )
}

export default SeoHead
