"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { notFound } from "next/navigation"
import { getCategoryBySlug } from "@/lib/categories"
import { getProducts } from "@/lib/products"
import { ProductCard } from "@/components/products/product-card"
import { ProductFilters } from "@/components/products/product-filters"
import { Header } from "@/components/layout/header"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    category: params.category,
    sort: searchParams.get("sort") || undefined,
    priceRange: searchParams.get("priceRange") || undefined,
    rating: searchParams.get("rating") || undefined,
    sale: searchParams.get("sale") === "true" || undefined,
  })

  const category = getCategoryBySlug(params.category)

  if (!category) {
    notFound()
  }

  const products = getProducts(filters)

  const handleFiltersChange = (newFilters: any) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)

    // Update URL with new filters
    const params = new URLSearchParams()
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value))
      }
    })

    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.push(newUrl, { scroll: false })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-gray-600">
            Discover our collection of {category.name.toLowerCase()} with {products.length} items available
          </p>
        </div>

        {/* Subcategories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Shop by Category</h2>
          <div className="flex flex-wrap gap-3">
            {category.subcategories.map((subcategory) => (
              <a
                key={subcategory.id}
                href={`/category/${category.slug}/${subcategory.slug}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-pink-50 hover:border-pink-200 hover:text-pink-600 transition-colors"
              >
                {subcategory.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilters onFiltersChange={handleFiltersChange} currentFilters={filters} />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{products.length} products found</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
