import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const RangeItem = [
        {
            id: 1,
            img: "/range-img-1.webp",
            data: "Dining",
        },
        {
            id: 2,
            img: "/range-img-2.webp",
            data: "Living",
        },
        {
            id: 3,
            img: "/range-img-3.webp",
            data: "Bedroom",
        },
    ];
const navigate=useNavigate()
    return (
        <>

            {/* Banner Section */}
            <div className="banner-img md:px-14 px-3 ">
                <div className="bg-[#FFF3E3] w-[35rem]  p-5  lg:p-10 ">
                    <h5 className="md:text-[18px] text-[16px] font-semibold">New Arrival</h5>
                    <h1 className="md:text-[44px] text-[25px] font-bold text-[#B88E2F]">
                        Discover Our<br />
                        New Collection
                    </h1>
                    <p className="text-[16px] mt-4">
                    Discover elegant and stylish furniture to transform your home. 
                    Browse our curated collection of premium quality  designed to bring comfort .
                    </p>
                    <button onClick={()=>navigate('/shop')} className="px-10 py-3 border-2 mt-4 border-[#B88E2F] bg-[#B88E2F] text-white text-sm hover:bg-white hover:text-[#B88E2F]">
                        BUY NOW
                    </button>
                </div>
            </div>

            {/* Range Section */}
            <div className="mt-20">
                <h2 className="text-[30px] font-bold text-black text-center">Browse The Range</h2>
                <p className="text-[17px] font-medium text-black text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <div className="flex justify-center  mt-8">
                    <div className="flex flex-wrap p-5 justify-center gap-14">
                        {RangeItem.map((item) => (
                            <div className="lg:w-[25rem] md:w-[18rem]" key={item.id}>
                                <img src={item.img} alt={item.data} />
                                <h5 className="mt-5 font-semibold text-center text-[18px]">
                                    {item.data}
                                </h5>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="mt-20">
                <h2 className="text-[30px] font-bold text-black text-center">Our Products</h2>
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
                    <button className="px-14 py-2 border-2 border-[#B88E2F] bg-[#B88E2F] text-white hover:bg-white hover:text-[#B88E2F]">
                        Show More
                    </button>
                </div>
            </div>

            {/* Inspiration Section */}
            <div className="bg-[#FCF8F3] flex justify-center items-center py-20 mt-20">
  <div className="w-[90%] flex flex-col md:flex-row items-center">
    {/* Text Section */}
    <div className="w-full md:w-[40%] text-center md:text-left mb-8 md:mb-0">
      <h2 className="text-[24px] md:text-[30px] font-bold text-black leading-tight">
        50+ Beautiful rooms<br />
        inspiration
      </h2>
      <p className="text-sm md:text-base mt-4 text-gray-600">
        Our designer already made a lot of beautiful prototype rooms
        that inspire you.
      </p>
      <button className="px-6 md:px-10 py-2 border-2 mt-4 border-[#B88E2F] bg-[#B88E2F] text-white hover:bg-white hover:text-[#B88E2F]">
        Explore More
      </button>
    </div>

    {/* Swiper Section */}
    <div className="w-full md:w-[60%] lg:w-[70%]">
      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 2.5, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 25 },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <SwiperSlide key={index}>
              <img
                src={`/product-img-${(index % 4) + 1}.webp`}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  </div>
</div>


           
           
        </>
    );
};

export default Home;
