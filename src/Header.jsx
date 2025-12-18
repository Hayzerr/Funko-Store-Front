import React from "react";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center bg-black text-white p-4 pr-10 pl-10">
            {/* Left Navigation */}
            <div className="flex space-x-4">
                <button className="px-4 py-2 bg-transparent rounded hover:bg-white hover:text-black">
                    Main
                </button>
                <button className="px-4 py-2 bg-transparent rounded hover:bg-white hover:text-black">
                    Product
                </button>
                <button className="px-4 py-2 bg-transparent rounded hover:bg-white hover:text-black">
                    Wish List
                </button>
            </div>

            {/* Right Navigation */}
            <div className="flex space-x-4 mt-4 md:mt-0">
                <SearchInput />
                <Link
                    to="/authorization"
                    className="px-4 py-2 bg-transparent rounded hover:bg-white hover:text-black">
                    Log in/Register
                </Link>
                <button className="px-4 py-2 bg-transparent rounded  hover:bg-white hover:text-black">
                    Profile
                </button>
            </div>
        </div>
    );
};

export default Header;
