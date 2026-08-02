import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ perspective: '2000px', width: '100%', height: '100%', overflow: 'hidden' }}>
      <motion.div
        initial={{ opacity: 0, rotateY: 90, scale: 0.8, z: -500 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
        exit={{ opacity: 0, rotateY: -90, scale: 0.8, z: -500 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d', transformOrigin: 'center' }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTransition;
