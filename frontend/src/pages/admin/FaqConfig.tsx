import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import axios from 'axios';
import { toast } from 'sonner';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function FaqConfig() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [form, setForm] = useState({ id: null, question: '', answer: '', displayOrder: 0 });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await axios.get('/api/public/faqs');
      setFaqs(res.data.sort((a: any, b: any) => a.displayOrder - b.displayOrder));
    } catch {
      toast.error("Failed to load FAQs");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`/api/admin/faqs/${form.id}`, form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        toast.success("FAQ updated");
      } else {
        await axios.post('/api/admin/faqs', form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        toast.success("FAQ created");
      }
      setForm({ id: null, question: '', answer: '', displayOrder: 0 });
      fetchFaqs();
    } catch {
      toast.error("Failed to save FAQ");
    }
  };

  const handleDelete = async (id: number) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/admin/faqs/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      toast.success("FAQ deleted");
      fetchFaqs();
    } catch {
      toast.error("Failed to delete FAQ");
    }
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-24">
            <h3 className="text-xl font-semibold mb-6">{form.id ? 'Edit FAQ' : 'Add FAQ'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Question</label>
                <input required type="text" value={form.question} onChange={(e) => setForm({...form, question: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Answer</label>
                <textarea required rows={4} value={form.answer} onChange={(e) => setForm({...form, answer: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Display Order</label>
                <input type="number" value={form.displayOrder} onChange={(e) => setForm({...form, displayOrder: parseInt(e.target.value)})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <button type="submit" className="w-full bg-primary-gold text-black font-semibold rounded-lg p-2.5 hover:bg-yellow-500 flex items-center justify-center gap-2">
                <Plus size={18}/> {form.id ? 'Update FAQ' : 'Save FAQ'}
              </button>
              {form.id && (
                <button type="button" onClick={() => setForm({id: null, question: '', answer: '', displayOrder: 0})} className="w-full bg-zinc-800 text-white rounded-lg p-2 hover:bg-zinc-700">Cancel Edit</button>
              )}
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Existing FAQs</h3>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex justify-between items-start group hover:border-zinc-700">
                  <div>
                    <h4 className="font-medium text-zinc-100">{faq.question}</h4>
                    <p className="text-sm text-zinc-500 mt-1 line-clamp-2">{faq.answer}</p>
                    <span className="text-xs text-zinc-600 mt-2 block">Order: {faq.displayOrder}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setForm(faq)} className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-md hover:bg-zinc-700"><Edit size={16}/></button>
                    <button onClick={() => handleDelete(faq.id)} className="p-2 text-red-400 hover:text-white bg-red-500/10 rounded-md hover:bg-red-500"><Trash2 size={16}/></button>
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
