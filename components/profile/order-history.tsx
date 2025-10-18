"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, Calendar, MapPin, CreditCard, Eye } from "lucide-react"
import { getUserOrders, getOrderStatusColor, formatOrderStatus, type Order } from "@/lib/orders"
import { useAuth } from "@/hooks/use-auth"
import { getListData } from "@/lib/customfetch/customFetch"
import { useDispatch, useSelector } from "react-redux"
import endpoints from "@/lib/endpoints/endponts"
import { useEffect } from "react"

export function OrderHistory() {
  const { user } = useAuth()
  const orders = user ? getUserOrders(user.id) : []
  const dispatch = useDispatch()
  const { order } = useSelector((state:any) => state?.reduxData?.data)
  useEffect(()=>{fetchdata()},[])

  const fetchdata =async () =>{
     await getListData(dispatch , "order", endpoints?.order?.get)
  }
  console.log(order?.orders , "orders")

 
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (order?.orders.length === 0) {
    return (
      <Card className="border-[#eb2f96]/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#eb2f96]/5 to-purple-50 border-b border-[#eb2f96]/10">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Package className="h-5 w-5 text-[#eb2f96]" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white">
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-[#eb2f96]/10 to-purple-100/50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Package className="h-12 w-12 text-[#eb2f96]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link href="/products">
              <Button className="bg-[#eb2f96] hover:bg-[#d91d7f] text-white shadow-lg shadow-[#eb2f96]/20 px-8 py-6 text-base rounded-lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-[#eb2f96]/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#eb2f96]/5 to-purple-50 border-b border-[#eb2f96]/10">
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Package className="h-5 w-5 text-[#eb2f96]" />
          Order History
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-gradient-to-b from-white to-gray-50 p-6">
        <div className="space-y-6">
          {order?.orders?.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function OrderCard({ order }: { order: Order }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="border-2 border-gray-100 hover:border-[#eb2f96]/30 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#eb2f96]/10">
      <CardContent className="p-6 bg-white">
        {/* Order Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-base text-gray-900">Order #{order.id}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
              <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                <Calendar className="h-4 w-4 text-[#eb2f96]" />
                {formatDate(order.createdAt)}
              </span>
              <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                <CreditCard className="h-4 w-4 text-[#eb2f96]" />
                {order.paymentMethod}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`${getOrderStatusColor(order.status)} px-4 py-1 text-sm font-semibold shadow-sm`}>
              {formatOrderStatus(order.status)}
            </Badge>
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-4 mb-4">
          {order?.orderItems.map((item, index) => (
            <div key={index} className="flex gap-4 p-3 rounded-lg bg-gray-50 hover:bg-[#eb2f96]/5 transition-colors border border-gray-100">
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.id}`} className="hover:text-[#eb2f96] transition-colors">
                  <h4 className="font-semibold text-gray-900 truncate">{item.productName}</h4>
                </Link>
                <div className="flex gap-4 mt-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Size:</span> {item.variant}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Qty:</span> {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-[#eb2f96]">₹{(item.price * item.quantity).toLocaleString()}</p>
                <p className="text-xs text-gray-500">₹{item.price} each</p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4 bg-gray-200" />

        {/* Order Total */}
        <div className="flex justify-between items-center bg-gradient-to-r from-[#eb2f96]/10 to-purple-50 p-4 rounded-lg border border-[#eb2f96]/20">
          <span className="text-gray-900 font-semibold text-lg">Order Total</span>
          <span className="text-[#eb2f96] font-bold text-2xl">
            ₹{order?.orderItems?.reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}