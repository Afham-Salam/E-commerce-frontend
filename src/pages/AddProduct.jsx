import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import APIClientPrivate from '../utils/axios';
import Loader from '../components/Loader';
import { FaPlus } from 'react-icons/fa';

export default function AddProduct() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await APIClientPrivate.post('/api/product/create', data);
      setMessage('Product added successfully! 🎉');
      toast.success('Product added successfully!');
      reset(); // Clear form after successful submission
      
      // Clear success message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add product. Please try again.';
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader fullScreen={true} size="xl" text="Adding product..." />}
      <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Add New Product</h1>
        
        {/* Success/Error Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-700 border-green-300'
              : 'bg-red-100 text-red-700 border-red-300'
          }`}>
            <div className="flex items-center gap-2">
              {message.includes('successfully') ? (
                <span className="text-xl">✅</span>
              ) : (
                <span className="text-xl">❌</span>
              )}
              <span className="font-medium">{message}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            {...register('name', { required: 'Product name is required' })}
            className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
            placeholder="Enter product name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            {...register('category', { required: 'Category is required' })}
            className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
            placeholder="Enter category"
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              {...register('price', { required: 'Price is required' })}
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
              placeholder="Enter price"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Stock Quantity</label>
            <input
              type="number"
              {...register('stock', { required: 'Stock is required' })}
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
              placeholder="Enter stock quantity"
            />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            {...register('images[0]', { required: 'Image URL is required' })}
            className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image URL"
          />
          {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#B88E2F] text-white font-semibold rounded-lg hover:bg-[#A17A2A] focus:outline-none focus:ring-4 focus:ring-[#B88E2F] focus:ring-opacity-50 relative flex items-center justify-center disabled:opacity-70 transition-colors"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader size="sm" text="" />
              <span>Adding Product...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaPlus />
              <span>Add Product</span>
            </div>
          )}
        </button>
      </form>
    </div>
    </>
  );
}
