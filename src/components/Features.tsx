
import React from 'react';
import { Filter, Bell, LineChart, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: <Filter className="h-8 w-8 text-gloprice-purple" />,
      title: 'Compare Across Platforms',
      description: 'Easily compare prices across multiple e-commerce platforms'
    },
    {
      icon: <Bell className="h-8 w-8 text-gloprice-purple" />,
      title: 'Price Drop Alerts',
      description: 'Get notified instantly when prices drop below your target'
    },
    {
      icon: <LineChart className="h-8 w-8 text-gloprice-purple" />,
      title: 'Real-time Price Updates',
      description: 'Get the latest pricing data refreshed regularly'
    },
    {
      icon: <Target className="h-8 w-8 text-gloprice-purple" />,
      title: 'Best Deal Finder',
      description: 'We automatically highlight the best deals for you'
    }
  ];

  return (
    <div className="py-16 bg-gloprice-darkerBg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How GloPrice Works</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          We help you find the best deals by comparing prices across multiple e-commerce platforms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title} 
              className="bg-gloprice-darkBg p-6 rounded-lg flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-gloprice-darkPurple/10 p-4 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
