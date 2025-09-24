const endpoints ={

    auth:{
        signin:"api/auth/admin/signin",
        signup:"api/auth/signup",
        verifyOtp:"api/auth/verify-otp"
    },
    categories:{
        getAllcategories:"api/usercategories/all",
    },
    products:{
        allproduct:"api/userproducts/all",
        getProductId:"api/userproducts/getProductById"
    }

 

}
export default endpoints;   