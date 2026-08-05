import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return toast.error("Invalid or missing reset token");
    if (newPassword.length < 6) return toast.error("Password must be at least 6 characters");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");

    setLoading(true);
    try {
      await axios.post('/api/auth/reset-password', { token, newPassword });
      toast.success("Password reset successfully. You can now log in.");
      setTimeout(() => navigate('/login'), 2000);
    } catch (e: any) {
      toast.error(e.response?.data || "Failed to reset password. Token may be expired.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Invalid link.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-secondary-bg/50 backdrop-blur-md p-8 rounded-2xl border border-primary-text/10 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-primary-gold mb-6 text-center">New Password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-primary-text/60 mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-background border border-primary-text/20 rounded-lg px-4 py-3 text-primary-text focus:outline-none focus:border-primary-gold transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-primary-text/60 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-background border border-primary-text/20 rounded-lg px-4 py-3 text-primary-text focus:outline-none focus:border-primary-gold transition-colors"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-gold text-black font-semibold py-3 rounded-lg hover:bg-white transition-colors flex justify-center"
          >
            {loading ? <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div> : "Update Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
