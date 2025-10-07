"use client"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { OrderSummary } from "@/components/cart/order-summary"
import api from "@/lib/api/api"
import endpoints from "@/lib/endpoints/endponts"
import { useDispatch } from "react-redux"
import { getListData } from "@/lib/customfetch/customFetch"

// Mock API or local state – replace with your real data fetching
type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const { isAuthenticated } = useAuth()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
   const dispatch = useDispatch()
useEffect(()=> {fetchcart()},[])

  const fetchcart = async() =>{
    await getListData(dispatch, "cart", endpoints.cart.get)

  }
 


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


 


  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-6">Your cart is empty.</p>
            <Link href="/shop">
              <Button className="bg-pink-600 hover:bg-pink-700">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
                  
            </div>

            {/* Summary */}
            
            <OrderSummary/>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
