import React from "react";
import Relatedproduct from "../components/Relatedproduct";

export default function Product() {
  return (
    <>
      <div className="bg-[#fff3e3] border-gray-500   opacity-60 text-sm border-0 p-5 items-center">
        <span>Home &emsp; &gt; &emsp; Shop &emsp; &gt; &emsp; ProductName</span>
      </div>

      {/* product section */}
      <div className="flex justify-center  pt-10 ">
        <div className="flex flex-col    md:flex-row gap-16  w-[80%]">
          <img src="/product-img-4.webp" className="w-[20rem] rounded-md" />

          <div className="text-black  flex  flex-col gap-6 ">
            <p className="text-[30px] font-semibold ">Product Name</p>
            <p className="text-md font-semibold border-gray-500 opacity-50">
              Rs 25,000{" "}
            </p>
            <p className="text-yellow-500 lg:text-[20px] flex items-center">
              &#9733; &#9733; &#9733; &#9734;
              <span className="border-l-2 border-gray-600 h-6 mx-3"></span>
              <span className="text-gray-500 text-sm">4 Customer reviews</span>
            </p>

            <div className="lg:w-[30rem]   text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
              neque molestiae in vitae, voluptatem ad tenetur numquam et
              voluptate inventore repudiandae, deleniti harum eos accusamus.
              Minima quidem qui doloribus officiis?
            </div>
            <button className="w-32 text-sm py-2 border-2 border-black text-black rounded-lg bg-transparent hover:bg-black hover:text-white transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Relatedproduct />
    </>
  );
}
