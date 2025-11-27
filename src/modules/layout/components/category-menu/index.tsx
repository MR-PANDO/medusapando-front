"use client"

import React, { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CategoryWithChildren = HttpTypes.StoreProductCategory & {
  category_children?: HttpTypes.StoreProductCategory[]
}

const MenuItem = ({
  category,
  isExpanded,
  onToggle,
  onClose
}: {
  category: CategoryWithChildren
  isExpanded: boolean
  onToggle: () => void
  onClose?: () => void
}) => {
  const hasChildren = category.category_children && category.category_children.length > 0

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <div className="flex items-center">
        <LocalizedClientLink
          href={`/categories/${category.handle}?sortBy=sales_count`}
          className="flex-1 px-5 py-3 text-sm text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
          onClick={onClose}
        >
          {category.name}
        </LocalizedClientLink>
        {hasChildren && (
          <button
            onClick={onToggle}
            className="px-4 py-3 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Subcategories - accordion style */}
      {hasChildren && isExpanded && (
        <div className="bg-gray-50 border-t border-gray-100">
          {category.category_children?.map((child) => (
            <LocalizedClientLink
              key={child.id}
              href={`/categories/${child.handle}?sortBy=sales_count`}
              className="block px-8 py-2.5 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-100 transition-colors"
              onClick={onClose}
            >
              {child.name}
            </LocalizedClientLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CategoryMenu({
  categories,
  onClose
}: {
  categories: CategoryWithChildren[]
  onClose?: () => void
}) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Store - All Products Link */}
      <LocalizedClientLink
        href="/store"
        className="flex items-center gap-3 px-5 py-4 bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
        onClick={onClose}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span className="font-semibold text-sm uppercase tracking-wide">Ver Todos los Productos</span>
      </LocalizedClientLink>

      {/* Categories Header */}
      <div className="bg-gray-800 text-white px-5 py-3 flex items-center gap-3">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="font-semibold text-sm uppercase tracking-wide">Categorías</span>
      </div>

      {/* Menu Items - scrollable */}
      <nav className="flex-1 bg-white overflow-y-auto">
        {categories.length > 0 ? (
          categories.map((category) => (
            <MenuItem
              key={category.id}
              category={category}
              isExpanded={expandedCategory === category.id}
              onToggle={() => toggleCategory(category.id)}
              onClose={onClose}
            />
          ))
        ) : (
          <div className="px-5 py-4 text-sm text-gray-500">
            No hay categorías disponibles
          </div>
        )}
      </nav>
    </div>
  )
}
