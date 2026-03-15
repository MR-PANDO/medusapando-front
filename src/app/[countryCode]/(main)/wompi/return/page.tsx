import { Metadata } from "next"
import WompiReturnClient from "./client"

export const metadata: Metadata = {
  title: "Procesando pago",
}

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ id?: string }>
}

export default async function WompiReturnPage({ params, searchParams }: Props) {
  const { countryCode } = await params
  const { id: transactionId } = await searchParams

  return <WompiReturnClient transactionId={transactionId} countryCode={countryCode} />
}
