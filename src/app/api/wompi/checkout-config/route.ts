import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Forward auth cookies from the browser request
    const cookieHeader = request.headers.get("cookie") || ""

    const res = await fetch(`${BACKEND_URL}/store/wompi/checkout-config`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": PUBLISHABLE_KEY,
        cookie: cookieHeader,
      },
      body: JSON.stringify({ cart_id: body.cart_id }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error("[Wompi API] Backend error:", res.status, error)
      return NextResponse.json({ error: "Backend error" }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err: any) {
    console.error("[Wompi API] Error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
