"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { ca } from "date-fns/locale"

interface OrderSummaryProps {
  onCheckout: () => void
}

export function OrderSummary() {

 const { cartdata } = useSelector((state: any) => state?.reduxData?.data || {});
 const calculate = cartdata?.cartItems?.reduce((acc: number, item: any) => acc + item?.Product?.price * item.quantity, 0) || 0;
  const total = calculate;
  const itemCount = cartdata?.cartItems.length;
  
  const subtotal = total
  const shipping = subtotal >= 999 ? 0 : 99
  const tax = 0;
  const finalTotal = subtotal + shipping + tax
  
 const router = useRouter();


  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-7">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({itemCount} items)</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          {shipping === 0 && subtotal < 999 && <p className="text-xs text-green-600">You saved ₹99 on shipping!</p>}

          {subtotal < 999 && shipping > 0 && (
            <p className="text-xs text-gray-600">Add ₹{(999 - subtotal).toLocaleString()} more for free shipping</p>
          )}
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{finalTotal.toLocaleString()}</span>
        </div>

        <Button  className="w-full bg-pink-600 hover:bg-pink-700 text-white" size="lg" onClick={()=>router.push('/checkout') }>
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  )
}
