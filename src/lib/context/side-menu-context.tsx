"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

interface SideMenuContextType {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const SideMenuContext = createContext<SideMenuContextType | null>(null)

interface SideMenuProviderProps {
  children: React.ReactNode
}

export const SideMenuProvider = ({ children }: SideMenuProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  return (
    <SideMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </SideMenuContext.Provider>
  )
}

export const useSideMenu = () => {
  const context = useContext(SideMenuContext)
  if (context === null) {
    throw new Error("useSideMenu must be used within a SideMenuProvider")
  }
  return context
}
