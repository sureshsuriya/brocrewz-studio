import { useEffect, useRef, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import gsap from 'gsap';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import { ThemeProvider } from './components/ThemeProvider';
import ProtectedRoute from './components/admin/ProtectedRoute';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Team = lazy(() => import('./pages/Team'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const FAQ = lazy(() => import('./pages/FAQ'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const FaqConfig = lazy(() => import('./pages/admin/FaqConfig'));
const ServicesConfig = lazy(() => import('./pages/admin/ServicesConfig'));
const TeamConfig = lazy(() => import('./pages/admin/TeamConfig'));
const TestimonialsConfig = lazy(() => import('./pages/admin/TestimonialsConfig'));
const HomeConfig = lazy(() => import('./pages/admin/HomeConfig'));
const AboutConfig = lazy(() => import('./pages/admin/AboutConfig'));
const PortfolioConfig = lazy(() => import('./pages/admin/PortfolioConfig'));
const MediaLibrary = lazy(() => import('./pages/admin/MediaLibrary'));
const CRMConfig = lazy(() => import('./pages/admin/CRMConfig'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const UserSettings = lazy(() => import('./pages/admin/UserSettings'));
const ActivityLogs = lazy(() => import('./pages/admin/ActivityLogs'));

import ErrorBoundary from './components/ErrorBoundary';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
          <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
          <Route path="/testimonials" element={<PageTransition><Testimonials /></PageTransition>} />
          <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
          <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />
          
          <Route path="/admin" element={<ProtectedRoute><PageTransition><AdminDashboard /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><PageTransition><AdminSettings /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/site" element={<ProtectedRoute><PageTransition><AdminSettings /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/home" element={<ProtectedRoute><PageTransition><HomeConfig /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/about" element={<ProtectedRoute><PageTransition><AboutConfig /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/faq" element={<ProtectedRoute><PageTransition><FaqConfig /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute><PageTransition><ServicesConfig /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/portfolio" element={<ProtectedRoute><PageTransition><PortfolioConfig /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/team" element={<ProtectedRoute><PageTransition><TeamConfig /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/testimonials" element={<ProtectedRoute><PageTransition><TestimonialsConfig /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/media" element={<ProtectedRoute><PageTransition><MediaLibrary /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/crm" element={<ProtectedRoute><PageTransition><CRMConfig /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><PageTransition><UserSettings /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/activities" element={<ProtectedRoute><PageTransition><ActivityLogs /></PageTransition></ProtectedRoute>} />
          
          {/* 404 Route */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </ErrorBoundary>
  );
}

function App() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Expose lenis globally so ScrollToTop can call lenis.scrollTo(0)
    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Custom Cursor
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 10,
          y: e.clientY - 10,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      (window as any).lenis = null;
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-background text-primary-text">
            <div ref={cursorRef} className="custom-cursor hidden md:block" />
            <Navbar />
            <main className="flex-grow pt-20 grid" style={{ gridTemplateColumns: '1fr', gridTemplateRows: '1fr' }}>
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
export default App;
