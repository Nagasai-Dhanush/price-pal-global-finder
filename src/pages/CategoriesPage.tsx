
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  const categories = [
    {
      name: "Smartphones",
      icon: "📱",
      count: 256,
      slug: "smartphones"
    },
    {
      name: "Laptops",
      icon: "💻",
      count: 182,
      slug: "laptops"
    },
    {
      name: "Audio",
      icon: "🎧",
      count: 143,
      slug: "audio"
    },
    {
      name: "Accessories",
      icon: "⌚",
      count: 320,
      slug: "accessories"
    },
    {
      name: "TVs",
      icon: "📺",
      count: 94,
      slug: "tvs"
    },
    {
      name: "Gaming",
      icon: "🎮",
      count: 127,
      slug: "gaming"
    },
    {
      name: "Cameras",
      icon: "📷",
      count: 76,
      slug: "cameras"
    },
    {
      name: "Home Appliances",
      icon: "🏠",
      count: 214,
      slug: "home-appliances"
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Product Categories</h1>
      <p className="text-gray-400 mb-8">Browse products by category</p>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.map((category) => (
          <motion.div 
            key={category.slug}
            variants={item}
            className="bg-gloprice-darkBg border border-gray-800 rounded-xl overflow-hidden hover:border-gloprice-purple/30 transition-all hover:shadow-lg hover:shadow-gloprice-purple/5"
          >
            <Link to={`/search?q=${category.slug}`} className="block p-6">
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-medium mb-1">{category.name}</h3>
              <p className="text-gray-500">{category.count} products</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoriesPage;
