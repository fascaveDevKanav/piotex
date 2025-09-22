"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { OrderHistory } from "@/components/profile/order-history"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function OrdersPage() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center">
            <CardContent className="p-8">
              <h1 className="text-2xl font-bold text-pink-600 mb-4">Please Sign In</h1>
              <p className="text-gray-600 mb-6">You need to be signed in to view your orders.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/login">
                  <Button className="bg-pink-600 hover:bg-pink-700">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" className="bg-transparent">
                    Create Account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600">Track and manage all your orders</p>
          </div>
        </div>

        {/* Orders List */}
        <OrderHistory />
      </main>

      <Footer />
    </div>
  )
}
