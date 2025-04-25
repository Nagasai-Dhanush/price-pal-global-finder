
import { Product, PriceHistory } from '@/types/product';
import { generateProductId } from '@/lib/utils';

// Mock product data
const mockProducts: Product[] = [
  {
    id: generateProductId(),
    name: "Apple iPhone 14 (128GB) - Midnight",
    price: 69900,
    shipping: 0,
    taxes: 0,
    image: "https://m.media-amazon.com/images/I/61cwywLZR-L._SL1500_.jpg",
    url: "https://www.amazon.in/Apple-iPhone-14-128GB-Midnight/dp/B0BDHX8Z63/",
    platform: "Amazon"
  },
  {
    id: generateProductId(),
    name: "APPLE iPhone 14 (Midnight, 128 GB)",
    price: 68999,
    shipping: 50,
    taxes: 0,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/9/e/e/-original-imaghx9q5rvcdghy.jpeg",
    url: "https://www.flipkart.com/apple-iphone-14-midnight-128-gb/p/itm9e6293c322a84",
    platform: "Flipkart"
  },
  {
    id: generateProductId(),
    name: "Samsung Galaxy S22 Ultra 5G (Burgundy, 12GB, 256GB Storage)",
    price: 109999,
    shipping: 0,
    taxes: 0,
    image: "https://m.media-amazon.com/images/I/71J8tz0UeJL._SL1500_.jpg",
    url: "https://www.amazon.in/Samsung-Galaxy-Burgundy-Storage-Without/dp/B09SH7FDKT/",
    platform: "Amazon"
  },
  {
    id: generateProductId(),
    name: "SAMSUNG Galaxy S22 Ultra 5G (Burgundy, 256 GB)",
    price: 108999,
    shipping: 0,
    taxes: 0,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/w/t/r/-original-imaggj68cgtdacxn.jpeg",
    url: "https://www.flipkart.com/samsung-galaxy-s22-ultra-5g-burgundy-256-gb/p/itm4a36292624169",
    platform: "Flipkart"
  },
  {
    id: generateProductId(),
    name: "OnePlus 11 5G (Eternal Green, 16GB RAM, 256GB Storage)",
    price: 61999,
    shipping: 0,
    taxes: 0,
    image: "https://m.media-amazon.com/images/I/61amb0CfMGL._SL1500_.jpg",
    url: "https://www.amazon.in/OnePlus-Eternal-Green-256GB-Storage/dp/B0BQJM2PXW/",
    platform: "Amazon"
  },
  {
    id: generateProductId(),
    name: "OnePlus 11 5G (Eternal Green, 16GB RAM, 256GB Storage)",
    price: 61999,
    shipping: 99,
    taxes: 0,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/q/t/8/-original-imaghuczzmp8tf27.jpeg",
    url: "https://www.flipkart.com/oneplus-11-5g-eternal-green-256-gb/p/itm71ae41e907097",
    platform: "Flipkart"
  },
  {
    id: generateProductId(),
    name: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
    price: 29990,
    shipping: 0,
    taxes: 0,
    image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._SL1500_.jpg",
    url: "https://www.amazon.in/Sony-WH-1000XM4-Cancelling-Headphones-Bluetooth/dp/B0863TXGM3/",
    platform: "Amazon"
  },
  {
    id: generateProductId(),
    name: "SONY WH-1000XM4 Bluetooth Headset",
    price: 29490,
    shipping: 40,
    taxes: 0,
    image: "https://rukminim2.flixcart.com/image/416/416/ksnjp8w0/headphone/8/k/n/wh-1000xm4-sony-original-imag662h9bzhmvtg.jpeg",
    url: "https://www.flipkart.com/sony-wh-1000xm4-bluetooth-headset/p/itm5401b0a150db0",
    platform: "Flipkart"
  },
  {
    id: generateProductId(),
    name: "Apple MacBook Air Laptop M1 chip, 13.3-inch/33.74 cm",
    price: 83990,
    shipping: 0,
    taxes: 0,
    image: "https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg",
    url: "https://www.amazon.in/Apple-MacBook-Chip-13-inch-256GB/dp/B08N5W4NNB/",
    platform: "Amazon"
  },
  {
    id: generateProductId(),
    name: "APPLE MacBook Air M1 - (8 GB/256 GB SSD/Mac OS Big Sur)",
    price: 81990,
    shipping: 0,
    taxes: 0,
    image: "https://rukminim2.flixcart.com/image/416/416/kp5sya80/computer/n/v/m/na-thin-and-light-laptop-apple-original-imag3gh5xftgbpg3.jpeg",
    url: "https://www.flipkart.com/apple-macbook-air-m1-8-gb-256-gb-ssd-mac-os-big-sur-mgn63hn-a/p/itm2c4ac9ef8f911",
    platform: "Flipkart"
  },
  {
    id: generateProductId(),
    name: "DualSense Wireless Controller",
    price: 5990,
    shipping: 40,
    taxes: 0,
    image: "https://m.media-amazon.com/images/I/61O9tWR6WDS._SL1500_.jpg",
    url: "https://www.amazon.in/Sony-DualSense-Wireless-Controller-PlayStation/dp/B08GZ54YJF/",
    platform: "Amazon"
  },
  {
    id: generateProductId(),
    name: "SONY PlayStation 5 DualSense Wireless Controller",
    price: 5690,
    shipping: 50,
    taxes: 0,
    image: "https://rukminim2.flixcart.com/image/416/416/kf4ajrk0/gamepad/n/c/h/sony-dualsense-wireless-controller-original-imafvnhvrqrxfzhn.jpeg",
    url: "https://www.flipkart.com/sony-playstation-5-dualsense-wireless-controller/p/itm65ba7f925b792",
    platform: "Flipkart"
  },
];

// Simulated API delay
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 800));

// Search Products API
export const searchProducts = async (query: string): Promise<Product[]> => {
  await simulateApiDelay();
  
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) || 
    product.platform.toLowerCase().includes(lowerQuery)
  );
};

// Get Product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  await simulateApiDelay();
  
  const product = mockProducts.find(p => p.id === id);
  return product || null;
};

// Get Price History for a Product
export const getPriceHistory = async (productId: string): Promise<PriceHistory[]> => {
  await simulateApiDelay();
  
  const product = await getProductById(productId);
  if (!product) return [];
  
  // Generate mock price history data
  const data: PriceHistory[] = [];
  const today = new Date();
  const basePrice = product.price;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Random price fluctuation (±15%)
    const variation = (Math.random() * 0.3) - 0.15; 
    const price = Math.round(basePrice * (1 + variation));
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: price,
    });
  }
  
  return data;
};

// Create Price Alert
export const createPriceAlert = async (productId: string, targetPrice: number, userId: string): Promise<boolean> => {
  await simulateApiDelay();
  // In a real app, this would save to a database
  console.log(`Alert created for product ${productId} at price ₹${targetPrice} for user ${userId}`);
  return true;
};

// Get Trending Products
export const getTrendingProducts = async (): Promise<Product[]> => {
  await simulateApiDelay();
  // In a real app, this would return actual trending products
  return mockProducts.slice(0, 6);
};
