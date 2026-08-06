import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DEFAULT_SERVICES = [
  { name: "20 Videos Plan", description: "Monthly plan for 20 long-form videos.", price: "7000", planType: "MONTHLY", features: "20 Long Videos, Priority Support, Dedicated Editor", icon: "🎞️" },
  { name: "20 Shorts Plan", description: "Monthly plan for 20 shorts/reels.", price: "3000", planType: "MONTHLY", features: "20 Shorts, Viral Hooks, Quick Turnaround", icon: "🎬" },
  { name: "20 Videos + 20 Shorts", description: "Combined monthly plan.", price: "10000", planType: "MONTHLY", features: "20 Videos, 20 Shorts, Premium Support", icon: "⚡" },
  { name: "Full Monthly Management", description: "Complete channel takeover.", price: "12000", planType: "MONTHLY", features: "Editing, Thumbnails, Upload, Channel Management", icon: "👑" },
  { name: "Single Video Editing", description: "High quality video editing for a single video.", price: "500", planType: "SINGLE", features: "Professional Video Editing, Color Grading, Audio Enhancement", icon: "🎥" },
  { name: "Single Shorts Editing", description: "Engaging short-form content editing.", price: "200", planType: "SINGLE", features: "Shorts Editing, Captions, Motion Graphics", icon: "🎬" },
  { name: "Thumbnail Design", description: "Clickable, high-CTR thumbnail designs.", price: "100", planType: "SINGLE", features: "Custom Design, Source File", icon: "🖼️" },
  { name: "Upload & Channel Management", description: "Complete channel management.", price: "200", planType: "SINGLE", features: "SEO Optimization, Tags, Publishing", icon: "⬆️" },
  { name: "Poster Design", description: "High quality poster design.", price: "300", planType: "SINGLE", features: "Custom Design, High Resolution", icon: "🎨" },
  { name: "Flex Banner Design", description: "Print-ready flex banner designs.", price: "300", planType: "SINGLE", features: "CMYK format, Print Ready", icon: "🏢" },
  { name: "Custom Frame Design", description: "Custom frame designs for videos.", price: "300", planType: "SINGLE", features: "Custom UI, Brand Colors", icon: "🖼️" },
  { name: "Logo Design", description: "Professional brand identity.", price: "500", planType: "SINGLE", features: "Vector Files, Multiple Concepts", icon: "🪄" }
];

const CheckIcon = () => (
  <svg className="w-4 h-4 text-primary-gold mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

const formatPrice = (price: any) => {
  if (price === undefined || price === null || price === '') return '0';
  const num = typeof price === 'number' ? price : parseFloat(String(price).replace(/,/g, ''));
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(num);
};

const getIconForService = (name: string) => {
  const n = name?.toLowerCase() || '';
  if (n.includes('logo')) return '🪄';
  if (n.includes('frame')) return '🖼️';
  if (n.includes('flex') || n.includes('banner')) return '🏢';
  if (n.includes('poster')) return '🎨';
  if (n.includes('upload') || n.includes('channel')) return '⬆️';
  if (n.includes('thumbnail')) return '🖼️';
  if (n.includes('shorts') || n.includes('reels')) return '🎬';
  if (n.includes('video')) return '🎥';
  if (n.includes('full') || n.includes('management')) return '👑';
  return '🎬';
};

const Services = () => {
  const [services, setServices] = useState<any[]>(DEFAULT_SERVICES);

  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      try {
        const res = await axios.get('/api/public/services');
        if (Array.isArray(res.data) && res.data.length > 0 && isMounted) {
          setServices(res.data);
        }
      } catch {
        // Retain default services fallback array
      }
    };
    fetchServices();
    return () => { isMounted = false; };
  }, []);

  const safeServices = Array.isArray(services) && services.length > 0 ? services : DEFAULT_SERVICES;
  const monthlyPlans = safeServices.filter(s => s?.planType === 'MONTHLY');
  const singleServices = safeServices.filter(s => s?.planType === 'SINGLE' || s?.planType === 'ONETIME');

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-gold/10 border border-primary-gold/30 text-primary-gold text-xs sm:text-sm font-bold uppercase tracking-widest mb-6">
          🎬🔥 Mc Brothers Editing Service 🔥🎬
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase drop-shadow-lg">
          Our <span className="text-gradient-gold">Services & Pricing</span>
        </h1>
        <p className="text-silver max-w-2xl mx-auto text-base sm:text-lg mb-10">
          Fast Delivery • Premium Quality • Affordable Pricing
        </p>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { icon: "⭐", title: "Professional Editing" },
            { icon: "🖼️", title: "Eye-Catching Thumbnails" },
            { icon: "☁️", title: "Smooth Uploads" },
            { icon: "⚙️", title: "Complete Channel Management" }
          ].map((feature, i) => (
            <div key={i} className="glass-card-premium p-4 flex items-center justify-center gap-3 border border-white/10 hover:border-primary-gold/50 transition-colors">
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-white text-xs font-bold uppercase tracking-wider text-left">{feature.title}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Single Services Grid */}
      {singleServices.length > 0 && (
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white uppercase tracking-wider border-b border-primary-gold/40 pb-4 inline-block">
            Our Services
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {singleServices.map((service, idx) => {
            const isLogo = service.name?.toLowerCase().includes("logo");
            const icon = getIconForService(service.name);
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="glass-card-premium p-6 border-white/10 hover:border-primary-gold/60 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-gold/10 border border-primary-gold/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-primary-gold transition-colors">{service.name}</h3>
                  <p className="text-xs text-secondary-text mb-4 leading-relaxed line-clamp-2">{service.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="text-xl font-black text-primary-gold">
                    {isLogo ? `Starts from ₹${formatPrice(service.price)}` : `₹${formatPrice(service.price)}`}
                  </div>
                  <Link to="/contact" className="text-xs font-bold text-white group-hover:text-primary-gold uppercase tracking-wider transition-colors">
                    Book &rarr;
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      )}

      {/* Monthly Plans Section */}
      {monthlyPlans.length > 0 && (
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white uppercase tracking-wider border-b border-primary-gold/40 pb-4 inline-block">
            Monthly Plans
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {monthlyPlans.map((plan, idx) => {
            const isPopular = plan.name?.toLowerCase().includes("full");
            const icon = getIconForService(plan.name);
            return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className={`relative glass-card-premium p-8 flex flex-col justify-between overflow-hidden group ${isPopular ? 'border-primary-gold shadow-[0_0_30px_rgba(212,175,55,0.25)] md:-translate-y-4' : 'border-white/10'}`}
            >
              {isPopular && (
                <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(212,175,55,1)_360deg)] animate-spin" style={{ animationDuration: "3s" }} />
              )}
              
              <div className="relative z-10 bg-surface/95 backdrop-blur-3xl absolute inset-[1px] p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{icon}</span>
                    {isPopular && (
                      <div className="text-[10px] font-extrabold bg-primary-gold text-background px-3 py-1 rounded-full uppercase tracking-wider animate-pulse-glow">
                        👑 POPULAR
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 uppercase">{plan.name}</h3>
                  <p className="text-secondary-text mb-4 text-xs min-h-[36px]">{plan.description}</p>
                  <div className="text-4xl font-black text-gradient-gold mb-6 flex items-baseline">
                    <span>₹{formatPrice(plan.price)}</span>
                    <span className="text-xs font-semibold text-silver ml-1 font-mono">/mo</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-xs">
                    {plan.features?.split(',').map((f: string, i: number) => (
                      <li key={i} className="flex items-start text-silver">
                        <CheckIcon /> 
                        <span className="leading-snug">{f.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <MagneticButton className="w-full mt-auto">
                  <a 
                    href={`https://wa.me/918124376230?text=Hi%20BroCrewz%20Studio,%20I%20want%20to%20book%20the%20${encodeURIComponent(plan.name)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`block text-center w-full py-4 rounded-full font-bold transition-all text-sm ${isPopular ? 'bg-primary-gold text-background hover:bg-secondary-gold shadow-lg' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}
                  >
                    DM to Book Slot
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
      )}

      {/* DM & Booking Call-to-Action Bar */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-card-premium p-10 md:p-12 text-center border-primary-gold/40 relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)]"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary-gold/10 blur-[100px] rounded-full pointer-events-none" />
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
          💬 <span className="text-gradient-gold">DM to Book Your Slot</span>
        </h2>
        <p className="text-silver max-w-xl mx-auto text-sm sm:text-base mb-8">
          Ready to scale your YouTube channel & social media with cinematic editing?
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <a
            href="https://wa.me/918124376230?text=Hi%20BroCrewz%20Studio,%20I%20want%20to%20book%20an%20editing%20slot!"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#25D366] text-white font-bold px-8 py-4 rounded-full hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-3 shadow-lg text-base"
          >
            <span>💬</span> WhatsApp DM
          </a>
          <Link
            to="/contact"
            className="w-full sm:w-auto bg-primary-gold text-background font-bold px-8 py-4 rounded-full hover:bg-secondary-gold transition-all flex items-center justify-center gap-3 shadow-lg text-base"
          >
            <span>📩</span> Contact Form
          </Link>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-silver">
          <div>⚡ FAST DELIVERY • 💎 PREMIUM QUALITY • 🪙 AFFORDABLE PRICING</div>
          <div className="text-primary-gold uppercase tracking-widest">🚀 Let's Grow Your Channel Together!</div>
        </div>
      </motion.div>
    </div>
  );
};
export default Services;
