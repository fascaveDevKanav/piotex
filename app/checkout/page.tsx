"use client";
import React, { useEffect, useState } from 'react';
import { ShoppingBag, User, MapPin, CreditCard, Shield, ChevronDown } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { addData, getListData } from '@/lib/customfetch/customFetch';
import { useDispatch, useSelector } from 'react-redux';
import endpoints from '@/lib/endpoints/endponts';
import {message} from 'antd'
import { useRouter } from 'next/navigation';
import pioteximg from "../../public/razorpayimage/Piotex.png"
import ApplyCoupon from '@/components/apply-coupon';
import { reduxSliceData } from '@/redux/features/reduxData';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');

  const dispatch = useDispatch()
 const {Address,cartdata,discount,couponApplied} = useSelector((state:any)=> state?.reduxData?.data)
 console.log(couponApplied,"couponApplied")
 console.log(discount?.coupon,"discount")

 useEffect(()=>{
   fetchdata()
   dispatch(reduxSliceData({key:"couponApplied", data: false}))
 },[couponApplied])


 const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    setUser(userData);
    
    if (!userData) {
      router.push('/login');
      message.error("Please login to continue to checkout")
    }
  }, []);

  const fetchdata = async ()=>{
    await getListData(dispatch, "Address", endpoints?.user?.getAddress )
    await getListData(dispatch, "cartdata", endpoints.cart.get)
    await getListData(dispatch, "discount", endpoints?.order?.getDiscount)

  }
 const router = useRouter()
  console.log("cartdata",cartdata)

  const subtotal = cartdata?.cartItems?.reduce((acc, item) => acc + item?.Product?.price * item?.quantity, 0) || 0;
  const shipping = 0;
  const tax = 0;
  const discountAmount = discount?.coupon?.couponAmount || 0;
  const total = subtotal + shipping + tax - discountAmount;


  const items = cartdata?.cartItems?.map(item => ({
    id: item?.Product?.id,
    name: item?.Product?.name,
    size: item?.productSize,
    price: item?.Product?.price,
    quantity: item?.quantity,
    total: item?.Product?.price * item?.quantity,
  })) || [];
  


  const handlePlaceOrder = async () => {
  if(!selectedAddress){
    return message.error("Please select a delivery address")
  }
  
  
  const body={
    items: items,
    shippingAddressId: selectedAddress,
    billingAddressId: selectedAddress,
    paymentMethod,
  }
 const res=  await addData(endpoints?.order?.create,body)
 console.log("order response",res)
 if(res?.data?.paymentMethod === "upi" && res?.success){

    //  //  razorpay payment
   
    const options ={
         key: res?.data?.key, 
         amount: res?.data?.amount* 100,
         order_id: res?.data?.razorpayOrderId,
         currency: "INR",
         name: "Piotex",
         description: "Purchase Product",
         image: pioteximg.src,
         handler: async function (response:any) {
           await addData(endpoints?.order?.verifypayment, {
             response,
           }).then((res) => {
            if(res?.success){
              message.success("Payment successful, order placed!" )
              router.push('/orders')
            }
           }).catch((err) => {
             console.log(err);
             message.error("Payment verification failed, please contact support." )
           });


         },
         prefill: {
           name: JSON.parse(user || '{}')?.name || "Customer Name",
           email: JSON.parse(user || '{}')?.email || "customer@example.com",
           contact: JSON.parse(user || '{}')?.number || "9999999999",
         },
         notes: {
           address: "Customer Address",
         },
         theme: {
           color: "#eb2f96",
         },
       };

       const razorpay = new window.Razorpay(options);
       razorpay.open();

       
 }
 else if(res?.data?.paymentMethod === "cod" && res?.success){
  message.success("Order placed successfully!" )
  fetchdata();
  router.push('/orders')

 }
   
 else{
  return message.error(res?.message || "Something went wrong, please try again." )
 }
  };


 



  useEffect(()=>{
   const script = document.createElement('script');
   script.src='https://checkout.razorpay.com/v1/checkout.js';
   script.async=true;
   document.body.appendChild(script);
  },[])







  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Toast Message */}
      {showMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: messageType === 'error' ? '#ff4d4f' : '#52c41a',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '6px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease'
        }}>
          {messageText}
        </div>
      )}



      {/* Main Content */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 16px 40px',
      }}>
        <h2 style={{ 
          fontSize: 'clamp(20px, 5vw, 28px)', 
          fontWeight: 600, 
          marginBottom: '24px',
          padding: '0 8px'
        }}>
          Checkout
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: '24px',
        }}>
          <style>{`
            @media (min-width: 768px) {
              .checkout-grid {
                grid-template-columns: 1fr 400px !important;
              }
              .order-summary-container {
                position: sticky !important;
                top: 24px !important;
              }
            }
          `}</style>
          
          <div className="checkout-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr',
            gap: '24px' 
          }}>
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Delivery Address */}
              <div style={{
                backgroundColor: 'white',
                padding: 'clamp(16px, 3vw, 24px)',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  marginBottom: '20px',
                  fontSize: 'clamp(16px, 3vw, 18px)',
                  fontWeight: 600
                }}>
                  <MapPin size={20} color="#eb2f96" />
                  <span>Delivery Address</span>
                </div>
                
                <div style={{ position: 'relative' }}>
                  <select
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 40px 12px 16px',
                      fontSize: 'clamp(14px, 2.5vw, 15px)',
                      border: '1px solid #d9d9d9',
                      borderRadius: '6px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      appearance: 'none',
                      outline: 'none'
                    }}
                    required
                  >
                    <option value="">Select a delivery address</option>
                    { Address?.addresses?.map((addr) => (
                      <option key={addr.id} value={addr.id}>
                        {addr.addressLine1}, {addr.city}, {addr.state}, {addr.postalCode}
                      </option>
                    ))}
                  </select>
                  <ChevronDown 
                    size={20} 
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: '#666'
                    }}
                  />
                </div>
              </div>

              {/* Order Items */}
              <div style={{
                backgroundColor: 'white',
                padding: 'clamp(16px, 3vw, 24px)',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  marginBottom: '20px',
                  fontSize: 'clamp(16px, 3vw, 18px)',
                  fontWeight: 600
                }}>
                  <ShoppingBag size={20} color="#eb2f96" />
                  <span>Order Items ({cartdata?.cartItems?.length || 0})</span>
                </div>
                
                {cartdata?.cartItems?.map((item, index) => (
                  <div key={item.id}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      padding: '12px 0',
                      gap: '16px',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{ minWidth: '0', flex: '1 1 auto' }}>
                        <div style={{ 
                          fontWeight: 500, 
                          fontSize: 'clamp(14px, 2.5vw, 16px)',
                          wordBreak: 'break-word'
                        }}>
                          {item?.Product?.name}
                        </div>
                        <div style={{ 
                          color: '#666', 
                          fontSize: 'clamp(12px, 2vw, 14px)' 
                        }}>
                          Size: {item?.productSize}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ 
                          fontWeight: 600, 
                          fontSize: 'clamp(14px, 2.5vw, 16px)' 
                        }}>
                          ₹{item?.Product?.price.toLocaleString()}
                        </div>
                        <div style={{ 
                          color: '#666', 
                          fontSize: 'clamp(12px, 2vw, 14px)' 
                        }}>
                          ₹{item?.Product?.price.toLocaleString()} x {item?.quantity}
                        </div>
                      </div>
                    </div>
                    {index < cartdata?.cartItems?.length - 1 && (
                      <div style={{ borderBottom: '1px solid #f0f0f0', margin: '8px 0' }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Payment Method */}
              <div style={{
                backgroundColor: 'white',
                padding: 'clamp(16px, 3vw, 24px)',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  marginBottom: '20px',
                  fontSize: 'clamp(16px, 3vw, 18px)',
                  fontWeight: 600
                }}>
                  <CreditCard size={20} color="#eb2f96" />
                  <span>Payment Method</span> 
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive your order' },
                    { value: 'upi', label: 'UPI Payment', desc: 'Pay using UPI apps' },
                  ].map((method) => (
                    <label key={method.value} style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      cursor: 'pointer' 
                    }}>
                      <input
                        type="radio"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{ 
                          marginTop: '4px', 
                          marginRight: '12px', 
                          cursor: 'pointer',
                          minWidth: '16px'
                        }}
                      />
                      <div>
                        <div style={{ 
                          fontWeight: 500, 
                          fontSize: 'clamp(14px, 2.5vw, 16px)' 
                        }}>
                          {method.label}
                        </div>
                        <div style={{ 
                          color: '#666', 
                          fontSize: 'clamp(12px, 2vw, 14px)' 
                        }}>
                          {method.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <ApplyCoupon />
              <div className="order-summary-container" style={{
                backgroundColor: 'white',
                padding: 'clamp(16px, 3vw, 24px)',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                marginTop: '20px'
              }}>
                <div style={{ 
                  fontSize: 'clamp(16px, 3vw, 18px)',
                  fontWeight: 600,
                  marginBottom: '20px'
                }}>
                  Order Summary
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: 'clamp(13px, 2.5vw, 15px)',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#666' }}>Subtotal</span>
                    <span style={{ fontWeight: 500 }}>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: 'clamp(13px, 2.5vw, 15px)',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#666' }}>Coupon Discount</span>
                    <span style={{ fontWeight: 500 }}>₹{discount?.coupon?.couponAmount?.toLocaleString() || 0}</span>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: 'clamp(13px, 2.5vw, 15px)',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#666' }}>Shipping</span>
                    <span style={{ fontWeight: 500, color: '#52c41a' }}>FREE</span>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: 'clamp(13px, 2.5vw, 15px)',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#666' }}>Tax (GST 18%)</span>
                    <span style={{ fontWeight: 500 }}>₹{tax.toLocaleString()}</span>
                  </div>
                  
                  <div style={{ borderBottom: '1px solid #f0f0f0', margin: '8px 0' }} />
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: 'clamp(18px, 4vw, 20px)',
                    fontWeight: 600,
                    gap: '8px'
                  }}>
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    style={{
                      width: '100%',
                      backgroundColor: '#eb2f96',
                      color: 'white',
                      border: 'none',
                      height: '48px',
                      fontSize: 'clamp(14px, 3vw, 16px)',
                      fontWeight: 600,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      marginTop: '8px'
                      
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c41d7f'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#eb2f96'}
                    className='cursor-pointer'
                  >
                    Place Order
                  </button>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '12px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '6px',
                    fontSize: 'clamp(11px, 2vw, 13px)',
                    color: '#666'
                  }}>
                    <Shield size={16} style={{ flexShrink: 0 }} />
                    <span>Safe and secure payments. 100% secure transactions.</span> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}