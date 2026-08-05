import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      await axios.post('/api/auth/forgot-password', { email });
      setSent(true);
      toast.success("Reset link sent to your email!");
    } catch {
      toast.error("Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-secondary-bg/50 backdrop-blur-md p-8 rounded-2xl border border-primary-text/10 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-primary-gold mb-6 text-center">Reset Password</h2>
        
        {sent ? (
          <div className="text-center text-primary-text/80">
            <p>If an account exists with that email, a reset link has been sent.</p>
            <p className="mt-4 text-sm">Please check your inbox and spam folder.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-primary-text/60 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-primary-text/20 rounded-lg px-4 py-3 text-primary-text focus:outline-none focus:border-primary-gold transition-colors"
                placeholder="admin@brocrewz.com"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-gold text-black font-semibold py-3 rounded-lg hover:bg-white transition-colors flex justify-center"
            >
              {loading ? <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div> : "Send Reset Link"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
