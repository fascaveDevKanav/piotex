"use client"
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import  { ProductCard } from "@/components/product/productcard";
import { Allproducts } from "@/lib/products";
import { useEffect } from "react";

import { useProduct } from "@/hooks/usedata-product";
import { getListData } from "@/lib/customfetch/customFetch";
import { useDispatch, useSelector } from "react-redux";
import endpoints from "@/lib/endpoints/endponts";
export default function ProductPage(){
 const {products} = useSelector((state:any)=> state?.reduxData?.data)

console.log("products", products?.products)
  const dispatch = useDispatch()
   useEffect(()=>{
    fetchData()
   },[])

   const fetchData = async ()=>{
    
    await getListData(dispatch, "products", endpoints?.products?.allproduct)

   }
   return(
     <div className=" bg-gray-50">
      <Header />


     <div className="container ">
       <div className="container mx-auto px-4 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {products?.products ? products?.products.map((p) => (
                <ProductCard key={p.id} product={p} />
              )) : <p className="flex justify-center">No products found</p>}
            </div>
          </div>
     </div>
      <Footer />
    </div>
   )

}