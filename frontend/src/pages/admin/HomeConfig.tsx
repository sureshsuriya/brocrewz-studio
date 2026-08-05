import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import axios from 'axios';
import { toast } from 'sonner';

export default function HomeConfig() {
  const [form, setForm] = useState({ id: null, heroTitle: '', heroSubtitle: '', heroDescription: '', ctaText: '', ctaLink: '' });

  useEffect(() => {
    fetchHomeSettings();
  }, []);

  const fetchHomeSettings = async () => {
    try {
      const res = await axios.get('/api/public/settings/home');
      if(res.data) setForm(res.data);
    } catch {
      toast.error("Failed to load home settings");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/settings/home', form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      toast.success("Home settings saved");
      fetchHomeSettings();
    } catch {
      toast.error("Failed to save home settings");
    }
  };

  return (
    <AdminLayout>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-6">Home Page Settings</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Hero Title</label>
            <input type="text" value={form.heroTitle || ''} onChange={(e) => setForm({...form, heroTitle: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Hero Subtitle (Gold Text)</label>
            <input type="text" value={form.heroSubtitle || ''} onChange={(e) => setForm({...form, heroSubtitle: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Hero Description</label>
            <textarea rows={3} value={form.heroDescription || ''} onChange={(e) => setForm({...form, heroDescription: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">CTA Text</label>
              <input type="text" value={form.ctaText || ''} onChange={(e) => setForm({...form, ctaText: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">CTA Link</label>
              <input type="text" value={form.ctaLink || ''} onChange={(e) => setForm({...form, ctaLink: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
            </div>
          </div>
          <button type="submit" className="w-full bg-primary-gold text-black font-semibold rounded-lg p-2.5 hover:bg-yellow-500 mt-6">
            Save Home Configuration
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
