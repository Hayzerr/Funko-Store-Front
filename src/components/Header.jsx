import React, { useState } from "react";
import SearchInput from "./common/SearchInput";
import { Link } from "react-router-dom";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false); // For mobile menu

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
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
                <div className="flex-grow lg:mx-4 flex justify-end">
                    <SearchInput />
                </div>

                {/* Right Navigation */}
                <div className="hidden lg:flex space-x-4">
                    <Link
                        to="/authorization"
                        className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                        Log in/Register
                    </Link>
                    <Link
                        to="/myaccount"
                        className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                        Profile
                    </Link>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <nav
                className={`${
                    menuOpen ? "block" : "hidden"
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
                <Link
                    to="/authorization"
                    className="px-4 py-2 bg-transparent rounded-full hover:bg-white hover:text-black">
                    Log in/Register
                </Link>
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
        </header>
    );
};

export default Header;
