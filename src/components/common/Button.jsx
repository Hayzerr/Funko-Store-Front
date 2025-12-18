import React from 'react';

  const Button = ({ text, onClick, className = '' }) => {
  return (
    <button
      className={`px-4 py-2 bg-black text-white rounded-3xl 
                  border-solid border-2 font-black border-black hover:bg-white hover:text-black 
                  uppercase transition-all duration-300 ${className}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
