import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold text-gradient-gold">Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn-outline text-sm py-2 px-4">Logout</button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center cursor-pointer hover:border-premium-gold">
          <h3 className="text-xl font-bold text-white mb-2">Manage Services</h3>
        </div>
        <div className="glass-card p-6 text-center cursor-pointer hover:border-premium-gold">
          <h3 className="text-xl font-bold text-white mb-2">Manage Team</h3>
        </div>
        <div className="glass-card p-6 text-center cursor-pointer hover:border-premium-gold">
          <h3 className="text-xl font-bold text-white mb-2">Manage Portfolio</h3>
        </div>
        <div className="glass-card p-6 text-center cursor-pointer hover:border-premium-gold">
          <h3 className="text-xl font-bold text-white mb-2">Messages</h3>
        </div>
      </div>
      <footer className="mt-20 border-t border-white/10 pt-8 text-center text-sm text-premium-silverDark">
        <p>Admin Portal &copy; {new Date().getFullYear()} BroCrewz Studio</p>
        <p className="mt-2 text-xs">
          Developed by <a href="https://github.com/sureshsuriya" target="_blank" rel="noopener noreferrer" className="text-premium-gold hover:underline">Suresh P</a> - Java Full Stack Developer
        </p>
      </footer>
    </div>
  );
};
export default AdminDashboard;
