import React, { useEffect, useState } from "react";
import Relatedproduct from "../components/Relatedproduct";
import { useNavigate, useParams } from "react-router-dom";
import APIClientPrivate from "../utils/axios";
import BenefitSection from "../components/BenefitSection";
import {
  BorderTopOutlined
} from '@ant-design/icons';
import { Button, notification } from 'antd';

export default function Product() {
  const [data, setData] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { productid } = useParams();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await APIClientPrivate.get(
          `/api/product/get/${productid}`
        )
        setData(response.data);
        console.log("Product", response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [productid]);

  const openNotification = () => {
    api.info({
      message: `Notification`,
      description:
        'Product added to cart successfully!',
      placement: 'top',
    });
  };

  const postCart = async () => {
    const userId = localStorage.getItem("userId");
    const datas = {
      userId: userId,
      productId: productid,
    };

    try {
      const response = await APIClientPrivate.post(`/api/cart/add`, datas);
      console.log("Added to Cart:", response.data);
      setIsAddedToCart(true);
      openNotification();
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart!");
    }
  };

  if (!data) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <>
      {contextHolder}
      <div className="bg-[#fff3e3] border-gray-500 opacity-60 text-sm border-0 p-5 items-center">
        <span>Home &emsp; &gt; &emsp; Shop &emsp; &gt; &emsp; {data.name}</span>
      </div>

      <div className="flex justify-center pt-10">
        <div className="flex flex-col md:flex-row gap-16 w-[80%]">
          <img
            src={data.images}
            className="w-[20rem] rounded-md"
            alt={data.name}
          />
          <div className="text-black flex flex-col gap-6">
            <p className="text-[30px] font-semibold">{data.name}</p>
            <p className="text-md font-semibold border-gray-500 opacity-50">
              ${data.price}
            </p>
            <p className="text-yellow-500 lg:text-[20px] flex items-center">
              &#9733; &#9733; &#9733; &#9734;
              <span className="border-l-2 border-gray-600 h-6 mx-3"></span>
              <span className="text-gray-500 text-sm">4 Customer reviews</span>
            </p>

            <div className="lg:w-[30rem] text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Doloremque obcaecati voluptatum nam reprehenderit eligendi quae
              nemo odit dignissimos, hic totam neque? Ipsam tempore tempora rem
              placeat porro voluptatum ducimus veniam.
            </div>
            <div className="flex gap-2">
              
              <Button
                onClick={isAddedToCart ? goToCart : postCart}
               
                className="w-32 text-sm  border-2 border-black text-black rounded-lg bg-transparent hover:bg-black hover:text-white transition duration-300">
               
              
                 {isAddedToCart ? "Go to Cart" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Relatedproduct />
      <BenefitSection />
    </>
  );
}
