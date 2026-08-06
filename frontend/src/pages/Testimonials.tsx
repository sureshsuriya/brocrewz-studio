import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get('/api/public/testimonials');
        if (Array.isArray(res.data) && isMounted) {
          setTestimonials(res.data);
        }
      } catch {
        // Retain empty state fallback
      }
    };
    fetchTestimonials();
    return () => { isMounted = false; };
  }, []);

  const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter">Client <span className="text-gradient-gold">Love</span></h2>
        <p className="text-silver text-lg">See what creators are saying about our editing.</p>
      </motion.div>

      {safeTestimonials.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24 glass-card-premium max-w-lg mx-auto"
        >
          <div className="text-6xl mb-6">⭐</div>
          <h3 className="text-2xl font-bold text-white mb-3">No Testimonials Yet</h3>
          <p className="text-secondary-text leading-relaxed">
            Client reviews are on their way. We're collecting feedback from our creators.
          </p>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {safeTestimonials.map((t, idx) => {
            const rawRating = Number(t?.rating);
            const ratingCount = !isNaN(rawRating) && rawRating > 0 ? Math.min(Math.floor(rawRating), 5) : 5;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card-premium p-8 relative"
              >
                <div className="text-primary-gold text-6xl font-serif absolute top-4 right-6 opacity-20">"</div>
                <p className="text-silver mb-8 relative z-10 leading-relaxed italic">"{t.feedback}"</p>
                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-white font-bold text-lg">{t.clientName}</h4>
                  <div className="flex text-primary-gold text-xs mt-1">
                    {[...Array(ratingCount)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Testimonials;
