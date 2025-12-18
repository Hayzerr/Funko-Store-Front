// import React, { useEffect, useState } from 'react';
// import RandomRec from './RandomRec';
// import products from './data/products.json';

// const ProductModal = ({ product, onClose }) => {
//   const [randomRecommendations, setRandomRecommendations] = useState([]);

//   useEffect(() => {
//     // Генерируем случайные рекомендации только для модального окна
//     const randomRecs = products
//       .sort(() => Math.random() - 0.5)
//       .slice(0, 4);

//     setRandomRecommendations(randomRecs);
//   }, [product]);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative overflow-hidden max-h-[90vh] overflow-y-auto">
//         {/* Close Button */}
//         <button
//           className="text-gray-500 hover:text-gray-800 text-xl font-bold absolute top-4 right-4"
//           onClick={onClose}
//         >
//           &times;
//         </button>

//         {/* Modal Content */}
//         <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
//           {/* Image Section */}
//           <div className="flex-shrink-0">
//             <img
//               src={product.Images[0]}
//               alt={product.Name}
//               className="w-64 h-auto rounded-lg shadow"
//             />
//           </div>

//           {/* Description Section */}
//           <div className="flex-1">
//             <h2 className="text-2xl font-bold mb-4">{product.Name}</h2>
//             <p className="text-gray-600 mb-2">
//               <strong>Category:</strong> {product.Category}
//             </p>
//             <p className="text-gray-600 mb-2">
//               <strong>Price:</strong> ${product.CurrentPrice}
//             </p>
//             <p className="text-gray-600 mb-4">
//               <strong>Status:</strong> {product.Status}
//             </p>
//             <h3 className="text-lg font-semibold mb-2">Description</h3>
//             <p className="text-gray-700">{product.Description}</p>
//           </div>
//         </div>

//         {/* Recommended Products Section - Random Recommendations */}
//         <RandomRec randomRecommendations={randomRecommendations} />
//       </div>
//     </div>
//   );
// };

// export default ProductModal;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RandomRec from './RandomRec';

const ProductModal = ({ productId, onClose }) => {  
  
  const [product, setProduct] = useState(null); // Для хранения данных о товаре
  const [randomRecommendations, setRandomRecommendations] = useState([]);
  
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`,
    accept: "*/*"
  };

  useEffect(() => {
    // Загружаем информацию о выбранном продукте по его id
    axios
      .get(`https://funko-store.onrender.com/api/products/id/${productId}`, { headers })
      .then((response) => {
        setProduct(response.data); // Сохраняем данные о продукте
        console.log(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });

    // Генерируем случайные рекомендации
    axios
      .get('https://funko-store.onrender.com/api/products', { headers })
      .then((response) => {
        const randomRecs = response.data
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);
        setRandomRecommendations(randomRecs); // Рандомные рекомендации
        console.log(randomRecs)
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  }, [productId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          className="text-gray-500 hover:text-gray-800 text-xl font-bold absolute top-4 right-4"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal Content */}
        {product && (
          <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
            {/* Image Section */}
            <div className="flex-shrink-0">
              <img
                src={product.images[0]}
                alt={product.Name}
                className="w-64 h-auto rounded-lg shadow"
              />
            </div>

            {/* Description Section */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
              <p className="text-gray-600 mb-2">
                <strong>Category:</strong> {product.category}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Price:</strong> ${product.defaultPrice}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Status:</strong> {product.status}
              </p>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
          </div>
        )}

        {/* Recommended Products Section - Random Recommendations */}
        <RandomRec randomRecommendations={randomRecommendations} />
      </div>
    </div>
  );
};

export default ProductModal;
