"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define a TypeScript interface for your context value
interface ProductContextType {
  productData: any[] // You can replace `any` with a proper Product type
  setProductData: React.Dispatch<React.SetStateAction<any[]>>
}

// Create context with default value `null` (we'll check for it later)
export const ProductContext = createContext<ProductContextType | null>(null)

// Provider component
export function ProductProvider({ children }: { children: ReactNode }) {
  const [productData, setProductData] = useState<any[]>([])

  return (
    <ProductContext.Provider value={{ productData, setProductData }}>
      {children}
    </ProductContext.Provider>
  )
}

// Custom hook to use the context easily
export function useProduct() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider")
  }
  return context
}
