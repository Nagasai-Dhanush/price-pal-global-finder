
import React from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface PriceHistoryChartProps {
  productId: string;
}

const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ productId }) => {
  // This would normally be fetched from an API
  // For now, we'll generate some sample data
  const generateMockPriceHistory = () => {
    const data = [];
    const today = new Date();
    const basePrice = Math.floor(Math.random() * 10000) + 20000;  // Random price in rupees

    // Generate data for the past 30 days
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

  const data = generateMockPriceHistory();
  
  const formatXAxis = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gloprice-darkerBg p-3 border border-gray-800 rounded shadow-lg">
          <p className="text-gray-400">{`Date: ${label}`}</p>
          <p className="text-gloprice-purple font-medium">{`Price: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 20, bottom: 15 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="date" 
          tickFormatter={formatXAxis} 
          tick={{ fill: '#9CA3AF' }} 
          axisLine={{ stroke: '#4B5563' }}
        />
        <YAxis 
          tickFormatter={(value) => `₹${value.toLocaleString()}`} 
          tick={{ fill: '#9CA3AF' }} 
          axisLine={{ stroke: '#4B5563' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke="#9b87f5" 
          strokeWidth={2} 
          dot={{ fill: '#9b87f5', r: 1 }}
          activeDot={{ fill: '#9b87f5', r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceHistoryChart;
