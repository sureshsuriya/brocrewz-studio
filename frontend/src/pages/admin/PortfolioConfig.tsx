import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import axios from 'axios';
import { toast } from 'sonner';
import { Trash2, Edit, Save, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ item, onEdit, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex justify-between items-center group mb-2 hover:border-zinc-700 relative z-10">
      <div className="flex items-center gap-4">
        <button {...attributes} {...listeners} className="text-zinc-500 hover:text-white cursor-grab active:cursor-grabbing"><GripVertical size={20}/></button>
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded bg-zinc-900 border border-zinc-800" />
        ) : (
          <div className="w-16 h-16 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 text-xs text-center p-1 leading-tight">No Img</div>
        )}
        <div>
          <h4 className="font-medium text-zinc-100 flex items-center gap-2">
            {item.title}
            {item.featured && <span className="bg-primary-gold/10 text-primary-gold text-[10px] px-1.5 py-0.5 rounded border border-primary-gold/20 uppercase font-bold tracking-wider">Featured</span>}
            {!item.active && <span className="bg-red-500/10 text-red-400 text-[10px] px-1.5 py-0.5 rounded border border-red-500/20 uppercase font-bold tracking-wider">Inactive</span>}
          </h4>
          <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">{item.category}</p>
        </div>
      </div>
      <div className="flex gap-2 relative z-20">
        <button onClick={() => onEdit(item)} className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-md hover:bg-zinc-700 cursor-pointer"><Edit size={16}/></button>
        <button onClick={() => onDelete(item.id)} className="p-2 text-red-400 hover:text-white bg-red-500/10 rounded-md hover:bg-red-500 cursor-pointer"><Trash2 size={16}/></button>
      </div>
    </div>
  );
}

export default function PortfolioConfig() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ id: null, title: '', category: '', description: '', imageUrl: '', videoUrl: '', clientName: '', featured: false, active: true });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('/api/public/portfolio');
      setItems(res.data);
    } catch {
      toast.error("Failed to load portfolio items");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`/api/admin/portfolio/${form.id}`, form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        toast.success("Portfolio updated");
      } else {
        await axios.post('/api/admin/portfolio', form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        toast.success("Portfolio created");
      }
      setForm({ id: null, title: '', category: '', description: '', imageUrl: '', videoUrl: '', clientName: '', featured: false, active: true });
      fetchItems();
    } catch {
      toast.error("Failed to save portfolio");
    }
  };

  const handleDelete = async (id: number) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/admin/portfolio/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      toast.success("Portfolio deleted");
      fetchItems();
    } catch {
      toast.error("Failed to delete portfolio");
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        
        // Save new order to backend
        axios.post('/api/admin/portfolio/reorder', newArray, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
          .then(() => toast.success("Order saved"))
          .catch(() => toast.error("Failed to save order"));
          
        return newArray;
      });
    }
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-24 max-h-[85vh] overflow-y-auto custom-scrollbar">
            <h3 className="text-xl font-semibold mb-6">{form.id ? 'Edit Project' : 'Add Project'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
                <input required type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Category</label>
                <input required type="text" placeholder="e.g. Video Editing, Shorts" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Client Name (Optional)</label>
                <input type="text" value={form.clientName || ''} onChange={(e) => setForm({...form, clientName: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Description (Optional)</label>
                <textarea rows={3} value={form.description || ''} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Image URL (Copy from Media Library)</label>
                <input type="text" value={form.imageUrl || ''} onChange={(e) => setForm({...form, imageUrl: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Video URL (Optional)</label>
                <input type="text" value={form.videoUrl || ''} onChange={(e) => setForm({...form, videoUrl: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold" />
              </div>
              
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-sm text-zinc-300">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({...form, featured: e.target.checked})} className="accent-primary-gold" />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm text-zinc-300">
                  <input type="checkbox" checked={form.active} onChange={(e) => setForm({...form, active: e.target.checked})} className="accent-primary-gold" />
                  Active
                </label>
              </div>

              <button type="submit" className="w-full bg-primary-gold text-black font-semibold rounded-lg p-2.5 hover:bg-yellow-500 flex items-center justify-center gap-2 mt-6">
                <Save size={18}/> {form.id ? 'Update Project' : 'Save Project'}
              </button>
              {form.id && (
                <button type="button" onClick={() => setForm({id: null, title: '', category: '', description: '', imageUrl: '', videoUrl: '', clientName: '', featured: false, active: true})} className="w-full bg-zinc-800 text-white rounded-lg p-2 hover:bg-zinc-700">Cancel Edit</button>
              )}
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex justify-between items-center">
              Existing Portfolio
              <span className="text-xs text-zinc-500 font-normal">Drag to reorder</span>
            </h3>
            
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                {items.map(item => (
                  <SortableItem key={item.id} item={item} onEdit={setForm} onDelete={handleDelete} />
                ))}
              </SortableContext>
            </DndContext>
            
            {items.length === 0 && (
              <div className="text-center text-zinc-500 py-12">No portfolio items found.</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
