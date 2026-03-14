import { NextRequest, NextResponse } from "next/server"
import { getNeighborhoods } from "@lib/data/locations"

export async function GET(request: NextRequest) {
  const municipality = request.nextUrl.searchParams.get("municipality")

  if (!municipality) {
    return NextResponse.json({ neighborhoods: [] })
  }

  if (!/^[a-z0-9-]+$/.test(municipality)) {
    return NextResponse.json({ neighborhoods: [] }, { status: 400 })
  }

  try {
    const neighborhoods = await getNeighborhoods(municipality)
    return NextResponse.json({ neighborhoods })
  } catch {
    return NextResponse.json({ neighborhoods: [] })
  }
}
