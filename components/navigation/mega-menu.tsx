"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { categories } from "@/lib/categories"

interface MegaMenuProps {
  className?: string
}

export function MegaMenu({ className }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  return (
    <nav className={cn("relative", className)}>
      <ul className="flex space-x-8">
        {categories.map((category) => (
          <li
            key={category.id}
            className="relative"
            onMouseEnter={() => setActiveMenu(category.slug)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link
              href={`/category/${category.slug}`}
              className="flex items-center space-x-1 text-gray-700 hover:text-pink-600 font-medium transition-colors"
            >
              <span>{category.name}</span>
              <ChevronDown className="h-4 w-4" />
            </Link>

            {activeMenu === category.slug && (
              <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">All {category.name}</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href={`/category/${category.slug}`}
                            className="text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors"
                          >
                            View All {category.name}
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                      <ul className="space-y-2">
                        {category.subcategories.map((subcategory) => (
                          <li key={subcategory.id}>
                            <Link
                              href={`/category/${category.slug}/${subcategory.slug}`}
                              className="text-sm text-gray-600 hover:text-pink-600 transition-colors"
                            >
                              {subcategory.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
