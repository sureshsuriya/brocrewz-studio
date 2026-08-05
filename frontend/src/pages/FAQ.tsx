import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get('/api/public/faqs');
        setFaqs(res.data.sort((a: any, b: any) => a.displayOrder - b.displayOrder));
      } catch {
        // Fallback to empty state
      }
    };
    fetchFaqs();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter">
          Got <span className="text-gradient-gold">Questions?</span>
        </h2>
        <p className="text-silver text-lg">Everything you need to know about working with BroCrewz Studio.</p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card-premium overflow-hidden border-white/5 hover:border-primary-gold/30 transition-colors"
          >
            <button 
              onClick={() => toggleFaq(index)}
              className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
            >
              <h3 className="text-lg md:text-xl font-bold text-white pr-8">{faq.question}</h3>
              <span className={`text-primary-gold text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 pt-0 text-silver text-sm md:text-base leading-relaxed border-t border-white/10 mt-2">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 text-center glass-card-premium p-10"
      >
        <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
        <p className="text-secondary-text mb-8">We're here to help you elevate your content.</p>
        <MagneticButton>
          <Link to="/contact" className="inline-block bg-primary-gold text-background px-8 py-4 rounded-full font-bold hover:bg-secondary-gold transition-colors shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            Contact Us
          </Link>
        </MagneticButton>
      </motion.div>
    </div>
  );
};

export default FAQ;
