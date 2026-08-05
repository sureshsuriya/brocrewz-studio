import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import axios from 'axios';
import { toast } from 'sonner';

export default function AboutConfig() {
  const [form, setForm] = useState({ id: null, storyText: '', missionText: '', visionText: '' });

  useEffect(() => {
    fetchAboutSettings();
  }, []);

  const fetchAboutSettings = async () => {
    try {
      const res = await axios.get('/api/public/settings/about');
      if(res.data) setForm(res.data);
    } catch {
      toast.error("Failed to load about settings");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/settings/about', form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      toast.success("About settings saved");
      fetchAboutSettings();
    } catch {
      toast.error("Failed to save about settings");
    }
  };

  return (
    <AdminLayout>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-6">About Page Settings</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Our Story</label>
            <textarea rows={6} value={form.storyText || ''} onChange={(e) => setForm({...form, storyText: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Mission</label>
            <textarea rows={4} value={form.missionText || ''} onChange={(e) => setForm({...form, missionText: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Vision</label>
            <textarea rows={4} value={form.visionText || ''} onChange={(e) => setForm({...form, visionText: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
          </div>
          
          <button type="submit" className="w-full bg-primary-gold text-black font-semibold rounded-lg p-2.5 hover:bg-yellow-500 mt-6">
            Save About Configuration
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
