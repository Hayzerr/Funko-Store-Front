import React, { useState, useEffect } from "react";
import SearchInput from "./common/SearchInput";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false); // For mobile menu
    const [userMenuOpen, setUserMenuOpen] = useState(false); // For user dropdown
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const cartItemCount = cartItems.reduce((total, item) => total + item.qty, 0);

    useEffect(() => {
        // Check if user is logged in
        const accessToken = localStorage.getItem('accessToken');
        const storedUsername = localStorage.getItem('username');

        if (accessToken && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        } else {
            setIsLoggedIn(false);
            setUsername('');
        }
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
        setUserMenuOpen(false);
        navigate('/main-page');
    };

    return (
        <header className="relative bg-black text-white py-5">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Burger Menu Icon */}
                <button
                    className="block lg:hidden p-2 bg-black text-white rounded-full focus:outline-none"
                    onClick={toggleMenu}>
                    <span className="block w-6 h-0.5 bg-white mb-1"></span>
                    <span className="block w-6 h-0.5 bg-white mb-1"></span>
                    <span className="block w-6 h-0.5 bg-white"></span>
                </button>

                {/* Left Navigation */}
                <div className="hidden lg:flex space-x-4">
                    <Link to="/main-page">
                        <button className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                            Main
                        </button>
                    </Link>

                    {/* Fandoms Dropdown */}
                    <div className="relative group">
                        <button className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                            Categories
                        </button>
                        {/* Dropdown menu appears on hover */}
                        <div className="absolute left-0 mt-2 w-48 bg-black text-white  shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Link to="/category/VIDEO_GAMES">
                                <button className="px-4 py-2 w-full text-left hover:bg-white hover:text-black">
                                    Video Games
                                </button>
                            </Link>
                            <Link to="/category/ANIME_AND_MANGA">
                                <button className="px-4 py-2 w-full text-left hover:bg-white hover:text-black">
                                    Anime & Manga
                                </button>
                            </Link>
                            <Link to="/category/SPORTS">
                                <button className="px-4 py-2 w-full text-left hover:bg-white hover:text-black">
                                    Sports
                                </button>
                            </Link>
                            <Link to="/category/COMICS_AND_SUPERHEROES">
                                <button className="px-4 py-2 w-full text-left hover:bg-white hover:text-black">
                                    Comics & Superheroes
                                </button>
                            </Link>
                            <Link to="/category/ANIMATION_AND_CARTOONS">
                                <button className="px-4 py-2 w-full text-left hover:bg-white hover:text-black">
                                    Animation & Cartoons
                                </button>
                            </Link>
                            <Link to="/category/MUSIC">
                                <button className="px-4 py-2 w-full text-left hover:bg-white hover:text-black">
                                    Music
                                </button>
                            </Link>
                            <Link to="/category/SCIFI">
                                <button className="px-4 py-2 w-full text-left hover:bg-white hover:text-black">
                                    Sci-Fi
                                </button>
                            </Link>
                        </div>
                    </div>

                    <Link to="/product">
                        <button className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                            Product
                        </button>
                    </Link>
                    <Link to="/wishlist">
                        <button className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                            Wish List
                        </button>
                    </Link>
                </div>

                {/* SearchInput */}
                <div className="flex-grow lg:mx-4 flex justify-end items-center gap-4">
                    <SearchInput />

                    {/* Cart Icon */}
                    <Link to="/cart" className="relative hidden lg:block">
                        <svg className="w-6 h-6 text-white hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Right Navigation */}
                <div className="hidden lg:flex space-x-4 items-center">
                    {!isLoggedIn ? (
                        <Link
                            to="/authorization"
                            className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                            Log in/Register
                        </Link>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={toggleUserMenu}
                                className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {username}
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-black text-white shadow-lg z-20 rounded-md">
                                    <Link
                                        to="/myaccount"
                                        onClick={() => setUserMenuOpen(false)}
                                        className="block px-4 py-2 hover:bg-white hover:text-black">
                                        My Account
                                    </Link>
                                    <Link
                                        to="/wishlist"
                                        onClick={() => setUserMenuOpen(false)}
                                        className="block px-4 py-2 hover:bg-white hover:text-black">
                                        Wishlist
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-white hover:text-black">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    <Link
                        to="/myaccount"
                        className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                        Profile
                    </Link>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <nav
                className={`${menuOpen ? "block" : "hidden"
                    } lg:hidden flex flex-col items-center bg-black p-4 w-full absolute top-full left-0 z-20`}>
                <button className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                    Main
                </button>
                <Link to="/product">
                    <button className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                        Product
                    </button>
                </Link>
                <Link to="/wishlist">
                    <button className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                        Wish List
                    </button>
                </Link>
                <Link to="/cart">
                    <button className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                        Cart {cartItemCount > 0 && `(${cartItemCount})`}
                    </button>
                </Link>
                {!isLoggedIn ? (
                    <Link
                        to="/authorization"
                        className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                        Log in/Register
                    </Link>
                ) : (
                    <>
                        <div className="px-4 py-2 text-white">
                            Welcome, {username}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                            Logout
                        </button>
                    </>
                )}
                <Link
                    to="/myaccount"
                    className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                    Profile
                </Link>
            </nav>

            {/* Overlay for Mobile Menu */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
                    onClick={closeMenu}></div>
            )}

            {/* Overlay for User Menu */}
            {userMenuOpen && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}></div>
            )}
        </header>
    );
};

export default Header;
