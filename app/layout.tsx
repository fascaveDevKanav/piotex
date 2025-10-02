import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/hooks/use-auth"
import { CartProvider } from "@/hooks/use-cart"
import { Suspense } from "react"
import "./globals.css"
import { ProductProvider } from "@/hooks/usedata-product"
import StoreProvider from "./StoreProvider"
import Providers from "@/redux/provider"

export const metadata: Metadata = {
  title: "Ladies Wear - Fashion E-commerce",
  description: "Discover the latest trends in women's fashion",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
        <Providers>
       <AuthProvider>

            <ProductProvider>
            <CartProvider>
              {children}
              </CartProvider>
              </ProductProvider>
              
              
          </AuthProvider>
        </Providers>
       
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
