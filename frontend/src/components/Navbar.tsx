import { Link } from 'react-router-dom';
import { MagneticButton } from './ui/MagneticButton';

const Navbar = () => {
  

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 glass-card-premium !rounded-none border-t-0 border-x-0 border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 text-2xl font-black tracking-tighter text-white group">
            <img src="/assets/logo/logo.jpg" alt="BroCrewz Logo" className="w-10 h-10 object-contain rounded-lg group-hover:scale-105 transition-transform" />
            <span>BRO<span className="text-gradient-gold">CREWZ</span></span>
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <MagneticButton key={link.name}>
                <Link to={link.path} className="text-sm font-bold text-silver hover:text-primary-gold uppercase tracking-wider transition-colors">
                  {link.name}
                </Link>
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
