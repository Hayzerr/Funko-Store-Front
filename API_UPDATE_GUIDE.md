# Update API URLs Script

This document lists all files that need to be updated to use the new API config.

## Files Updated:
- [x] `src/components/Autorization.jsx` - Login and Registration

## Files Still Using Hardcoded URLs:

### High Priority (Core Functionality):
1. `src/components/ProductPage.jsx` - Product listing and wishlist
2. `src/components/ProductModal.jsx` - Product details
3. `src/components/AccountMenu/Wishlist.jsx` - Wishlist management
4. `src/components/AccountMenu/MyAccount.jsx` - User profile
5. `src/components/cart/Cart.jsx` - Shopping cart
6. `src/components/cart/CartSummary.jsx` - Order placement

### Medium Priority:
7. `src/components/ProductsMain.jsx` - Main products display
8. `src/components/common/SearchInput.jsx` - Product search

## Quick Fix for Each File:

Add this import at the top:
```javascript
import { API_BASE_URL } from '../config/apiConfig';
```

Replace all instances of:
```javascript
'https://funko-store.onrender.com'
```

With:
```javascript
`${API_BASE_URL}`
```

## Current Status:
✅ Authorization component updated
✅ API config created with ENVIRONMENT variable set to 'local'

**To switch to deployed backend**: Change `ENVIRONMENT` in `src/config/apiConfig.js` from `'local'` to `'deployed'`
