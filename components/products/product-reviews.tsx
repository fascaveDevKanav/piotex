"use client"

import { Star, ThumbsUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
  helpful: number
  verified: boolean
}

interface ProductReviewsProps {
  rating: number
  reviewCount: number
  productId: string
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    userName: "Priya S.",
    rating: 5,
    comment:
      "Absolutely beautiful saree! The quality is excellent and the color is exactly as shown. Perfect for my sister's wedding.",
    date: "2024-01-15",
    helpful: 12,
    verified: true,
  },
  {
    id: "2",
    userName: "Anita M.",
    rating: 4,
    comment: "Good quality product. The fabric feels premium and the fit is perfect. Delivery was quick too.",
    date: "2024-01-10",
    helpful: 8,
    verified: true,
  },
  {
    id: "3",
    userName: "Kavya R.",
    rating: 5,
    comment: "Love this purchase! Great value for money and the design is stunning. Highly recommended.",
    date: "2024-01-05",
    helpful: 15,
    verified: false,
  },
]

export function ProductReviews({ rating, reviewCount, productId }: ProductReviewsProps) {
  const ratingDistribution = [
    { stars: 5, percentage: 65 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 10 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ]

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">{rating}</div>
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{reviewCount} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="text-sm w-8">{item.stars}★</span>
                  <Progress value={item.percentage} className="flex-1" />
                  <span className="text-sm text-gray-600 w-10">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Reviews</h3>
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.userName}</span>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Verified Purchase</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</span>
                  </div>

                  <p className="text-gray-700 mb-3">{review.comment}</p>

                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
