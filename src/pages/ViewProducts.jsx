import React, { useEffect, useState } from 'react';
import APIClientPrivate from '../utils/axios';

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await APIClientPrivate.get('/api/product/get');
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto md:px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Products</h1>
      <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden w-[150px] md:w-fit">
            <div className="md:p-4  ">
              <img
                src={product.images[0]} // Assuming product.images is an array
                alt={product.name}
                className="w-full md:h-64 h-52 object-cover rounded-lg shadow-md mb-4"
              />
              <h2 className="md:text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
              <p className="md:text-lg text-gray-600 mb-2">Category: {product.category}</p>
              <p className="md:text-xl font-semibold text-gray-800 mb-2">Price: ${product.price}</p>
              <p className="md:text-md text-gray-700 mb-4">Stock Quantity: {product.stock}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
