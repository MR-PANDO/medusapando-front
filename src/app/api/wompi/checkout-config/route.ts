import { NextRequest, NextResponse } from "next/server"
import { sdk } from "@lib/config"
import { getAuthHeaders } from "@lib/data/cookies"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const headers = await getAuthHeaders()

    const result = await sdk.client.fetch<any>(
      "/store/wompi/checkout-config",
      {
        method: "POST",
        body: { cart_id: body.cart_id },
        headers,
      }
    )

    return NextResponse.json(result)
  } catch (err: any) {
    console.error("[Wompi API] checkout-config error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
