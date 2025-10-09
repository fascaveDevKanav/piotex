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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link href="/products">
              <Button className="bg-pink-600 hover:bg-pink-700">Start Shopping</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order History
        </CardTitle>
      </CardHeader>
      <CardContent>
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
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        {/* Order Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-[10px]">Order #{order.id}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(order.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                {order.paymentMethod}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={getOrderStatusColor(order.status)}>{formatOrderStatus(order.status)}</Badge>
            {/* <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button> */}
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-3 mb-4">
          {order?.orderItems.map((item, index) => (
            <div key={index} className="flex gap-4">
              {/* <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={item.image || "/placeholder.svg"} alt={item.productName} fill className="object-cover" />
              </div> */}
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.id}`} className="hover:text-pink-600 transition-colors">
                  <h4 className="font-medium truncate">{item.productName}</h4>
                </Link>
                <p className="text-sm text-gray-600">Size: {item.variant
}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Order Footer */}
        {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
              <p>
                {order.shippingAddress.address}, {order.shippingAddress.city}
              </p>
              <p>
                {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-xl font-bold text-gray-900">₹{order.total.toLocaleString()}</p>
            {order.status === "delivered" && order.deliveryDate && (
              <p className="text-sm text-green-600">Delivered on {formatDate(order.deliveryDate)}</p>
            )}
          </div>
        </div> */}

        {/* Action Buttons */}
        {/* <div className="flex gap-2 mt-4 pt-4 border-t">
          {order.status === "delivered" && (
            <>
              <Button variant="outline" size="sm">
                Rate & Review
              </Button>
              <Button variant="outline" size="sm">
                Buy Again
              </Button>
            </>
          )}
          {order.status === "shipped" && (
            <Button variant="outline" size="sm">
              Track Order
            </Button>
          )}
          {order.status === "pending" && (
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
              Cancel Order
            </Button>
          )}
        </div> */}
      </CardContent>
    </Card>
  )
}
