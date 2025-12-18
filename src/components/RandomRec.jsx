// import React from 'react';

// const RandomRec = ({ randomRecommendations }) => {
//   return (
//     <div className="mt-6">
//       <h3 className="text-xl font-semibold mb-4">You might also like:</h3>
//       <div className="flex overflow-x-auto gap-4 pb-4">
//         {randomRecommendations.map((item) => (
//           <div
//             key={item.Id}
//             className="min-w-[200px] bg-gray-100 p-4 rounded-lg shadow hover:scale-105 transform transition-transform duration-200"
//           >
//             <img
//               src={item.Images[0]}
//               alt={item.Name}
//               className="w-full h-32 object-cover rounded-lg mb-4"
//             />
//             <h4 className="text-center text-lg font-semibold">{item.Name}</h4>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RandomRec;


import React from 'react';

const RandomRec = ({ randomRecommendations }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">You might also like:</h3>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {randomRecommendations.map((item) => (
          <div
            key={item.Id}
            className="min-w-[200px] bg-gray-100 p-4 rounded-lg shadow hover:scale-105 transform transition-transform duration-200"
          >
            <img
              src={item.images && item.images.length > 0 ? item.images[0] : '/default-image.jpg'}
              alt={item.name}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h4 className="text-center text-lg font-semibold">{item.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomRec;
