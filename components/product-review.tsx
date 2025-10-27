// components/ProductReviews.tsx
'use client';

import React, { useState } from 'react';
import { Button, Rate, Image, Avatar, List, Comment } from 'antd';
import { StarFilled, UserOutlined } from '@ant-design/icons';
import AddReviewModal from './add-reviewModal';
import { useSelector } from 'react-redux';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

const ProductReviews: React.FC = () => {
 
 const { productReviews } = useSelector((state:any)=> state?.reduxData?.data)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAddReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    
    setIsModalVisible(false);
  };

  // const averageRating = productReviews?.reviews?.reduce((acc, review) => acc + review.rating, 0) / productReviews.length;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-600 mb-4">Customer Reviews</h1>
          
          {/* Rating Summary */}
          <div className="bg-pink-50 rounded-lg p-6 mb-6 border border-pink-200">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-center">
                {/* <div className="text-4xl font-bold text-pink-600">{averageRating.toFixed(1)}</div> */}
                {/* <Rate 
                  disabled 
                  value={averageRating} 
                  className="text-pink-500 text-lg"
                /> */}
                <div className="text-gray-600 text-sm mt-1">
                  {productReviews?.reviews?.length} reviews
                </div>
              </div>
            </div>
            <Button 
              type="primary"
              className="bg-pink-500 hover:bg-pink-600 border-pink-500"
              size="large"
              onClick={showModal}
            >
              Write a Review
            </Button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {productReviews?.reviews?.map((review) => (
            <div 
              key={review.id}
              className="bg-white rounded-lg border border-pink-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar 
                    size="large" 
                    icon={<UserOutlined />} 
                    className="bg-pink-100 text-pink-600"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">{review.user}</div>
                    <div className="flex items-center space-x-2">
                      <Rate 
                        disabled 
                        value={review.rating} 
                        className="text-pink-500 text-sm"
                      />
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Comment */}
              <div className="text-gray-700 mb-4 leading-relaxed">
                {review.comment}
              </div>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex space-x-2 mt-4">
                  {review.images.map((image, index) => (
                    <div key={index} className="w-20 h-20 rounded-lg overflow-hidden border border-pink-200">
                      <Image
                        width={80}
                        height={80}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="object-cover"
                        placeholder={
                          <div className="w-20 h-20 bg-pink-100 flex items-center justify-center">
                            <span className="text-pink-300">Loading</span>
                          </div>
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Review Modal */}
        <AddReviewModal
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onSubmit={handleAddReview}
        />
      </div>
    </div>
  );
};

export default ProductReviews;