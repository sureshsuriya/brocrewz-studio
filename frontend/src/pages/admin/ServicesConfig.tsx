import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import axios from 'axios';
import { toast } from 'sonner';
import { Plus, Trash2, Edit, Download } from 'lucide-react';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { exportToCSV } from '../../utils/exportToCSV';

const formatPrice = (price: any) => {
  if (price === undefined || price === null || price === '') return '0';
  const num = typeof price === 'number' ? price : parseFloat(String(price).replace(/,/g, ''));
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(num);
};

export default function ServicesConfig() {
  const [services, setServices] = useState<any[]>([]);
  const [form, setForm] = useState({ id: null, name: '', description: '', price: 0, planType: '', features: '' });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get('/api/public/services');
      setServices(res.data);
    } catch {
      toast.error("Failed to load services");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`/api/admin/services/${form.id}`, form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        toast.success("Service updated");
      } else {
        await axios.post('/api/admin/services', form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        toast.success("Service created");
      }
      setForm({ id: null, name: '', description: '', price: 0, planType: '', features: '' });
      fetchServices();
    } catch {
      toast.error("Failed to save service");
    }
  };

  const confirmDelete = async () => {
    if(!deleteId) return;
    try {
      await axios.delete(`/api/admin/services/${deleteId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      toast.success("Service deleted");
      fetchServices();
    } catch {
      toast.error("Failed to delete service");
    } finally {
      setDeleteId(null);
    }
  };

  const handleExport = () => {
    exportToCSV(services, 'brocrewz_services');
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-24">
            <h3 className="text-xl font-semibold mb-6">{form.id ? 'Edit Service' : 'Add Service'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
                <input required type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
                <textarea required rows={2} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Price (₹)</label>
                  <input required type="number" value={form.price} onChange={(e) => setForm({...form, price: parseFloat(e.target.value)})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Plan Type</label>
                  <select required value={form.planType} onChange={(e) => setForm({...form, planType: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold">
                    <option value="">Select Type</option>
                    <option value="MONTHLY">Monthly</option>
                    <option value="ONETIME">One Time</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Features (comma separated)</label>
                <textarea rows={4} value={form.features} onChange={(e) => setForm({...form, features: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" placeholder="Feature 1, Feature 2, Feature 3" />
              </div>
              <button type="submit" className="w-full bg-primary-gold text-black font-semibold rounded-lg p-2.5 hover:bg-yellow-500 flex items-center justify-center gap-2">
                <Plus size={18}/> {form.id ? 'Update Service' : 'Save Service'}
              </button>
              {form.id && (
                <button type="button" onClick={() => setForm({id: null, name: '', description: '', price: 0, planType: '', features: ''})} className="w-full bg-zinc-800 text-white rounded-lg p-2 hover:bg-zinc-700">Cancel Edit</button>
              )}
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Existing Services</h3>
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg font-medium transition-colors border border-zinc-700 text-sm"
              >
                <Download size={16} /> Export CSV
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <div key={service.id} className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between group hover:border-zinc-700">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-zinc-100 text-lg">{service.name}</h4>
                      <span className="bg-zinc-800 text-xs px-2 py-1 rounded text-zinc-300">{service.planType}</span>
                    </div>
                    <p className="text-primary-gold font-bold mb-2">₹{formatPrice(service.price)}</p>
                    <p className="text-sm text-zinc-500 mb-4 line-clamp-2">{service.description}</p>
                  </div>
                  <div className="flex gap-2 justify-end mt-4 border-t border-zinc-800 pt-4">
                    <button onClick={() => setForm(service)} className="px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 rounded-md hover:bg-zinc-700 flex items-center gap-1"><Edit size={14}/> Edit</button>
                    <button onClick={() => setDeleteId(service.id)} className="px-3 py-1.5 text-sm font-medium text-red-400 hover:text-white bg-red-500/10 rounded-md hover:bg-red-500 flex items-center gap-1"><Trash2 size={14}/> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <ConfirmDialog 
        isOpen={deleteId !== null}
        title="Delete Service"
        message="Are you sure you want to delete this service? This cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        confirmText="Delete"
      />
    </AdminLayout>
  );
}
