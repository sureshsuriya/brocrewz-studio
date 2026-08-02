import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-2">
          <Link to="/" className="text-3xl font-black tracking-tighter text-white mb-4 block">
            BRO<span className="text-gradient-gold">CREWZ</span>
          </Link>
          <p className="text-secondary-text max-w-sm">Premium post-production for elite creators. Cinematic video editing, thumbnail design, and channel management.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 text-secondary-text">
            <li><Link to="/portfolio" className="hover:text-primary-gold transition-colors">Portfolio</Link></li>
            <li><Link to="/services" className="hover:text-primary-gold transition-colors">Pricing</Link></li>
            <li><Link to="/contact" className="hover:text-primary-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Social</h4>
          <ul className="space-y-2 text-secondary-text">
            <li><a href="#" className="hover:text-primary-gold transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-primary-gold transition-colors">YouTube</a></li>
            <li><a href="#" className="hover:text-primary-gold transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-secondary-text">
        <p>&copy; {new Date().getFullYear()} BroCrewz Studio. All rights reserved.</p>
        <p className="mt-4 md:mt-0 flex items-center">
          <span className="mr-2">Designed & Developed by</span>
          <a href="https://github.com/sureshsuriya" target="_blank" rel="noopener noreferrer" className="text-primary-gold hover:text-white transition-colors font-bold tracking-wide">
            Suresh P (Web Lead)
          </a>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
