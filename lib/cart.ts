// Cart management utilities
export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  quantity: number
}

export interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

// Get cart from localStorage
export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return []
  const cartData = localStorage.getItem("cart")
  return cartData ? JSON.parse(cartData) : []
}

// Save cart to localStorage
export const saveCart = (items: CartItem[]): void => {
  localStorage.setItem("cart", JSON.stringify(items))
}

// Add item to cart
export const addToCart = (item: Omit<CartItem, "quantity">): void => {
  const cart = getCart()
  const existingItem = cart.find((cartItem) => cartItem.id === item.id && cartItem.size === item.size)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...item, quantity: 1 })
  }

  saveCart(cart)
}

// Remove item from cart
export const removeFromCart = (id: string, size: string): void => {
  const cart = getCart()
  const updatedCart = cart.filter((item) => !(item.id === id && item.size === size))
  saveCart(updatedCart)
}

// Update item quantity
export const updateQuantity = (id: string, size: string, quantity: number): void => {
  const cart = getCart()
  const item = cart.find((cartItem) => cartItem.id === id && cartItem.size === size)

  if (item) {
    if (quantity <= 0) {
      removeFromCart(id, size)
    } else {
      item.quantity = quantity
      saveCart(cart)
    }
  }
}

// Get cart totals
export const getCartTotals = (): { total: number; itemCount: number } => {
  const cart = getCart()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  return { total, itemCount }
}

// Clear cart
export const clearCart = (): void => {
  localStorage.removeItem("cart")
}
