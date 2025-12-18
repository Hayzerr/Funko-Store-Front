import React from 'react';

const OrderPage = ({ order }) => {
  if (!order) {
    return <div className="text-red-500">Failed to create order. Please try again.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
      <p className="mb-2"><strong>Order ID:</strong> {order.id}</p>
      <p className="mb-2"><strong>Shipping Address:</strong> {order.shippingAddress}</p>
      <p className="mb-2"><strong>Status:</strong> {order.status}</p>
      <p className="mb-4"><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>

      <h2 className="text-xl font-semibold mb-2">Items:</h2>
      <ul className="list-disc ml-5">
        {order.orderItems.map((item) => (
          <li key={item.id}>
            {item.product.Name} - Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;
