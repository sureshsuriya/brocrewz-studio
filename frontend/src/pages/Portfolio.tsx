import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ALL_CATEGORY = "All";

const Portfolio = () => {
  const [active, setActive] = useState(ALL_CATEGORY);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get('/api/public/portfolio');
        // Only show active items, sorted by displayOrder
        const items = (res.data || [])
          .filter((item: any) => item.active !== false)
          .sort((a: any, b: any) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99));
        setPortfolioItems(items);
      } catch {
        // Fallback to empty state
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  // Derive category list from real data
  const categories = [ALL_CATEGORY, ...Array.from(new Set(portfolioItems.map((i: any) => i.category).filter(Boolean)))];

  const filtered = active === ALL_CATEGORY
    ? portfolioItems
    : portfolioItems.filter((i: any) => i.category === active);

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black text-white mb-6 uppercase">Our <span className="text-gradient-gold">Portfolio</span></h2>
        <p className="text-silver text-lg max-w-2xl mx-auto">A showcase of our cinematic editing, thumbnail designs, and creative work.</p>
      </div>

      {!loading && portfolioItems.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${active === c ? 'bg-primary-gold text-background shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-glass-card text-silver hover:bg-white/10'}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 rounded-full border-4 border-primary-text/10 border-t-primary-gold animate-spin" />
        </div>
      ) : portfolioItems.length === 0 ? (
        /* Empty state — no portfolio items in CMS yet */
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24 glass-card-premium mx-auto max-w-lg"
        >
          <div className="text-6xl mb-6">🎬</div>
          <h3 className="text-2xl font-bold text-white mb-3">Portfolio Coming Soon</h3>
          <p className="text-secondary-text leading-relaxed">
            Our work showcase is being prepared. Check back soon for cinematic edits, thumbnails, and creative projects.
          </p>
          <p className="text-primary-gold/60 text-xs uppercase tracking-widest mt-6">
            Admin → Portfolio to add projects
          </p>
        </motion.div>
      ) : filtered.length === 0 ? (
        /* No items match the active filter */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-secondary-text"
        >
          <p className="text-lg">No projects in the <span className="text-primary-gold font-semibold">{active}</span> category yet.</p>
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((item: any) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card-premium aspect-video flex items-center justify-center relative overflow-hidden group"
              >
                {/* Project image */}
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title || 'Portfolio item'}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/5 to-transparent" />
                )}

                {/* Hover overlay — informational, no broken links */}
                <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-sm p-4">
                  {item.title && (
                    <h4 className="text-white font-bold text-center mb-1 text-sm">{item.title}</h4>
                  )}
                  {item.clientName && (
                    <p className="text-secondary-text text-xs mb-2">{item.clientName}</p>
                  )}
                  <span className="text-primary-gold font-bold tracking-widest uppercase text-xs border border-primary-gold/30 px-3 py-1 rounded-full">
                    {item.category || 'Project'}
                  </span>
                </div>

                {/* Title badge visible at rest */}
                {item.title && (
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-background/90 to-transparent z-0">
                    <p className="text-white text-xs font-semibold truncate">{item.title}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
export default Portfolio;
