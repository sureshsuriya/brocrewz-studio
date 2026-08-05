import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import axios from 'axios';
import { toast } from 'sonner';
import { Plus, Trash2, Edit, Star } from 'lucide-react';

export default function TestimonialsConfig() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [form, setForm] = useState({ id: null, clientName: '', feedback: '', rating: 5 });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get('/api/public/testimonials');
      setTestimonials(res.data);
    } catch {
      toast.error("Failed to load testimonials");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`/api/admin/testimonials/${form.id}`, form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        toast.success("Testimonial updated");
      } else {
        await axios.post('/api/admin/testimonials', form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        toast.success("Testimonial created");
      }
      setForm({ id: null, clientName: '', feedback: '', rating: 5 });
      fetchTestimonials();
    } catch {
      toast.error("Failed to save testimonial");
    }
  };

  const handleDelete = async (id: number) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/admin/testimonials/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      toast.success("Testimonial deleted");
      fetchTestimonials();
    } catch {
      toast.error("Failed to delete testimonial");
    }
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-24">
            <h3 className="text-xl font-semibold mb-6">{form.id ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Client Name</label>
                <input required type="text" value={form.clientName} onChange={(e) => setForm({...form, clientName: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Feedback</label>
                <textarea required rows={4} value={form.feedback} onChange={(e) => setForm({...form, feedback: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Rating (1-5)</label>
                <input required type="number" min="1" max="5" value={form.rating} onChange={(e) => setForm({...form, rating: parseInt(e.target.value)})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <button type="submit" className="w-full bg-primary-gold text-black font-semibold rounded-lg p-2.5 hover:bg-yellow-500 flex items-center justify-center gap-2">
                <Plus size={18}/> {form.id ? 'Update Testimonial' : 'Save Testimonial'}
              </button>
              {form.id && (
                <button type="button" onClick={() => setForm({id: null, clientName: '', feedback: '', rating: 5})} className="w-full bg-zinc-800 text-white rounded-lg p-2 hover:bg-zinc-700">Cancel Edit</button>
              )}
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Existing Testimonials</h3>
            <div className="space-y-4">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex justify-between items-start group hover:border-zinc-700">
                  <div>
                    <h4 className="font-medium text-zinc-100">{t.clientName}</h4>
                    <div className="flex my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < t.rating ? "text-primary-gold fill-primary-gold" : "text-zinc-700"} />
                      ))}
                    </div>
                    <p className="text-sm text-zinc-500 mt-2 italic">"{t.feedback}"</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setForm(t)} className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-md hover:bg-zinc-700"><Edit size={16}/></button>
                    <button onClick={() => handleDelete(t.id)} className="p-2 text-red-400 hover:text-white bg-red-500/10 rounded-md hover:bg-red-500"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
