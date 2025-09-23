import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import ProductGrid from "@/components/product/productcard";


export default function ProductPage(){
   return(
     <div className=" bg-gray-50">
      <Header />


     <div className="container ">
       <ProductGrid />
     </div>



     

      <Footer />
    </div>
   )

}