import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductModal from '../ProductModal';
import { API_BASE_URL } from '../../config/apiConfig';

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounce search to avoid too many requests
  useEffect(() => {
    if (searchQuery.length > 0) {
      const delaySearch = setTimeout(() => {
        searchProducts(searchQuery);
      }, 300); // Wait 300ms after user stops typing

      return () => clearTimeout(delaySearch);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  const searchProducts = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API_BASE_URL}/products/search`;
      console.log('🔍 Searching with URL:', url);
      console.log('🔍 Query:', query);

      // Using the vulnerable search endpoint
      const response = await axios.get(url, {
        params: { query: query }
      });

      console.log('✅ Search response:', response.data);
      console.log('✅ Number of results:', response.data.length);

      setFilteredProducts(response.data);
    } catch (err) {
      console.error('❌ Search error:', err);
      console.error('❌ Error response:', err.response?.data);
      console.error('❌ Error status:', err.response?.status);

      setError(`Search failed: ${err.response?.status || err.message}`);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  return (
    <div className="relative z-10 text-black">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleChange}
        className="rounded-full p-2 pl-10 text-black w-full border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-black"></i>

      {/* Search Results Dropdown */}
      {searchQuery && (
        <div className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
          {loading && (
            <div className="p-4 text-center">
              <p className="text-gray-600">Searching...</p>
            </div>
          )}

          {error && (
            <div className="p-4 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && filteredProducts.length > 0 && (
            <div className="p-2">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center p-3 mb-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-300"
                  onClick={() => handleProductClick(product.id)}
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <i className="fas fa-image text-gray-400 text-2xl"></i>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 ml-4">
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {product.category || 'Uncategorized'}
                    </p>
                  </div>

                  {/* Product Price */}
                  <div className="flex-shrink-0 ml-4">
                    <p className="text-lg font-bold text-black">
                      ${product.defaultPrice}
                    </p>
                    {product.status && (
                      <p className="text-xs text-gray-500 text-right mt-1">
                        {product.status}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && searchQuery.length > 0 && filteredProducts.length === 0 && (
            <div className="p-8 text-center">
              <i className="fas fa-search text-gray-300 text-4xl mb-3"></i>
              <p className="text-gray-600 font-medium">No products found</p>
              <p className="text-gray-400 text-sm mt-1">Try searching with different keywords</p>
            </div>
          )}
        </div>
      )}

      {/* Product Modal */}
      {isModalOpen && selectedProductId && (
        <ProductModal productId={selectedProductId} onClose={closeModal} />
      )}
    </div>
  );
};

export default SearchInput;
