// StaticRecommendations.jsx
import React, { useState, useEffect } from 'react';
import products from './data/products.json'

const StaticRec = () => {
  // Статичные рекомендации (первые 50 продуктов)
  const staticRecommendations = products.slice(0, 50);

  return (
    <div className="w-full mt-6">
      <div className="flex overflow-x-auto gap-4 pb-4">
        {staticRecommendations.map((item) => (
          <div
            key={item.Id}
            className="min-w-[200px] bg-gray-100 p-4 rounded-lg shadow hover:scale-105 transform transition-transform duration-200"
          >
            <img
              src={item.Images[0]}
              alt={item.Name}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h4 className="text-center text-lg font-semibold">{item.Name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticRec;
