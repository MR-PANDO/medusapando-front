import { NextResponse } from "next/server"
import { getDepartments } from "@lib/data/locations"

export async function GET() {
  try {
    const departments = await getDepartments()
    return NextResponse.json({ departments })
  } catch {
    return NextResponse.json({ departments: [] })
  }
}
