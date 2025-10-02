import api from "./api/api"
import endpoints from "./endpoints/endponts"

export const Allproducts = async (id?: number | string) => {
  try {
    const res = id
      ? await api.get(`${endpoints.products.allproduct}?categoryId=${id}`)
      : await api.get(endpoints.products.allproduct)
    console.log("res", res)
    return res?.data
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

export const ProductById  = async(id:any)=>{
   try {
     const res = await api.post(endpoints.products?.getProductId,{
    id:id
     })
      return res?.data
   } catch (error) {
     return console.log(error)
    
   }
}
