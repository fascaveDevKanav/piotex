import { notFound } from "next/navigation"
import { getCategoryBySlug, getSubcategoryBySlug } from "@/lib/categories"
import { getProducts } from "@/lib/products"
import { ProductCard } from "@/components/products/product-card"
import { ProductFilters } from "@/components/products/product-filters"
import { Header } from "@/components/layout/header"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface SubcategoryPageProps {
  params: {
    category: string
    subcategory: string
  }
  searchParams: {
    sort?: string
    priceRange?: string
    rating?: string
    sale?: string
  }
}

export default function SubcategoryPage({ params, searchParams }: SubcategoryPageProps) {
  const category = getCategoryBySlug(params.category)
  const subcategory = getSubcategoryBySlug(params.category, params.subcategory)

  if (!category || !subcategory) {
    notFound()
  }

  const products = getProducts({
    subcategory: params.subcategory,
    sort: searchParams.sort,
    priceRange: searchParams.priceRange,
    rating: searchParams.rating,
    sale: searchParams.sale === "true",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-pink-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/category/${category.slug}`} className="hover:text-pink-600">
            {category.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">{subcategory.name}</span>
        </nav>

        {/* Subcategory Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{subcategory.name}</h1>
          <p className="text-gray-600">
            Explore our {subcategory.name.toLowerCase()} collection with {products.length} items available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilters />
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
                <p className="text-gray-500">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
