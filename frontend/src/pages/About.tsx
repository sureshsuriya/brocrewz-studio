import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-6">About BroCrewz Studio</h2>
        <p className="text-xl text-premium-silver max-w-3xl mx-auto">
          We are a professional video editing agency providing high-quality editing, thumbnails, branding, and channel management for creators and businesses globally.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8"
        >
          <h3 className="text-2xl font-bold text-premium-gold mb-4">Our Mission</h3>
          <p className="text-premium-silverDark leading-relaxed">
            To empower creators by taking the heavy lifting of post-production off their shoulders, allowing them to focus on what they do best: creating inspiring content. We believe in quality, speed, and premium aesthetics.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 bg-black-gold"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Why Choose Us?</h3>
          <ul className="space-y-4 text-premium-silverDark">
            <li className="flex items-center"><span className="text-premium-gold mr-3">✔</span> Industry-standard Editing</li>
            <li className="flex items-center"><span className="text-premium-gold mr-3">✔</span> High CTR Thumbnails</li>
            <li className="flex items-center"><span className="text-premium-gold mr-3">✔</span> Dedicated Channel Management</li>
            <li className="flex items-center"><span className="text-premium-gold mr-3">✔</span> Fast Turnaround Times</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};
export default About;
