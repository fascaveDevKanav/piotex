// components/AddReviewModal.tsx
'use client';

import React, { useState } from 'react';
import {
  Modal,
  Rate,
  Button,
  Input,
  Upload,
  message,
  Image,
  Form,
  Row,
  Col
} from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { addData } from '@/lib/customfetch/customFetch';
import endpoints from '@/lib/endpoints/endponts';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { reduxSliceData } from '@/redux/features/reduxData';

const { TextArea } = Input;

interface AddReviewModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (review: {
    rating: number;
    comment: string;
    productId: number;
    images: string[];
  }) => void;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({
  visible,
  onCancel,
  onSubmit
}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const params = useParams();
  const dispatch = useDispatch();
  const [loader,setLoader]= useState(false)


  const handleSubmit = async () => {

    try {
      setLoader(true)

      if (rating === 0) {
        message.error('Please select a rating');
        return;
      }

      if (!comment.trim()) {
        message.error('Please write a review');
        return;
      }

      const formdata = new FormData();
      formdata.append('rating', rating.toFixed(1));
      formdata.append('comment', comment);
      formdata.append('productId', params?.id);
      fileList.forEach(
        (file) =>
          file.originFileObj &&
          formdata.append("images", file.originFileObj as File)
      );
      const response = await addData(endpoints?.products?.createreview, formdata, true)
      if (response?.success) {
        setRating(0);
        setComment('');

        setFileList([]);
        form.resetFields();
        message.success('Review submitted successfully');
        dispatch(reduxSliceData({key:"reviewload", data:true}))
        onCancel();
        setLoader(false)
      }
      else {
        message.error(response?.message || 'Failed to submit review');
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      error instanceof Error ? message.error(error.message) : message.error('An unexpected error occurred');

    }

    // Reset form



  };

  const handleCancel = () => {
    setRating(0);
    setComment('');
    setFileList([]);
    form.resetFields();
    onCancel();
  };

  const handleRemoveImage = (file: UploadFile) => {
    const newFileList = fileList.filter(item => item.uid !== file.uid);
    setFileList(newFileList);
  };

  const uploadButton = (
    <div className="flex flex-col items-center justify-center py-10">
      <PlusOutlined className="text-pink-400 text-2xl mb-2" />
      <div className="text-pink-600 font-medium text-sm">Upload Image</div>
      <div className="text-gray-500 text-xs mt-1">Up to 3 images</div>
    </div>
  );

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Image must be smaller than 5MB!');
        return false;
      }

      return false; // Prevent auto upload
    },
    fileList,
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList.slice(-3)); // Limit to 3 images
    },
    multiple: true,
    accept: 'image/*',
    listType: 'picture-card',
    onRemove: handleRemoveImage
  };

  return (
    <Modal
      title={
        <div className="text-pink-600 text-xl font-bold text-center">
          Write a Review
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={520}
      className="review-modal"
      closeIcon={<CloseOutlined className="text-pink-500" />}
    >
      <Form
        form={form}
        layout="vertical"
        className="p-1"
      >

        {/* Rating */}
        <Form.Item
          label={<span className="text-gray-700 font-medium">Your Rating *</span>}
          required
        >
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-4">
              <Rate
                value={rating}
                onChange={setRating}
                className="text-pink-500 text-2xl"
              />
              <span className="text-pink-600 font-semibold text-lg">
                {rating > 0 ? `${rating}.0` : '0.0'}
              </span>
            </div>
            <div className="text-gray-500 text-sm">
              {rating === 0 && 'Click to rate'}
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </div>
          </div>
        </Form.Item>

        {/* Review Comment */}
        <Form.Item
          label={<span className="text-gray-700 font-medium">Your Review *</span>}
          required
        >
          <TextArea
            rows={4}
            placeholder="Share your experience with this product... What did you like or dislike?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-pink-200 focus:border-pink-500 hover:border-pink-300 rounded-lg resize-none"
            maxLength={500}
            showCount
            typeof='text'
          />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item
          label={<span className="text-gray-700 font-medium">Add Photos (Optional)</span>}
        >
          <div className="space-y-4">
            <Upload {...uploadProps} className='p-5' >

              {fileList.length >= 3 ? null : uploadButton}
            </Upload>

            {/* Preview Images */}
            {fileList.length > 0 && (
              <div className="mt-4">
                <div className="text-gray-700 font-medium mb-3">Preview ({fileList.length}/3)</div>
                <Row gutter={[12, 12]}>
                  {fileList.map((file, index) => (
                    <Col key={file.uid} span={8}>
                      <div className="relative group">
                        <div className="w-full h-24 rounded-lg overflow-hidden border-2 border-pink-200">
                          <Image
                            width="100%"
                            height="100%"
                            src={file.thumbUrl || URL.createObjectURL(file.originFileObj as Blob)}
                            alt={`Preview ${index + 1}`}
                            className="object-cover w-full h-full"
                            preview={{
                              mask: null,
                            }}
                          />
                        </div>
                        <Button
                          type="text"
                          icon={<CloseOutlined className="text-white" />}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 border-none w-6 h-6 min-w-0 flex items-center justify-center rounded-full"
                          onClick={() => handleRemoveImage(file)}
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </div>
        </Form.Item>

        {/* Action Buttons */}
        <Form.Item className="mb-0">
          <div className="flex justify-end space-x-3 pt-4 border-t border-pink-100">
            <Button
              onClick={handleCancel}
              size="large"
              className="h-12 px-6 border-pink-300 text-pink-600 hover:border-pink-400 hover:text-pink-700 rounded-lg font-medium"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              size="large"
              className="h-12 px-8 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 border-none rounded-lg font-medium shadow-lg shadow-pink-200"
              loading={loader}
            >
              Submit Review
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddReviewModal;