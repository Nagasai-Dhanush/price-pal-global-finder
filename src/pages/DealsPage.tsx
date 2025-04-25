
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTrendingProducts } from '@/services/api';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';

const DealsPage = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['trendingProducts'],
    queryFn: getTrendingProducts
  });

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
      <div className="bg-gradient-to-r from-gloprice-purple/20 to-transparent p-8 rounded-lg mb-10">
        <h1 className="text-3xl font-bold mb-2">Today's Best Deals</h1>
        <p className="text-gray-400">
          Grab the best prices before they're gone!
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gloprice-purple"></div>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {products?.map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default DealsPage;
