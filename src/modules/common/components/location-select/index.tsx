"use client"

import { useEffect, useState, useTransition } from "react"
import { useTranslations } from "next-intl"

type LocationItem = { id: string; name: string; slug: string }
type NeighborhoodItem = {
  id: string
  name: string
  slug: string
  shipping_price: number
  municipality_id: string
}

type LocationSelectProps = {
  /** Current province/department value (slug) */
  provinceValue?: string
  /** Current city value */
  cityValue?: string
  /** Current neighborhood id */
  neighborhoodValue?: string
  /** Name attribute prefix (e.g., "" or "shipping_address.") */
  namePrefix?: string
  /** Called when province changes */
  onProvinceChange?: (slug: string, name: string) => void
  /** Called when city changes */
  onCityChange?: (name: string) => void
  /** Called when neighborhood changes */
  onNeighborhoodChange?: (id: string, name: string, price: number) => void
  /** Whether the fields are required */
  required?: boolean
}

// Municipalities in the Area Metropolitana de Medellín that have neighborhoods
const METRO_MUNICIPALITY_SLUGS = new Set([
  "medellin",
  "bello",
  "copacabana",
  "girardota",
  "envigado",
  "sabaneta",
  "itagui",
  "la-estrella",
  "caldas",
])

export default function LocationSelect({
  provinceValue = "",
  cityValue = "",
  neighborhoodValue = "",
  namePrefix = "",
  onProvinceChange,
  onCityChange,
  onNeighborhoodChange,
  required = false,
}: LocationSelectProps) {
  const t = useTranslations("account")
  const [departments, setDepartments] = useState<LocationItem[]>([])
  const [municipalities, setMunicipalities] = useState<LocationItem[]>([])
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodItem[]>([])
  const [selectedDept, setSelectedDept] = useState(provinceValue)
  const [selectedCity, setSelectedCity] = useState(cityValue)
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(neighborhoodValue)
  const [isPending, startTransition] = useTransition()
  const [isLoadingNeighborhoods, setIsLoadingNeighborhoods] = useState(false)

  // Track the current municipality slug for neighborhood lookup
  const [currentMunicipalitySlug, setCurrentMunicipalitySlug] = useState("")

  // Check if current municipality has neighborhoods
  const hasNeighborhoods = METRO_MUNICIPALITY_SLUGS.has(currentMunicipalitySlug)

  // Load departments on mount
  useEffect(() => {
    fetch("/api/locations/departments")
      .then((r) => r.json())
      .then((data) => setDepartments(data.departments || []))
      .catch(() => {})
  }, [])

  // Load municipalities when department changes
  useEffect(() => {
    if (!selectedDept) {
      setMunicipalities([])
      setNeighborhoods([])
      setCurrentMunicipalitySlug("")
      return
    }

    startTransition(async () => {
      try {
        const res = await fetch(
          `/api/locations/municipalities?department=${encodeURIComponent(selectedDept)}`
        )
        const data = await res.json()
        const munis = data.municipalities || []
        setMunicipalities(munis)

        // Auto-select if there's only one municipality (e.g., Bogotá D.C.)
        if (munis.length === 1) {
          setSelectedCity(munis[0].name)
          setCurrentMunicipalitySlug(munis[0].slug)
          onCityChange?.(munis[0].name)
        } else if (selectedCity) {
          // Restore municipality slug from saved city name (e.g., saved address)
          const match = munis.find((m: any) => m.name === selectedCity)
          if (match) {
            setCurrentMunicipalitySlug(match.slug)
          }
        }
      } catch {
        setMunicipalities([])
      }
    })
  }, [selectedDept])

  // Load neighborhoods when municipality changes (if metro area)
  useEffect(() => {
    if (!currentMunicipalitySlug || !METRO_MUNICIPALITY_SLUGS.has(currentMunicipalitySlug)) {
      setNeighborhoods([])
      return
    }

    setIsLoadingNeighborhoods(true)
    fetch(
      `/api/locations/neighborhoods?municipality=${encodeURIComponent(currentMunicipalitySlug)}`
    )
      .then((r) => r.json())
      .then((data) => {
        const hoods = data.neighborhoods || []
        setNeighborhoods(hoods)
        // Auto-select if there's only one neighborhood
        if (hoods.length === 1) {
          setSelectedNeighborhood(hoods[0].id)
          onNeighborhoodChange?.(hoods[0].id, hoods[0].name, hoods[0].shipping_price)
        }
      })
      .catch(() => setNeighborhoods([]))
      .finally(() => setIsLoadingNeighborhoods(false))
  }, [currentMunicipalitySlug])

  // Sync external value changes
  useEffect(() => {
    if (provinceValue !== selectedDept) {
      setSelectedDept(provinceValue)
    }
  }, [provinceValue])

  useEffect(() => {
    if (cityValue !== selectedCity) {
      setSelectedCity(cityValue)
    }
  }, [cityValue])

  useEffect(() => {
    if (neighborhoodValue !== selectedNeighborhood) {
      setSelectedNeighborhood(neighborhoodValue)
    }
  }, [neighborhoodValue])

  const handleDeptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value
    const dept = departments.find((d) => d.slug === slug)
    setSelectedDept(slug)
    setSelectedCity("")
    setSelectedNeighborhood("")
    setCurrentMunicipalitySlug("")
    setNeighborhoods([])
    onProvinceChange?.(slug, dept?.name || "")
    onCityChange?.("")
    onNeighborhoodChange?.("", "", 0)
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value
    const muni = municipalities.find((m) => m.name === name)
    setSelectedCity(name)
    setSelectedNeighborhood("")
    setCurrentMunicipalitySlug(muni?.slug || "")
    onCityChange?.(name)
    onNeighborhoodChange?.("", "", 0)
  }

  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    const hood = neighborhoods.find((n) => n.id === id)
    setSelectedNeighborhood(id)
    onNeighborhoodChange?.(id, hood?.name || "", hood?.shipping_price || 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <>
      {/* Department select */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          {t("province")}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <select
          name={`${namePrefix}province`}
          value={selectedDept}
          onChange={handleDeptChange}
          required={required}
          className="h-10 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
        >
          <option value="">{t("selectDepartment")}</option>
          {departments.map((d) => (
            <option key={d.id} value={d.slug}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* City/Municipality select */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          {t("city")}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <select
          name={`${namePrefix}city`}
          value={selectedCity}
          onChange={handleCityChange}
          required={required}
          disabled={!selectedDept || isPending}
          className="h-10 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white disabled:bg-gray-50 disabled:text-gray-400"
        >
          <option value="">
            {isPending ? t("loading") : t("selectCity")}
          </option>
          {municipalities.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* Neighborhood select — only for metro area municipalities */}
      {hasNeighborhoods && (
        <div className="flex flex-col col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1">
            {t("neighborhood")}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
          <select
            value={selectedNeighborhood}
            onChange={handleNeighborhoodChange}
            required={required}
            disabled={isLoadingNeighborhoods || neighborhoods.length === 0}
            className="h-10 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">
              {isLoadingNeighborhoods ? t("loading") : t("selectNeighborhood")}
            </option>
            {neighborhoods.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name} — {formatPrice(n.shipping_price)}
              </option>
            ))}
          </select>
          {/* Hidden inputs: neighborhood name goes to address_2, ID for shipping calc */}
          <input type="hidden" name={`${namePrefix}address_2`} value={neighborhoods.find(n => n.id === selectedNeighborhood)?.name || ""} />
          <input type="hidden" name={`${namePrefix}neighborhood_id`} value={selectedNeighborhood} />
        </div>
      )}
    </>
  )
}
