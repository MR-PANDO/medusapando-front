import { setCartId } from "@lib/data/cookies"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{ countryCode: string; id: string }>
}

export default async function CartRecoverPage(props: Props) {
  const { countryCode, id } = await props.params

  if (id) {
    await setCartId(id)
  }

  redirect(`/${countryCode}/cart`)
}
