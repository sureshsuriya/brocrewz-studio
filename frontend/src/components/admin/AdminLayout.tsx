import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, Home, Info, Users, MessageSquare, HelpCircle, LogOut, Menu, X, Search, Briefcase, FileVideo, Image, Star } from 'lucide-react';
import { Toaster } from 'sonner';
import CommandPalette from './CommandPalette';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

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

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Site & Theme', path: '/admin/site', icon: <Settings size={20} /> },
    { name: 'Home Page', path: '/admin/home', icon: <Home size={20} /> },
    { name: 'About Page', path: '/admin/about', icon: <Info size={20} /> },
    { name: 'Services', path: '/admin/services', icon: <Briefcase size={20} /> },
    { name: 'Portfolio', path: '/admin/portfolio', icon: <FileVideo size={20} /> },
    { name: 'Media Library', path: '/admin/media', icon: <Image size={20} /> },
    { name: 'Team', path: '/admin/team', icon: <Users size={20} /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <Star size={20} /> },
    { name: 'FAQs', path: '/admin/faq', icon: <HelpCircle size={20} /> },
    { name: 'CRM & Contacts', path: '/admin/crm', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex font-sans">
      <Toaster theme="dark" position="top-right" />
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-[#121214] border-r border-zinc-800 transition-transform duration-300 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/assets/logo/logo.jpg" alt="BroCrewz Logo" className="w-8 h-8 object-contain rounded-lg border border-zinc-700" />
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500">
              BroCrewz CMS
            </h2>
          </div>
          <button className="md:hidden text-zinc-400" onClick={() => setSidebarOpen(false)}><X size={20}/></button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'}`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.name}</span>
              </button>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-zinc-800">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <button className="md:hidden mr-4 text-zinc-400" onClick={() => setSidebarOpen(true)}>
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-semibold capitalize">
                {location.pathname === '/admin' ? 'Dashboard' : location.pathname.split('/').pop()}
              </h1>
            </div>
            
            {/* Breadcrumbs */}
            <div className="hidden sm:flex items-center text-xs text-zinc-500 mt-1">
              <span>Admin</span>
              <span className="mx-2">/</span>
              <span className="text-zinc-300 capitalize">{location.pathname === '/admin' ? 'Dashboard' : location.pathname.split('/').pop()}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input 
                type="text" 
                placeholder="Search (Cmd+K)" 
                onClick={() => setCommandOpen(true)}
                readOnly
                className="bg-zinc-900 border border-zinc-800 text-sm rounded-md pl-9 pr-4 py-1.5 focus:outline-none focus:border-zinc-700 w-64 text-zinc-300 placeholder-zinc-600 cursor-pointer" 
              />
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-black font-bold">
              A
            </div>
          </div>
        </header>

        <CommandPalette open={commandOpen} setOpen={setCommandOpen} />
        <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
};
