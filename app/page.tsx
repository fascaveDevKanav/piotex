"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent,  } from "@/components/ui/card"
import Link from "next/link"

import  {categories}  from "@/lib/data"
import ProductGrid from "@/components/product/productcard"
import { InfiniteSlider } from "@/components/ui/infinite-slider"


export default function HomePage() {

 
  
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
         
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
            <InfiniteSlider durationOnHover={80} gap={100}>
            {categories.map((category) => (
              <div key={category.id}  className="group">
                <Card className="h-48 w-72 bg-gradient-to-br from-pink-100 to-purple-100 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <CardContent className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                        {category.name}
                      </h3>
                    
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            </InfiniteSlider>          
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
          <div className="">
          <ProductGrid/>
          </div>
        </div>      
      </main>

      <Footer />
    </div>
  )
}
