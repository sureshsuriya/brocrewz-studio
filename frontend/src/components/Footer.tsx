const Footer = () => {
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
