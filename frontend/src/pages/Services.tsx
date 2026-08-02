import { motion } from 'framer-motion';
import { MagneticButton } from '../components/ui/MagneticButton';

const singleServices = [
  { name: "Single Video Editing", price: "₹500", desc: "Professional cinematic editing" },
  { name: "Single Shorts Editing", price: "₹200", desc: "High-retention vertical edits" },
  { name: "Thumbnail Design", price: "₹100", desc: "Eye-catching click-through designs" },
  { name: "Upload & Management", price: "₹200", desc: "Complete channel management" },
  { name: "Poster Design", price: "₹300", desc: "Custom promotional posters" },
  { name: "Flex Banner Design", price: "₹300", desc: "High-quality banner graphics" },
  { name: "Custom Frame Design", price: "₹300", desc: "Personalized visual frames" },
  { name: "Logo Design", price: "from ₹500", desc: "Unique brand identity" },
];

const monthlyPlans = [
  { name: "Shorts Plan", price: "₹3,000", desc: "For short-form consistency", features: ["20 Shorts"] },
  { name: "Standard Plan", price: "₹7,000", desc: "Consistent long-form growth", features: ["20 Videos"] },
  { name: "Hybrid Plan", price: "₹10,000", desc: "Omnichannel presence", features: ["20 Videos", "20 Shorts"] },
  { name: "Full Management", price: "₹12,000", desc: "Hands-off scaling", popular: true, features: ["Editing + Thumbnails", "Upload & SEO", "Complete Channel Management"] }
];

const Services = () => {
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

      <div className="mb-24">
        <h3 className="text-3xl font-black text-white mb-10 text-center uppercase tracking-wider border-b border-white/10 pb-4 inline-block">Monthly Plans</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {monthlyPlans.map((plan, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className={`relative glass-card-premium p-8 flex flex-col justify-between overflow-hidden group ${plan.popular ? 'border-primary-gold shadow-[0_0_30px_rgba(212,175,55,0.2)]' : 'border-white/10'}`}
            >
              {plan.popular && (
                <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(212,175,55,1)_360deg)] animate-spin" style={{ animationDuration: "3s" }} />
              )}
              
              <div className="relative z-10 bg-surface/90 backdrop-blur-3xl absolute inset-[1px] p-6 rounded-2xl flex flex-col justify-between h-full">
                <div>
                  {plan.popular && <div className="text-xs font-bold bg-primary-gold text-background px-3 py-1 rounded-full inline-block mb-4 animate-pulse-glow">CROWN JEWEL</div>}
                  <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                  <p className="text-secondary-text mb-4 text-sm">{plan.desc}</p>
                  <div className="text-4xl font-black text-gradient-gold mb-6">{plan.price}</div>
                  <ul className="space-y-3 mb-8 text-sm">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start text-silver">
                        <span className="text-primary-gold mr-2 mt-1 text-xs">✦</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <MagneticButton className="w-full mt-auto">
                  <button className={`w-full py-3 rounded-full font-bold transition-all text-sm ${plan.popular ? 'bg-primary-gold text-background hover:bg-secondary-gold' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                    DM to Book
                  </button>
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-black text-white mb-10 text-center uppercase tracking-wider border-b border-white/10 pb-4 inline-block">Single Services & Design</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {singleServices.map((service, idx) => (
             <motion.div 
             key={idx}
             whileHover={{ scale: 1.02 }}
             className="glass-card-premium p-6 border-white/5 hover:border-primary-gold/50 transition-colors"
           >
             <h4 className="text-xl font-bold text-white mb-1">{service.name}</h4>
             <p className="text-xs text-secondary-text mb-4">{service.desc}</p>
             <div className="text-2xl font-black text-primary-gold">{service.price}</div>
           </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};
export default Services;
