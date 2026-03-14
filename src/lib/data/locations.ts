"use server"

import { sdk } from "@lib/config"

type Department = { id: string; name: string; slug: string }
type Municipality = { id: string; name: string; slug: string; department_id: string }
type Neighborhood = { id: string; name: string; slug: string; shipping_price: number; municipality_id: string }

let cachedDepartments: Department[] | null = null

export async function getDepartments(): Promise<Department[]> {
  if (cachedDepartments) return cachedDepartments

  const { departments } = await sdk.client.fetch<{ departments: Department[] }>(
    "/store/locations",
    { method: "GET", cache: "force-cache" }
  )

  cachedDepartments = departments
  return departments
}

export async function getMunicipalities(departmentSlug: string): Promise<Municipality[]> {
  if (!departmentSlug || !/^[a-z0-9-]+$/.test(departmentSlug)) return []

  const { municipalities } = await sdk.client.fetch<{ municipalities: Municipality[] }>(
    "/store/locations",
    {
      method: "GET",
      query: { department: departmentSlug },
      cache: "force-cache",
    }
  )

  return municipalities
}

export async function getNeighborhoods(municipalitySlug: string): Promise<Neighborhood[]> {
  if (!municipalitySlug || !/^[a-z0-9-]+$/.test(municipalitySlug)) return []

  const { neighborhoods } = await sdk.client.fetch<{ neighborhoods: Neighborhood[] }>(
    "/store/locations/neighborhoods",
    {
      method: "GET",
      query: { municipality: municipalitySlug },
      cache: "force-cache",
    }
  )

  return neighborhoods
}
