// Product data and utilities
export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  subcategory: string
  rating: number
  reviewCount: number
  description: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  isNew?: boolean
  isSale?: boolean
}

// Dummy product data
export const products: Product[] = [
  {
    id: "1",
    name: "Elegant Silk Saree",
    price: 2499,
    originalPrice: 3499,
    image: "/elegant-silk-saree-in-pink.jpg",
    images: ["/elegant-silk-saree-in-pink.jpg", "/silk-saree-back.png", "/silk-saree-detail.jpg"],
    category: "sarees",
    subcategory: "silk",
    rating: 4.5,
    reviewCount: 128,
    description:
      "Beautiful handwoven silk saree with intricate golden border. Perfect for special occasions and festivals. Made from premium quality silk with traditional craftsmanship. The saree features elegant embroidery work and comes with a matching blouse piece.",
    sizes: ["Free Size"],
    colors: ["Pink", "Blue", "Green"],
    inStock: true,
    isNew: true,
    isSale: true,
  },
  {
    id: "2",
    name: "Cotton Kurti Set",
    price: 1299,
    image: "/cotton-kurti-set-in-blue.jpg",
    images: ["/cotton-kurti-set-in-blue.jpg", "/kurti-set-side-view.jpg"],
    category: "kurtis",
    subcategory: "cotton",
    rating: 4.2,
    reviewCount: 89,
    description:
      "Comfortable cotton kurti with matching palazzo pants. Perfect for daily wear and casual outings. Made from breathable cotton fabric with beautiful prints. The set includes a kurti and palazzo pants for a complete look.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "White", "Yellow"],
    inStock: true,
    isNew: false,
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    price: 1899,
    image: "/floral-summer-dress.png",
    images: ["/floral-summer-dress.png", "/summer-dress-back-view.jpg"],
    category: "dresses",
    subcategory: "casual",
    rating: 4.7,
    reviewCount: 156,
    description:
      "Light and breezy floral dress perfect for summer outings. Features a comfortable fit and beautiful print. Made from lightweight fabric that's perfect for warm weather. The dress has a flattering silhouette that suits all body types.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Floral Pink", "Floral Blue"],
    inStock: true,
    isNew: true,
  },
  {
    id: "4",
    name: "Designer Handbag",
    price: 3299,
    originalPrice: 4299,
    image: "/designer-handbag-in-brown.jpg",
    images: ["/designer-handbag-in-brown.jpg", "/handbag-interior-view.jpg"],
    category: "handbags",
    subcategory: "leather",
    rating: 4.4,
    reviewCount: 67,
    description:
      "Premium leather handbag with multiple compartments. Perfect for office and formal occasions. Crafted from genuine leather with attention to detail. Features multiple pockets and compartments for organized storage.",
    sizes: ["One Size"],
    colors: ["Brown", "Black", "Tan"],
    inStock: true,
    isSale: true,
  },
  {
    id: "5",
    name: "Ethnic Jewelry Set",
    price: 899,
    image: "/ethnic-jewelry-set-gold.jpg",
    images: ["/ethnic-jewelry-set-gold.jpg", "/jewelry-set-close-up.jpg"],
    category: "necklaces",
    subcategory: "ethnic",
    rating: 4.3,
    reviewCount: 94,
    description:
      "Beautiful ethnic jewelry set with necklace and earrings. Perfect complement to traditional wear. Made with high-quality materials and traditional designs. The set includes a statement necklace and matching earrings.",
    sizes: ["One Size"],
    colors: ["Gold", "Silver"],
    inStock: true,
  },
  {
    id: "6",
    name: "Comfortable Heels",
    price: 2199,
    image: "/comfortable-heels-in-black.jpg",
    images: ["/comfortable-heels-in-black.jpg", "/heels-side-view.jpg"],
    category: "heels",
    subcategory: "formal",
    rating: 4.1,
    reviewCount: 73,
    description:
      "Stylish and comfortable heels perfect for office wear and formal events. Features cushioned sole for all-day comfort. Made with premium materials and designed for both style and comfort. Perfect for professional settings.",
    sizes: ["5", "6", "7", "8", "9"],
    colors: ["Black", "Nude", "Brown"],
    inStock: true,
  },
  {
    id: "7",
    name: "Casual Sneakers",
    price: 1599,
    image: "/white-casual-sneakers.jpg",
    images: ["/white-casual-sneakers.jpg", "/sneakers-side-view.png"],
    category: "sneakers",
    subcategory: "casual",
    rating: 4.6,
    reviewCount: 112,
    description:
      "Comfortable casual sneakers perfect for daily wear and light activities. Features breathable material and cushioned sole. Designed for comfort and style, these sneakers are perfect for everyday wear and light exercise.",
    sizes: ["5", "6", "7", "8", "9"],
    colors: ["White", "Pink", "Gray"],
    inStock: true,
    isNew: true,
  },
  {
    id: "8",
    name: "Party Wear Top",
    price: 1199,
    originalPrice: 1599,
    image: "/party-wear-top-in-black.jpg",
    images: ["/party-wear-top-in-black.jpg", "/party-top-back-view.jpg"],
    category: "tops",
    subcategory: "party",
    rating: 4.4,
    reviewCount: 85,
    description:
      "Stylish party wear top with sequin details. Perfect for evening events and celebrations. Features elegant sequin work and a flattering fit. Made from high-quality fabric that's comfortable to wear for extended periods.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gold", "Silver"],
    inStock: true,
    isSale: true,
  },
]

// Filter and search utilities
export interface FilterOptions {
  category?: string
  priceRange?: [number, number]
  rating?: number
  inStock?: boolean
  isNew?: boolean
  isSale?: boolean
  search?: string
  sort?: "newest" | "price-low" | "price-high" | "rating" | "popular"
}

export function filterProducts(products: Product[], filters: FilterOptions): Product[] {
  let filtered = [...products]

  // Category filter
  if (filters.category) {
    filtered = filtered.filter((product) => product.category.toLowerCase() === filters.category?.toLowerCase())
  }

  // Price range filter
  if (filters.priceRange) {
    const [min, max] = filters.priceRange
    filtered = filtered.filter((product) => product.price >= min && product.price <= max)
  }

  // Rating filter
  if (filters.rating) {
    filtered = filtered.filter((product) => product.rating >= filters.rating!)
  }

  // Stock filter
  if (filters.inStock !== undefined) {
    filtered = filtered.filter((product) => product.inStock === filters.inStock)
  }

  // New items filter
  if (filters.isNew) {
    filtered = filtered.filter((product) => product.isNew)
  }

  // Sale items filter
  if (filters.isSale) {
    filtered = filtered.filter((product) => product.isSale)
  }

  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm),
    )
  }

  // Sort
  if (filters.sort) {
    switch (filters.sort) {
      case "newest":
        filtered = filtered.filter((product) => product.isNew).concat(filtered.filter((product) => !product.isNew))
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "popular":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
    }
  }

  return filtered
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

// Get related products
export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = getProductById(productId)
  if (!product) return []

  return products.filter((p) => p.id !== productId && p.category === product.category).slice(0, limit)
}

// Get products function to match imports from category pages
export function getProducts(options: { limit?: number } & FilterOptions = {}) {
  const { limit, ...filterOptions } = options
  let filteredProducts = filterProducts(products, filterOptions)

  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit)
  }

  return filteredProducts
}
