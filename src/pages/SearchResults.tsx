
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchProducts } from '@/services/api';
import ProductCard from '@/components/ProductCard';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { SearchFilters } from '@/types/product';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { data: allProducts, isLoading, error } = useQuery({
    queryKey: ['products', query],
    queryFn: () => searchProducts(query),
    enabled: query.length > 0,
  });
  
  const [filters, setFilters] = useState<SearchFilters>({
    priceRange: [0, 200000],
    platforms: ['Amazon', 'Flipkart'],
    sortBy: 'price-asc',
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(allProducts || []);
  
  useEffect(() => {
    if (allProducts) {
      let filtered = [...allProducts];
      
      // Filter by price
      filtered = filtered.filter((product) => {
        const totalPrice = product.price + product.shipping + product.taxes;
        return totalPrice >= filters.priceRange[0] && totalPrice <= filters.priceRange[1];
      });
      
      // Filter by platform
      if (filters.platforms.length) {
        filtered = filtered.filter((product) => filters.platforms.includes(product.platform));
      }
      
      // Sort products
      filtered = filtered.sort((a, b) => {
        const aTotalPrice = a.price + a.shipping + a.taxes;
        const bTotalPrice = b.price + b.shipping + b.taxes;
        
        switch (filters.sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'total-asc':
            return aTotalPrice - bTotalPrice;
          case 'total-desc':
            return bTotalPrice - aTotalPrice;
          default:
            return 0;
        }
      });
      
      setFilteredProducts(filtered);
    }
  }, [allProducts, filters]);
  
  const togglePlatform = (platform: string) => {
    const currentPlatforms = [...filters.platforms];
    if (currentPlatforms.includes(platform)) {
      setFilters({
        ...filters,
        platforms: currentPlatforms.filter(p => p !== platform),
      });
    } else {
      setFilters({
        ...filters,
        platforms: [...currentPlatforms, platform],
      });
    }
  };
  
  const maxPrice = allProducts ? Math.max(...allProducts.map(p => p.price + p.shipping + p.taxes)) : 200000;
  
  const getContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const getItemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gloprice-purple"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-gray-400">An error occurred while fetching results.</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">
        Search Results for "{query}"
      </h1>
      <p className="text-gray-400 mb-8">
        Found {filteredProducts?.length || 0} products
      </p>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Mobile */}
        <div className="md:hidden mb-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-between border-gray-700" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters & Sorting
            </span>
            <span className="text-sm text-gray-500">
              {filteredProducts?.length || 0} results
            </span>
          </Button>
          
          {showFilters && (
            <div className="mt-4 p-4 bg-gloprice-darkBg rounded-lg border border-gray-800">
              {/* Mobile filters content */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Sort By</h3>
                <Select 
                  value={filters.sortBy}
                  onValueChange={(value: any) => setFilters({...filters, sortBy: value})}
                >
                  <SelectTrigger className="w-full bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="total-asc">Total Cost: Low to High</SelectItem>
                    <SelectItem value="total-desc">Total Cost: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, maxPrice]}
                    min={0}
                    max={maxPrice}
                    step={1000}
                    value={filters.priceRange}
                    onValueChange={(value: number[]) => setFilters({...filters, priceRange: value as [number, number]})}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-400">
                    <span>{formatCurrency(filters.priceRange[0])}</span>
                    <span>{formatCurrency(filters.priceRange[1])}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Platforms</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox 
                      id="amazon-mobile" 
                      checked={filters.platforms.includes('Amazon')}
                      onCheckedChange={() => togglePlatform('Amazon')}
                    />
                    <label htmlFor="amazon-mobile" className="ml-2 text-sm font-medium">
                      Amazon
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <Checkbox 
                      id="flipkart-mobile" 
                      checked={filters.platforms.includes('Flipkart')}
                      onCheckedChange={() => togglePlatform('Flipkart')}
                    />
                    <label htmlFor="flipkart-mobile" className="ml-2 text-sm font-medium">
                      Flipkart
                    </label>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4 bg-gloprice-purple hover:bg-gloprice-darkPurple"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Filters - Desktop */}
        <div className="hidden md:block w-60 shrink-0">
          <div className="sticky top-24 bg-gloprice-darkBg p-4 rounded-lg border border-gray-800">
            <h3 className="font-medium text-lg mb-6">Filters</h3>
            
            <div className="mb-6">
              <h4 className="font-medium mb-3">Sort By</h4>
              <Select 
                value={filters.sortBy}
                onValueChange={(value: any) => setFilters({...filters, sortBy: value})}
              >
                <SelectTrigger className="w-full bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="total-asc">Total Cost: Low to High</SelectItem>
                  <SelectItem value="total-desc">Total Cost: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="px-2">
                <Slider
                  defaultValue={[0, maxPrice]}
                  min={0}
                  max={maxPrice}
                  step={1000}
                  value={filters.priceRange}
                  onValueChange={(value: number[]) => setFilters({...filters, priceRange: value as [number, number]})}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                  <span>{formatCurrency(filters.priceRange[0])}</span>
                  <span>{formatCurrency(filters.priceRange[1])}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Platforms</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox 
                    id="amazon" 
                    checked={filters.platforms.includes('Amazon')}
                    onCheckedChange={() => togglePlatform('Amazon')}
                  />
                  <label htmlFor="amazon" className="ml-2 text-sm font-medium">
                    Amazon
                  </label>
                </div>
                
                <div className="flex items-center">
                  <Checkbox 
                    id="flipkart" 
                    checked={filters.platforms.includes('Flipkart')}
                    onCheckedChange={() => togglePlatform('Flipkart')}
                  />
                  <label htmlFor="flipkart" className="ml-2 text-sm font-medium">
                    Flipkart
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="flex-1">
          {filteredProducts && filteredProducts.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={getContainerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={getItemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="bg-gloprice-darkBg p-8 rounded-lg border border-gray-800 text-center">
              <h2 className="text-xl font-medium mb-2">No products found</h2>
              <p className="text-gray-400">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
