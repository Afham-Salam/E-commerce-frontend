import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  incrementCartItem,
  decrementCartItem,
  removeFromCart,
} from "../redux/cartSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import BenefitSection from "../components/BenefitSection";
import cartImage from "/cart.webp"; // Proper static import

export default function Cart() {
  const dispatch = useDispatch(); 
  const { items, status, error } = useSelector((state) => state.cart);
  const userId = localStorage.getItem("userId");

  // Fetch cart items on component mount
  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [dispatch, userId]);

  const calculateSubtotal = () => {
    if (!items.length) return 0;
    return items.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!items.length) {
    return <div className="text-center py-10">Your cart is empty!</div>;
  }

  const subtotal = calculateSubtotal();

  return (
    <>
      <div className="w-full">
        <img
          className="w-full h-[280px] object-cover"
          src={cartImage}
          alt="Cart Banner"
          loading="lazy" // Native lazy loading for images
        />

        <div className="mt-6 flex flex-col md:flex-row gap-10 justify-center p-4 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-2/3 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#FFF3E3]">
                    <th className="p-4 border-b">Product</th>
                    <th className="p-4 border-b">Price</th>
                    <th className="p-4 border-b">Quantity</th>
                    <th className="p-4 border-b">Subtotal</th>
                    <th className="p-4 border-b"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="p-4 border-0">
                        <div className="flex items-center">
                          <img
                            src={item.productId.images}
                            alt={item.productId.name}
                            className="w-12 h-12 rounded-md mr-4"
                            loading="lazy" // Native lazy loading for product images
                          />
                          <span>{item.productId.name}</span>
                        </div>
                      </td>
                      <td className="p-4">Rs. {item.productId.price}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => dispatch(decrementCartItem({ userId: userId, productId: item.productId._id }))}
                            className="bg-red-500 px-3 py-1 text-white font-semibold rounded hover:bg-red-600"
                          >
                            -
                          </button>
                          <div className="w-10 text-center border rounded-md py-1">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => dispatch(incrementCartItem({ userId: userId, productId: item.productId._id }))}
                            className="bg-green-500 px-2 py-1 text-white font-semibold rounded hover:bg-green-600"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        Rs. {(item.productId.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="p-4">
                        <RiDeleteBinLine
                          onClick={() => dispatch(removeFromCart({ userId: userId, productId: item.productId._id }))}
                          className="text-2xl text-red-600 cursor-pointer hover:text-red-800"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-full h-fit md:w-[400px] bg-[#FFF3E3] p-6 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-4">Cart Totals</p>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-gray-700">Rs. {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-700 font-semibold">Total</span>
              <span className="text-gold-600 font-bold">Rs. {subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
              Check Out
            </button>
          </div>
        </div>
      </div>
      <BenefitSection />
    </>
  );
}