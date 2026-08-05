import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import axios from 'axios';
import { toast } from 'sonner';
import { Plus, Trash2, Edit, Download } from 'lucide-react';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { exportToCSV } from '../../utils/exportToCSV';

export default function TeamConfig() {
  const [team, setTeam] = useState<any[]>([]);
  const [form, setForm] = useState({ id: null, name: '', role: '', phone: '', skills: '', imageUrl: '' });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await axios.get('/api/public/team');
      setTeam(res.data);
    } catch {
      toast.error("Failed to load team");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`/api/admin/team/${form.id}`, form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        toast.success("Team member updated");
      } else {
        await axios.post('/api/admin/team', form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        toast.success("Team member created");
      }
      setForm({ id: null, name: '', role: '', phone: '', skills: '', imageUrl: '' });
      fetchTeam();
    } catch {
      toast.error("Failed to save team member");
    }
  };

  const confirmDelete = async () => {
    if(!deleteId) return;
    try {
      await axios.delete(`/api/admin/team/${deleteId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      toast.success("Team member deleted");
      fetchTeam();
    } catch {
      toast.error("Failed to delete team member");
    } finally {
      setDeleteId(null);
    }
  };

  const handleExport = () => {
    exportToCSV(team, 'brocrewz_team');
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-24">
            <h3 className="text-xl font-semibold mb-6">{form.id ? 'Edit Member' : 'Add Member'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
                <input required type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Role</label>
                <input required type="text" value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Phone</label>
                <input required type="text" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Skills (comma separated)</label>
                <input required type="text" value={form.skills} onChange={(e) => setForm({...form, skills: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Image URL</label>
                <input type="text" value={form.imageUrl} onChange={(e) => setForm({...form, imageUrl: e.target.value})} placeholder="https://..." className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <button type="submit" className="w-full bg-primary-gold text-black font-semibold rounded-lg p-2.5 hover:bg-yellow-500 flex items-center justify-center gap-2">
                <Plus size={18}/> {form.id ? 'Update Member' : 'Save Member'}
              </button>
              {form.id && (
                <button type="button" onClick={() => setForm({id: null, name: '', role: '', phone: '', skills: '', imageUrl: ''})} className="w-full bg-zinc-800 text-white rounded-lg p-2 hover:bg-zinc-700">Cancel Edit</button>
              )}
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Team Members</h3>
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg font-medium transition-colors border border-zinc-700 text-sm"
              >
                <Download size={16} /> Export CSV
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {team.map((member) => (
                <div key={member.id} className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex gap-4 group hover:border-zinc-700">
                  <div className="w-16 h-16 rounded-full bg-zinc-800 overflow-hidden shrink-0">
                    {member.imageUrl ? <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold">{member.name.charAt(0)}</div>}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-zinc-100">{member.name}</h4>
                    <p className="text-sm text-primary-gold mb-1">{member.role}</p>
                    <p className="text-xs text-zinc-500 mb-3">{member.skills}</p>
                    <div className="flex gap-2 border-t border-zinc-800 pt-3 mt-auto">
                      <button onClick={() => setForm(member)} className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 rounded hover:bg-zinc-700"><Edit size={14}/></button>
                      <button onClick={() => setDeleteId(member.id)} className="p-1.5 text-red-400 hover:text-white bg-red-500/10 rounded hover:bg-red-500"><Trash2 size={14}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <ConfirmDialog 
        isOpen={deleteId !== null}
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        confirmText="Delete"
      />
    </AdminLayout>
  );
}
