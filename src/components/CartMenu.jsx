import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import APIClientPrivate from "../utils/axios";

const CartMenu = () => {
  const [isOpen, setIsOpen] = useState(true);  
  const cartRef = useRef(null);  
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Close the cart if the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch cart data
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

  return (
    isOpen && (
      <div
        className="flex justify-center items-center absolute top-20 right-0"
        ref={cartRef}
      >
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <IoIosCloseCircle
              className="text-black text-2xl cursor-pointer hover:text-red-500"
              onClick={() => setIsOpen(false)}
              aria-label="Close Cart"
            />
          </div>

          {/* Loading State */}
          {loading ? (
            <p className="text-center py-4">Loading...</p>
          ) : cartData.length > 0 ? (
            <div className="space-y-4">
              {cartData.map((item) => (
                <div key={item.productId._id} className="flex justify-between gap-20 items-center">
                  <div className="flex  items-center space-x-4">
                    <img
                      src={item.productId.images}
                      alt={item.productId.name}
                      className="w-16 h-16 rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.productId.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {item.quantity} × ₹{item.productId.price}
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-red-500"
                    aria-label={`Remove ${item.productId.name}`}
                  >
                    <RiDeleteBinLine className="text-2xl text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500">Your cart is empty.</p>
          )}

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Subtotal</span>
              <span className="text-lg font-semibold text-yellow-600">
                ₹{cartData.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)}
              </span>
            </div>
          </div>

          <div className="mt-6  flex flex-col justify-between gap-2">
            <Link
              to={"/cart"}
              onClick={()=>setIsOpen(false)}
              className="flex-1 text-center text-white bg-yellow-600 hover:bg-yellow-700   py-2 rounded-lg font-medium cursor-pointer"
            >
              View Cart
            </Link>
           <div className="flex gap-2 ">
           <button className=" bg-gray-200 w-full text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300  cursor-pointer">
              Checkout
            </button>
            <button className=" bg-gray-200 w-full text-gray-800 text-sm px-4 py-2 rounded-lg font-medium hover:bg-gray-300 cursor-pointer">
              Compare
            </button>
           </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CartMenu;
