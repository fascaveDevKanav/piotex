"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { Allproducts } from "@/lib/products"



interface Product {
  id: string
  name: string,
  price: number,
  originalPrice?: number
  sizes: string[]
  ProductImages: { imageUrl: string }[]

}


export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [hovered, setHovered] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
    })
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card
        className="group relative rounded-2xl border bg-white hover:shadow-2xl transition-all duration-500 overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative w-full aspect-square bg-gray-50">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/${product?.ProductImages?.[0]?.imageUrl}`}
            alt={product.name}
            fill
            className={`object-contain transition-transform duration-700 ${
              hovered ? "scale-105" : "scale-100"
            }`}
          />

         
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-base font-medium text-gray-900 line-clamp-2 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Sizes */}
          {/* {product.sizes.length > 1 && (
            <p className="text-xs text-gray-500">
              Sizes: {product.sizes.slice(0, 3).join(", ")}
              {product?.ProductSizes.length > 3 && " …"}
            </p>
          )} */}

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-pink-600 text-white rounded-full px-8 py-3 hover:bg-pink-700 transition shadow-lg"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </Card>
    </Link>
  )
}

// 👇 Grid Preview with Dynamic Data
export default function ProductGrid() {
    const [productData, setProductData] = useState([]);
  
  useEffect(()=>{

    const fetchData = async()=>{
      const result = await  Allproducts();
      setProductData(result?.products || []);

    }
    fetchData()
  
  },[])
  console.log("productData",productData)
  return (
    <div className="container mx-auto px-4 py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productData.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
