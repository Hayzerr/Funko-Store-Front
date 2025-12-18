import React from 'react';

const CartItem = ({ item, onQtyChange }) => {
    const price = item.DiscountPrice && item.DiscountPrice !== 'N/A'
        ? parseFloat(item.DiscountPrice)
        : parseFloat(item.DefaultPrice);
    const totalPrice = price * item.qty;

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center p-auto sm:p-4 border-b border-black">
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <img src={item.Images[0]?.imageUrl} alt={item.Name} className="w-[96px] h-[96px]" />
                <div className="text-lg font-semibold w-auto">
                    <p className="break-words whitespace-normal">{item.Name}</p>
                </div>
            </div>

            <div className="flex gap-20">
                <div>
                    <label htmlFor={`qty-${item.id}`} className="font-semibold bg-transparent mr-2">QTY:</label>
                    <select
                        id={`qty-${item.id}`}
                        value={item.qty}
                        onChange={(e) => onQtyChange(item.id, parseInt(e.target.value))}
                        className="border p-2 rounded-md"
                    >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(qty => (
                            <option key={qty} value={qty}>{qty}</option>
                        ))}
                    </select>
                </div>

                <div className="font-semibold">
                    <p>Total: ${totalPrice.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
