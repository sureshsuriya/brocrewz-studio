import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/auth/login', data, { timeout: 15000 });
      localStorage.setItem('token', res.data.token);
      toast.success('Successfully logged in!');
      navigate('/admin');
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 401) {
          toast.error('Invalid credentials. Default email: admin@brocrewz.com');
        } else if (err.response.status === 404) {
          toast.error('API endpoint not found. Ensure VITE_API_BASE_URL is set in Vercel environment variables.');
        } else {
          toast.error(`Login failed (HTTP ${err.response.status}). Please try again.`);
        }
      } else if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        toast.error('Connection timed out. The backend server is not reachable. Please ensure the API server is deployed and VITE_API_BASE_URL is set in Vercel.');
      } else if (err.request) {
        toast.error('Network error: Unable to connect to backend API server. Ensure the backend is deployed and running.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
      <div className="glass-card-premium p-8 w-full max-w-md border border-white/10 shadow-2xl relative z-10">
        <div className="flex justify-center mb-6">
          <img src="/assets/logo/logo.jpg" alt="BroCrewz Logo" className="w-20 h-20 object-contain rounded-2xl border border-white/10 shadow-lg" />
        </div>
        <h2 className="text-3xl font-black text-center text-white mb-2 uppercase tracking-wide">Admin Access</h2>
        <p className="text-center text-zinc-500 text-sm mb-8">Enter your credentials to manage the platform</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-400 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="Email Address"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })} 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-primary-gold transition-colors placeholder-zinc-700" 
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 block font-medium">{(errors.email as any).message}</span>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-zinc-400">Password</label>
              <Link to="/forgot-password" className="text-xs text-primary-gold hover:underline font-semibold">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password"
                {...register('password', { required: 'Password is required' })} 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 pr-10 text-white focus:outline-none focus:border-primary-gold transition-colors placeholder-zinc-700" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs mt-1 block font-medium">{(errors.password as any).message}</span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-zinc-400 cursor-pointer">
              <input type="checkbox" className="accent-primary-gold rounded" />
              <span>Remember me</span>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary-gold hover:bg-yellow-500 text-black font-bold py-3.5 px-4 rounded-lg transition-all shadow-lg hover:shadow-primary-gold/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Login to Dashboard</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
