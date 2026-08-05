import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import axios from 'axios';

const UserSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) return toast.error("New password must be at least 6 characters");
    if (newPassword !== confirmPassword) return toast.error("New passwords do not match");

    setLoading(true);
    try {
      await axios.post('/api/auth/change-password', { currentPassword, newPassword }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      toast.success("Password changed successfully!");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (e: any) {
      toast.error(e.response?.data || "Failed to change password. Ensure current password is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">User Settings</h1>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary-bg p-6 rounded-xl border border-primary-text/10"
      >
        <h2 className="text-xl font-semibold mb-6">Change Password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-primary-text/60 mb-2">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-background border border-primary-text/20 rounded-lg px-4 py-3 text-primary-text focus:outline-none focus:border-primary-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-primary-text/60 mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-background border border-primary-text/20 rounded-lg px-4 py-3 text-primary-text focus:outline-none focus:border-primary-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-primary-text/60 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-background border border-primary-text/20 rounded-lg px-4 py-3 text-primary-text focus:outline-none focus:border-primary-gold"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-gold text-black font-semibold py-3 rounded-lg hover:bg-white transition-colors"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UserSettings;
