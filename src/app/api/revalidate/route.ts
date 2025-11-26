import { revalidateTag, revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const tags = request.nextUrl.searchParams.get("tags")

  if (!tags) {
    return NextResponse.json(
      { message: "Missing tags parameter" },
      { status: 400 }
    )
  }

  try {
    const tagArray = tags.split(",")

    for (const tag of tagArray) {
      switch (tag.trim()) {
        case "products":
          // Revalidate all product-related pages
          revalidatePath("/[countryCode]/(main)/products/[handle]", "page")
          revalidatePath("/[countryCode]/(main)/store", "page")
          revalidatePath("/[countryCode]/(main)/categories/[...category]", "page")
          revalidatePath("/[countryCode]/(main)/collections/[handle]", "page")
          revalidateTag("products")
          break
        case "collections":
          revalidatePath("/[countryCode]/(main)/collections/[handle]", "page")
          revalidateTag("collections")
          break
        case "categories":
          revalidatePath("/[countryCode]/(main)/categories/[...category]", "page")
          revalidateTag("categories")
          break
        case "cart":
          revalidateTag("cart")
          break
        default:
          // Revalidate specific tag
          revalidateTag(tag.trim())
      }
    }

    return NextResponse.json({
      revalidated: true,
      tags: tagArray,
      now: Date.now(),
    })
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json(
      { message: "Error revalidating", error: String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Also support POST for webhook-style calls
  return GET(request)
}
