"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import type { CartItem } from "@/lib/cart"

interface CartItemProps {
  item: CartItem
}

export function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id, item.size)
    } else {
      updateQuantity(item.id, item.size, newQuantity)
    }
  }

  const handleRemove = () => {
    removeItem(item.id, item.size)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <Link href={`/products/${item.id}`} className="flex-shrink-0">
            <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
            </div>
          </Link>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <Link href={`/products/${item.id}`} className="hover:text-pink-600 transition-colors">
              <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
            </Link>
            <p className="text-sm text-gray-600 mt-1">Size: {item.size}</p>
            <p className="text-lg font-semibold text-gray-900 mt-2">₹{item.price.toLocaleString()}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Total Price */}
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-2"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
