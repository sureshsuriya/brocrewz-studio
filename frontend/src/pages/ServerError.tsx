import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServerError: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-8xl md:text-[10rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 tracking-tighter"
        >
          500
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-2xl md:text-3xl font-light mt-4 mb-8 text-primary-text/80"
        >
          Our servers are taking a brief hiatus.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-8 py-4 bg-primary-text text-black font-semibold rounded-full hover:bg-white transition-all duration-300 transform hover:-translate-y-1 mr-4"
          >
            Try Again
          </button>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 border border-primary-text/30 text-primary-text font-semibold rounded-full hover:bg-primary-text/10 transition-all duration-300"
          >
            Go Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ServerError;
