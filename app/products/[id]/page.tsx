"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { ShoppingCart, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Thumbs } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"
import { ProductById } from "@/lib/products"

interface ProductImage {
  id: string
  imageUrl: string
}

interface ProductSize {
  id: string
  size: string
}

interface ProductColor {
  id: string
  name: string
  hex: string // e.g. "#FF0000"
}

interface Product {
  id: string
  name: string
  price: number
  description: string
  ProductImages: ProductImage[]
  ProductSizes: ProductSize[]
  ProductColors: ProductColor[]
}

export default function ProductDetailsPage() {
  const { id } = useParams()
  const { addItem } = useCart()

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [data, setData] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const handleAddToCart = () => {
    if (!data) return
    addItem({
      id: data.id,
      name: data.name,
      price: data.price,
      image: data.ProductImages[0]?.imageUrl,
      size: selectedSize,
    })
  }

  const handleShare = () => {
    if (!data) return
    if (navigator.share) {
      navigator.share({
        title: data.name,
        text: data.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await ProductById(id)
      setData(result?.product)
      // default selections
      setSelectedSize(result?.product?.ProductSizes?.[0]?.size || null)
      setSelectedColor(result?.product?.ProductColors?.[0]?.id || null)
    }
    fetchData()
  }, [id])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Image Carousel */}
            <div>
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                pagination={{
                  clickable: true,
                  bulletClass: "swiper-pagination-bullet",
                  bulletActiveClass: "swiper-pagination-bullet-active",
                }}
                thumbs={{ swiper: thumbsSwiper }}
                className="rounded-lg overflow-hidden shadow-md bg-white"
              >
                {data?.ProductImages?.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="relative w-full aspect-square">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/${img.imageUrl}`}
                        alt={`${data?.name}-${idx}`}
                        fill
                        className="object-contain p-2"
                        priority={idx === 0}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Right - Product Details */}
            <div className="flex flex-col gap-6">
              {/* Title */}
              <div className="flex items-start justify-between">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {data?.name}
                </h1>
                <div className="flex gap-2">
                 
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full border bg-white border-gray-200 text-gray-600 hover:border-pink-200"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{data?.price?.toLocaleString()}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed">
                {data?.description}
              </p>

              {/* Sizes */}
              {data?.ProductSizes?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Select Size</h3>
                  <div className="flex gap-2 flex-wrap">
                    {data.ProductSizes.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedSize(item.size)}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                          selectedSize === item.size
                            ? "border-pink-600 bg-pink-50 text-pink-600"
                            : "border-gray-300 text-gray-700 hover:border-pink-300 hover:bg-pink-50"
                        }`}
                      >
                        {item.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {data?.ProductColors?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Select Color</h3>
                  <div className="flex gap-3 flex-wrap">
                  {data?.ProductColors.map((color) => {
      const value = color.hex?.toLowerCase() || color.color?.toLowerCase()

    return (
     <button
      key={color.id}
      onClick={() => setSelectedColor(color.id)}
      className={`w-8 h-8 rounded-full border-2 transition-all ${
        selectedColor === color.id
          ? "border-pink-600 scale-110"
          : "border-gray-300"
      }`}
      style={{ backgroundColor: value }}
      title={value} // shows the name/hex on hover
    />
  )
})}

                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="w-full sm:flex-1 border-pink-600 text-pink-600 rounded-full"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button className="w-full sm:flex-1 bg-pink-600 text-white rounded-full hover:bg-pink-700">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Swiper styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(0, 0, 0, 0.3);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #ec4899;
        }
      `}</style>
    </div>
  )
}
