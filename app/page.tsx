"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent,  } from "@/components/ui/card"
import Link from "next/link"

import  {categories}  from "@/lib/data"
import ProductGrid from "@/components/product/productcard"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import CouponBanner from "@/components/coupon-banner"
import BannerImage from "../public/BannerImage.jpg"
import Image from "next/image"
import HeroBanner from "@/components/herobanner"
import Bg from "@/public/Bg.jpg"
import { getListData } from "@/lib/customfetch/customFetch"
import { useDispatch, useSelector } from "react-redux"
import endpoints from "@/lib/endpoints/endponts"
import { useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { BananaIcon } from "lucide-react"
export default function HomePage() {
const dispatch = useDispatch();

 const {isAuthenticated} = useAuth();
  useEffect(()=>{
    if(isAuthenticated){
      fetchdata();
    }
  },[isAuthenticated])
  
  const fetchdata = async () =>{
    await getListData(dispatch, "coupondata", endpoints?.order?.getCoupon)
    await getListData(dispatch, "bannerdata", endpoints?.banner?.getbanner)
  }

  const {bannerdata,coupondata} = useSelector((state:any)=>state?.reduxData?.data)
  console.log("coupondata", bannerdata?.[0]?.bannerUrl)

  return (
    <div className="min-h-screen bg-gray-50">


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {/* coupon */}
      {coupondata?.coupons?.length > 0 &&  <div className="-mt-6 flex justify-end">
          <CouponBanner
         
         messages={[`Sale use this coupon ${coupondata?.coupons?.[0]?.couponCode} code. Get ${coupondata?.coupons?.[0]?.couponAmount}₹ off on your first order`]}
         backgroundColor="#ff4081"
                textColor="#000000"
          />

        </div>}


        {/* Image Banner */}
    <div 
      className={`w-full rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 mb-5`}
      
    >
      <Image
  src={
    bannerdata?.[0]?.bannerUrl
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/${bannerdata[0].bannerUrl}`
      : BannerImage
  }
  width={1000}
  height={400}
  alt="Banner"
  className="w-full h-auto object-cover"
/>

    </div>
 
        <HeroBanner
         backgroundImage={Bg.src}

         />

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

    </div>
  )
}
