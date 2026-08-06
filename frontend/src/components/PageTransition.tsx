import { Suspense } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorBoundary from './ErrorBoundary';

const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="w-full h-full"
      style={{ gridArea: '1 / 1 / 2 / 2' }}
    >
      <ErrorBoundary>
        <Suspense fallback={<LoadingSkeleton />}>
          {children}
        </Suspense>
      </ErrorBoundary>
    </motion.div>
  );
};

export default PageTransition;
