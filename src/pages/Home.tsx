
import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { useQuery } from '@tanstack/react-query';
import { getTrendingProducts } from '@/services/api';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';

const Home = () => {
  const { data: trendingProducts, isLoading } = useQuery({
    queryKey: ['trendingProducts'],
    queryFn: getTrendingProducts
  });

  return (
    <div className="min-h-screen">
      <Hero />
      
      <Features />
      
      <div className="py-16 container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Trending Products
        </motion.h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gloprice-purple"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts?.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <a 
            href="/search" 
            className="inline-block px-8 py-3 bg-gloprice-purple hover:bg-gloprice-darkPurple text-white rounded-full transition-colors"
          >
            View All Products
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
