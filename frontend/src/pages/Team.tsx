import { motion } from 'framer-motion';

const teamMembers = [
  { name: "Lenin", role: "Professional Editor", tag: "Lead", image: "/assets/team/lenin.jpg" },
  { name: "Jerry", role: "Video Editor", tag: "Pro", image: "/assets/team/jerry.jpg" },
  { name: "Sam", role: "Video Editor", tag: "Pro", image: "/assets/team/sam.jpg" },
  { name: "Subbu", role: "Video Editor", tag: "Pro", image: "/assets/team/subbu.jpg" },
  { name: "Mukesh", role: "Video Editor", tag: "Pro", image: "/assets/team/mukesh.jpg" },
  { name: "Vethams", role: "Video Editor", tag: "Pro", image: "/assets/team/vethams.jpg" },
  { name: "Sujith", role: "Video Editor", tag: "Pro", image: "/assets/team/sujith.jpg" },
  { name: "Suresh P", role: "Web Lead", tag: "Lead", image: "/assets/team/suresh.jpg" }
];

const Team = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black text-white mb-6 uppercase">Meet The <span className="text-gradient-gold">Masters</span></h2>
        <p className="text-silver max-w-2xl mx-auto text-lg">The creative minds behind the cinematic experience.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
            className="glass-card-premium p-6 flex flex-col items-center text-center relative overflow-hidden group shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)] transition-shadow duration-300"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-32 h-32 rounded-full bg-background/50 border-2 border-white/10 group-hover:border-primary-gold/50 transition-colors mb-6 flex items-center justify-center relative overflow-hidden">
               <img 
                 src={member.image} 
                 alt={member.name} 
                 className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity" 
                 onError={(e) => {
                   (e.target as HTMLImageElement).style.display = 'none';
                   (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                 }}
               />
               <span className="hidden absolute text-xs text-secondary-text font-bold tracking-widest uppercase">Photo</span>
            </div>
            
            <h4 className="text-2xl font-black text-white mb-1 group-hover:text-primary-gold transition-colors">{member.name}</h4>
            <p className="text-sm text-silver mb-4 uppercase tracking-wider">{member.role}</p>
            
            <div className="mt-auto">
              <span className="px-4 py-1 bg-primary-gold/10 text-primary-gold text-xs font-bold rounded-full uppercase tracking-widest border border-primary-gold/20">{member.tag}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default Team;
