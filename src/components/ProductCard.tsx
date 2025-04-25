
import React, { useState } from 'react';
import { LineChart, ShoppingBag, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Product } from '@/types/product';
import PriceHistoryChart from '@/components/PriceHistoryChart';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showHistory, setShowHistory] = useState(false);
  const { toast } = useToast();

  const handleBuyNow = () => {
    window.open(product.url, '_blank');
  };

  const handleSetAlert = () => {
    // For now, just show a toast
    toast({
      title: "Price Alert Set!",
      description: `We'll notify you when the ${product.name} drops below ${formatCurrency(product.price * 0.9)}`,
    });
  };

  const getPlatformBadgeClass = (platform: string) => {
    switch(platform.toLowerCase()) {
      case 'amazon':
        return 'platform-badge platform-badge-amazon';
      case 'flipkart':
        return 'platform-badge platform-badge-flipkart';
      default:
        return 'platform-badge bg-gray-700 text-gray-300';
    }
  };

  const getPlatformLogo = (platform: string) => {
    switch(platform.toLowerCase()) {
      case 'amazon':
        return '/lovable-uploads/df66f5ea-b6b9-4a76-aa91-c731b8fd572f.png';
      case 'flipkart':
        return '/lovable-uploads/df66f5ea-b6b9-4a76-aa91-c731b8fd572f.png';
      default:
        return '/lovable-uploads/df66f5ea-b6b9-4a76-aa91-c731b8fd572f.png';
    }
  };

  return (
    <>
      <div className="bg-gloprice-darkBg border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-gloprice-purple/5 group">
        <div className="relative h-48 overflow-hidden bg-gray-900">
          <img 
            src={product.image || "https://via.placeholder.com/300"} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <span className={`absolute top-2 left-2 ${getPlatformBadgeClass(product.platform)}`}>
            {product.platform}
          </span>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-white h-12 overflow-hidden line-clamp-2 mb-2">{product.name}</h3>
          
          <div className="mt-2 mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-400 text-sm">Price:</span>
              <span className="font-semibold text-white">{formatCurrency(product.price)}</span>
            </div>
            
            {product.shipping > 0 && (
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-400 text-sm">Shipping:</span>
                <span className="text-gray-300">{formatCurrency(product.shipping)}</span>
              </div>
            )}
            
            {product.taxes > 0 && (
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-400 text-sm">Taxes:</span>
                <span className="text-gray-300">{formatCurrency(product.taxes)}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-1 border-t border-gray-800 mt-2">
              <span className="text-gray-400 text-sm">Total:</span>
              <span className="font-semibold text-gloprice-purple text-lg">
                {formatCurrency(product.price + product.shipping + product.taxes)}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button 
              onClick={handleBuyNow} 
              className="bg-gloprice-purple hover:bg-gloprice-darkPurple"
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              Buy Now
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowHistory(true)}
              className="border-gray-700 hover:border-gloprice-purple"
            >
              <LineChart className="h-4 w-4 mr-1" />
              History
            </Button>
          </div>

          <Button 
            variant="ghost" 
            className="w-full mt-2 text-gray-400 hover:text-gloprice-purple"
            onClick={handleSetAlert}
          >
            <Bell className="h-4 w-4 mr-1" />
            Set Price Alert
          </Button>
        </div>
      </div>

      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="bg-gloprice-darkBg text-white border-gray-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Price History - {product.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 h-72">
            <PriceHistoryChart productId={product.id} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
