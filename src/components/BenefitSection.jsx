import React from "react";
import { FaTrophy, FaShippingFast, FaHeadset } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const benefits = [
  {
    icon: <FaTrophy className="text-4xl text-black" />, 
    title: "High Quality", 
    description: "Top materials"
  },
  {
    icon: <MdVerified className="text-4xl text-black" />, 
    title: "100% Warranty", 
    description: "Over 2 years"
  },
  {
    icon: <FaShippingFast className="text-4xl text-black" />, 
    title: "Free Shipping", 
    description: "Order over 150 $"
  },
  {
    icon: <FaHeadset className="text-4xl text-black" />, 
    title: "24 / 7 Support", 
    description: "Dedicated support"
  }
];

export default function BenefitSection() {
  return (
    <div className="bg-[#FFF3E3] mt-10 py-10">
      <div className="flex md:flex-row flex-col md:gap-0 gap-10 justify-around items-center text-center">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center space-x-4">
            {benefit.icon}
            <div>
              <h3 className="font-semibold text-lg">{benefit.title}</h3>
              <p className="text-gray-500">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
