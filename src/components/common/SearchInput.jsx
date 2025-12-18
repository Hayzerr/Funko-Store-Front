import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductModal from '../ProductModal'; // Import the modal component

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);  // Store fetched products
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null); // State for selected product ID
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    // Fetch products from the provided API URL
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://funko-store.onrender.com/api/products');
        setProducts(response.data);  // Assuming response.data contains the product list
        setFilteredProducts(response.data); // Initially show all products
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs only once when the component mounts

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter products based on the search query
    if (query.length > 2) {
      const filtered = products.filter((product) =>
        product.name && product.name.toLowerCase().includes(query.toLowerCase()) // Check if product.name exists
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Clear the filtered products if the query is too short or empty
    }
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId); // Set the selected product's ID when clicked
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedProductId(null); // Clear the selected product ID
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

      <div className="mt-4 absolute z-20">
        {loading && <p className="text-black">Loading products...</p>} {/* Changed text color to black */}
        {error && <p className="text-black">{error}</p>} {/* Changed text color to black */}
        {searchQuery && filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div 
              key={index} 
              className="product-item mb-4 p-4 border rounded bg-gray-100 border-gray-300 text-black"
              onClick={() => handleProductClick(product.id)} // Pass the product id to the modal
            >
              {product.images[0] && product.images.length > 0 && (
                <img src={product.images[0]} alt={product.name} />
              )}
              <h3 className="text-xl font-bold">{product.name}</h3>
            </div>
          ))
        ) : searchQuery.length > 2 && filteredProducts.length === 0 ? (
          <p className="text-black">No products found</p> 
        ) : null}
      </div>

      {/* Conditionally render the ProductModal if a product is selected */}
      {isModalOpen && selectedProductId && (
        <ProductModal productId={selectedProductId} onClose={closeModal} />
      )}
    </div>
  );
};

export default SearchInput;
