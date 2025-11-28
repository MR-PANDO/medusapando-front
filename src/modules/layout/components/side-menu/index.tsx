"use client"

import { Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import { Fragment } from "react"
import { HttpTypes } from "@medusajs/types"
import { useSideMenu } from "@lib/context/side-menu-context"
import CategoryMenu from "../category-menu"

type CategoryWithChildren = HttpTypes.StoreProductCategory & {
  category_children?: HttpTypes.StoreProductCategory[]
}

const SideMenu = ({
  categories
}: {
  regions?: HttpTypes.StoreRegion[] | null
  categories: CategoryWithChildren[]
}) => {
  const { isOpen, open, close } = useSideMenu()

  return (
    <div className="h-full flex items-center">
      <div className="flex items-center">
        <div className="h-full flex">
          <div className="relative flex h-full">
            <button
              data-testid="nav-menu-button"
              onClick={open}
              className="h-10 flex items-center gap-2 px-4 sm:px-6 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="font-semibold text-sm uppercase tracking-wide whitespace-nowrap">Comprar por Categorías</span>
            </button>
          </div>

          <Transition
            show={isOpen}
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 z-[50] bg-black/50"
              onClick={close}
              data-testid="side-menu-backdrop"
            />
          </Transition>

          <Transition
            show={isOpen}
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="fixed left-0 top-0 bottom-0 z-[51] w-80 bg-white shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                data-testid="close-menu-button"
                onClick={close}
                className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMark className="w-5 h-5 text-gray-600" />
              </button>

              {/* Category Menu */}
              <CategoryMenu categories={categories} onClose={close} />
            </div>
          </Transition>
        </div>
      </div>
    </div>
  )
}

export default SideMenu
