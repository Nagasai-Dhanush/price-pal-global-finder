
import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

const Hero = () => {
  const popularSearches = [
    'iPhone 14',
    'Gaming Laptop',
    'Headphones',
    'Smartwatch',
  ];

  return (
    <div className="py-16 md:py-24 text-center">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-gloprice-purple mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Find the Best Deals
        <br className="md:hidden" /> Worldwide
      </motion.h1>
      
      <motion.p 
        className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Compare prices across Amazon, eBay, Flipkart, and more to find the lowest prices
        including shipping and taxes.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <SearchBar className="mx-auto" />
      </motion.div>
      
      <motion.div 
        className="mt-6 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <span className="mr-2">Popular:</span>
        {popularSearches.map((item, index) => (
          <React.Fragment key={item}>
            <a 
              href={`/search?q=${encodeURIComponent(item)}`} 
              className="text-gloprice-purple hover:underline mx-1"
            >
              {item}
            </a>
            {index < popularSearches.length - 1 && " "}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default Hero;
