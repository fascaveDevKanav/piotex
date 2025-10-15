"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OrderSummary } from "@/components/cart/order-summary";
import { CartItemComponent } from "@/components/cart/cart-item";
import ApplyCoupon from "@/components/apply-coupon";
import { useAuth } from "@/hooks/use-auth";
import { getListData } from "@/lib/customfetch/customFetch";
import endpoints from "@/lib/endpoints/endponts";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function CartPage() {
  const { isAuthenticated } = useAuth();
  const { cartdata } = useSelector((state: any) => state?.reduxData?.data || {});
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<CartItem[]>(cartdata?.cartItems || []);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    await getListData(dispatch, "cartdata", endpoints.cart.get);
  };

  useEffect(() => {
    if (cartdata?.cartItems) {
      setCartItems(cartdata.cartItems);
    }
  }, [cartdata]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-pink-600 mb-4">Please Sign In</h1>
            <p className="text-gray-600 mb-6">You need to be signed in to view your cart.</p>
            <div className="flex flex-col gap-3">
              <Link href="/login">
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" className="w-full">
                  Create Account
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>

        {!cartItems || cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-6">Your cart is empty.</p>
            <Link href="/shop">
              <Button className="bg-pink-600 hover:bg-pink-700">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item: any) => (
                <CartItemComponent key={item.id} item={item} />
              ))}
            </div>

            {/* Sidebar Summary */}
            <div className="space-y-4">
              <ApplyCoupon />
              <OrderSummary />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
