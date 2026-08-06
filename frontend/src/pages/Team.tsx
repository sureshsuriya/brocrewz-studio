import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get('/api/public/team');
        setTeamMembers(res.data);
      } catch {
        // Fallback
      }
    };
    fetchTeam();
  }, []);

  // Sort strictly by displayOrder (1-8)
  const sortedMembers = [...teamMembers].sort((a, b) => {
    const orderA = a.displayOrder ?? 99;
    const orderB = b.displayOrder ?? 99;
    return orderA - orderB;
  });

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src.endsWith('.png')) {
      target.src = target.src.replace('.png', '.jpg');
    } else if (target.src.endsWith('.jpeg')) {
      target.src = target.src.replace('.jpeg', '.jpg');
    } else {
      target.style.display = 'none';
      target.nextElementSibling?.classList.remove('hidden');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black text-white mb-6 uppercase">
          Meet The <span className="text-gradient-gold">Masters</span>
        </h2>
        <p className="text-silver max-w-2xl mx-auto text-lg">The creative minds behind the cinematic experience.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sortedMembers.map((member, idx) => {
          const isLead = member.role?.toLowerCase().includes('lead') || member.role?.toLowerCase().includes('manager');
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -10 }}
              className="glass-card-premium p-6 flex flex-col items-center text-center relative overflow-hidden group shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)] transition-shadow duration-300"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-32 h-32 rounded-full bg-background/50 border-2 border-white/10 group-hover:border-primary-gold/50 transition-colors mb-6 flex items-center justify-center relative overflow-hidden">
                 <img 
                   src={member.imageUrl || '/assets/team/placeholder.jpg'} 
                   alt={member.name} 
                   className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity" 
                   onError={handleImgError}
                 />
                 <span className="hidden absolute text-xs text-secondary-text font-bold tracking-widest uppercase">{member.name?.charAt(0)}</span>
              </div>
              
              <h4 className="text-2xl font-black text-white mb-1 group-hover:text-primary-gold transition-colors">{member.name}</h4>
              <p className="text-sm text-silver mb-2 uppercase tracking-wider font-semibold">{member.role}</p>
              
              {member.skills && (
                <p className="text-xs text-zinc-400 mb-2 px-2 line-clamp-2" title={member.skills}>{member.skills}</p>
              )}
              {member.phone && (
                <a
                  href={`tel:${member.phone.replace(/\s/g, '')}`}
                  className="text-xs text-primary-gold/80 mb-3 font-mono hover:text-primary-gold transition-colors"
                >
                  {member.phone}
                </a>
              )}
              
              <div className="mt-auto">
                <span className="px-4 py-1 bg-primary-gold/10 text-primary-gold text-xs font-bold rounded-full uppercase tracking-widest border border-primary-gold/20">
                  {isLead ? 'Lead' : 'Pro'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;
