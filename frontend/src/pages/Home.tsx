import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CinematicScene from '../components/3d/Scene';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroTextRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.5 }
    );

    gsap.fromTo(
      statsRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <div className="w-full">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 hidden md:block">
          <CinematicScene />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-surface to-background md:hidden" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div ref={heroTextRef}>
            <p className="hero-text text-primary-gold font-bold tracking-widest uppercase mb-4 text-sm md:text-base">Built by brothers. Driven by creativity.</p>
            <h1 className="hero-text text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase drop-shadow-2xl">
              This isn't just editing.<br />
              <span className="text-gradient-gold">This is BroCrewz.</span>
            </h1>
            <p className="hero-text text-xl md:text-2xl text-silver mb-10 max-w-2xl mx-auto">
              We stand for Creative Editing, Visual Storytelling & YouTube Growth. Transforming raw footage into powerful stories.
            </p>
            <div className="hero-text">
              <MagneticButton>
                <Link to="/services" className="inline-block bg-primary-gold text-background px-8 py-4 rounded-full font-bold text-lg hover:bg-secondary-gold transition-colors shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  View Our Plans
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={statsRef} className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "Quality", label: "Uncompromised" },
            { value: "Creativity", label: "Limitless" },
            { value: "Consistency", label: "Guaranteed" },
            { value: "Growth", label: "Channel Scaling" }
          ].map((stat, idx) => (
            <div key={idx} className="glass-card-premium p-8">
              <h3 className="text-3xl md:text-4xl font-black text-primary-gold mb-2">{stat.value}</h3>
              <p className="text-secondary-text uppercase tracking-widest text-xs md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Home;
