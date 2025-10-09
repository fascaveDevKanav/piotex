const endpoints ={

    auth:{
        signin:"api/auth/signin",
        signup:"api/auth/signup",
        verifyOtp:"api/auth/verify-otp"
    },
    categories:{
        getAllcategories:"api/usercategories/all",
    },
    products:{
        allproduct:"api/userproducts/all",
        getProductId:"api/userproducts/getProductById"
    },
    cart:{
        add: 'api/cart/add',
        remove:"api/cart/remove",
        get:"api/cart/getall"
    },
    user:{
        address:"api/address/create",
        getAddress:"api/address/all"
    },
    order:{
        create:"api/order/createOrder"
    }

 

}
export default endpoints;   