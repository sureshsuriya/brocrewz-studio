import os

base_dir = r"C:\Users\sures\Downloads\brocrewz-studio\frontend\src\pages"
components_dir = r"C:\Users\sures\Downloads\brocrewz-studio\frontend\src\components"

about_tsx = """import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-6">About BroCrewz Studio</h2>
        <p className="text-xl text-premium-silver max-w-3xl mx-auto">
          We are a professional video editing agency providing high-quality editing, thumbnails, branding, and channel management for creators and businesses globally.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8"
        >
          <h3 className="text-2xl font-bold text-premium-gold mb-4">Our Mission</h3>
          <p className="text-premium-silverDark leading-relaxed">
            To empower creators by taking the heavy lifting of post-production off their shoulders, allowing them to focus on what they do best: creating inspiring content. We believe in quality, speed, and premium aesthetics.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 bg-black-gold"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Why Choose Us?</h3>
          <ul className="space-y-4 text-premium-silverDark">
            <li className="flex items-center"><span className="text-premium-gold mr-3">✔</span> Industry-standard Editing</li>
            <li className="flex items-center"><span className="text-premium-gold mr-3">✔</span> High CTR Thumbnails</li>
            <li className="flex items-center"><span className="text-premium-gold mr-3">✔</span> Dedicated Channel Management</li>
            <li className="flex items-center"><span className="text-premium-gold mr-3">✔</span> Fast Turnaround Times</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};
export default About;
"""

services_tsx = """import { motion } from 'framer-motion';

const singleServices = [
  { name: "Single Video Editing", price: "₹500", desc: "High quality long-form video editing" },
  { name: "Single Shorts Editing", price: "₹200", desc: "Engaging short-form content" },
  { name: "Thumbnail Design", price: "₹100", desc: "Clickable, high-CTR thumbnails" },
  { name: "Upload & Channel Management", price: "₹200", desc: "Complete channel SEO and publishing" },
  { name: "Poster Design", price: "₹300", desc: "High quality poster design" },
  { name: "Flex Banner Design", price: "₹300", desc: "Print-ready flex banner designs" },
  { name: "Custom Frame Design", price: "₹300", desc: "Custom frame designs for videos" },
  { name: "Logo Design", price: "Starts from ₹500", desc: "Professional brand identity" }
];

const monthlyPlans = [
  { name: "20 Videos", price: "₹7000", desc: "Monthly plan for 20 long-form videos" },
  { name: "20 Shorts", price: "₹3000", desc: "Monthly plan for 20 shorts/reels" },
  { name: "20 Videos + 20 Shorts", price: "₹10000", desc: "Combined monthly plan" },
  { name: "Full Monthly Management", price: "₹12000", desc: "Editing, Thumbnails, Upload, Channel Management" }
];

const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gradient-gold mb-4">Our Services</h2>
        <p className="text-premium-silver">Premium editing and design services at competitive prices.</p>
      </div>

      <h3 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Single Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {singleServices.map((srv, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10, borderColor: '#d4af37' }}
            className="glass-card p-6 border border-white/5 transition-all"
          >
            <h4 className="text-xl font-bold text-premium-gold mb-2">{srv.name}</h4>
            <p className="text-premium-silverDark text-sm mb-4 h-10">{srv.desc}</p>
            <p className="text-2xl font-bold text-white">{srv.price}</p>
          </motion.div>
        ))}
      </div>

      <h3 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Monthly Plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {monthlyPlans.map((plan, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.05 }}
            className={`glass-card p-8 border ${idx === 3 ? 'border-premium-gold bg-premium-gold/5' : 'border-white/5'} transition-all text-center`}
          >
            {idx === 3 && <div className="text-xs text-premium-black bg-premium-gold py-1 px-3 rounded-full inline-block mb-4 font-bold">MOST POPULAR</div>}
            <h4 className="text-xl font-bold text-white mb-4">{plan.name}</h4>
            <p className="text-3xl font-extrabold text-gradient-gold mb-6">{plan.price}</p>
            <p className="text-premium-silverDark text-sm mb-8">{plan.desc}</p>
            <button className="btn-outline w-full hover:bg-premium-gold hover:text-black">Choose Plan</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default Services;
"""

contact_tsx = """import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, MapPin, Instagram } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // Assuming a backend endpoint is ready
      // await axios.post('/api/public/contact', data);
      alert('Message sent successfully!');
      reset();
    } catch (err) {
      alert('Failed to send message.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gradient-gold mb-4">Contact Us</h2>
        <p className="text-premium-silver">Ready to elevate your content? Get in touch with us today.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
          <div className="glass-card p-6 flex items-start space-x-4 hover:border-premium-gold transition-colors">
            <MessageSquare className="text-premium-gold w-8 h-8 mt-1" />
            <div>
              <h4 className="text-xl font-bold text-white mb-1">WhatsApp</h4>
              <p className="text-premium-silverDark mb-2">Message us for quick replies.</p>
              <a href="https://wa.me/918124376230" target="_blank" rel="noreferrer" className="text-premium-gold hover:underline">+91 81243 76230</a>
            </div>
          </div>

          <div className="glass-card p-6 flex items-start space-x-4 hover:border-premium-gold transition-colors">
            <Instagram className="text-premium-gold w-8 h-8 mt-1" />
            <div>
              <h4 className="text-xl font-bold text-white mb-1">Instagram</h4>
              <p className="text-premium-silverDark mb-2">Check out our latest work.</p>
              <a href="#" className="text-premium-gold hover:underline">@brocrewz.studio</a>
            </div>
          </div>

          <div className="glass-card p-6 flex items-start space-x-4 hover:border-premium-gold transition-colors">
            <Mail className="text-premium-gold w-8 h-8 mt-1" />
            <div>
              <h4 className="text-xl font-bold text-white mb-1">Email</h4>
              <p className="text-premium-silverDark mb-2">For business inquiries.</p>
              <a href="mailto:contact@brocrewz.com" className="text-premium-gold hover:underline">contact@brocrewz.com</a>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-premium-silverDark mb-2">Name</label>
              <input {...register('name', { required: true })} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-premium-gold focus:outline-none" />
              {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
            </div>
            <div>
              <label className="block text-premium-silverDark mb-2">Email</label>
              <input type="email" {...register('email', { required: true })} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-premium-gold focus:outline-none" />
              {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
            </div>
            <div>
              <label className="block text-premium-silverDark mb-2">Message</label>
              <textarea {...register('message', { required: true })} rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-premium-gold focus:outline-none"></textarea>
              {errors.message && <span className="text-red-500 text-sm">Message is required</span>}
            </div>
            <button type="submit" className="btn-primary w-full text-black">Send Message</button>
          </form>
        </motion.div>
      </div>
      
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-white mb-6">Our Location</h3>
        <div className="glass-card h-96 w-full rounded-2xl overflow-hidden flex items-center justify-center bg-black/50">
           <p className="text-premium-silverDark">Google Maps Embed Placeholder</p>
        </div>
      </div>
    </div>
  );
};
export default Contact;
"""

portfolio_tsx = """import { useState } from 'react';
import { motion } from 'framer-motion';

const categories = ["All", "Video Editing", "Thumbnails", "Logos", "Banners"];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gradient-gold mb-4">Our Portfolio</h2>
        <p className="text-premium-silver">A showcase of our premium works.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-2 rounded-full border transition-all ${activeTab === cat ? 'bg-premium-gold text-black border-premium-gold font-bold' : 'border-white/20 text-premium-silver hover:border-premium-gold hover:text-premium-gold'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card h-64 flex items-center justify-center">
            <span className="text-premium-silverDark">Portfolio Item Placeholder</span>
         </motion.div>
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{delay: 0.1}} className="glass-card h-64 flex items-center justify-center">
            <span className="text-premium-silverDark">Portfolio Item Placeholder</span>
         </motion.div>
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{delay: 0.2}} className="glass-card h-64 flex items-center justify-center">
            <span className="text-premium-silverDark">Portfolio Item Placeholder</span>
         </motion.div>
      </div>
    </div>
  );
};
export default Portfolio;
"""

login_tsx = """import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post('/api/auth/login', data);
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="glass-card p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-premium-gold mb-8">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-premium-silver mb-2">Email</label>
            <input type="email" {...register('email', {required: true})} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-premium-gold outline-none" />
          </div>
          <div>
            <label className="block text-premium-silver mb-2">Password</label>
            <input type="password" {...register('password', {required: true})} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-premium-gold outline-none" />
          </div>
          <button type="submit" className="btn-primary w-full text-black">Login</button>
        </form>
      </div>
    </div>
  );
};
export default Login;
"""

admin_dashboard_tsx = """import { useEffect, useState } from 'react';
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
    </div>
  );
};
export default AdminDashboard;
"""

files = {
    "About.tsx": about_tsx,
    "Services.tsx": services_tsx,
    "Contact.tsx": contact_tsx,
    "Portfolio.tsx": portfolio_tsx,
    "Login.tsx": login_tsx,
    "AdminDashboard.tsx": admin_dashboard_tsx,
}

for name, content in files.items():
    with open(os.path.join(base_dir, name), "w", encoding="utf-8") as f:
        f.write(content)

print("Additional pages generated successfully.")
