
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="bg-gloprice-purple rounded-full p-1.5">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white"
        >
          <path 
            fill="currentColor" 
            d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
          />
          <path 
            fill="currentColor" 
            d="M13 7h-2v6h6v-2h-4z"
          />
        </svg>
      </div>
      <span className="text-white font-semibold text-xl">GloPrice</span>
    </Link>
  );
};

export default Logo;
