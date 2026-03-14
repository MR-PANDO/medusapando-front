"use client"

import { useEffect, useState, useTransition } from "react"
import { useTranslations } from "next-intl"

type LocationItem = { id: string; name: string; slug: string }

type LocationSelectProps = {
  /** Current province/department value (slug) */
  provinceValue?: string
  /** Current city value */
  cityValue?: string
  /** Name attribute prefix (e.g., "" or "shipping_address.") */
  namePrefix?: string
  /** Called when province changes */
  onProvinceChange?: (slug: string, name: string) => void
  /** Called when city changes */
  onCityChange?: (name: string) => void
  /** Whether the fields are required */
  required?: boolean
}

export default function LocationSelect({
  provinceValue = "",
  cityValue = "",
  namePrefix = "",
  onProvinceChange,
  onCityChange,
  required = false,
}: LocationSelectProps) {
  const t = useTranslations("account")
  const [departments, setDepartments] = useState<LocationItem[]>([])
  const [municipalities, setMunicipalities] = useState<LocationItem[]>([])
  const [selectedDept, setSelectedDept] = useState(provinceValue)
  const [selectedCity, setSelectedCity] = useState(cityValue)
  const [isPending, startTransition] = useTransition()

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
      return
    }

    startTransition(async () => {
      try {
        const res = await fetch(`/api/locations/municipalities?department=${encodeURIComponent(selectedDept)}`)
        const data = await res.json()
        const munis = data.municipalities || []
        setMunicipalities(munis)

        // Auto-select if there's only one municipality (e.g., Bogotá D.C.)
        if (munis.length === 1) {
          setSelectedCity(munis[0].name)
          onCityChange?.(munis[0].name)
        }
      } catch {
        setMunicipalities([])
      }
    })
  }, [selectedDept])

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

  const handleDeptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value
    const dept = departments.find((d) => d.slug === slug)
    setSelectedDept(slug)
    setSelectedCity("")
    onProvinceChange?.(slug, dept?.name || "")
    onCityChange?.("")
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value
    setSelectedCity(name)
    onCityChange?.(name)
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
    </>
  )
}
