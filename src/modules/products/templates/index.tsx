import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductDietBadges from "@modules/products/components/product-diet-badges"
import ProductDetailsTabs from "@modules/products/components/product-details-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { getTranslations, getLocale } from "next-intl/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getEntityTranslation } from "@lib/data/translations"

import ProductActionsWrapper from "./product-actions-wrapper"
import ProductReviews from "@modules/products/components/product-reviews"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct & {
    brand?: { id: string; name: string }
  }
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = async ({
  product,
  region,
  countryCode,
  images,
}) => {
  const t = await getTranslations("products")
  if (!product || !product.id) {
    return notFound()
  }

  // Fetch translation for current locale
  const locale = await getLocale()
  const translation = await getEntityTranslation("product", product.id, locale)

  // Check stock status
  const firstVariant = product.variants?.[0]
  const inStock = firstVariant
    ? !firstVariant.manage_inventory ||
      (firstVariant.inventory_quantity && firstVariant.inventory_quantity > 0)
    : true

  return (
    <>
      {/* Main Product Section */}
      <div className="content-container py-6" data-testid="product-container">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Image Gallery */}
            <div className="w-full">
              <ImageGallery images={images} />
            </div>

            {/* Right: Product Info & Actions */}
            <div className="flex flex-col gap-6">
              {/* Product Title */}
              <div>
                <h1
                  className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2"
                  data-testid="product-title"
                >
                  {translation?.title || product.title}
                </h1>

                {/* SKU and Stock Status */}
                <div className="flex items-center gap-4 text-sm">
                  {firstVariant?.sku && (
                    <span className="text-gray-500">
                      SKU: <span className="font-medium">{firstVariant.sku}</span>
                    </span>
                  )}
                  <span
                    className={`flex items-center gap-1 ${inStock ? "text-green-600" : "text-red-600"}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`}
                    />
                    {inStock ? t("available") : t("outOfStock")}
                  </span>
                </div>

                {/* Brand */}
                {product.brand && (
                  <LocalizedClientLink
                    href={`/brands/${product.brand.id}`}
                    className="inline-block mt-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    {product.brand.name}
                  </LocalizedClientLink>
                )}
              </div>

              {/* Short Description */}
              {(translation?.description || product.description) && (
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                  {translation?.description || product.description}
                </p>
              )}

              {/* Diet Badges - compact version */}
              <ProductDietBadges tags={product.tags} compact />

              {/* Product Actions (Price, Variants, Add to Cart) */}
              <Suspense
                fallback={
                  <ProductActions
                    disabled={true}
                    product={product}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>

              {/* Guarantee Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">
                      {t("fairPrices")}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {t("fairPricesText")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">
                      {t("returnsExchanges")}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {t("returnsExchangesText")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="content-container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Related Products (Left Sidebar on large screens) */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t("youMayAlsoLike")}
              </h3>
              <Suspense fallback={<SkeletonRelatedProducts />}>
                <RelatedProducts product={product} countryCode={countryCode} />
              </Suspense>
            </div>
          </div>

          {/* Product Details (Main Content with Tabs) */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <ProductDetailsTabs product={product} translatedDescription={translation?.description} />
              <ProductReviews productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductTemplate
