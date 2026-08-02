import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Team = () => {
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/public/team').then(res => setTeam(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gradient-gold mb-4">Meet Our Team</h2>
        <p className="text-premium-silver">The creative minds behind BroCrewz Studio.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {team.map((member, idx) => (
          <motion.div 
            key={member.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="glass-card overflow-hidden group"
          >
            <div className="h-64 overflow-hidden relative bg-gradient-to-t from-premium-black to-premium-dark">
              {/* If no image, show a placeholder */}
              {member.imageUrl ? (
                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-premium-gold">No Image</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-premium-black via-transparent to-transparent opacity-90"></div>
            </div>
            <div className="p-6 relative">
              <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-premium-gold font-semibold mb-4">{member.role}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {member.skills?.split(',').map((skill: string, i: number) => (
                  <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-full text-premium-silver">
                    {skill.trim()}
                  </span>
                ))}
              </div>
              {member.phone && <p className="text-sm text-premium-silverDark">{member.phone}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Team;
