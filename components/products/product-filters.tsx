"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"

interface ProductFiltersProps {
  onFiltersChange: (filters: any) => void
  currentFilters: any
}

const categories = [
  { id: "sarees", label: "Sarees" },
  { id: "kurtis", label: "Kurtis" },
  { id: "dresses", label: "Dresses" },
  { id: "tops", label: "Tops" },
  { id: "handbags", label: "Handbags" },
  { id: "necklaces", label: "Jewelry" },
  { id: "heels", label: "Heels" },
  { id: "sneakers", label: "Sneakers" },
]

export function ProductFilters({ onFiltersChange, currentFilters }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    currentFilters.category ? [currentFilters.category] : [],
  )
  const [selectedRating, setSelectedRating] = useState<number>(0)
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [showSaleOnly, setShowSaleOnly] = useState(currentFilters.sale === "true")

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    let newCategories: string[]
    if (checked) {
      newCategories = [...selectedCategories, categoryId]
    } else {
      newCategories = selectedCategories.filter((id) => id !== categoryId)
    }
    setSelectedCategories(newCategories)

    onFiltersChange({
      ...currentFilters,
      category: newCategories.length === 1 ? newCategories[0] : undefined,
    })
  }

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value)
    onFiltersChange({
      ...currentFilters,
      priceRange: value,
    })
  }

  const handleRatingChange = (rating: number) => {
    const newRating = selectedRating === rating ? 0 : rating
    setSelectedRating(newRating)
    onFiltersChange({
      ...currentFilters,
      rating: newRating || undefined,
    })
  }

  const handleNewOnlyChange = (checked: boolean) => {
    setShowNewOnly(checked)
    onFiltersChange({
      ...currentFilters,
      isNew: checked || undefined,
    })
  }

  const handleSaleOnlyChange = (checked: boolean) => {
    setShowSaleOnly(checked)
    onFiltersChange({
      ...currentFilters,
      isSale: checked || undefined,
    })
  }

  const clearFilters = () => {
    setPriceRange([0, 5000])
    setSelectedCategories([])
    setSelectedRating(0)
    setShowNewOnly(false)
    setShowSaleOnly(false)
    onFiltersChange({})
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                />
                <Label htmlFor={category.id} className="text-sm">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={5000}
              min={0}
              step={100}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Rating */}
        <div>
          <h3 className="font-semibold mb-3">Minimum Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`flex items-center space-x-2 w-full text-left p-2 rounded hover:bg-gray-50 ${
                  selectedRating === rating ? "bg-pink-50 border border-pink-200" : ""
                }`}
              >
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm">& above</span>
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Special Filters */}
        <div>
          <h3 className="font-semibold mb-3">Special</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="new-arrivals" checked={showNewOnly} onCheckedChange={handleNewOnlyChange} />
              <Label htmlFor="new-arrivals" className="text-sm">
                New Arrivals
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="on-sale" checked={showSaleOnly} onCheckedChange={handleSaleOnlyChange} />
              <Label htmlFor="on-sale" className="text-sm">
                On Sale
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
