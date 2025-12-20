// API Configuration
// Switch between local and deployed backend

const API_URLS = {
    local: 'http://localhost:8080/api',
    deployed: 'https://funko-store.onrender.com/api'
};

// Change this to switch between environments
// Set to 'local' for local development
// Set to 'deployed' for production/deployed backend
const ENVIRONMENT = 'local'; // Change to 'deployed' when using deployed backend

export const API_BASE_URL = API_URLS[ENVIRONMENT];

// API endpoints
export const API_ENDPOINTS = {
    // Auth endpoints
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    CONFIRM_EMAIL: `${API_BASE_URL}/auth/confirm-email`,

    // Product endpoints
    PRODUCTS: `${API_BASE_URL}/products`,
    PRODUCTS_SEARCH: `${API_BASE_URL}/products/search-vulnerable`,
    PRODUCT_BY_ID: (id) => `${API_BASE_URL}/products/id/${id}`,

    // Wishlist endpoints
    WISHLIST: `${API_BASE_URL}/wishlist`,

    // Cart endpoints
    CART: `${API_BASE_URL}/cart`,

    // Order endpoints
    ORDERS: `${API_BASE_URL}/orders`,
};

export default API_BASE_URL;
