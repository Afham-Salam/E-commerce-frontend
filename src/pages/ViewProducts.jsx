import React, { useEffect, useState } from 'react';
import APIClientPrivate from '../utils/axios';
import Loader from '../components/Loader';
import { FaEdit, FaTrash, FaTimes, FaCheck } from 'react-icons/fa';

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    images: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await APIClientPrivate.get('/api/product/get');
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      images: Array.isArray(product.images) ? product.images.join(', ') : product.images
    });
    setShowEditModal(true);
    setMessage('');
  };

  const handleDeleteClick = (product) => {
    setDeletingProduct(product);
    setShowDeleteModal(true);
    setMessage('');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    
    try {
      const updateData = {
        ...editForm,
        price: parseFloat(editForm.price),
        stock: parseInt(editForm.stock),
        images: editForm.images.split(',').map(img => img.trim())
      };

      const response = await APIClientPrivate.put(`/api/product/edit/${editingProduct._id}`, updateData);
      
      setMessage('Product updated successfully!');
      setShowEditModal(false);
      setEditingProduct(null);
      fetchProducts(); // Refresh the products list
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update product');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setActionLoading(true);
    
    try {
      await APIClientPrivate.delete(`/api/product/delete/${deletingProduct._id}`);
      
      setMessage('Product deleted successfully!');
      setShowDeleteModal(false);
      setDeletingProduct(null);
      fetchProducts(); // Refresh the products list
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete product');
    } finally {
      setActionLoading(false);
    }
  };

  const closeModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setEditingProduct(null);
    setDeletingProduct(null);
    setMessage('');
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center py-20">
  //       <Loader size="lg" text="Loading products..." />
  //     </div>
  //   );
  // }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto md:px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Products</h1>
      
      {/* Success/Error Message */}
      {message && (
        <div className={`text-center mb-6 p-3 rounded-lg ${
          message.includes('successfully') 
            ? 'bg-green-100 text-green-700 border border-green-300'
            : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {message}
        </div>
      )}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden w-[150px] md:w-fit relative">
            <div className="md:p-4">
              <img
                src={Array.isArray(product.images) ? product.images[0] : product.images}
                alt={product.name}
                className="w-full md:h-64 h-52 object-cover rounded-lg shadow-md mb-4"
              />
              <h2 className="md:text-2xl font-semibold text-gray-800 mb-2">{product?.name}</h2>
              <p className="md:text-lg text-gray-600 mb-2">Category: {product.category}</p>
              <p className="md:text-xl font-semibold text-gray-800 mb-2">Price: ${product.price}</p>
              <p className="md:text-md text-gray-700 mb-4">Stock Quantity: {product.stock}</p>
              
              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEditClick(product)}
                  className="flex items-center gap-1 px-3 py-2 bg-[#B88E2F] text-white rounded-lg hover:bg-[#A17A2A] transition-colors"
                  disabled={actionLoading}
                >
                  <FaEdit size={14} />
                  <span className="text-sm">Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteClick(product)}
                  className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  disabled={actionLoading}
                >
                  <FaTrash size={14} />
                  <span className="text-sm">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700"
                disabled={actionLoading}
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                  required
                  disabled={actionLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={editForm.category}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                  required
                  disabled={actionLoading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.price}
                    onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                    required
                    disabled={actionLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={editForm.stock}
                    onChange={(e) => setEditForm({...editForm, stock: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                    required
                    disabled={actionLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URLs (comma-separated)
                </label>
                <textarea
                  value={editForm.images}
                  onChange={(e) => setEditForm({...editForm, images: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                  rows="3"
                  required
                  disabled={actionLoading}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 bg-[#B88E2F] text-white py-2 px-4 rounded-lg hover:bg-[#A17A2A] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  
                    <>
                      <FaCheck />
                      <span>Update Product</span>
                    </>
                  
                </button>
                <button
                  type="button"
                  onClick={closeModals}
                  disabled={actionLoading}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FaTrash className="text-red-600" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Delete Product</h2>
                  <p className="text-gray-600">This action cannot be undone.</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                Are you sure you want to delete <strong>"{deletingProduct?.name}"</strong>?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleDeleteConfirm}
                  disabled={actionLoading}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                
                    <>
                      <FaTrash />
                      <span>Delete Product</span>
                    </>
                  
                </button>
                <button
                  onClick={closeModals}
                  disabled={actionLoading}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay for Actions */}
      {actionLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
          <Loader size="lg" text="Processing..." />
        </div>
      )}
    </div>
  );
}
