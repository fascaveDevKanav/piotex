import Link from "next/link"
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
   
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <ShoppingBag className="h-8 w-8 text-pink-500" />
              <span className="ml-2 text-xl font-bold">Ladies Wear</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for elegant and trendy ladies fashion. Discover the latest styles in sarees,
              kurtis, dresses, and accessories.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-pink-500 p-2">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-pink-500 p-2">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-pink-500 p-2">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-pink-500 p-2">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-pink-500 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/category/traditional-wear" className="text-gray-400 hover:text-pink-500 transition-colors">
                  Traditional Wear
                </Link>
              </li>
              <li>
                <Link href="/category/western-wear" className="text-gray-400 hover:text-pink-500 transition-colors">
                  Western Wear
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="text-gray-400 hover:text-pink-500 transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/category/footwear" className="text-gray-400 hover:text-pink-500 transition-colors">
                  Footwear
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about_us" className="text-gray-400 hover:text-pink-500 transition-colors">
                  About Us 
                </Link>
              </li>
              <li>
                <Link href="/contact_us" className="text-gray-400 hover:text-pink-500 transition-colors">
                  Contact Us 
                </Link>
              </li>
              <li>
                <Link href="/terms_conditions" className="text-gray-400 hover:text-pink-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy_policy" className="text-gray-400 hover:text-pink-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            
              <li>
                <Link href="/refund_cancellation" className="text-gray-400 hover:text-pink-500 transition-colors">
                  Refund Cancellation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-pink-500 mt-0.5" />
                <div className="text-gray-400">
                  <p>123 Fashion Street</p>
                  <p>Mumbai, Maharashtra 400001</p>
                  <p>India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-pink-500" />
                <span className="text-gray-400">+91 9876543210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-pink-500" />
                <span className="text-gray-400">support@ladieswear.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Ladies Wear. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-pink-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-pink-500 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-pink-500 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
