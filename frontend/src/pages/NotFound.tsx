import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-9xl md:text-[15rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-white tracking-tighter"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl md:text-3xl font-light mt-4 mb-8 text-primary-text/80"
        >
          The page you're looking for has drifted into the void.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-primary-gold text-black font-semibold rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1"
          >
            Return to Reality
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
