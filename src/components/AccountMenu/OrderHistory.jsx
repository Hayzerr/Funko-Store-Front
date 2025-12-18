import React, { useState } from 'react';
import AccountMenu from './AccountMenu';
import MAccountMenu from './MAccountMenu';


// Пример данных для истории заказов (можно заменить на реальные данные)
const ordersHistory = [
  { date: '2023-07-15', product: 'Product 1', orderId: '123' },
  { date: '2023-02-10', product: 'Product 2', orderId: '124' },
  { date: '2023-05-22', product: 'Product 3', orderId: '125' },
  // Дополнительные заказы...
];

const OrderHistory = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Состояние для меню
  const [selectedOption, setSelectedOption] = useState('LAST SIX MONTH'); // Состояние для выбранного варианта
  const [filteredOrdersHistory, setFilteredOrdersHistory] = useState([]); // Состояние для отфильтрованных заказов

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Фильтрация заказов в зависимости от выбранного периода
    const currentDate = new Date();
    let filteredOrdersList = [];

    if (selectedValue === 'LAST SIX MONTH') {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
      filteredOrdersList = ordersHistory.filter(order => new Date(order.date) >= sixMonthsAgo);
    } else if (selectedValue === 'LAST TWELVE MONTH') {
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);
      filteredOrdersList = ordersHistory.filter(order => new Date(order.date) >= twelveMonthsAgo);
    }

    setFilteredOrdersHistory(filteredOrdersList);
  };

  return (
    <div className="relative bg-primary-white mt-12 mx-auto 2xl:w-full xl:w-[1280px] 
                    lg:w-[968px] macbook:w-[900px] md:w-[768px] sm:w-[640px] mobile:w-[340px] transition-all">
      <h1 className="text-6xl ml-4 font-black mb-4 text-center 2xl:text-left">ORDER HISTORY</h1>

      {/* Гамбургер меню */}
      <button
        className="absolute xl:left-56 lg:left-44 macbook:left-40 md:left-36 sm:left-32 left-20 sm:top-32 
                   top-48 p-4 bg-black text-white rounded focus:outline-none cursor-pointer 2xl:hidden"
        onClick={toggleMenu}
      >
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>

      <div className="flex justify-center mt-[50px]">
        <div className="hidden 2xl:block">
          <AccountMenu />
        </div>
        <div className="w-2/3 p-12 bg-white h-fit flex flex-col justify-center items-start mb-10">
          {/* Select с выпадающим списком */}
          <div className="relative mt-10">
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              className="w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none cursor-pointer"
            >
              <option value="LAST SIX MONTH">LAST SIX MONTH</option>
              <option value="LAST TWELVE MONTH">LAST TWELVE MONTH</option>
            </select>
          </div>

          {/* Если заказов нет в выбранный период */}
          {filteredOrdersHistory.length === 0 && (
            <p className="text-blackx mt-4">No orders within the selected period</p>
          )}

          {/* Здесь можно отобразить заказы, если они есть */}
          <ul className="mt-6">
            {filteredOrdersHistory.map((order, index) => (
              <li key={index} className="border-b py-2">
                Order ID: {order.orderId} - {order.product} - {new Date(order.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
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

export default OrderHistory;
