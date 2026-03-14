import { NextRequest, NextResponse } from "next/server"
import { getMunicipalities } from "@lib/data/locations"

export async function GET(request: NextRequest) {
  const department = request.nextUrl.searchParams.get("department")

  if (!department) {
    return NextResponse.json({ municipalities: [] })
  }

  // Validate slug format: only lowercase letters, numbers, and hyphens
  if (!/^[a-z0-9-]+$/.test(department)) {
    return NextResponse.json({ municipalities: [] }, { status: 400 })
  }

  try {
    const municipalities = await getMunicipalities(department)
    return NextResponse.json({ municipalities })
  } catch {
    return NextResponse.json({ municipalities: [] })
  }
}
