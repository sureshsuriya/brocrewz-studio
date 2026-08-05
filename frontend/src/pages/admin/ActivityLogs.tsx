import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import axios from 'axios';

interface ActivityLog {
  id: number;
  userEmail: string;
  action: string;
  entityType: string;
  entityName: string;
  timestamp: string;
}

const ActivityLogs = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const res = await axios.get('/api/admin/activities', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      setLogs(res.data);
    } catch {
      toast.error("Failed to load activity logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) return <div className="p-6">Loading activities...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Activity Logs</h1>
      
      <div className="bg-secondary-bg rounded-xl border border-primary-text/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-background/50 border-b border-primary-text/10">
              <tr>
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Action</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Entity</th>
                <th className="p-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-text/5">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-primary-text/50">No recent activity.</td>
                </tr>
              ) : (
                logs.map((log) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-primary-text/5 transition-colors"
                  >
                    <td className="p-4 text-primary-text/80">{log.userEmail}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        log.action.includes("CREATE") ? "bg-green-500/20 text-green-500" :
                        log.action.includes("DELETE") ? "bg-red-500/20 text-red-500" :
                        "bg-blue-500/20 text-blue-500"
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{log.entityType}</td>
                    <td className="p-4 text-primary-text/80">{log.entityName}</td>
                    <td className="p-4 text-sm text-primary-text/60">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
