"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type CartItem, getCart, saveCart, getCartTotals } from "@/lib/cart"

interface CartContextType {
  items: CartItem[]
  total: number
  itemCount: number
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    // Load cart from localStorage on mount
    const cartItems = getCart()
    setItems(cartItems)
    updateTotals(cartItems)
  }, [])

  const updateTotals = (cartItems: CartItem[]) => {
    const { total, itemCount } = getCartTotals()
    setTotal(total)
    setItemCount(itemCount)
  }

  const addItem = (item: Omit<CartItem, "quantity">) => {
    const existingItem = items.find((cartItem) => cartItem.id === item.id && cartItem.size === item.size)

    let updatedItems: CartItem[]
    if (existingItem) {
      updatedItems = items.map((cartItem) =>
        cartItem.id === item.id && cartItem.size === item.size
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      )
    } else {
      updatedItems = [...items, { ...item, quantity: 1 }]
    }

    setItems(updatedItems)
    saveCart(updatedItems)
    updateTotals(updatedItems)
  }

  const removeItem = (id: string, size: string) => {
    const updatedItems = items.filter((item) => !(item.id === id && item.size === size))
    setItems(updatedItems)
    saveCart(updatedItems)
    updateTotals(updatedItems)
  }

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, size)
      return
    }

    const updatedItems = items.map((item) => (item.id === id && item.size === size ? { ...item, quantity } : item))
    setItems(updatedItems)
    saveCart(updatedItems)
    updateTotals(updatedItems)
  }

  const clearCart = () => {
    setItems([])
    setTotal(0)
    setItemCount(0)
    localStorage.removeItem("cart")
  }

  const value = {
    items,
    total,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
