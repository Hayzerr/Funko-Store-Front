import React from 'react';
import starImage from '../../assets/star.svg'; // Импорт изображения

const ShippingProgress = ({ subtotal }) => {
  const progress = (subtotal / 150) * 100;

  // Условная анимация
  const starAnimationClass = progress >= 100 ? 'animate-bounce' : '';

  return (
    <div className="mb-6">
      <p className="text-lg font-bold">Shipping Progress</p>
      <p className='text-lg font-medium mb-4 italic text-gray-400'>Free Shipping from $150</p>
      <div className="relative w-full bg-gray-300 h-4 rounded-full">
        {/* Прогресс-бар */}
        <div
          className="absolute top-0 left-0 h-4 bg-green-500 rounded-full
                     transition-all duration-500 ease-in-out"
          style={{ width: `${progress > 100 ? 100 : progress}%` }}
        ></div>

        {/* Звезда с условной анимацией на 100% прогресса */}
        <img
          src={starImage}
          alt="Star"
          className={`absolute top-[-12px] h-8 w-8 transform transition-all 
                     duration-500 ease-in-out ${starAnimationClass}`} // Применяем классы анимации
          style={{
            left: `calc(${progress > 100 ? 100 : progress}% - 16px)`,
          }}
        />
      </div>
      <p className="text-gray-600 mt-2">
        {subtotal >= 150 ? 'Free shipping unlocked!' : `$${150 - subtotal} away from free shipping!`}
      </p>
    </div>
  );
};

export default ShippingProgress;
