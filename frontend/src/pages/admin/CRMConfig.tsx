import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import axios from 'axios';
import { toast } from 'sonner';
import { Mail, CheckCircle, Trash2, Eye, MessageSquare, Search, Download } from 'lucide-react';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { exportToCSV } from '../../utils/exportToCSV';

export default function CRMConfig() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMsg, setSelectedMsg] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('/api/admin/contacts', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      setMessages(res.data);
    } catch {
      toast.error("Failed to load messages");
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await axios.put(`/api/admin/contacts/${id}/read`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      fetchMessages();
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  const updateReply = async (id: number, isReplied: boolean, notes: string) => {
    try {
      await axios.put(`/api/admin/contacts/${id}/reply`, { isReplied, replyNotes: notes }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      toast.success("Reply status updated");
      fetchMessages();
      setSelectedMsg(null);
    } catch {
      toast.error("Failed to update reply status");
    }
  };

  const confirmDelete = async () => {
    if(!deleteId) return;
    try {
      await axios.delete(`/api/admin/contacts/${deleteId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      toast.success("Message deleted");
      fetchMessages();
      if (selectedMsg?.id === deleteId) setSelectedMsg(null);
    } catch {
      toast.error("Failed to delete message");
    } finally {
      setDeleteId(null);
    }
  };

  const handleClearAll = async () => {
    try {
      for (const msg of messages) {
        await axios.delete(`/api/admin/contacts/${msg.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      }
      toast.success("All messages cleared");
      fetchMessages();
      setSelectedMsg(null);
    } catch {
      toast.error("Failed to clear messages");
    }
  };

  const handleExport = () => {
    exportToCSV(filtered, 'brocrewz_contacts');
  };

  const filtered = messages.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.email.toLowerCase().includes(searchTerm.toLowerCase()) || m.subject.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <AdminLayout>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">CRM Dashboard</h2>
          <p className="text-zinc-400 mt-1">Manage all client inquiries</p>
        </div>
        <div className="flex gap-4 items-center">
          {messages.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2.5 rounded-lg font-medium transition-colors border border-red-500/20 text-sm"
            >
              <Trash2 size={16} /> Clear Test Messages
            </button>
          )}
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors border border-zinc-700 text-sm"
          >
            <Download size={16} /> Export CSV
          </button>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Search messages..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 text-sm">
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Subject</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {filtered.map(msg => (
                  <tr key={msg.id} className={`hover:bg-zinc-800/50 transition-colors ${!msg.read ? 'bg-primary-gold/5' : ''}`}>
                    <td className="p-4">
                      <div className="font-medium text-zinc-100">{msg.name}</div>
                      <div className="text-xs text-zinc-500">{msg.email}</div>
                    </td>
                    <td className="p-4 text-sm text-zinc-300">
                      {msg.subject.length > 30 ? msg.subject.substring(0,30) + '...' : msg.subject}
                    </td>
                    <td className="p-4 text-sm text-zinc-400">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {!msg.read && <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 rounded border border-blue-500/20 uppercase font-bold">New</span>}
                        {msg.replied && <span className="bg-green-500/10 text-green-400 text-[10px] px-2 py-0.5 rounded border border-green-500/20 uppercase font-bold">Replied</span>}
                      </div>
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      <button onClick={() => { setSelectedMsg(msg); if(!msg.read) markAsRead(msg.id); }} className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 rounded"><Eye size={16}/></button>
                      <button onClick={() => setDeleteId(msg.id)} className="p-1.5 text-red-400 hover:text-white bg-red-500/10 rounded"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-zinc-500">No messages found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {selectedMsg ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-24">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedMsg.subject}</h3>
                  <p className="text-sm text-zinc-400 mt-1">From: {selectedMsg.name} ({selectedMsg.email})</p>
                  <p className="text-xs text-zinc-500 mt-1">{new Date(selectedMsg.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={() => setSelectedMsg(null)} className="text-zinc-500 hover:text-white">✕</button>
              </div>
              
              <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed mb-6">
                {selectedMsg.message}
              </div>

              <div className="border-t border-zinc-800 pt-6">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2"><MessageSquare size={16}/> Internal Notes</h4>
                <textarea 
                  rows={4} 
                  placeholder="Notes about this lead..." 
                  value={selectedMsg.replyNotes || ''}
                  onChange={(e) => setSelectedMsg({...selectedMsg, replyNotes: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold mb-3 text-sm"
                />
                <div className="flex items-center gap-2 mb-4">
                  <input type="checkbox" id="isReplied" checked={selectedMsg.replied} onChange={(e) => setSelectedMsg({...selectedMsg, replied: e.target.checked})} className="w-4 h-4 accent-primary-gold" />
                  <label htmlFor="isReplied" className="text-sm text-zinc-300">Mark as replied</label>
                </div>
                <button onClick={() => updateReply(selectedMsg.id, selectedMsg.replied, selectedMsg.replyNotes)} className="w-full bg-primary-gold text-black font-semibold rounded-lg p-2.5 hover:bg-yellow-500 flex items-center justify-center gap-2">
                  <CheckCircle size={18}/> Save Status & Notes
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-8 text-center text-zinc-500 flex flex-col items-center justify-center h-64 sticky top-24">
              <Mail size={48} className="opacity-20 mb-4" />
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
      
      <ConfirmDialog 
        isOpen={deleteId !== null}
        title="Delete Message"
        message="Are you sure you want to delete this message forever? This cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        confirmText="Delete"
      />
    </AdminLayout>
  );
}
