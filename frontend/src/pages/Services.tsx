import { motion } from 'framer-motion';

const singleServices = [
  { name: "Single Video Editing", price: "₹500", desc: "High quality long-form video editing" },
  { name: "Single Shorts Editing", price: "₹200", desc: "Engaging short-form content" },
  { name: "Thumbnail Design", price: "₹100", desc: "Clickable, high-CTR thumbnails" },
  { name: "Upload & Channel Management", price: "₹200", desc: "Complete channel SEO and publishing" },
  { name: "Poster Design", price: "₹300", desc: "High quality poster design" },
  { name: "Flex Banner Design", price: "₹300", desc: "Print-ready flex banner designs" },
  { name: "Custom Frame Design", price: "₹300", desc: "Custom frame designs for videos" },
  { name: "Logo Design", price: "Starts from ₹500", desc: "Professional brand identity" }
];

const monthlyPlans = [
  { name: "20 Videos", price: "₹7000", desc: "Monthly plan for 20 long-form videos" },
  { name: "20 Shorts", price: "₹3000", desc: "Monthly plan for 20 shorts/reels" },
  { name: "20 Videos + 20 Shorts", price: "₹10000", desc: "Combined monthly plan" },
  { name: "Full Monthly Management", price: "₹12000", desc: "Editing, Thumbnails, Upload, Channel Management" }
];

const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gradient-gold mb-4">Our Services</h2>
        <p className="text-premium-silver">Premium editing and design services at competitive prices.</p>
      </div>

      <h3 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Single Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {singleServices.map((srv, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10, borderColor: '#d4af37' }}
            className="glass-card p-6 border border-white/5 transition-all"
          >
            <h4 className="text-xl font-bold text-premium-gold mb-2">{srv.name}</h4>
            <p className="text-premium-silverDark text-sm mb-4 h-10">{srv.desc}</p>
            <p className="text-2xl font-bold text-white">{srv.price}</p>
          </motion.div>
        ))}
      </div>

      <h3 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Monthly Plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {monthlyPlans.map((plan, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.05 }}
            className={`glass-card p-8 border ${idx === 3 ? 'border-premium-gold bg-premium-gold/5' : 'border-white/5'} transition-all text-center`}
          >
            {idx === 3 && <div className="text-xs text-premium-black bg-premium-gold py-1 px-3 rounded-full inline-block mb-4 font-bold">MOST POPULAR</div>}
            <h4 className="text-xl font-bold text-white mb-4">{plan.name}</h4>
            <p className="text-3xl font-extrabold text-gradient-gold mb-6">{plan.price}</p>
            <p className="text-premium-silverDark text-sm mb-8">{plan.desc}</p>
            <button className="btn-outline w-full hover:bg-premium-gold hover:text-black">Choose Plan</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default Services;
