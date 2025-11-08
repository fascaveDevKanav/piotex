"use client"
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import  { ProductCard } from "@/components/product/productcard";
import { getListData } from "@/lib/customfetch/customFetch";
import endpoints from "@/lib/endpoints/endponts";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import {  useDispatch, useSelector } from "react-redux";
export default function ProductPage(){
 const {productfilter} = useSelector((state:any)=> state?.reduxData?.data)
const dispatch = useDispatch()
const searchParams = useSearchParams();
const id = searchParams.get("categoryId")
console.log("id",id)
useEffect(()=>{
    fetchdata()
},[id])



 const fetchdata  =async()=>{
      await getListData(dispatch, "productfilter", `${endpoints.products.allproduct}?categoryId=${id}`)
 }
   return(
     <div className=" bg-gray-50">
   


     <div className="container ">
       <div className="container mx-auto px-4 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {productfilter?.products ? productfilter?.products.map((p) => (
                <ProductCard key={p.id} product={p} />
              )) : <p className="flex justify-center">No products found</p>}
            </div>
          </div>
     </div>
      
    </div>
   )

}