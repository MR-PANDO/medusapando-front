import { pick } from "lodash"

const COMPARE_FIELDS = [
  "first_name",
  "last_name",
  "address_1",
  "company",
  "city",
  "country_code",
  "province",
  "phone",
]

export default function compareAddresses(address1: any, address2: any) {
  if (!address1 || !address2) return false

  const a1 = pick(address1, COMPARE_FIELDS)
  const a2 = pick(address2, COMPARE_FIELDS)

  // Normalize null/undefined/"" to "" for consistent comparison
  for (const field of COMPARE_FIELDS) {
    a1[field] = a1[field] || ""
    a2[field] = a2[field] || ""
  }

  return COMPARE_FIELDS.every((field) => a1[field] === a2[field])
}
