import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';

const CinematicScene = lazy(() => import('../components/3d/Scene'));

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_HOME_SETTINGS = {
  heroTitle: "This isn't just editing.",
  heroSubtitle: "This is BroCrewz.",
  heroDescription: "We stand for Creative Editing, Visual Storytelling & YouTube Growth. Transforming raw footage into powerful stories.",
  ctaPrimaryText: "View Our Plans",
  ctaPrimaryLink: "/services"
};

const Home = () => {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [homeSettings, setHomeSettings] = useState<any>(DEFAULT_HOME_SETTINGS);

  useEffect(() => {
    let isMounted = true;

    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/public/settings/home');
        if (res.data && isMounted) {
          setHomeSettings({
            heroTitle: res.data.heroTitle || DEFAULT_HOME_SETTINGS.heroTitle,
            heroSubtitle: res.data.heroSubtitle || DEFAULT_HOME_SETTINGS.heroSubtitle,
            heroDescription: res.data.heroDescription || DEFAULT_HOME_SETTINGS.heroDescription,
            ctaPrimaryText: res.data.ctaPrimaryText || res.data.ctaText || DEFAULT_HOME_SETTINGS.ctaPrimaryText,
            ctaPrimaryLink: res.data.ctaPrimaryLink || res.data.ctaLink || DEFAULT_HOME_SETTINGS.ctaPrimaryLink,
          });
        }
      } catch {
        // Retain default fallback state cleanly
      }
    };
    fetchSettings();

    // GSAP context for safe cleanup and avoiding stuck opacity
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-text-anim",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.2 }
      );

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            }
          }
        );
      }
    });

    return () => {
      isMounted = false;
      ctx.revert();
    };
  }, []);

  const heroTitle = homeSettings?.heroTitle || DEFAULT_HOME_SETTINGS.heroTitle;
  const heroSubtitle = homeSettings?.heroSubtitle || DEFAULT_HOME_SETTINGS.heroSubtitle;
  const heroDescription = homeSettings?.heroDescription || DEFAULT_HOME_SETTINGS.heroDescription;
  const ctaText = homeSettings?.ctaPrimaryText || homeSettings?.ctaText || DEFAULT_HOME_SETTINGS.ctaPrimaryText;
  const ctaLink = homeSettings?.ctaPrimaryLink || homeSettings?.ctaLink || DEFAULT_HOME_SETTINGS.ctaPrimaryLink;

  return (
    <div className="w-full">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* 3D WebGL Canvas with ErrorBoundary & Mobile Gradient Fallback */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <ErrorBoundary fallback={<div className="w-full h-full bg-gradient-to-b from-background via-surface to-background" />}>
            <Suspense fallback={<div className="w-full h-full bg-background" />}>
              <CinematicScene />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-surface to-background md:hidden" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div ref={heroTextRef}>
            <p className="hero-text-anim text-primary-gold font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
              Built by brothers. Driven by creativity.
            </p>

            <h1 className="hero-text-anim text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase drop-shadow-2xl">
              {heroTitle}<br />
              <span className="text-gradient-gold">{heroSubtitle}</span>
            </h1>

            <p className="hero-text-anim text-xl md:text-2xl text-silver mb-10 max-w-2xl mx-auto leading-relaxed">
              {heroDescription}
            </p>

            <div className="hero-text-anim">
              <MagneticButton>
                <Link
                  to={ctaLink}
                  className="inline-block bg-primary-gold text-background px-8 py-4 rounded-full font-bold text-lg hover:bg-secondary-gold transition-colors shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer"
                >
                  {ctaText}
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
            <div key={idx} className="glass-card-premium p-4 md:p-8 flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary-gold mb-2">{stat.value}</h3>
              <p className="text-secondary-text uppercase tracking-widest text-[10px] sm:text-xs md:text-sm leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Home;
