import React from 'react';
import { Link } from 'react-router-dom';

const MAccountMenu = () => {
  return (
    <div className="flex flex-col items-start space-y-4 p-4">
      <Link to="/edit-profile" className="text-lg font-medium text-black hover:text-gray-700">
        EDIT PROFILE
      </Link>
      <Link to="/address-book" className="text-lg font-medium text-black hover:text-gray-700">
        ADDRESS BOOK
      </Link>
      <Link to="/order-history" className="text-lg font-medium text-black hover:text-gray-700">
        ORDER HISTORY
      </Link>
      <Link to="/preorder" className="text-lg font-medium text-black hover:text-gray-700">
        PRE-ORDERS
      </Link>
      <Link to="/wishlist" className="text-lg font-medium text-black hover:text-gray-700">
        WISHLIST
      </Link>
      <Link to="/notification-settings" className="text-lg font-medium text-black hover:text-gray-700">
        NOTIFICATION SETTINGS
      </Link>
    </div>
  );
};

export default MAccountMenu;
