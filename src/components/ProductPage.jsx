import React, { useState, useEffect } from "react";
import ProductModal from "./ProductModal";
import Red_heart from "../assets/red_heart.png"; // Red heart image
import White_heart from "../assets/white_heart.png"; // White heart image
import axios from "axios";
import Button from "./common/Button";
import { useParams } from "react-router-dom"; // Import useParams from React Router

const ProductPage = () => {
    const { category } = useParams(); // Get the category from the URL
    const [products, setProducts] = useState([]); // Store products
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [favoriteProducts, setFavoriteProducts] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("accessToken");
    const headers = {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
    };

    // Function to fetch products based on category
    const fetchProducts = (page) => {
        setLoading(true);
        axios
            .get("https://funko-store.onrender.com/api/products", {
                headers,
                params: {
                    page: page,
                    size: 52,
                    category: category, // Include category in the request
                },
            })
            .then((response) => {
                const newProducts = response.data;
                setProducts((prevProducts) => [
                    ...prevProducts,
                    ...newProducts,
                ]);
                setHasMoreProducts(newProducts.length > 0);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        // Fetch products when component mounts or category changes
        setProducts([]); // Clear previous products when category changes
        fetchProducts(currentPage);
    }, [category]); // Fetch products whenever the category changes

    // Handle toggling favorites
    const toggleFavorite = (productId) => {
        const newFavorites = {
            ...favoriteProducts,
            [productId]: !favoriteProducts[productId],
        };
        setFavoriteProducts(newFavorites);

        localStorage.setItem("favoriteProducts", JSON.stringify(newFavorites));

        const isFavorite = !favoriteProducts[productId];
        const apiEndpoint = isFavorite
            ? `https://funko-store.onrender.com/api/wishlist/add/${productId}`
            : `https://funko-store.onrender.com/api/wishlist/remove/${productId}`;
        const method = isFavorite ? "POST" : "DELETE";

        axios
            .request({
                url: apiEndpoint,
                method: method,
                headers: headers,
            })
            .then((response) => {
                console.log(
                    isFavorite
                        ? "Product added to WishList"
                        : "Product removed from WishList"
                );
            })
            .catch((error) => {
                console.error(
                    isFavorite
                        ? "Error adding to WishList: " + error
                        : "Error removing from WishList: " + error
                );
            });
    };

    const openModal = (product) => setSelectedProduct(product.id);
    const closeModal = () => setSelectedProduct(null);

    const loadMoreProducts = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchProducts(nextPage);
    };

    return (
        <div className="flex flex-wrap justify-center p-6 bg-white min-h-screen">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="w-80 min-h-80 bg-white rounded-lg border-4 shadow-md m-4 transition-transform transform hover:scale-105">
                    <div className="relative p-4">
                        <img
                            src={
                                product.images && product.images[0]
                                    ? product.images[0]
                                    : "path_to_default_image"
                            }
                            alt={product.name}
                            className="w-full h-100 object-cover rounded-t-lg transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
                            onClick={() => openModal(product)}
                        />
                        <div
                            className="absolute top-4 right-4 cursor-pointer"
                            onClick={() => toggleFavorite(product.id)}>
                            <img
                                src={
                                    favoriteProducts[product.id]
                                        ? Red_heart
                                        : White_heart
                                }
                                alt="Heart"
                                className="w-8 h-6 transition-transform duration-200"
                            />
                        </div>
                    </div>
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800 text-center">
                            {product.name}
                        </h2>
                        <p className="text-sm text-gray-500 text-center">
                            Category: {product.category}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                            <div className="text-left">
                                <p className="text-xl font-bold text-black">
                                    ${product.defaultPrice}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {hasMoreProducts && !loading && (
                <div className="w-full flex justify-center mt-6">
                    <Button text="More" onClick={loadMoreProducts} />
                </div>
            )}

            {loading && (
                <div className="w-full flex justify-center mt-6">
                    <p>Loading...</p>
                </div>
            )}

            {selectedProduct && (
                <ProductModal
                    productId={selectedProduct}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default ProductPage;
