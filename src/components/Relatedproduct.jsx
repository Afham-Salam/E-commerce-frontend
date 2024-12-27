import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Relatedproduct() {
    const navigate=useNavigate()
  return (
    <div className="mt-20">
                <h2 className="text-[30px] font-bold text-black text-center">Related Products</h2>
                <div className="flex justify-center">
                    <div className="flex gap-10 w-[80%] flex-wrap justify-between mt-10">
                        {Array(8)
                            .fill(null)
                            .map((_, index) => (
                                <div className="w-[17rem] bg-[#F4F5F7]" key={index}>
                                    <img src={`/product-img-${(index % 4) + 1}.webp`} alt={`Product ${index + 1}`} />
                                    <div className="p-4 mt-2">
                                        <h3 className="text-black text-[18px] font-semibold">Product Name</h3>
                                        <p className="text-[#898989] text-[16px] font-medium">Stylish cafe chair</p>
                                        <div className="flex justify-between">
                                            <h6 className="text-black text-[16px] font-semibold">Rs 2.500.000</h6>
                                            <h6 className="text-[#898989] text-[16px] font-medium line-through">Rs 3.500.000</h6>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="flex justify-center mt-12">
                    <button onClick={()=>navigate('/shop')} className="px-14  text-sm py-2 border-2 border-[#B88E2F] hover:bg-[#B88E2F] hover:text-white text-black bg-transparent transition duration-300 ">
                        Show More
                    </button>
                </div>
            </div>
  )
}
