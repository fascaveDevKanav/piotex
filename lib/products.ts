import api from "./api/api"
import endpoints from "./endpoints/endponts"

export const Allproducts  = async()=>{

  try {
    const res = await api.get(endpoints.products.allproduct)
    return res?.data
  } catch (error) {
    console.log(error)
  }
}