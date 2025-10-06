"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"


export function CartIcon() {
 

  const itemCount = 1

  return (
    <Link href="/cart" className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors">
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
