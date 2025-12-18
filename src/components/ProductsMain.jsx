import React from "react";
import { Link, useNavigate } from "react-router-dom";
import chowder from "../assets/Belt-Banner-pop-chowder-Hero-exclusive-product.png";
import exclusive from "../assets/exclusive-badge.png";
import DBpop from "../assets/BuddyBlade-A-DB-Product-83877.png";
import DBpopPBG from "../assets/BuddyBlade-A-DB-Background.jpg";
import SportsPOP from "../assets/BuddyBlade-B-Seahawks-Product-50977.png";
import SportsPOPBG from "../assets/BuddyBlade-B-Seahawks-Background.jpg";

const ProductsMain = () => {
    const navigate = useNavigate();

    const fetchSportsProducts = async () => {
        try {
            const response = await fetch(
                "https://funko-store.onrender.com/api/products?category=SPORTS&page=0&size=10"
            );
            const data = await response.json();

            // Navigate to the products page with the fetched data
            navigate("/product", { state: { products: data } });
        } catch (error) {
            console.error("Error fetching sports products:", error);
        }
    };
    const products = [
        {
            id: 1,
            title: "POP! CHOWDER",
            description:
                "Order up! The exclusive POP! Chowder is ready to join your Cartoon Network collection.",
            buttonText: "Shop Exclusives",
            image: chowder,
            bgColor: "bg-[#f5f1d3]",
        },
        {
            id: 2,
            title: "NO HOLDING BACK",
            description: "Team up with unstoppable collectibles.",
            buttonText: "Shop Collection",
            image: DBpop,
            backgroundImage: DBpopPBG,
        },
        {
            id: 3,
            title: "LEGION OF POP!",
            description: "Intercept new players for your lineup.",
            buttonText: "Shop Collection",
            image: SportsPOP,
            backgroundImage: SportsPOPBG,
        },
    ];

    return (
        <section className="w-full">
            {/* First Div */}
            <div
                className={`flex justify-between items-center p-6 ${products[0].bgColor}`}
                style={{ height: "300px" }}>
                <div className="max-w-[60%]">
                    <img
                        src={exclusive}
                        alt="Exclusive Badge"
                        className="py-4 w-30 h-30 object-contain"
                    />
                    <h2 className="text-4xl font-bold">{products[0].title}</h2>
                    <p className="mt-2 text-l">{products[0].description}</p>
                    <Link to={`/category/ANIMATION_AND_CARTOONS`}>
                        <button className="mt-4 px-4 py-2 bg-black font-bold text-white rounded-full">
                            {products[0].buttonText}
                        </button>
                    </Link>
                </div>
                <div className="flex justify-center items-center w-1/2">
                    <img
                        src={products[0].image}
                        alt={products[0].title}
                        className="w-60 h-60 object-contain"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 ">
                {/* Second Product */}
                <div
                    className={`flex flex-row justify-between p-6 ${products[1].bgColor} h-[500px]`}
                    style={{
                        backgroundImage: `url(${products[1].backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "500px",
                    }}>
                    <div class="flex-col my-24">
                        <h2 className="text-4xl font-bold">
                            {products[1].title}
                        </h2>
                        <p className="mt-2 text-sm">
                            {products[1].description}
                        </p>
                        <Link to={`/category/ANIME_AND_MANGA`}>
                            <button className="mt-4 px-4 py-2 font-bold bg-black text-white rounded-full">
                                {products[1].buttonText}
                            </button>
                        </Link>
                    </div>

                    <img
                        src={products[1].image}
                        alt={products[1].title}
                        className="mt-4 w-full h-auto object-contain"
                    />
                </div>

                {/* Third Product */}
                <div
                    className={`flex flex-row justify-between p-6 ${products[2].bgColor} h-[500px]`}
                    style={{
                        backgroundImage: `url(${products[2].backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "500px", // Adjust the height as needed
                    }}>
                    <div class="flex-col my-24">
                        <h2 className="text-4xl text-white font-bold">
                            {products[2].title}
                        </h2>
                        <p className="mt-2 text-white text-sm">
                            {products[2].description}
                        </p>
                        <Link to={`/category/SPORTS`}>
                            <button
                                className="mt-4 px-4 py-2 font-bold bg-white text-black rounded-full"
                                onClick={fetchSportsProducts}>
                                {products[2].buttonText}
                            </button>
                        </Link>
                    </div>

                    <img
                        src={products[2].image}
                        alt={products[2].title}
                        className="mt-4 w-full h-auto object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default ProductsMain;
