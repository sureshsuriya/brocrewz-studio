import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background" style={{ gridArea: '1 / 1 / 2 / 2' }}>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-full rounded-full border-4 border-primary-text/10 border-t-primary-gold"
          />
        </div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="mt-6 tracking-[0.2em] uppercase text-sm text-primary-gold font-medium"
        >
          Loading
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
