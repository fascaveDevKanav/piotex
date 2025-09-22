export interface Category {
  id: string
  name: string
  slug: string
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  slug: string
  categorySlug: string
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Traditional Wear",
    slug: "traditional-wear",
    subcategories: [
      { id: "1-1", name: "Silk Sarees", slug: "silk-sarees", categorySlug: "traditional-wear" },
      { id: "1-2", name: "Cotton Sarees", slug: "cotton-sarees", categorySlug: "traditional-wear" },
      { id: "1-3", name: "Designer Sarees", slug: "designer-sarees", categorySlug: "traditional-wear" },
      { id: "1-4", name: "Lehenga Choli", slug: "lehenga-choli", categorySlug: "traditional-wear" },
      { id: "1-5", name: "Anarkali Suits", slug: "anarkali-suits", categorySlug: "traditional-wear" },
      { id: "1-6", name: "Sharara Sets", slug: "sharara-sets", categorySlug: "traditional-wear" },
    ],
  },
  {
    id: "2",
    name: "Casual Wear",
    slug: "casual-wear",
    subcategories: [
      { id: "2-1", name: "Cotton Kurtis", slug: "cotton-kurtis", categorySlug: "casual-wear" },
      { id: "2-2", name: "Printed Kurtis", slug: "printed-kurtis", categorySlug: "casual-wear" },
      { id: "2-3", name: "Kurti Sets", slug: "kurti-sets", categorySlug: "casual-wear" },
      { id: "2-4", name: "Palazzo Sets", slug: "palazzo-sets", categorySlug: "casual-wear" },
      { id: "2-5", name: "Casual Dresses", slug: "casual-dresses", categorySlug: "casual-wear" },
      { id: "2-6", name: "Tops & Tunics", slug: "tops-tunics", categorySlug: "casual-wear" },
    ],
  },
  {
    id: "3",
    name: "Western Wear",
    slug: "western-wear",
    subcategories: [
      { id: "3-1", name: "Party Dresses", slug: "party-dresses", categorySlug: "western-wear" },
      { id: "3-2", name: "Maxi Dresses", slug: "maxi-dresses", categorySlug: "western-wear" },
      { id: "3-3", name: "Cocktail Dresses", slug: "cocktail-dresses", categorySlug: "western-wear" },
      { id: "3-4", name: "Jumpsuits", slug: "jumpsuits", categorySlug: "western-wear" },
      { id: "3-5", name: "Skirts & Tops", slug: "skirts-tops", categorySlug: "western-wear" },
      { id: "3-6", name: "Blazers", slug: "blazers", categorySlug: "western-wear" },
    ],
  },
  {
    id: "4",
    name: "Accessories",
    slug: "accessories",
    subcategories: [
      { id: "4-1", name: "Jewelry", slug: "jewelry", categorySlug: "accessories" },
      { id: "4-2", name: "Handbags", slug: "handbags", categorySlug: "accessories" },
      { id: "4-3", name: "Footwear", slug: "footwear", categorySlug: "accessories" },
      { id: "4-4", name: "Scarves", slug: "scarves", categorySlug: "accessories" },
      { id: "4-5", name: "Belts", slug: "belts", categorySlug: "accessories" },
      { id: "4-6", name: "Hair Accessories", slug: "hair-accessories", categorySlug: "accessories" },
    ],
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug)
}

export function getSubcategoryBySlug(categorySlug: string, subcategorySlug: string): Subcategory | undefined {
  const category = getCategoryBySlug(categorySlug)
  return category?.subcategories.find((sub) => sub.slug === subcategorySlug)
}
