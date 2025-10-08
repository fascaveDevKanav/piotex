"use client";

import { useEffect, useState } from "react";
import { Card, Tag, Empty, Modal } from "antd";
import {
  HomeOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { getListData } from "@/lib/customfetch/customFetch";
import { useDispatch, useSelector } from "react-redux";
import endpoints from "@/lib/endpoints/endponts";


// Sample data - replace with actual API data
const initialAddresses = [
  {
    id: 1,
    fullName: "John Doe",
    phone: "+91 98765 43210",
    addressLine1: "123 Main Street, Sector 15",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400001",
    country: "India",
    addressType: "Home",
    isDefault: true,
  },
  {
    id: 2,
    fullName: "John Doe",
    phone: "+91 98765 43210",
    addressLine1: "456 Business Park, IT Hub",
    city: "Bangalore",
    state: "Karnataka",
    postalCode: "560001",
    country: "India",
    addressType: "Work",
    isDefault: false,
  },
  {
    id: 3,
    fullName: "Jane Doe",
    phone: "+91 98765 43211",
    addressLine1: "789 Park Avenue, Green Valley",
    city: "Delhi",
    state: "Delhi",
    postalCode: "110001",
    country: "India",
    addressType: "Other",
    isDefault: false,
  },
];

export default function SavedAddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [loading, setLoading] = useState(false);
 const dispatch = useDispatch()
 const {Address} = useSelector((state:any)=> state?.reduxData?.data)
 useEffect(()=>{
   fetchdata()
 },[])
  const fetchdata = async ()=>{
    setLoading(true)
    await getListData(dispatch, "Address", endpoints?.user?.getAddress )
  }

  console.log("address", Address?.addresses?.fullName)
 



  const getTypeColor = (type: string) => {
    switch (type) {
      case "Home":
        return "pink";
      case "Work":
        return "blue";
      default:
        return "purple";
    }
  };

  return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Addresses</h1>
            <p className="text-gray-500 mt-1">
              Manage your saved delivery addresses
            </p>
          </div>
   
        </div>

        {Address?.addresses?.length === 0 ? (
          <Card className="shadow-lg rounded-2xl">
            <Empty
              description={
                <span className="text-gray-500">
                  No saved addresses found. Add your first address!
                </span>
              }
            />
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Address?.addresses?.map((address: any) => (
              <Card
                key={address.id}
                className="shadow-lg rounded-2xl border border-pink-100 hover:shadow-xl transition-shadow duration-300 relative"
              
              >
              

                {/* Address Type Icon */}
                <div className="flex items-center mb-4 ">
                  <div
                    className="rounded-full h-12 w-12 flex items-center justify-center text-xl shadow-sm"
                    style={{
                      backgroundColor:
                        address.addressType === "Home"
                          ? "#fce7f3"
                          : address.addressType === "Work"
                          ? "#dbeafe"
                          : "#f3e8ff",
                      color:
                        address.addressType === "Home"
                          ? "#ec4899"
                          : address.addressType === "Work"
                          ? "#3b82f6"
                          : "#a855f7",
                    }}
                  >
                    <HomeOutlined />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {address.fullName}
                      </h3>
                      <Tag
                        color={getTypeColor(address.addressType)}
                        className="rounded-full"
                      >
                        {address.addressType}
                      </Tag>
                    </div>
                  </div>
                </div>

                {/* Address Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start text-gray-600">
                    <PhoneOutlined className="text-pink-500 mt-1 mr-2" />
                    <span>{address.phone}</span>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <EnvironmentOutlined className="text-pink-500 mt-1 mr-2" />
                    <div>
                      <p className="mb-1">{address.addressLine1}</p>
                      <p>
                        {address.city}, {address.state} - {address.postalCode}
                      </p>
                      <p>{address.country}</p>
                    </div>
                  </div>
                </div>

              </Card>
            ))}
          </div>
        )}
      </main>
  );
}