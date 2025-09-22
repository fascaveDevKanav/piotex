"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartItemComponent } from "@/components/cart/cart-item"
import { OrderSummary } from "@/components/cart/order-summary"
import { CheckoutModal } from "@/components/cart/checkout-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, ArrowLeft, CheckCircle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CartPage() {
  const { isAuthenticated } = useAuth()
  const { items, itemCount } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-pink-600 mb-4">Please Sign In</h1>
            <p className="text-gray-600 mb-6">You need to be signed in to view your cart.</p>
            <div className="flex flex-col gap-3">
              <Link href="/login">
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" className="w-full bg-transparent">
                  Create Account
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleCheckout = () => {
    setShowCheckout(true)
  }

  const handleCheckoutSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Alert */}
        {showSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Order placed successfully! You will receive a confirmation email shortly.
            </AlertDescription>
          </Alert>
        )}

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/products">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600">
              {itemCount === 0 ? "Your cart is empty" : `${itemCount} item${itemCount !== 1 ? "s" : ""} in your cart`}
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-12">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/products">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItemComponent key={`${item.id}-${item.size}`} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary onCheckout={handleCheckout} />
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} onSuccess={handleCheckoutSuccess} />
      </main>

      <Footer />
    </div>
  )
}
