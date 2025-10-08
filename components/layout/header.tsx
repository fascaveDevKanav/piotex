"use client"

import Link from "next/link"
import { ShoppingBag, User, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import  MegaMenu  from "@/components/navigation/mega-menu"

import { CartIcon } from "@/components/navigation/cart-icon"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-pink-600" />
            <span className="ml-2 text-xl font-bold text-gray-900"> Ladies Wear</span>
          </Link>


          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            {isAuthenticated && <CartIcon />}

            {/* User Menu */}

 {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/address">Your Address</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-pink-600 hover:bg-pink-700">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Desktop Navigation */}
   
          <div className="hidden md:block border-t border-gray-200">
            <div className="py-4">
              <MegaMenu />
            </div>
          </div>


        {/* Mobile Search Bar */}
        {/* {isAuthenticated && (
          <div className="md:hidden border-t border-gray-200 py-3">
            <SearchBar />
          </div>
        )} */}

        {/* Mobile Navigation */}
        {isAuthenticated && mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-4">
              <Link href="/products?category=sarees" className="block text-gray-700 hover:text-pink-600 font-medium">
                Sarees
              </Link>
              <Link href="/products?category=kurtis" className="block text-gray-700 hover:text-pink-600 font-medium">
                Kurtis
              </Link>
              <Link href="/products?category=dresses" className="block text-gray-700 hover:text-pink-600 font-medium">
                Dresses
              </Link>
              <Link
                href="/products?category=accessories"
                className="block text-gray-700 hover:text-pink-600 font-medium"
              >
                Accessories
              </Link>
              <Link href="/products?category=footwear" className="block text-gray-700 hover:text-pink-600 font-medium">
                Footwear
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
