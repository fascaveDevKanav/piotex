"use client";

import React, { useState } from "react";
import { Input, Button, Form, Alert } from "antd";

export default function ApplyCoupon() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: { coupon: string }) => {
    setLoading(true);
    console.log("Applied Coupon:", values.coupon);
    setTimeout(() => setLoading(false), 1000); // simulate API call
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "20px 0",
      }}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap", // responsive
        }}
      >
        <Form.Item
          name="coupon"
          rules={[{ required: true, message: "Please enter a coupon code" }]}
          style={{ margin: 0 }}
        >
          <Input
            placeholder="Enter coupon code..."
            size="large"
            style={{
              width: "250px",
              borderColor: "#fbcfe8",
              boxShadow: "none",
              borderRadius: "8px",
            }}
          />
        </Form.Item>

        <Form.Item style={{ margin: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            style={{
              backgroundColor: "#ec4899",
              borderColor: "#ec4899",
              color: "white",
              fontWeight: "600",
              height: "40px",
              paddingLeft: "32px",
              paddingRight: "32px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="shadow-md hover:shadow-lg transition-all duration-200"
          >
            Apply
          </Button>
        </Form.Item>
      </Form>

      {/* Soft pink note box */}
      <div style={{ marginTop: "16px", width: "100%", maxWidth: "400px" }}>
        <Alert
          message="If you generated the code, the discount will automatically apply to your first order."
          type="info"
          showIcon
          style={{
            backgroundColor: "#fdf2f8", // soft pink background
            borderColor: "#f9a8d4", // pink border
            color: "#9d174d", // darker pink text
            borderRadius: "8px",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        />
      </div>
    </div>
  );
}
