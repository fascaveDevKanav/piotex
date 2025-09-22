"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"

interface OrderSummaryProps {
  onCheckout: () => void
}

export function OrderSummary({ onCheckout }: OrderSummaryProps) {
  const { items, total, itemCount } = useCart()

  const subtotal = total
  const shipping = subtotal >= 999 ? 0 : 99
  const tax = Math.round(subtotal * 0.18) // 18% GST
  const finalTotal = subtotal + shipping + tax

  if (items.length === 0) {
    return null
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({itemCount} items)</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span className={shipping === 0 ? "text-green-600" : ""}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Tax (GST 18%)</span>
            <span>₹{tax.toLocaleString()}</span>
          </div>

          {shipping === 0 && subtotal < 999 && <p className="text-xs text-green-600">You saved ₹99 on shipping!</p>}

          {subtotal < 999 && shipping > 0 && (
            <p className="text-xs text-gray-600">Add ₹{(999 - subtotal).toLocaleString()} more for free shipping</p>
          )}
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{finalTotal.toLocaleString()}</span>
        </div>

        <Button onClick={onCheckout} className="w-full bg-pink-600 hover:bg-pink-700 text-white" size="lg">
          Proceed to Checkout
        </Button>

        <div className="text-xs text-gray-600 text-center">
          <p>Secure checkout with SSL encryption</p>
          <p className="mt-1">Cash on delivery available</p>
        </div>
      </CardContent>
    </Card>
  )
}
