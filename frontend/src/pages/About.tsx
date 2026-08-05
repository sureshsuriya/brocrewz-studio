import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

const About = () => {
  const [aboutSettings, setAboutSettings] = useState<any>({
    storyText: "Every late night, every revision, every frame has shaped who we are.",
    missionText: "Together as brothers, we transform raw footage into powerful stories that leave an impact. We don't just cut clips together; we are editors, creators, and visual storytellers dedicated to YouTube Growth.",
    visionText: ""
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/public/settings/about');
        if (res.data) setAboutSettings(res.data);
      } catch {
        // Fallback to empty state
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="w-full">
      {/* Main Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter">Our <span className="text-gradient-gold">Story</span></h2>
          
          <p className="text-lg text-silver leading-relaxed mb-6 font-medium whitespace-pre-line">
            {aboutSettings.storyText}
          </p>
          
          <p className="text-lg text-secondary-text leading-relaxed mb-6 whitespace-pre-line">
            {aboutSettings.missionText}
          </p>
          {aboutSettings.visionText && (
            <p className="text-lg text-secondary-text leading-relaxed mb-6 whitespace-pre-line">
              {aboutSettings.visionText}
            </p>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="glass-card-premium p-4 text-center">
               <span className="text-primary-gold block font-black text-2xl mb-1">🎥</span>
               <span className="text-white text-sm font-bold uppercase tracking-wider">Video Editing</span>
             </div>
             <div className="glass-card-premium p-4 text-center">
               <span className="text-primary-gold block font-black text-2xl mb-1">🎬</span>
               <span className="text-white text-sm font-bold uppercase tracking-wider">Shorts & Reels</span>
             </div>
             <div className="glass-card-premium p-4 text-center">
               <span className="text-primary-gold block font-black text-2xl mb-1">🖼️</span>
               <span className="text-white text-sm font-bold uppercase tracking-wider">Thumbnails</span>
             </div>
             <div className="glass-card-premium p-4 text-center">
               <span className="text-primary-gold block font-black text-2xl mb-1">📈</span>
               <span className="text-white text-sm font-bold uppercase tracking-wider">Channel Growth</span>
             </div>
          </div>

          <MagneticButton>
             <Link to="/team" className="inline-block border-2 border-primary-gold text-primary-gold px-8 py-3 rounded-full font-bold hover:bg-primary-gold hover:text-background transition-colors">
               Meet The Team
             </Link>
          </MagneticButton>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-full min-h-[500px] glass-card-premium flex items-center justify-center p-8">
           <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/10 to-transparent rounded-2xl" />
           <div className="text-center z-10">
              <img src="/assets/logo/logo.jpg" alt="BroCrewz Studio Logo" className="h-40 md:h-56 mx-auto object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] mb-4" />
              <div className="w-16 h-1 bg-primary-gold mx-auto my-6" />
              <p className="text-secondary-text italic text-lg max-w-sm mx-auto">"Built by brothers. Driven by creativity."</p>
           </div>
        </motion.div>
      </div>

      {/* Leadership Section */}
      <section className="bg-surface py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-wider border-b border-white/10 pb-4 inline-block">Leadership</h2>
            <p className="text-secondary-text max-w-2xl mx-auto text-lg">The architecture and operations behind the creative powerhouse.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass-card-premium p-8 md:p-12 border-primary-gold/20 shadow-[0_0_40px_rgba(212,175,55,0.05)] relative overflow-hidden"
          >
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-gold/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
              <div className="w-48 h-48 rounded-2xl bg-background flex-shrink-0 border border-white/10 overflow-hidden relative group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-gold/20 to-transparent z-10 mix-blend-overlay pointer-events-none" />
                <img 
                  src="/assets/team/suresh.jpg" 
                  alt="Suresh P" 
                  className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full flex items-center justify-center text-secondary-text text-xs tracking-widest uppercase">Photo</div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-3xl font-black text-white mb-1">Suresh P</h3>
                <p className="text-primary-gold font-bold tracking-widest uppercase text-sm mb-6">Operations Manager & Web Lead</p>
                
                <p className="text-silver mb-8 leading-relaxed">
                  Suresh P oversees operations and leads the development of BroCrewz Studio's digital platform. He is responsible for planning, designing, and managing the website while ensuring a modern user experience, reliable backend architecture, and continuous improvements to the company's online presence.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white text-sm font-bold uppercase mb-3 border-b border-white/10 pb-2">Responsibilities</h4>
                    <ul className="space-y-2 text-sm text-secondary-text">
                      <li className="flex items-center"><span className="text-primary-gold mr-2 text-xs">✦</span> Operations Management</li>
                      <li className="flex items-center"><span className="text-primary-gold mr-2 text-xs">✦</span> Website Planning & Strategy</li>
                      <li className="flex items-center"><span className="text-primary-gold mr-2 text-xs">✦</span> UI/UX Design</li>
                      <li className="flex items-center"><span className="text-primary-gold mr-2 text-xs">✦</span> Technical Leadership</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-bold uppercase mb-3 border-b border-white/10 pb-2">Technical Core</h4>
                    <ul className="space-y-2 text-sm text-secondary-text">
                      <li className="flex items-center"><span className="text-primary-gold mr-2 text-xs">✦</span> Frontend Development</li>
                      <li className="flex items-center"><span className="text-primary-gold mr-2 text-xs">✦</span> Backend Development</li>
                      <li className="flex items-center"><span className="text-primary-gold mr-2 text-xs">✦</span> Database Management</li>
                      <li className="flex items-center"><span className="text-primary-gold mr-2 text-xs">✦</span> Performance Optimization</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 flex space-x-6">
                  <a href="https://www.linkedin.com/in/suresh-p-822b43230/" target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-primary-gold transition-colors font-bold uppercase text-xs tracking-wider">LinkedIn</a>
                  <a href="https://github.com/sureshsuriya" target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-primary-gold transition-colors font-bold uppercase text-xs tracking-wider">GitHub</a>
                  <a href="https://suresh-portfolio-blush.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-primary-gold transition-colors font-bold uppercase text-xs tracking-wider">Portfolio</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
export default About;
