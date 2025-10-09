"use client";
import React, { useEffect, useState } from 'react';
import { ShoppingBag, User, MapPin, CreditCard, Shield, ChevronDown } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getListData } from '@/lib/customfetch/customFetch';
import { useDispatch, useSelector } from 'react-redux';
import endpoints from '@/lib/endpoints/endponts';

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderNotes, setOrderNotes] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');

  const dispatch = useDispatch()
 const {Address} = useSelector((state:any)=> state?.reduxData?.data)
 useEffect(()=>{
   fetchdata()
 },[])
  const fetchdata = async ()=>{
    await getListData(dispatch, "Address", endpoints?.user?.getAddress )
  }

  const cartItems = [
    {
      id: 1,
      name: 'Lehnga',
      size: 'xxl',
      price: 1200,
      quantity: 1,
      total: 14400,
    },
    {
      id: 2,
      name: 'blouse',
      size: 'S',
      price: 2100,
      quantity: 1,
      total: 6300,
    },
    {
      id: 3,
      name: 'Salwar Kurta',
      size: 'XL',
      price: 12000,
      quantity: 1,
      total: 12000,
    },
  ];

  const subtotal = 2000;
  const shipping = 0;
  const tax = 360;
  const total = 2360;

  const showToast = (message, type) => {
    setMessageText(message);
    setMessageType(type);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      showToast('Please select a delivery address', 'error');
      return;
    }
    showToast('Order placed successfully!', 'success');
  };

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
                >
                  <option value="">Select a delivery address</option>
                  { Address?.addresses?.map((addr) => (
                    <option key={addr.id} value={addr.addressLine1}>
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
                <span>Order Items ({cartItems.length})</span>
              </div>
              
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0'
                  }}>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '16px' }}>{item.name}</div>
                      <div style={{ color: '#666', fontSize: '14px' }}>Size: {item.size}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 600, fontSize: '16px' }}>₹{item.total.toLocaleString()}</div>
                      <div style={{ color: '#666', fontSize: '14px' }}>₹{item.price.toLocaleString()} x {item.quantity}</div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && (
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
                  { value: 'card', label: 'Credit/Debit Card', desc: 'Secure payment via card' },
                  { value: 'upi', label: 'UPI Payment', desc: 'Pay using UPI apps' },
                  { value: 'netbanking', label: 'Net Banking', desc: 'Pay via your bank account' }
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
            <div style={{
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
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
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