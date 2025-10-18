"use client"

import { use, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { ShoppingCart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Thumbs } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"

import {  addData, getProductById } from "@/lib/customfetch/customFetch"
import endpoints from "@/lib/endpoints/endponts"
import { useDispatch, useSelector } from "react-redux"
import { message } from "antd"
import { se } from "date-fns/locale"
import { reduxSliceData } from "@/redux/features/reduxData"
import SizeChart from "@/components/size-char"


export default function ProductDetailsPage() {
  const { id } = useParams()


  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
 
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const { productdata } = useSelector((state:any) => state?.reduxData?.data)
   console.log('selected Size ', selectedSize)

  const handleShare = () => {
    if (!productdata?.product) return
    if (navigator.share) {
      navigator.share({
        title: !productdata?.product.name,
        text: productdata?.product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  
 const dispatch = useDispatch()   

 useEffect(()=>{
  if(id){
    fetchdata()
  }
 },[])

  //   api calling
     const fetchdata = async()=>{
      console.log("patasasa id:",id)
     await getProductById(dispatch, "productdata", endpoints?.products?.getProductId, {
      id: id
     })

     } 

 const [userdata, setUserdata] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUserdata(JSON.parse(storedUser))
    }
  }, [])

     const addcart = async (productid: any , selectedSize :any ) =>{

      if(!selectedSize){  
        message.error("Please select a size")
        return;
      }
      dispatch(reduxSliceData({ key: "cartcall", data: true }));
      const sizename = productdata?.product?.ProductSizes?.filter((item:any)=> item.size === selectedSize)
      const body ={
        userId: userdata?.id,
        productId: productid,
        productSize: sizename?.[0]?.size,
      }
    const res =  await addData(endpoints?.cart?.add, body)
    if(res?.success){
      message.success("Product added to cart")
     }else{
      message.error(res?.message || "Failed to add product to cart")
     }
      dispatch(reduxSliceData({ key: "cartcall", data: false }));
    }



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
                {productdata?.product.ProductImages?.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="relative w-full aspect-square">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/${img.imageUrl}`}
                        alt={`${productdata?.product.name}-${idx}`}
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
                  {productdata?.product.name}
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
                  ₹{productdata?.product.price?.toLocaleString()}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed">
                {productdata?.product.description}
              </p>

              {/* Sizes */}
        {productdata?.product?.ProductSizes?.length > 0 && (
  <div>
    <h3 className="text-sm font-semibold mb-2">Select Size</h3>
    <div className="flex gap-2 flex-wrap">
      {productdata?.product.ProductSizes.map((item: any) => (
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

    {/* 👇 Add Size Chart Below */}
    <SizeChart />
  </div>
)}


              {/* Colors */}
              {/* {productdata?.product?.ProductColors?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Select Color</h3>
                  <div className="flex gap-3 flex-wrap">
                  {productdata?.product?.ProductColors.map((color : any) => {
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
})} */}
{/* 
                  </div>
                </div>
              )} */}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => addcart(productdata?.product.id, selectedSize)}
                  variant="outline"
                  className="w-full sm:flex-1 border-pink-600 text-pink-600 rounded-full"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
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
