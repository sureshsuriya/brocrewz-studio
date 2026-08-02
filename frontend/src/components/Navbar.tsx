import { Link } from 'react-router-dom';
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
