import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CheckIcon = () => (
  <svg className="w-4 h-4 text-primary-gold mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

const Services = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('/api/public/services');
        setServices(res.data);
      } catch {
        // Fallback to empty state
      }
    };
    fetchServices();
  }, []);

  const monthlyPlans = services.filter(s => s.planType === 'MONTHLY');
  const singleServices = services.filter(s => s.planType === 'SINGLE' || s.planType === 'ONETIME');

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-20"
      >
        <h2 className="text-5xl font-black text-white mb-6 tracking-tighter uppercase">Premium <span className="text-gradient-gold">Services</span></h2>
        <p className="text-silver max-w-2xl mx-auto text-lg">Fast Delivery • Premium Quality • Affordable Pricing</p>
      </motion.div>

      {monthlyPlans.length > 0 && (
      <div className="mb-24">
        <h3 className="text-3xl font-black text-white mb-10 text-center uppercase tracking-wider border-b border-white/10 pb-4 inline-block">Monthly Plans</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {monthlyPlans.map((plan, idx) => {
            const isPopular = plan.name.toLowerCase().includes("full");
            return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className={`relative glass-card-premium p-8 flex flex-col justify-between overflow-hidden group ${isPopular ? 'border-primary-gold shadow-[0_0_30px_rgba(212,175,55,0.2)] md:-translate-y-4' : 'border-white/10'}`}
            >
              {isPopular && (
                <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(212,175,55,1)_360deg)] animate-spin" style={{ animationDuration: "3s" }} />
              )}
              
              <div className="relative z-10 bg-surface/90 backdrop-blur-3xl absolute inset-[1px] p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-full">
                <div>
                  {isPopular && <div className="text-xs font-bold bg-primary-gold text-background px-3 py-1 rounded-full inline-block mb-4 animate-pulse-glow">RECOMMENDED</div>}
                  <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                  <p className="text-secondary-text mb-4 text-sm min-h-[40px]">{plan.description}</p>
                  <div className="text-4xl font-black text-gradient-gold mb-6">₹{plan.price}</div>
                  <ul className="space-y-4 mb-8 text-sm">
                    {plan.features?.split(',').map((f: string, i: number) => (
                      <li key={i} className="flex items-start text-silver">
                        <CheckIcon /> 
                        <span className="leading-snug">{f.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <MagneticButton className="w-full mt-auto">
                  <Link to="/contact" className={`block text-center w-full py-4 rounded-full font-bold transition-all text-sm ${isPopular ? 'bg-primary-gold text-background hover:bg-secondary-gold' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                    DM to Book
                  </Link>
                </MagneticButton>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
      )}

      {singleServices.length > 0 && (
      <div>
        <div className="text-center mb-10">
          <h3 className="text-3xl font-black text-white uppercase tracking-wider border-b border-white/10 pb-4 inline-block">Single Services & Design</h3>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {singleServices.map((service, idx) => {
            const isLogo = service.name.toLowerCase().includes("logo");
            return (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="glass-card-premium p-6 border-white/10 hover:border-primary-gold/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{service.name}</h4>
                  <p className="text-xs text-secondary-text mb-4 line-clamp-3">{service.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="text-xl font-black text-primary-gold">
                    {isLogo ? `Starts from ₹${service.price}` : `₹${service.price}`}
                  </div>
                  <Link to="/contact" className="text-xs font-bold text-white hover:text-primary-gold uppercase tracking-wider transition-colors">
                    Book &rarr;
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      )}
    </div>
  );
};
export default Services;
