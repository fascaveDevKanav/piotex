"use client"
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import  { ProductCard } from "@/components/product/productcard";
import { Allproducts } from "@/lib/products";
import { useEffect } from "react";

import { useProduct } from "@/hooks/usedata-product";
export default function ProductPage(){
    const { productData, setProductData } = useProduct()
 
   useEffect(()=>{
  const fetchData = async()=>{
  const data = await Allproducts();
  setProductData(data?.products)
  }
  fetchData()
   },[setProductData])

   return(
     <div className=" bg-gray-50">
      <Header />


     <div className="container ">
       <div className="container mx-auto px-4 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {productData ? productData.map((p) => (
                <ProductCard key={p.id} product={p} />
              )) : <p className="flex justify-center">No products found</p>}
            </div>
          </div>
     </div>
      <Footer />
    </div>
   )

}