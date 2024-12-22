import React, { useEffect, useState } from "react";
import APIClientPrivate from "../utils/axios";
import { RiDeleteBinLine } from "react-icons/ri";
import BenefitSection from "../components/BenefitSection";

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await APIClientPrivate.get(`/api/cart/get/${userId}`);
      const products = response.data.cart.products || [];
      setCartData(products);
      console.log("Cart Data:", products);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateSubtotal = () => {
    if (!cartData.length) return 0;
    return cartData.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!cartData.length) {
    return <div className="text-center py-10">Your cart is empty!</div>;
  }

  const subtotal = calculateSubtotal();

  return (
    <>
      <div className="w-full">
        <img
          className="w-full h-[280px] object-cover"
          src="/cart.png"
          alt="Cart Banner"
        />

        <div className=" mt-6 flex flex-col md:flex-row gap-10 justify-center p-4 space-y-4 md:space-y-0 md:space-x-">
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
                  {cartData.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 ">
                      <td className="flex items-center p-4 border-b">
                        <img
                          src={item.productId.images}
                          alt={item.productId.name}
                          className="w-12 h-12 rounded-md mr-4"
                        />
                        <span>{item.productId.name}</span>
                      </td>
                      <td className="p-4 border-b">Rs. {item.productId.price}</td>
                      <td className="p-4 border-b flex gap-2">
                       <button className="bg-green-500 px-2 text-white font-semibold ">+</button> <div className="w-12 text-center border rounded-md">{item.quantity}</div><button  className="bg-red-500 px-3 text-white font-semibold  ">-</button>
                      </td>
                      <td className="p-4 border-b">
                        Rs. {(item.productId.price * item.quantity).toFixed(2)}
                      </td>
                      <td>
                        <RiDeleteBinLine className="text-2xl text-red-600" />
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
            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
              Check Out
            </button>
          </div>
        </div>
      </div>
      <BenefitSection/>
    </>
  );
}
