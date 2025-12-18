import React, { useState } from 'react';
import AccountMenu from './AccountMenu';
import MAccountMenu from './MAccountMenu';
import Button from '../common/Button';


const AddressBook = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Состояние для меню
  const [addresses, setAddresses] = useState([]); // Состояние для списка адресов
  const [newAddress, setNewAddress] = useState(''); // Состояние для нового адреса

  // Функция для добавления нового адреса
  const handleAddAddress = () => {
    if (newAddress.trim() !== '') {
      setAddresses([...addresses, newAddress]);
      setNewAddress(''); // Очищаем поле ввода
    }
  };

  // Открытие и закрытие меню
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="relative bg-primary-white mt-12 lg:mt-12 h-fit mb-10 2xl:h-svh 
                    mx-auto 2xl:w-full xl:w-[1280px] lg:w-[968px] md:w-[780px] sm:w-[650px] 
                    w-[350px] transition-all">
      <h1 className="sm:text-6xl text-5xl font-black mb-4 text-center 2xl:text-left break-words 2xl:ml-5">
        ADDRESS BOOK
      </h1>

      {/* Гамбургер меню */}
      <button
        className="absolute xl:left-56 lg:left-44 md:left-36 sm:left-32 
                   sm:top-32 left-20 top-40 p-4 bg-black 
                   text-white rounded focus:outline-none cursor-pointer 2xl:hidden"
        onClick={toggleMenu}
      >
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>

      <div className="flex justify-center mt-[50px]">
        <div className={`${menuOpen ? 'block' : 'hidden'} 2xl:block`}>
          <AccountMenu />
        </div>
        <div className="w-2/3 p-12 bg-white h-fit flex flex-col justify-center items-start">
          {/* Форма добавления нового адреса */}
          <div className="mb-4 mt-10">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-3"
              placeholder="Enter new address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />

            <Button text="ADD ADDRESS" onClick={handleAddAddress} />        

          </div>

          {/* Список адресов */}
          <div>
            <h2 className="text-xl font-bold mb-2">Saved Addresses:</h2>
            {addresses.length > 0 ? (
              <ul>
                {addresses.map((address, index) => (
                  <li key={index} className="py-2 border-b border-gray-200">{address}</li>
                ))}
              </ul>
            ) : (
              <p>No addresses saved.</p>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="fixed top-0 left-0 w-[300px] h-full bg-white z-20 p-6 shadow-lg">
            {/* Мобильное меню */}
            <MAccountMenu />
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded focus:outline-none"
              onClick={closeMenu}
            >
              Done
            </button>
          </div>
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10" onClick={closeMenu}></div>
        </>
      )}
    </div>
  );
};

export default AddressBook;
