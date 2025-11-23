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
import Providers from "@/redux/provider"
import LayoutWrapper from "./layoutWrapper"

export const metadata: Metadata = {
  title: "Adller - Fashion E-commerce for ladies.",
  description: "Discover the latest trends in women's fashion",

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
                  <LayoutWrapper>
                    {children}
                  </LayoutWrapper>
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
