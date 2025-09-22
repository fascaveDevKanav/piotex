"use client"

import { useAuth } from "@/hooks/use-auth"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ProductCard } from "@/components/products/product-card"
import { categories, getProducts } from "@/lib/data"

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth()



  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-pink-600">Welcome to Ladies Wear</CardTitle>
            <CardDescription>Your destination for the latest fashion trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative px-8 py-16 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Discover Your Style</h1>
            <p className="text-lg md:text-xl mb-8 text-pretty max-w-2xl mx-auto">
              Explore our curated collection of the latest trends in women's fashion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 text-lg">
                  Shop Now
                </Button>
              </Link>
              <Link href="/products?sale=true">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-pink-600 px-8 py-3 text-lg bg-transparent"
                >
                  Sale Items
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`} className="group">
                <Card className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <CardContent className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">{category.subcategories.length} categories</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link href="/products">
              <Button variant="outline" className="text-pink-600 border-pink-600 hover:bg-pink-50 bg-transparent">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getProducts({ limit: 4 }).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-pink-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to get special offers, free giveaways, and updates on new arrivals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <Button className="bg-pink-600 hover:bg-pink-700 px-6">Subscribe</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
