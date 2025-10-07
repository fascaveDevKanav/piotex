"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {  getListData } from "@/lib/customfetch/customFetch"
import endpoints from "@/lib/endpoints/endponts"

export function CartIcon() {
  const [userdata, setUserdata] = useState<any>(null)
  const dispatch = useDispatch()
  const {cartcall} = useSelector((state:any)=> state?.reduxData?.data)
  // Load user from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUserdata(JSON.parse(storedUser))
      }
    }
  }, [])

  // Fetch cart count only when user data is ready
  useEffect(() => {
    if (userdata?.id) {
      fetchCartcount()
    }
  }, [userdata, cartcall])

  const fetchCartcount = async () => {
    const body = {
      userId: userdata?.id,
    }
    console.log("fetching cart count with body:", body)
    const res = await getListData(dispatch, "cartdata", endpoints?.cart.get, body)
    console.log("cart count", res)
  }

  // Get cart count from Redux
  const { cartdata } = useSelector((state: any) => state?.reduxData?.data)
  console.log("cartdata in icon", cartdata?.cartItems?.length)
  const itemCount = cartdata?.cartItems?.length || 0

  return (
    <Link
      href="/cart"
      className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors"
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-pink-600 hover:bg-pink-600 "
        >
          {itemCount > 99 ? "99+" : itemCount}
        </Badge>
      )}
    </Link>
  )
}
