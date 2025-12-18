import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import harrypotter from "../assets/gallery-blade-digitalpop-lp-hp.png";
import daenerys from "../assets/gallery-blade-digitalpop-lp-got.png";
import tdk from "../assets/gallery-blade-digitalpop-lp-tdk.png";
import bttf from "../assets/gallery-blade-digitalpop-lp-bttf.png";
import pr from "../assets/gallery-blade-digitalpop-lp-pr.png";
import bebop from "../assets/gallery-blade-digitalpop-lp-tmnt-bebop.png";

const CircularSlider = () => {
    const slides = [
        {
            id: 1,
            image: harrypotter,
        },
        {
            id: 2,
            image: daenerys,
        },
        {
            id: 3,
            image: tdk,
        },
        {
            id: 4,
            image: bttf,
        },
        {
            id: 5,
            image: pr,
        },
        {
            id: 6,
            image: bebop,
        },
    ];

    return (
        <section className="bg-black text-white py-10">
            <div className="flex flex-row mx-auto px-10">
                {/* Header Section */}
                <div className="mb-6 self-center">
                    <h2 className="text-6xl font-bold">
                        Collect Digital, Land a Physical.
                    </h2>
                    <p className="mt-2 text-gray-400">
                        Collect Digital Pop! on Droppp to redeem exclusive Pop!
                        Vinyl figures from your favorite brands.
                    </p>
                    <Link to="/product">
                        <button className="mt-4 px-6 py-2 font-bold bg-white text-black rounded-full">
                            Learn More
                        </button>
                    </Link>
                </div>

                {/* Swiper Section */}
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    className="w-full">
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id} className="w-60 h-80">
                            <div className="flex flex-col items-center justify-center bg-black text-white rounded-lg p-6">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-90 h-90 object-contain"
                                />
                            </div>
                            <p className=" text-center mt-2 text-gray-400">
                                click & drag
                            </p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default CircularSlider;
