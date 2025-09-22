import { categories } from "@/lib/categories"
import { products, filterProducts, type FilterOptions } from "@/lib/products"

export { categories }

export function getProducts(options: { limit?: number } & FilterOptions = {}) {
  const { limit, ...filterOptions } = options
  let filteredProducts = filterProducts(products, filterOptions)

  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit)
  }

  return filteredProducts
}
