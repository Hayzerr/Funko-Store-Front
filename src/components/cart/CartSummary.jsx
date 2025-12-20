import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/apiConfig';
import ShippingProgress from './ShippingProgress';
import Button from '../common/Button';

const CartSummary = ({ subtotal, shipping, estimatedTotal, shippingAddress }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    const shippingAddress = '123'; // Example shipping address
    try {
      if (!shippingAddress) {
        alert('Shipping address is required');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/orders?shippingAddress=${encodeURIComponent(shippingAddress)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const order = await response.json();
        navigate('/order', { state: { order } }); // Navigate to the OrderPage with order details
      } else {
        const error = await response.json();
        console.error(error.error);
        alert(`Order failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Order creation error:', error);
      alert('An error occurred while creating the order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-black pt-4">
      {/* Shipping Progress */}
      <ShippingProgress subtotal={subtotal} />

      <div className="flex justify-between text-lg font-semibold mb-2">
        <span>Subtotal: </span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-lg font-semibold mb-2">
        <span>Shipping: </span>
        <span className="italic justify-end">{shipping}</span>
      </div>
      <div className="flex justify-between text-lg font-semibold mb-2">
        <span>Estimated Total:</span>
        <span>${estimatedTotal.toFixed(2)}</span>
      </div>

      <Button
        text={loading ? 'Processing...' : 'BUY'}
        className="w-full py-4"
        onClick={handleBuy}
        disabled={loading}
      />
    </div>
  );
};

export default CartSummary;
