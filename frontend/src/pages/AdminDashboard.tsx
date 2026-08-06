import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { Users, Eye, Mail, Activity, RefreshCw, Smartphone, Monitor, Globe, Calendar } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>({
    totalVisitors: 0,
    totalEvents: 0,
    totalPageViews: 0,
    contactRequests: 0,
    activeSessions: 0,
    pageViews: {},
    timeStats: {},
    deviceBreakdown: {},
    browserBreakdown: {},
    visitorTraffic: []
  });

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/admin/analytics', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStats(res.data);
    } catch {
      toast.error("Failed to load dashboard metrics");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleResetAnalytics = async () => {
    if (!confirm("Are you sure you want to reset all analytics data?")) return;
    try {
      await axios.delete('/api/admin/analytics/reset', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStats((prev: any) => ({
        ...prev,
        totalVisitors: 0,
        totalEvents: 0,
        totalPageViews: 0,
        activeSessions: 0,
        pageViews: { home: 0, about: 0, services: 0, portfolio: 0, team: 0, testimonials: 0, faq: 0, contact: 0 },
        timeStats: { today: 0, thisWeek: 0, thisMonth: 0 },
        deviceBreakdown: {},
        browserBreakdown: {},
        visitorTraffic: []
      }));
      toast.success("Analytics reset successfully");
      fetchStats();
    } catch {
      toast.error("Failed to reset analytics");
    }
  };

  const pageViews = stats.pageViews || {};
  const timeStats = stats.timeStats || {};
  const deviceBreakdown = stats.deviceBreakdown || {};
  const browserBreakdown = stats.browserBreakdown || {};

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wide">Production Analytics</h1>
          <p className="text-zinc-400 text-sm mt-1">Real-time visitor traffic & engagement insights</p>
        </div>
        <button 
          onClick={handleResetAnalytics}
          className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <RefreshCw size={14} /> Reset Analytics
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Unique Visitors" value={stats.totalVisitors?.toString() || "0"} icon={<Users size={20} className="text-blue-400" />} />
        <StatCard title="Total Page Views" value={(stats.totalPageViews || stats.totalEvents || 0).toString()} icon={<Eye size={20} className="text-green-400" />} />
        <StatCard title="Active Sessions" value={stats.activeSessions?.toString() || "0"} icon={<Activity size={20} className="text-purple-400" />} />
        <StatCard title="Contact Requests" value={stats.contactRequests?.toString() || "0"} icon={<Mail size={20} className="text-yellow-400" />} />
      </div>

      {/* Time Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg"><Calendar size={24} /></div>
          <div>
            <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Visitors Today</div>
            <div className="text-2xl font-black text-white">{timeStats.today || 0}</div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 text-green-400 rounded-lg"><Calendar size={24} /></div>
          <div>
            <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Visitors This Week</div>
            <div className="text-2xl font-black text-white">{timeStats.thisWeek || 0}</div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg"><Calendar size={24} /></div>
          <div>
            <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Visitors This Month</div>
            <div className="text-2xl font-black text-white">{timeStats.thisMonth || 0}</div>
          </div>
        </div>
      </div>

      {/* Traffic Chart & Per-Page Views */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-96">
          <h3 className="text-lg font-bold text-zinc-100 mb-6">Visitor Traffic (Last 7 Days)</h3>
          {stats.visitorTraffic && stats.visitorTraffic.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.visitorTraffic}>
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

        {/* Per-Page Views Grid */}
        <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
          <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2"><Globe size={18} className="text-primary-gold" /> Public Page Views</h3>
          <div className="space-y-3">
            {[
              { label: "Home Page", key: "home", path: "/" },
              { label: "Services Page", key: "services", path: "/services" },
              { label: "Portfolio Page", key: "portfolio", path: "/portfolio" },
              { label: "Team Page", key: "team", path: "/team" },
              { label: "About Page", key: "about", path: "/about" },
              { label: "Testimonials Page", key: "testimonials", path: "/testimonials" },
              { label: "FAQ Page", key: "faq", path: "/faq" },
              { label: "Contact Page", key: "contact", path: "/contact" }
            ].map(p => (
              <div key={p.key} className="flex justify-between items-center p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60 text-xs">
                <span className="text-zinc-300 font-medium">{p.label} <span className="text-zinc-600 font-mono">({p.path})</span></span>
                <span className="font-bold text-primary-gold">{pageViews[p.key] || 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device & Browser Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-base font-bold text-zinc-100 mb-4 flex items-center gap-2"><Monitor size={18} className="text-blue-400" /> Device Breakdown</h3>
          <div className="space-y-3">
            {Object.keys(deviceBreakdown).length > 0 ? (
              Object.entries(deviceBreakdown).map(([device, count]: any) => (
                <div key={device} className="flex justify-between items-center p-3 rounded-lg bg-zinc-950/60 text-xs">
                  <span className="text-zinc-300 font-medium">{device}</span>
                  <span className="font-bold text-white">{count}</span>
                </div>
              ))
            ) : (
              <div className="text-xs text-zinc-500">No device data available</div>
            )}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-base font-bold text-zinc-100 mb-4 flex items-center gap-2"><Smartphone size={18} className="text-green-400" /> Browser Breakdown</h3>
          <div className="space-y-3">
            {Object.keys(browserBreakdown).length > 0 ? (
              Object.entries(browserBreakdown).map(([browser, count]: any) => (
                <div key={browser} className="flex justify-between items-center p-3 rounded-lg bg-zinc-950/60 text-xs">
                  <span className="text-zinc-300 font-medium">{browser}</span>
                  <span className="font-bold text-white">{count}</span>
                </div>
              ))
            ) : (
              <div className="text-xs text-zinc-500">No browser data available</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-zinc-400 font-medium text-xs uppercase tracking-wider">{title}</h3>
        <div className="p-2 bg-zinc-800/50 rounded-lg">{icon}</div>
      </div>
      <p className="text-3xl font-black text-zinc-100">{value}</p>
    </div>
  );
}
