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
import { useAuth } from "@/hooks/use-auth";
import { getListData } from "@/lib/customfetch/customFetch";
import endpoints from "@/lib/endpoints/endponts";
import { ShoppingBag } from "lucide-react";

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
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50/30 p-4">
          <Card className="w-full max-w-md text-center border-[#eb2f96]/20 shadow-xl">
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-[#eb2f96]/10 to-purple-100/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-10 w-10 text-[#eb2f96]" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Please Sign In</h1>
              <p className="text-gray-600 mb-6">You need to be signed in to view your cart.</p>
              <div className="flex flex-col gap-3">
                <Link href="/login">
                  <Button className="w-full bg-[#eb2f96] hover:bg-[#d91d7f] text-white shadow-lg shadow-[#eb2f96]/20">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" className="w-full border-[#eb2f96]/30 text-gray-700 hover:bg-[#eb2f96]/5">
                    Create Account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h2>
          <p className="text-gray-600">
            {cartItems?.length > 0 ? `${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
          </p>
        </div>

        {!cartItems || cartItems.length === 0 ? (
          <Card className="border-[#eb2f96]/20 shadow-lg">
            <CardContent className="text-center py-16 px-4">
              <div className="bg-gradient-to-br from-[#eb2f96]/10 to-purple-100/50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-[#eb2f96]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
              </p>
              <Link href="/shop">
                <Button className="bg-[#eb2f96] hover:bg-[#d91d7f] text-white shadow-lg shadow-[#eb2f96]/20 px-8">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="border-[#eb2f96]/20 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-[#eb2f96]" />
                    Cart Items
                  </h3>
                  <div className="space-y-4">
                    {cartItems.map((item: any) => (
                      <CartItemComponent key={item.id} item={item} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <OrderSummary />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}