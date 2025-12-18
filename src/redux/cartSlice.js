import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totals: {
        subtotal: 0,
        shipping: 'Calculated at Checkout',
        estimatedTotal: 0,
    },
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems(state, action) {
            state.items = action.payload;
            state.totals = calculateTotals(state.items);
        },
        updateQuantity(state, action) {
            const { productId, quantity } = action.payload;
            const item = state.items.find((item) => item.id === productId);
            if (item) {
                item.qty = quantity;
                state.totals = calculateTotals(state.items);
            }
        },
        clearCart(state) {
            state.items = [];
            state.totals = calculateTotals(state.items);
        },
    },
});

const calculateTotals = (items) => {
    const subtotal = items.reduce((acc, item) => {
        const price = item.DiscountPrice && item.DiscountPrice !== 'N/A'
            ? parseFloat(item.DiscountPrice)
            : parseFloat(item.DefaultPrice);
        return acc + price * item.qty;
    }, 0);

    return {
        subtotal,
        shipping: subtotal >= 150 ? 'Free' : 'Calculated at Checkout',
        estimatedTotal: subtotal >= 150 ? subtotal : subtotal + 20,
    };
};

export const { setCartItems, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
