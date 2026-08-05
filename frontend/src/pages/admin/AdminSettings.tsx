import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import axios from 'axios';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [siteSettings, setSiteSettings] = useState<any>({});
  const [themeSettings, setThemeSettings] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [siteRes, themeRes] = await Promise.all([
          axios.get('/api/public/settings/site'),
          axios.get('/api/public/settings/theme')
        ]);
        if(siteRes.data) setSiteSettings(siteRes.data);
        if(themeRes.data) setThemeSettings(themeRes.data);
      } catch {
        toast.error("Failed to load settings");
      }
    };
    fetchData();
  }, []);

  const handleSiteSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/settings/site', siteSettings, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success("Site settings saved!");
    } catch {
      toast.error("Failed to save site settings");
    }
  };

  const handleThemeSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/settings/theme', themeSettings, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success("Theme settings saved! Refresh to see changes.");
    } catch {
      toast.error("Failed to save theme settings");
    }
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Site Settings */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6">Site Details</h3>
          <form onSubmit={handleSiteSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Company Name</label>
              <input type="text" value={siteSettings.companyName || ''} onChange={(e) => setSiteSettings({...siteSettings, companyName: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                <input type="email" value={siteSettings.email || ''} onChange={(e) => setSiteSettings({...siteSettings, email: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Phone</label>
                <input type="text" value={siteSettings.phone || ''} onChange={(e) => setSiteSettings({...siteSettings, phone: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Address</label>
              <input type="text" value={siteSettings.address || ''} onChange={(e) => setSiteSettings({...siteSettings, address: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Instagram URL</label>
              <input type="text" value={siteSettings.instagramUrl || ''} onChange={(e) => setSiteSettings({...siteSettings, instagramUrl: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
            </div>
            <button type="submit" className="w-full bg-primary-gold text-black font-semibold rounded-lg p-2.5 hover:bg-yellow-500 transition-colors">Save Site Settings</button>
          </form>
        </div>

        {/* Theme Settings */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6">Theme Configurations</h3>
          <form onSubmit={handleThemeSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Primary Color (Hex)</label>
                <div className="flex space-x-2">
                  <input type="color" value={themeSettings.primaryColor || '#D4AF37'} onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})} className="h-10 w-10 rounded border-0 bg-transparent cursor-pointer" />
                  <input type="text" value={themeSettings.primaryColor || '#D4AF37'} onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})} className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Background Color</label>
                <div className="flex space-x-2">
                  <input type="color" value={themeSettings.backgroundColor || '#0B0B0F'} onChange={(e) => setThemeSettings({...themeSettings, backgroundColor: e.target.value})} className="h-10 w-10 rounded border-0 bg-transparent cursor-pointer" />
                  <input type="text" value={themeSettings.backgroundColor || '#0B0B0F'} onChange={(e) => setThemeSettings({...themeSettings, backgroundColor: e.target.value})} className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
                </div>
              </div>
            </div>
            <button type="submit" className="w-full bg-zinc-100 text-black font-semibold rounded-lg p-2.5 hover:bg-white transition-colors">Save Theme Settings</button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
