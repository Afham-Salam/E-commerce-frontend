
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import APIClientPrivate from "../utils/axios";
import BenefitSection from "../components/BenefitSection";

export default function Shop() {
  const [view, setView] = useState("grid");
  const [showCount, setShowCount] = useState(16);
  const [sortBy, setSortBy] = useState("default");
  const [data, setData] = useState([]); // State to store the API data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await APIClientPrivate.get(
          "/api/product/get"
        );
        
        setData(response.data); 
        
        
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData(); // Call the function to fetch data
  }, []); // Run only once when the component mounts

  return (
    <>
      {/* Banner */}
      <div className="w-full">
        <img
          className="w-full h-[280px] object-cover"
          src="/shop.png"
          alt="Shop Banner"
        />
        {/* Filter Section */}
        <div className="flex flex-wrap items-center justify-between p-4 bg-beige-50 border border-gray-200">
          

          

         

         

          {/* Sort By Section */}
          
        </div>
      </div>

      {/* Product Cards */}
      <div className="flex justify-center">
      <div
        className="w-[85%] h-auto grid lg:grid-cols-4 md:grid-cols-3 gap-10 pt-10 " 
         
      >
        {data.map((product) => (
          <div
          key={product._id} // Replace `_id` with the unique identifier in your API data
          className="group max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden border relative"
        >
          {/* Product Image Section */}
          <div className="relative">
            <img
              src={product.images}
              alt={product.name}
              className="w-full h-fit object-cover transition-transform duration-300 group-hover:scale-105"
            />
        
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -30%
            </span>
        
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Link to={`/viewproduct/${product._id}`} className="bg-white text-black font-semibold px-4 py-2 rounded shadow hover:bg-gray-200 " >
                View Details
              </Link>
            </div>
          </div>
        
          {/* Product Info Section */}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        
            <div>
              <span className="text-lg font-bold text-gray-800">
                RS {product.price.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>        
        ))}
      </div>
      </div>
      <BenefitSection/>
    </>
  );
}
