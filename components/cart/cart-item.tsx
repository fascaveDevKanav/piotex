"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"

import { addData, getListData } from "@/lib/customfetch/customFetch"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import endpoints from "@/lib/endpoints/endponts"

// interface CartItemProps {
//   item: CartItem
// }

export function CartItemComponent({ item }:any) {

  const dispatch = useDispatch()
  


   const fetchcart = async() =>{
        await getListData(dispatch, "cartdata", endpoints.cart.get)   
     }
  const removeData =async()=>{
   
  const body ={
    id: item?.id,

  }
  await addData(endpoints?.cart?.remove,body).then(()=> fetchcart())
 } 
 



  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <Link href={`/products/${item?.Product?.id}`} className="flex-shrink-0">
            <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.Product?.ProductImages?.[0]?.imageUrl}`}
                alt={item?.Product?.name}
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
            </div>
          </Link>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <Link href={`/products/${item?.Product?.id}`} className="hover:text-pink-600 transition-colors">
              <h3 className="font-medium text-gray-900 truncate">{item?.Product?.name}</h3>
            </Link>
            <p className="text-sm text-gray-600 mt-1">Size: {item?.productSize}</p>
            <p className="text-lg font-semibold text-gray-900 mt-2">₹{item?.Product?.price?.toLocaleString()}</p>
          </div>

          {/* Quantity Controls */}
      
          {/* Total Price */}
          <div className="text-right flex flex-col items-end">
            <p className="text-lg font-semibold text-gray-900">₹{(item?.Product?.price * item.quantity).toLocaleString()}</p>
         
            <span className=" flex text-sm text-gray-600 mt-1">Quantity:{item?.quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeData}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-2"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
