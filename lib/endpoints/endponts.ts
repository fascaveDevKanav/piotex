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
        getProductId:"api/userproducts/getProductById",
        createreview:"api/review/add-review",
        getAllReviews:"api/review/all-reviews"
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
        create:"api/order/createOrder",
        get:"api/order/getOrders",
        verifypayment:"api/order/verifyPayment",
        applyCoupon:"api/order/applyCoupon",
        getDiscount:"api/order/getdiscount",
        getCoupon:"api/order/listcoupons"
    },
    banner:{
        getbanner:"api/userbanner/all"
    }

 

}
export default endpoints;   