import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ countryCode: string; id: string }> }
) {
  const { countryCode, id } = await params

  if (id) {
    const cookieStore = await cookies()
    cookieStore.set("_medusa_cart_id", id, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
  }

  return NextResponse.redirect(
    new URL(`/${countryCode}/cart`, request.url)
  )
}
