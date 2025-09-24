import api from "./api/api";
import endpoints from "./endpoints/endponts";

export const categories = [
  {
    id: "1",
    name: "Traditional Wear",
   
  },
  {
    id: "2",
    name: "Casual Wear",

  },
  {
    id: "3",
    name: "Western Wear",

  },
  {
    id: "4",
    name: "Accessories",
    
  },
]

export const AllCategories = async()=>{
  
  try {
    const res = await api.get(endpoints?.categories?.getAllcategories);
   return res?.data
  } catch (error) {
    console.log(error);
    return [];
  }
}