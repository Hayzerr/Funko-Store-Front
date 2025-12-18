import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import FeatureHolidayGiftGuideLogo from "../assets/Feature-Holiday-GiftGuide-Logo.png";
import FeatureAstroBot from "../assets/Feature-Product-AstroBot.png";
import BackgroundAstro from "../assets/US_MobileBG_AstroBot.jpg";
import FeatureHoidayBg from "../assets/Feature-EOYClearance-Background-Mobile.jpeg";

const Slider = () => {
    const slides = [
        {
            id: 1,
            title: "Grab a Sheet of Paper",
            subtitle: "Make the Holidays Pop!",
            description:
                "Fold, crease & add a POP! Make a holiday list using our gift guides. Discover exclusives, stocking stuffers & more.",
            buttonText: "Shop Collection",
            image: FeatureHolidayGiftGuideLogo,
            backgroundImage: FeatureHoidayBg,
        },
        {
            id: 2,
            title: "Collect the 2024 Game of the Year",
            subtitle: "Limited-Time Exclusive",
            description: "Shop an exclusive POP! Astro Bot through 1/16.",
            buttonText: "Pre-Order Now",
            image: FeatureAstroBot,
            backgroundImage: BackgroundAstro,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () =>
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);

    const prevSlide = () =>
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );

    return (
        <div className="relative w-full h-[600px] overflow-hidden">
            <div
                className="flex transition-transform h-fullduration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="flex-shrink-0 w-full h-[600px] flex items-center justify-center text-black p-10"
                        style={{
                            backgroundImage: `url(${slide.backgroundImage})`,
                            backgroundSize: "cover", // Ensures the image covers the entire container
                            backgroundRepeat: "no-repeat", // Prevents the image from repeating
                            backgroundPosition: "center", // Centers the image in the container
                        }}>
                        <div
                            className="text-left p-6 rounded-lg"
                            id="textContent">
                            <h1 className="text-l font-bold font">
                                {slide.subtitle}
                            </h1>
                            <h2 className="text-6xl font-bold mt-4">
                                {slide.title}
                            </h2>
                            <p className="mt-4 font-bold text-xl">
                                {slide.description}
                            </p>
                            <Link to="/product">
                                <button className="mt-6 px-6 py-2 bg-black text-white font-bold rounded-full">
                                    {slide.buttonText}
                                </button>
                            </Link>
                        </div>
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className=" h-90 mx-auto object-contain mb-6"
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                ❮
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                ❯
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex ? "bg-white" : "bg-gray-400"
                        }`}
                        onClick={() => setCurrentIndex(index)}></button>
                ))}
            </div>
        </div>
    );
};

export default Slider;
