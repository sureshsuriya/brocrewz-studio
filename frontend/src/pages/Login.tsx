import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post('/api/auth/login', data);
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (_err) {
      console.error(_err);
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="glass-card p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-premium-gold mb-8">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-premium-silver mb-2">Email</label>
            <input type="email" {...register('email', {required: true})} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-premium-gold outline-none" />
          </div>
          <div>
            <label className="block text-premium-silver mb-2">Password</label>
            <input type="password" {...register('password', {required: true})} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-premium-gold outline-none" />
          </div>
          <button type="submit" className="btn-primary w-full text-black">Login</button>
        </form>
      </div>
    </div>
  );
};
export default Login;
