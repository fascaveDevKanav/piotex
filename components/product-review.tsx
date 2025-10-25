"use client";
import React, { useState } from "react";
import { Modal, Input, Upload, Button, Rate, message } from "antd";
import { PlusOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import "../styles/review.css"; 

// 🧾 Reviews List Component
export const ReviewsList = ({ reviews, onAddClick }) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Reviews</h1>
          <p className="text-gray-600 mt-1">{reviews.length} reviews</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="custom-pink-button"
          onClick={onAddClick}
        >
          Add Review
        </Button>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-pink-50 rounded-lg border border-pink-200">
            <p className="text-gray-500 text-lg">
              No reviews yet. Be the first to review!
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-pink-100 rounded-lg p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white">
                    <UserOutlined />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {review.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(review.date)}
                    </p>
                  </div>
                </div>
                <Rate disabled defaultValue={review.rating} />
              </div>
              <p className="mt-4 text-gray-700">{review.comment}</p>
              {review.image && (
                <div className="mt-4">
                  <img
                    src={review.image}
                    alt="Review"
                    className="rounded-lg max-h-64 object-cover border-2 border-pink-100"
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 💬 Add Review Modal using Ant Design
export const AddReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
    image: null,
  });
  const [fileList, setFileList] = useState([]);

  const handleOk = () => {
    if (!formData.name.trim()) {
      message.error("Please enter your name");
      return;
    }
    if (formData.rating === 0) {
      message.error("Please select a rating");
      return;
    }
    if (!formData.comment.trim()) {
      message.error("Please enter your review");
      return;
    }

    onSubmit(formData);
    message.success("Review submitted successfully!");
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({ name: "", rating: 0, comment: "", image: null });
    setFileList([]);
    onClose();
  };

  const handleUpload = ({ fileList: newList }) => {
    setFileList(newList);
    if (newList.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, image: e.target.result });
      };
      reader.readAsDataURL(newList[0].originFileObj);
    } else {
      setFormData({ ...formData, image: null });
    }
  };

  return (
    <Modal
      title={<span className="text-lg font-semibold text-pink-600">Add Your Review</span>}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Submit Review"
      cancelText="Cancel"
      okButtonProps={{
        className: "custom-pink-button"
      }}
    >
      <div className="space-y-4 mt-4">
        {/* Name */}
        <Input
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        {/* Rating */}
        <div>
          <p className="font-medium text-gray-700 mb-1">Rating</p>
          <Rate
            value={formData.rating}
            onChange={(value) => setFormData({ ...formData, rating: value })}
          />
        </div>

        {/* Comment */}
        <Input.TextArea
          placeholder="Write your review..."
          rows={4}
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        />

        {/* Image Upload */}
        <div>
          <p className="font-medium text-gray-700 mb-1">Upload Image (Optional)</p>
          <Upload
            accept="image/*"
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false} // prevent auto upload
            onChange={handleUpload}
            onRemove={() => handleUpload({ fileList: [] })}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </div>
      </div>
    </Modal>
  );
};