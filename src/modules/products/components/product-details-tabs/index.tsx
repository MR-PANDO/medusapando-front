"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import ProductNutrition from "@modules/products/components/product-nutrition"

type ProductDetailsTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductDetailsTabs = ({ product }: ProductDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState<"details" | "nutrition">("details")

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("details")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "details"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Detalles del Producto
        </button>
        <button
          onClick={() => setActiveTab("nutrition")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "nutrition"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Informacion Nutricional
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {/* Details Tab */}
        {activeTab === "details" && (
          <div className="animate-fadeIn">
            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Descripcion</h4>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Product Metadata / Specs */}
            {product.metadata && Object.keys(product.metadata).length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">
                  Especificaciones
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(product.metadata)
                    .filter(([key]) => !key.startsWith("_") && key !== "unit_pricing")
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-gray-100"
                      >
                        <span className="text-sm text-gray-500 capitalize">
                          {key.replace(/_/g, " ")}
                        </span>
                        <span className="text-sm text-gray-900 font-medium">
                          {String(value)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Etiquetas</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag.value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Nutrition Tab */}
        {activeTab === "nutrition" && (
          <div className="animate-fadeIn">
            <ProductNutrition productId={product.id} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailsTabs
