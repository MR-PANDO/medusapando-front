import { NextRequest, NextResponse } from "next/server"

const CRON_SECRET = process.env.CRON_SECRET || process.env.REVALIDATE_SECRET || ""

/**
 * This route is a proxy to the Medusa backend recipe generator.
 * All recipes are stored in PostgreSQL via the backend.
 * No Minio fallback - PostgreSQL is the single source of truth.
 */

async function generateRecipesViaBackend(secret: string): Promise<{ success: boolean; data?: any; error?: string }> {
  const backendUrl = process.env.MEDUSA_BACKEND_URL || "https://api.nutrimercados.com"

  try {
    console.log(`Calling backend: ${backendUrl}/admin/recipes/generate`)

    const response = await fetch(`${backendUrl}/admin/recipes/generate?secret=${secret}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Backend error: ${response.status} - ${errorText}`)
      return {
        success: false,
        error: `Backend returned ${response.status}: ${errorText}`
      }
    }

    const data = await response.json()
    console.log(`Backend generated ${data.count || 0} recipes`)

    return { success: true, data }
  } catch (error) {
    console.error("Failed to call backend:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const headerSecret = authHeader?.replace("Bearer ", "")
    const querySecret = request.nextUrl.searchParams.get("secret")
    const providedSecret = headerSecret || querySecret

    if (providedSecret !== CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Generate recipes via Medusa backend (saves to PostgreSQL)
    const result = await generateRecipesViaBackend(providedSecret)

    if (result.success) {
      return NextResponse.json({
        success: true,
        count: result.data?.count || 0,
        generatedAt: result.data?.generatedAt || new Date().toISOString(),
        source: "postgresql",
      })
    }

    return NextResponse.json({
      success: false,
      error: result.error || "Failed to generate recipes",
      source: "postgresql",
    }, { status: 500 })

  } catch (error) {
    console.error("Error in generate-daily route:", error)
    return NextResponse.json(
      { error: "Error generating recipes" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // GET just calls POST for compatibility with cron jobs
  return POST(request)
}
