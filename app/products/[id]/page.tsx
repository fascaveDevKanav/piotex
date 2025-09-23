"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { ShoppingCart, Star, Heart, Share2 } from "lucide-react"
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

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  rating: number
  reviewCount: number
  description: string
  sizes: string[]
}

const mockProduct: Product = {
  id: "1",
  name: "Classic White Sneakers",
  price: 2999,
  originalPrice: 3999,
  images: [
    "https://picsum.photos/600?random=1",
    "https://picsum.photos/600?random=2",
    "https://picsum.photos/600?random=3",
  ],
  rating: 4.5,
  reviewCount: 128,
  description:
    "These classic white sneakers are designed for everyday comfort and style. Made with premium materials and a minimalist design that works with any outfit.",
  sizes: ["6", "7", "8", "9", "10"],
}

export default function ProductDetailsPage() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState(mockProduct.sizes[0])
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      image: mockProduct.images[0],
      size: selectedSize,
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockProduct.name,
        text: mockProduct.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Mobile-first container with proper spacing */}
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8 xl:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
            
            {/* Left - Image Carousel */}
            <div className="order-1 lg:order-1">
              {/* Main image carousel */}
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination, Thumbs]}
                  navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                  }}
                  pagination={{ 
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active',
                  }}
                  thumbs={{ swiper: thumbsSwiper }}
                  className="rounded-lg sm:rounded-xl overflow-hidden shadow-md bg-white"
                >
                  {mockProduct.images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="relative w-full aspect-square">
                        <Image
                          src={img}
                          alt={`${mockProduct.name}-${idx}`}
                          fill
                          className="object-contain p-2 sm:p-4"
                          priority={idx === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                {/* Custom navigation buttons */}
                <div className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-white transition-colors">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-white transition-colors">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Thumbnail Slider - Hidden on very small screens */}
              <div className="hidden xs:block mt-3 sm:mt-4">
                <Swiper
                  modules={[Thumbs]}
                  onSwiper={setThumbsSwiper}
                  slidesPerView={3}
                  spaceBetween={8}
                  breakpoints={{
                    480: { slidesPerView: 4, spaceBetween: 10 },
                    640: { slidesPerView: 4, spaceBetween: 12 },
                    768: { slidesPerView: 5, spaceBetween: 14 },
                    1024: { slidesPerView: 5, spaceBetween: 16 },
                  }}
                  watchSlidesProgress
                  className="thumbnail-swiper"
                >
                  {mockProduct.images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="relative w-full aspect-square rounded-md border-2 border-transparent hover:border-pink-300 overflow-hidden cursor-pointer transition-all">
                        <Image
                          src={img}
                          alt={`thumb-${idx}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Right - Details */}
            <div className="order-2 lg:order-2 flex flex-col gap-4 sm:gap-6 lg:gap-8">
              
              {/* Mobile: Favorite and Share buttons */}
              <div className="flex justify-end gap-2 lg:hidden">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full border transition-colors ${
                    isFavorite 
                      ? 'bg-pink-50 border-pink-200 text-pink-600' 
                      : 'bg-white border-gray-200 text-gray-600 hover:border-pink-200'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full border bg-white border-gray-200 text-gray-600 hover:border-pink-200 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {/* Title + Rating */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight pr-4">
                    {mockProduct.name}
                  </h1>
                  {/* Desktop: Favorite and Share buttons */}
                  <div className="hidden lg:flex gap-2">
               
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-full border bg-white border-gray-200 text-gray-600 hover:border-pink-200 transition-colors"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
               
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  ₹{mockProduct.price.toLocaleString()}
                </span>
                {mockProduct.originalPrice && (
                  <>
                    <span className="text-lg sm:text-xl lg:text-2xl text-gray-400 line-through">
                      ₹{mockProduct.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm sm:text-base bg-green-100 text-green-700 px-2 py-1 rounded-md font-medium">
                      {Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                {mockProduct.description}
              </p>

              {/* Sizes */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold mb-3">Select Size</h3>
                <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2 sm:gap-3">
                  {mockProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 sm:px-4 sm:py-3 rounded-lg border text-sm sm:text-base transition-all font-medium ${
                        selectedSize === size
                          ? "border-pink-600 bg-pink-50 text-pink-600 scale-105"
                          : "border-gray-300 text-gray-700 hover:border-pink-300 hover:bg-pink-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
            <div className="sticky bottom-0 bg-gray-50 -mx-3 sm:-mx-4 lg:mx-0 lg:bg-transparent p-3 sm:p-4 lg:p-0 border-t lg:border-t-0">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {/* Add to Cart Button */}
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="w-full sm:flex-1 border-pink-600 text-pink-600 rounded-full px-6 py-3 sm:px-8 sm:py-4 lg:py-3 hover:bg-pink-50 active:bg-pink-100 transition-all duration-200 shadow-md hover:shadow-lg text-base sm:text-lg lg:text-base font-semibold"
                  >
                    <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                    Add to Cart
                  </Button>
                  
                  {/* Buy Now Button */}
                  <Button
                    onClick={() => {
                      handleAddToCart();
                      // Navigate to checkout or payment page
                      // router.push('/checkout');
                    }}
                    className="w-full sm:flex-1 bg-pink-600 text-white rounded-full px-6 py-3 sm:px-8 sm:py-4 lg:py-3 hover:bg-pink-700 active:bg-pink-800 transition-all duration-200 shadow-lg hover:shadow-xl text-base sm:text-lg lg:text-base font-semibold"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>   
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Custom styles for Swiper */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(0, 0, 0, 0.3);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #ec4899;
        }
        .thumbnail-swiper .swiper-slide-thumb-active .relative {
          border-color: #ec4899;
        }
        @media (min-width: 375px) {
          .xs\\:block {
            display: block;
          }
        }
      `}</style>
    </div>
  )
}