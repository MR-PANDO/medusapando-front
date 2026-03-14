import { getWishlist } from "@lib/data/wishlist"
import { getRegion } from "@lib/data/regions"
import WishlistTemplate from "@modules/account/templates/wishlist-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Favoritos",
  description: "Tu lista de productos favoritos",
}

type Props = {
  params: Promise<{ countryCode: string }>
}

export default async function WishlistPage({ params }: Props) {
  const { countryCode } = await params
  const wishlist = await getWishlist()
  const region = await getRegion(countryCode)

  return <WishlistTemplate wishlist={wishlist} region={region!} />
}
