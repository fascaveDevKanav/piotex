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
// Add Razorpay type to window for TypeScript
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
 const {Address,cartdata,discount} = useSelector((state:any)=> state?.reduxData?.data)
 console.log(discount?.coupon,"discount")

 useEffect(()=>{
   fetchdata()
 },[])

 const user = localStorage.getItem('user');
  useEffect(() => {
    if (!user) {
      router.push('/login');
      message.error("Please login to continue to checkout")
    }
  }, [user])
  
  console.log("user ", JSON.parse(user || '{}'))
  

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
 if(res?.data.paymentMethod === "upi" && res?.success){
    console.log("order placed",res)
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

      {/* Header */}
    <Header />

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '24px' }}>Checkout</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Delivery Address */}
            <div style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginBottom: '20px',
                fontSize: '18px',
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
                    fontSize: '15px',
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
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginBottom: '20px',
                fontSize: '18px',
                fontWeight: 600
              }}>
                <ShoppingBag size={20} color="#eb2f96" />
                <span>Order Items ({cartdata?.cartItems.length})</span>
              </div>
              
              {cartdata?.cartItems.map((item, index) => (
                <div key={item.id}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0'
                  }}>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '16px' }}>{item?.Product?.name}</div>
                      <div style={{ color: '#666', fontSize: '14px' }}>Size: {item?.productSize}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 600, fontSize: '16px' }}>₹{item?.Product?.price.toLocaleString()}</div>
                      <div style={{ color: '#666', fontSize: '14px' }}>₹{item?.Product?.price.toLocaleString()} x {item?.quantity}</div>
                    </div>
                  </div>
                  {index < cartdata.length - 1 && (
                    <div style={{ borderBottom: '1px solid #f0f0f0', margin: '8px 0' }} />
                  )}
                </div>
              ))}
            </div>

            {/* Payment Method */}
            <div style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginBottom: '20px',
                fontSize: '18px',
                fontWeight: 600
              }}>
                <CreditCard size={20} color="#eb2f96" />
                <span>Payment Method</span> 
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive your order' },
                  // { value: 'card', label: 'Credit/Debit Card', desc: 'Secure payment via card' },
                  { value: 'upi', label: 'UPI Payment', desc: 'Pay using UPI apps' },
                  // { value: 'netbanking', label: 'Net Banking', desc: 'Pay via your bank account' }
                ].map((method) => (
                  <label key={method.value} style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ marginTop: '4px', marginRight: '12px', cursor: 'pointer' }}
                    />
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '16px' }}>{method.label}</div>
                      <div style={{ color: '#666', fontSize: '14px' }}>{method.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Notes */}
            {/* <div style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              <div style={{ 
                fontSize: '18px',
                fontWeight: 600,
                marginBottom: '16px'
              }}>
                Order Notes (Optional)
              </div>
              
              <textarea
                rows={4}
                placeholder="Add any special instructions for your order..."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '15px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div> */}
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <ApplyCoupon />
            <div style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              position: 'sticky',
              top: '24px'
            }}>
              <div style={{ 
                fontSize: '18px',
                fontWeight: 600,
                marginBottom: '20px'
              }}>
                Order Summary
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                  <span style={{ color: '#666' }}>Subtotal (2 items)</span>
                  <span style={{ fontWeight: 500 }}>₹{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                  <span style={{ color: '#666' }}>Discount</span>
                  <span style={{ fontWeight: 500 }}>₹{discount?.coupon?.couponAmount?.toLocaleString() || 0}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                  <span style={{ color: '#666' }}>Shipping</span>
                  <span style={{ fontWeight: 500, color: '#52c41a' }}>FREE</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                  <span style={{ color: '#666' }}>Tax (GST 18%)</span>
                  <span style={{ fontWeight: 500 }}>₹{tax.toLocaleString()}</span>
                </div>
                
                <div style={{ borderBottom: '1px solid #f0f0f0', margin: '8px 0' }} />
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '20px',
                  fontWeight: 600
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
                    fontSize: '16px',
                    fontWeight: 600,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginTop: '8px'
                    
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#c41d7f'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#eb2f96'}
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
                  fontSize: '13px',
                  color: '#666'
                }}>
                  <Shield size={16} />
                  <span>Safe and secure payments. 100% secure transactions.</span> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}