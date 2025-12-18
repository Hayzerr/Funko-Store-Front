import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const AccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false); // Состояние для отображения меню
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-[500px] p-12 bg-white mr-6 h-[550px] max-2xl:hidden">
      {/* Гамбургер для мобильных устройств */}
      <button
        onClick={toggleMenu}
        className="2xl:hidden absolute top-4 right-4 p-4 bg-black text-white rounded"
      >
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>

      {/* Меню для мобильных */}
      <div className={`max-2xl:hidden mt-6`}>
        <h2 className="text-4xl font-black mb-6">ACCOUNT MENU</h2>
        <ul className="space-y-4 text-xl">
          <li className='w-full font-black'>
            <h3 className="w-full">
              <a
                className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-3px] 
                after:w-full after:h-0 after:bg-black after:rounded after:transition-all 
                after:duration-300 after:ease-out hover:after:h-[5px] uppercase"  
                onClick={() => navigate('/edit-profile')} // Навигация на ЭдитПрофиль
                href=""
              >
                Edit Profile
              </a>
            </h3>
          </li>
          <li className='w-full font-black'>
            <h3 className="w-full">
              <a
                className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-3px] 
                after:w-full after:h-0 after:bg-black after:rounded after:transition-all 
                after:duration-300 after:ease-out hover:after:h-[5px] uppercase"
                onClick={() => navigate('/address-book')}
              >
                Address Book
              </a>
            </h3>
          </li>
          <li className='w-full font-black'>
            <h3 className="w-full">
              <a
                className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-3px] 
                after:w-full after:h-0 after:bg-black after:rounded after:transition-all 
                after:duration-300 after:ease-out hover:after:h-[5px] uppercase"
                onClick={() => navigate('/order-history')}
              >
                Order History
              </a>
            </h3>
          </li>
          <li className='w-full font-black'>
            <h3 className="w-full">
              <a
                className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-3px] 
                after:w-full after:h-0 after:bg-black after:rounded after:transition-all 
                after:duration-300 after:ease-out hover:after:h-[5px] uppercase"
                onClick={() => navigate('/preorder')}
              >
                Pre-Orders
              </a>
            </h3>
          </li>
          <li className='w-full font-black'>
            <h3 className="w-full">
              <a
                className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-3px] 
                after:w-full after:h-0 after:bg-black after:rounded after:transition-all 
                after:duration-300 after:ease-out hover:after:h-[5px] uppercase"
                onClick={() => navigate('/wishlist')}
                href=""
              >
                Wishlist
              </a>
            </h3>
          </li>
          <li className='w-full font-black'>
            <h3 className="w-full">
              <a
                className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-3px] 
                after:w-full after:h-0 after:bg-black after:rounded after:transition-all 
                after:duration-300 after:ease-out hover:after:h-[5px] uppercase"
                onClick={() => navigate('/notification-settings')}
              >
                Notification Settings
              </a>
            </h3>
          </li>
        </ul>
        <Button
          text="BACK TO DASHBOARD"
          onClick={() => navigate("/main-page")}
          className="mt-10 px-[20px] py-[8px] font-black bg-black text-white transition-colors duration-200 w-3/4 border-solid border-2 border-black rounded-[24px] hover:bg-white hover:text-black"
        />

      </div>
    </div>
  );
};

export default AccountMenu;