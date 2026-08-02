import os

base_dir = r"C:\Users\sures\.gemini\antigravity-ide\scratch\brocrewz-studio\frontend\src"

# Directories
os.makedirs(os.path.join(base_dir, "components"), exist_ok=True)
os.makedirs(os.path.join(base_dir, "pages"), exist_ok=True)
os.makedirs(os.path.join(base_dir, "services"), exist_ok=True)

# App.tsx
app_tsx = """import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Team from './pages/Team';
import Portfolio from './pages/Portfolio';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
"""
with open(os.path.join(base_dir, "App.tsx"), "w") as f:
    f.write(app_tsx)

# Navbar.tsx
navbar_tsx = """import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-nav fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gradient-gold">
              BROCREWZ STUDIO
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="hover:text-premium-gold transition-colors">Home</Link>
              <Link to="/about" className="hover:text-premium-gold transition-colors">About</Link>
              <Link to="/services" className="hover:text-premium-gold transition-colors">Services</Link>
              <Link to="/portfolio" className="hover:text-premium-gold transition-colors">Portfolio</Link>
              <Link to="/team" className="hover:text-premium-gold transition-colors">Team</Link>
              <Link to="/contact" className="hover:text-premium-gold transition-colors">Contact</Link>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-premium-gold">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-premium-dark p-4">
          <div className="flex flex-col space-y-4">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/portfolio" onClick={() => setIsOpen(false)}>Portfolio</Link>
            <Link to="/team" onClick={() => setIsOpen(false)}>Team</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
"""
with open(os.path.join(base_dir, "components", "Navbar.tsx"), "w") as f:
    f.write(navbar_tsx)

# Footer.tsx
footer_tsx = """const Footer = () => {
  return (
    <footer className="bg-premium-dark py-8 mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-gradient-gold mb-4">BroCrewz Studio</h3>
        <p className="text-premium-silverDark mb-6">Premium Video Editing & Branding</p>
        <div className="mt-8 border-t border-white/10 pt-8">
          <p className="text-sm text-premium-silverDark">
            &copy; {new Date().getFullYear()} BroCrewz Studio. All rights reserved.
          </p>
          <p className="text-xs text-premium-silverDark mt-2">
            Developed by <a href="https://github.com/sureshsuriya" target="_blank" rel="noopener noreferrer" className="text-premium-gold hover:underline">Suresh P</a> - Java Full Stack Developer
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
"""
with open(os.path.join(base_dir, "components", "Footer.tsx"), "w") as f:
    f.write(footer_tsx)

# Home.tsx
home_tsx = """import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black-gold z-0"></div>
        <div className="z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6"
          >
            <span className="text-gradient-gold">WE EDIT. </span> YOU INSPIRE.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-premium-silver mb-10"
          >
            Premium Video Editing, Branding, and Channel Management for Top Creators.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/contact" className="btn-primary w-full sm:w-auto text-center">Book Now</Link>
            <Link to="/portfolio" className="btn-outline w-full sm:w-auto text-center">View Our Work</Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 bg-premium-black">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="glass-card p-6">
            <h3 className="text-4xl font-bold text-premium-gold mb-2">500+</h3>
            <p className="text-premium-silverDark">Videos Edited</p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-4xl font-bold text-premium-gold mb-2">100+</h3>
            <p className="text-premium-silverDark">Happy Clients</p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-4xl font-bold text-premium-gold mb-2">50M+</h3>
            <p className="text-premium-silverDark">Views Generated</p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-4xl font-bold text-premium-gold mb-2">3+</h3>
            <p className="text-premium-silverDark">Years Experience</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
"""
with open(os.path.join(base_dir, "pages", "Home.tsx"), "w") as f:
    f.write(home_tsx)

# Team.tsx
team_tsx = """import { useEffect, useState } from 'react';
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
"""
with open(os.path.join(base_dir, "pages", "Team.tsx"), "w") as f:
    f.write(team_tsx)

# Other pages (placeholders)
for page in ["About", "Services", "Portfolio", "Testimonials", "Contact", "AdminDashboard"]:
    content = f"""const {page} = () => {{
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-4xl font-bold text-gradient-gold mb-6">{page}</h2>
      <p className="text-premium-silver">This page is currently under construction.</p>
    </div>
  );
}};
export default {page};
"""
    with open(os.path.join(base_dir, "pages", f"{page}.tsx"), "w") as f:
        f.write(content)

print("React frontend generated successfully.")
