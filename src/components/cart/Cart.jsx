import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { setCartItems, updateQuantity } from '../../redux/cartSlice';
import axios from 'axios';

const Cart = () => {
    const dispatch = useDispatch();
    const { items, totals } = useSelector((state) => state.cart);

  const token = localStorage.getItem('accessToken');

  const headers = {
    Authorization: `Bearer ${token}`,
    accept: "*/*",
  };

    useEffect(() => {
        axios
            .get('https://funko-store.onrender.com/api/wishlist', { headers })
            .then((response) => {
                const wishlistItems = response.data.wishlistItems.map((item) => ({
                    ...item,
                    qty: 1,
                }));
                dispatch(setCartItems(wishlistItems));
            })
            .catch((error) => {
                console.error('Error fetching wishlist:', error);
            });
    }, [dispatch]);

    const handleQtyChange = (productId, newQty) => {
        dispatch(updateQuantity({ productId, quantity: newQty }));
    };

    return (
        <div className="relative mt-12 lg:mt-12 h-auto my-10 mx-auto 2xl:w-full 
                        xl:w-[1280px] lg:w-[968px] md:w-[712px] sm:w-[594px] w-[350px] transition-all">
            <h1 className="text-6xl sm:text-8xl md:text-6xl 2xl:ml-16 font-black mb-4 text-center 2xl:text-left">MY CART</h1>

            <div className="flex flex-col 2xl:flex-row justify-center mt-[20px]">

                {/* Cart Items */}
                <div className="mobile:w-[350px] sm:w-2/3 p-auto sm:p-12 mx-auto 
                                h-fit flex flex-col justify-center items-center
                                overflow-y-auto">
                    <div className="lg:flex justify-between border-b border-black w-full font-medium hidden">
                        <span className='ml-10'>ITEM</span>
                        <div className="flex">
                            <span className='mr-28'>QTY</span>
                            <span className='mx-10'>TOTAL</span>
                        </div>
                    </div>
                    <div className="2xl:h-[400px] 2xl:overflow-y-auto w-full">

                        <div className="grid grid-cols-1 gap-5 w-full">
                            {items.map(item => (
                                <CartItem key={item.id} item={item} onQtyChange={handleQtyChange} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Cart Summary */}
                <div className="mobile:w-[300px] sm:w-2/3 2xl:w-1/3 2xl:mt-10 p-8 bg-gray-100 mx-auto">
                    <CartSummary 
                        subtotal={totals.subtotal} 
                        shipping={totals.shipping} 
                        estimatedTotal={totals.estimatedTotal} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Cart;
