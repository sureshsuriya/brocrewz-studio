import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black-gold z-0"></div>
        <div className="z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6"
          >
            <span className="text-gradient-gold">WE EDIT. </span> YOU INSPIRE.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-premium-silver mb-10"
          >
            Premium Video Editing, Branding, and Channel Management for Top Creators.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/contact" className="btn-primary w-full sm:w-auto text-center">Book Now</Link>
            <Link to="/portfolio" className="btn-outline w-full sm:w-auto text-center">View Our Work</Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 bg-premium-black">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="glass-card p-6">
            <h3 className="text-4xl font-bold text-premium-gold mb-2">500+</h3>
            <p className="text-premium-silverDark">Videos Edited</p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-4xl font-bold text-premium-gold mb-2">100+</h3>
            <p className="text-premium-silverDark">Happy Clients</p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-4xl font-bold text-premium-gold mb-2">50M+</h3>
            <p className="text-premium-silverDark">Views Generated</p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-4xl font-bold text-premium-gold mb-2">3+</h3>
            <p className="text-premium-silverDark">Years Experience</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
