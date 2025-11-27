"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity,
      countryCode,
    })

    setIsAdding(false)
  }

  const decrementQty = () => {
    if (quantity > 1) setQuantity((q) => q - 1)
  }

  const incrementQty = () => {
    if (quantity < 99) setQuantity((q) => q + 1)
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  return (
    <>
      <div className="flex flex-col gap-y-4" ref={actionsRef}>
        {/* Variant Options as Pills */}
        {(product.variants?.length ?? 0) > 1 && (
          <div className="flex flex-col gap-y-4">
            {(product.options || []).map((option) => {
              return (
                <div key={option.id}>
                  <span className="text-sm font-medium text-gray-700 mb-2 block">
                    {option.title}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {option.values?.map((value) => {
                      const isSelected = options[option.id] === value.value
                      return (
                        <button
                          key={value.id}
                          onClick={() => setOptionValue(option.id, value.value)}
                          disabled={!!disabled || isAdding}
                          className={`px-4 py-2 text-sm rounded-md border transition-all ${
                            isSelected
                              ? "bg-gray-800 text-white border-gray-800"
                              : "bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-400"
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {value.value}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Price Display */}
        <ProductPrice product={product} variant={selectedVariant} />

        {/* Quantity Selector and Wishlist */}
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={decrementQty}
              disabled={!inStock || quantity <= 1}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-xl font-medium">-</span>
            </button>
            <span className="w-12 h-10 flex items-center justify-center text-base font-medium border-x border-gray-300">
              {quantity}
            </span>
            <button
              onClick={incrementQty}
              disabled={!inStock}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-xl font-medium">+</span>
            </button>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all ${
              isWishlisted
                ? "bg-red-50 border-red-200 text-red-500"
                : "border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-600"
            }`}
            title={isWishlisted ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill={isWishlisted ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          className={`w-full h-12 flex items-center justify-center gap-2 rounded-md font-medium transition-all ${
            !inStock || !selectedVariant || !isValidVariant
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : isAdding
              ? "bg-emerald-400 text-white cursor-wait"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
          data-testid="add-product-button"
        >
          {/* Cart icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>
            {!selectedVariant && !options
              ? "Seleccionar variante"
              : !inStock || !isValidVariant
              ? "Agotado"
              : isAdding
              ? "Agregando..."
              : "Agregar al carrito"}
          </span>
        </button>

        {/* Order Now Button */}
        <button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          className={`w-full h-12 flex items-center justify-center gap-2 rounded-md font-medium border-2 transition-all ${
            !inStock || !selectedVariant || !isValidVariant
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-emerald-600 text-emerald-600 hover:bg-emerald-50"
          }`}
        >
          Comprar ahora
        </button>

        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
