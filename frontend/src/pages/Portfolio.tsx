import { useState } from 'react';
import { motion } from 'framer-motion';

const categories = ["All", "Video Editing", "Thumbnails", "Logos", "Banners"];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gradient-gold mb-4">Our Portfolio</h2>
        <p className="text-premium-silver">A showcase of our premium works.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-2 rounded-full border transition-all ${activeTab === cat ? 'bg-premium-gold text-black border-premium-gold font-bold' : 'border-white/20 text-premium-silver hover:border-premium-gold hover:text-premium-gold'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card h-64 flex items-center justify-center">
            <span className="text-premium-silverDark">Portfolio Item Placeholder</span>
         </motion.div>
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{delay: 0.1}} className="glass-card h-64 flex items-center justify-center">
            <span className="text-premium-silverDark">Portfolio Item Placeholder</span>
         </motion.div>
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{delay: 0.2}} className="glass-card h-64 flex items-center justify-center">
            <span className="text-premium-silverDark">Portfolio Item Placeholder</span>
         </motion.div>
      </div>
    </div>
  );
};
export default Portfolio;
