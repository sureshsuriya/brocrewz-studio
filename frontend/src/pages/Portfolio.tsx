import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ["All", "Video Editing", "Thumbnails", "Banners"];

const Portfolio = () => {
  const [active, setActive] = useState("All");

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black text-white mb-6 uppercase">Our <span className="text-gradient-gold">Portfolio</span></h2>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map(c => (
          <button 
            key={c} 
            onClick={() => setActive(c)}
            className={`px-6 py-2 rounded-full font-bold transition-all ${active === c ? 'bg-primary-gold text-background shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-glass-card text-silver hover:bg-white/10'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {[1,2,3,4,5,6].map(i => (
            <motion.div 
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card-premium aspect-video flex items-center justify-center relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-sm">
                <span className="text-primary-gold font-bold tracking-widest uppercase">View Project</span>
              </div>
              <span className="text-secondary-text relative z-0">Image/Video Placeholder</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
export default Portfolio;
