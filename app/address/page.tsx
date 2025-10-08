"use client";

import { useState } from "react";
import { Input, Select, Button, Card, Typography, Form } from "antd";
import { UserOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { addData } from "@/lib/customfetch/customFetch";
import endpoints from "@/lib/endpoints/endponts";
import { message } from "antd";
import SavedAddressesPage from "@/components/address-comp";

const { Title } = Typography;
const { Option } = Select;

export default function AddressPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [refreshAddresses, setRefreshAddresses] = useState(0);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log(values);
    const res = await addData(endpoints?.user?.address, values);
    if (res?.success) {
      form.resetFields();
      message.success("Address added successfully");
      // Trigger refresh of saved addresses
      setRefreshAddresses((prev) => prev + 1);
    } else {
      message.error(res?.message || "Failed to add address");
    }
    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Saved Addresses Section */}
        <SavedAddressesPage key={refreshAddresses} />

        {/* Add New Address Section */}
        <div className="mt-8">
          <Card className="w-full shadow-lg rounded-2xl border border-pink-100 bg-white">
            {/* Header */}
            <div className="flex items-center mb-6">
              <div className="bg-pink-100 text-pink-600 font-semibold rounded-full h-12 w-12 flex items-center justify-center text-xl shadow-sm">
                <HomeOutlined />
              </div>
              <div className="ml-4">
                <Title level={3} className="m-0 text-gray-800">
                  Add New Address
                </Title>
                <p className="text-gray-500 text-sm">
                  Manage your delivery information
                </p>
              </div>
            </div>

            {/* Form */}
            <Form
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              requiredMark={false}
              className="grid md:grid-cols-2 gap-x-6 gap-y-5"
            >
              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">Full Name</span>
                }
                name="fullName"
                rules={[{ required: true, message: "Please enter full name" }]}
              >
                <Input
                  prefix={<UserOutlined className="text-pink-500" />}
                  placeholder="Enter full name"
                  size="large"
                  className="rounded-lg"
                  style={{
                    borderColor: "#fbcfe8",
                    boxShadow: "none",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-700 font-medium">Phone</span>}
                name="phone"
                rules={[
                  { required: true, message: "Please enter phone number" },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="text-pink-500" />}
                  placeholder="Enter phone number"
                  size="large"
                  className="rounded-lg"
                  style={{
                    borderColor: "#fbcfe8",
                    boxShadow: "none",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">
                    Address Line 1
                  </span>
                }
                name="addressLine1"
                rules={[{ required: true, message: "Please enter address" }]}
                className="md:col-span-2"
              >
                <Input
                  prefix={<HomeOutlined className="text-pink-500" />}
                  placeholder="House number, street name, area"
                  size="large"
                  className="rounded-lg"
                  style={{
                    borderColor: "#fbcfe8",
                    boxShadow: "none",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-700 font-medium">City</span>}
                name="city"
                rules={[{ required: true, message: "Please enter city" }]}
              >
                <Input
                  placeholder="Enter city"
                  size="large"
                  className="rounded-lg"
                  style={{
                    borderColor: "#fbcfe8",
                    boxShadow: "none",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-700 font-medium">State</span>}
                name="state"
                rules={[{ required: true, message: "Please enter state" }]}
              >
                <Input
                  placeholder="Enter state"
                  size="large"
                  className="rounded-lg"
                  style={{
                    borderColor: "#fbcfe8",
                    boxShadow: "none",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">Postal Code</span>
                }
                name="postalCode"
                rules={[{ required: true, message: "Please enter postal code" }]}
              >
                <Input
                  placeholder="Enter postal code"
                  size="large"
                  className="rounded-lg"
                  style={{
                    borderColor: "#fbcfe8",
                    boxShadow: "none",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">Country</span>
                }
                name="country"
                initialValue="India"
                rules={[{ required: true, message: "Please enter country" }]}
              >
                <Input
                  placeholder="Enter country"
                  size="large"
                  className="rounded-lg"
                  style={{
                    borderColor: "#fbcfe8",
                    boxShadow: "none",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">Address Type</span>
                }
                name="addressType"
                rules={[
                  { required: true, message: "Please select address type" },
                ]}
              >
                <Select
                  placeholder="Select type"
                  size="large"
                  className="rounded-lg"
                  style={{
                    borderColor: "#fbcfe8",
                  }}
                >
                  <Option value="Home">Home</Option>
                  <Option value="Work">Work</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <div className="md:col-span-2 flex justify-end mt-4">
                <Button
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  style={{
                    backgroundColor: "#ec4899",
                    borderColor: "#ec4899",
                    color: "white",
                    fontWeight: "600",
                    height: "44px",
                    paddingLeft: "32px",
                    paddingRight: "32px",
                  }}
                  className="rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#db2777";
                    e.currentTarget.style.borderColor = "#db2777";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ec4899";
                    e.currentTarget.style.borderColor = "#ec4899";
                  }}
                >
                  Save Address
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}