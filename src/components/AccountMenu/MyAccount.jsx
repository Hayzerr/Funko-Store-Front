import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import axios from 'axios';
import { API_BASE_URL } from '../../config/apiConfig';

const MyAccount = () => {
  const [profile, setProfile] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`,
    accept: "*/*",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch profile');
        }

        const data = await response.json();
        console.log(data);
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/wishlist`, { headers });
        setWishlist(response.data.wishlistItems || []);
      } catch (error) {
        console.log("Error fetching wishlist:", error);
        setWishlist([]);
      }
    };

    fetchProfile();
    fetchWishlist();
  }, []);


  const navigate = useNavigate();
  return (
    <div className="container mt-4 lg:mt-8 flex flex-col justify-center mx-auto">
      <h1 className="hidden md:block text-6xl uppercase mb-6 font-black mx-auto">My Account</h1>
      <h1 className="block md:hidden text-3xl uppercase font-black">My Account</h1>

      <div className="search-banner account-banner">
        <div className="flex justify-center relative border-solid border-2">
          {/* <div className="banner-image-wrapper absolute -top-36">
            <picture>
              <source  srcSet="https://funko.com/on/demandware.static/-/Sites-FunkoUS-Library/default/dw5c4d6f40/images/funko/content-asset/account-header-freddy.png" />
              <img fetchpriority="high" alt="" title="Welcome!" src="https://funko.com/on/demandware.static/-/Sites-FunkoUS-Library/default/dw3e940221/images/funko/content-asset/account-header-freddy-mobile.png" />
            </picture>
          </div> */}
        </div>
      </div>

      <div className="main-content mt-4 lg:mt-6">
        <div className="flex justify-center">
          <div className="w-full lg:w-1/2">
            {/* Profile Section */}
            <div className="card bg-white shadow-md rounded-lg p-4 mb-6">
              <div className="lg:hidden">
                <button className="side-nav-button flex items-center py-2 text-sm">
                  <img className="w-4 h-4 mr-2 uppercase"
                    src="https://funko.com/on/demandware.static/Sites-FunkoUS-Site/-/default/dw5426e34c/images/funko/svg/filters.svg" alt="filters" />
                  Account Menu
                </button>
              </div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-black uppercase">Profile</h2>
                <Link to="/edit-profile" className="text-[#6c6c6c] flex items-center">
                  <img className="w-4 h-4 mr-1" src="https://funko.com/on/demandware.static/Sites-FunkoUS-Site/-/default/dwd48a9e64/images/svg/pencil.svg" alt="edit" />
                  <span className='text-base'>EDIT</span>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-500">First Name</div>
                  <div className="mt-1 break-words">{profile?.firstName}</div>
                </div>
                <div>
                  <div className="text-gray-500">last Name</div>
                  <div className="mt-1 break-words">{profile?.lastName}</div>
                </div>
                <div className="mt-4">
                  <div className="text-gray-500">Email</div>
                  <div className="mt-1 break-words">{profile?.email}</div>
                </div>
                <div className="mt-4">
                  <div className="text-gray-500">Password</div>
                  <div className="mt-1 break-words">********</div>
                </div>
              </div>
            </div>

            {/* Wishlist Section */}
            <div className="card bg-white shadow-md rounded-lg p-4 mb-6">
              <div className="justify-between items-center mb-4">
                <div className="flex justify-between">
                  <h2 className="text-lg font-black">WISHLIST</h2>
                  <a onClick={() => navigate('/wishlist')}
                    className="text-gray-500 text-base cursor-pointer flex items-center">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="" className='w-4 h-4 mr-1'>
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path fill-rule="evenodd"
                          clip-rule="evenodd" d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V8C1 9.65685 2.34315 11 4 11H20C21.6569 11 23 9.65685 23 8V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V8C3 8.55228 3.44772 9 4 9H20C20.5523 9 21 8.55228 21 8V4Z" fill="#6b7280 "></path>
                        <path fill-rule="evenodd"
                          clip-rule="evenodd" d="M23 16C23 14.3431 21.6569 13 20 13H4C2.34315 13 1 14.3431 1 16V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V16ZM21 16C21 15.4477 20.5523 15 20 15H4C3.44772 15 3 15.4477 3 16V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V16Z" fill="#6b7280 "></path>
                      </g></svg>
                    VIEW ALL
                  </a>
                </div>
                <div className="flex flex-col">
                  {wishlist.length > 0 ? (
                    wishlist.slice(0, 2).map(item => (
                      <ProductCard
                        key={item.id}
                        imgSrc={item.Images[0] ? item.Images[0].imageUrl : item.Images[1]?.imageUrl}
                        title={item.Name}
                        description={item.Name}
                        price={item.DefaultPrice}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No items in wishlist</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Book Section */}
            <div className="card bg-white shadow-md rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-black uppercase">Address Book</h2>
                <a href="/address-book/" className="text-blue-500 flex items-center">
                  <img className="w-4 h-4 mr-1"
                    src="https://funko.com/on/demandware.static/Sites-FunkoUS-Site/-/default/dwd48a9e64/images/svg/pencil.svg"
                    alt="edit address book" />
                  <span className='text-[#6c6c6c] text-base uppercase cursor-pointer'>Manage</span>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-500">Home Address</div>
                  <div className="mt-1">{profile?.address}</div>
                </div>
                <div>
                  <div className="text-gray-500">Shipping Address</div>
                  <div className="mt-1">{profile?.address}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
