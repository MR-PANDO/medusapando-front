import { sdk } from "@lib/config"
import { NextRequest, NextResponse } from "next/server"
import { cookies as nextCookies } from "next/headers"

const STOREFRONT_URL =
  process.env.NEXT_PUBLIC_STOREFRONT_URL || "http://localhost:8000"
const DEFAULT_COUNTRY = process.env.NEXT_PUBLIC_DEFAULT_REGION || "co"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params
  const searchParams = Object.fromEntries(request.nextUrl.searchParams)

  try {
    // Exchange OAuth code for Medusa JWT token
    const token = await sdk.auth.callback("customer", provider, searchParams)

    if (!token || typeof token !== "string") {
      return NextResponse.redirect(
        `${STOREFRONT_URL}/${DEFAULT_COUNTRY}/account?auth_error=token`
      )
    }

    // Set the auth token cookie
    const cookies = await nextCookies()
    cookies.set("_medusa_jwt", token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })

    // Decode JWT to check if customer exists (actor_id will be empty for new users)
    const [, payload] = token.split(".")
    const decoded = JSON.parse(
      Buffer.from(payload, "base64").toString("utf-8")
    )

    if (!decoded.actor_id) {
      // New user — create customer profile
      // The auth_identity entity_id may be an email or a provider-prefixed ID
      const entityId: string = decoded.auth_identity_id || ""
      const email = entityId.includes("@")
        ? entityId
        : `${provider}_${Date.now()}@social.placeholder`

      const headers = { authorization: `Bearer ${token}` }

      await sdk.store.customer.create(
        { email, first_name: "", last_name: "" },
        {},
        headers
      )
    }

    return NextResponse.redirect(
      `${STOREFRONT_URL}/${DEFAULT_COUNTRY}/account`
    )
  } catch (error: any) {
    console.error(`OAuth callback error for ${provider}:`, error)
    return NextResponse.redirect(
      `${STOREFRONT_URL}/${DEFAULT_COUNTRY}/account?auth_error=${encodeURIComponent(provider)}`
    )
  }
}
