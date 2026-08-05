import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { Users, Eye, Mail, Activity } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    totalEvents: 0,
    contactRequests: 0,
    activeSessions: 0,
    visitorTraffic: [] as any[]
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/admin/analytics', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setStats(res.data);
      } catch {
        toast.error("Failed to load dashboard metrics");
      }
    }
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Unique Visitors" value={stats.totalVisitors.toString()} icon={<Users size={20} className="text-blue-400" />} />
        <StatCard title="Total Page Views" value={stats.totalEvents.toString()} icon={<Eye size={20} className="text-green-400" />} />
        <StatCard title="Contact Requests" value={stats.contactRequests.toString()} icon={<Mail size={20} className="text-yellow-400" />} />
        <StatCard title="Active Sessions" value={stats.activeSessions.toString()} icon={<Activity size={20} className="text-purple-400" />} />
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-96">
        <h3 className="text-lg font-medium text-zinc-100 mb-6">Visitor Traffic (Last 7 Days)</h3>
        {stats.totalEvents > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.visitorTraffic || []}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="visitors" stroke="#D4AF37" fillOpacity={1} fill="url(#colorVisitors)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-zinc-500 text-sm border-2 border-dashed border-zinc-800 rounded-lg">
            <span>No visitor analytics available yet.</span>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-zinc-400 font-medium text-sm">{title}</h3>
        <div className="p-2 bg-zinc-800/50 rounded-lg">{icon}</div>
      </div>
      <p className="text-3xl font-bold text-zinc-100">{value}</p>
    </div>
  );
}
