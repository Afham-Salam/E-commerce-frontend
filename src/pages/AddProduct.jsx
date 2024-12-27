import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import APIClientPrivate from '../utils/axios';

export default function AddProduct() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await APIClientPrivate.post('/api/product/create', data);
      toast.success('Product added successfully!');
      reset(); // Clear form after successful submission
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            {...register('name', { required: 'Product name is required' })}
            className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            {...register('category', { required: 'Category is required' })}
            className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Stock Quantity</label>
            <input
              type="number"
              {...register('stock', { required: 'Stock is required' })}
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
