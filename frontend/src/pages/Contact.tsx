import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MagneticButton } from '../components/ui/MagneticButton';
import axios from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/public/contact', { ...data, subject: 'New Inquiry from Website' });
      toast.success("Message sent successfully! We will get back to you soon.");
      reset();
    } catch (e: any) {
      toast.error(e.response?.data || "Failed to send message. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-screen grid md:grid-cols-2 gap-16 items-center">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
        <h2 className="text-5xl font-black text-white mb-6 uppercase">Let's <span className="text-gradient-gold">Talk</span></h2>
        <p className="text-silver mb-10 text-lg">Ready to take your content to the cinematic level? Drop us a message.</p>
        
        <div className="space-y-6">
          <MagneticButton>
            <a href="https://wa.me/918124376230" className="flex items-center space-x-4 glass-card-premium p-6 hover:border-primary-gold transition-colors w-full">
              <div className="w-12 h-12 bg-primary-gold/10 rounded-full flex items-center justify-center text-primary-gold">📞</div>
              <div>
                <h4 className="font-bold text-white">Call Lenin (Lead Editor)</h4>
                <p className="text-secondary-text">+91 81243 76230</p>
              </div>
            </a>
          </MagneticButton>

          <MagneticButton>
            <a href="https://wa.me/916380364289" className="flex items-center space-x-4 glass-card-premium p-6 hover:border-primary-gold transition-colors w-full">
              <div className="w-12 h-12 bg-primary-gold/10 rounded-full flex items-center justify-center text-primary-gold">📞</div>
              <div>
                <h4 className="font-bold text-white">Call Vethams (Pro Editor)</h4>
                <p className="text-secondary-text">+91 63803 64289</p>
              </div>
            </a>
          </MagneticButton>
          
          <MagneticButton>
            <a href="https://www.instagram.com/brocrewz._studio/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 glass-card-premium p-6 hover:border-accent-blue transition-colors w-full">
              <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center text-accent-blue">IG</div>
              <div>
                <h4 className="font-bold text-white">Instagram</h4>
                <p className="text-secondary-text">@brocrewz._studio</p>
              </div>
            </a>
          </MagneticButton>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="glass-card-premium p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-gold/5 blur-[100px] rounded-full pointer-events-none" />
        <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
          <div className="relative group">
            <input type="text" {...register("name")} required className="w-full bg-background/50 border border-white/10 rounded-lg p-4 text-white focus:border-primary-gold outline-none transition-colors peer" placeholder=" " />
            <label className="absolute left-4 top-4 text-secondary-text transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary-gold peer-focus:bg-surface px-1 peer-valid:-top-3 peer-valid:text-xs peer-valid:bg-surface">Your Name</label>
          </div>
          <div className="relative group">
            <input type="email" {...register("email")} required className="w-full bg-background/50 border border-white/10 rounded-lg p-4 text-white focus:border-primary-gold outline-none transition-colors peer" placeholder=" " />
            <label className="absolute left-4 top-4 text-secondary-text transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary-gold peer-focus:bg-surface px-1 peer-valid:-top-3 peer-valid:text-xs peer-valid:bg-surface">Your Email</label>
          </div>
          <div className="relative group">
            <textarea {...register("message")} required rows={4} className="w-full bg-background/50 border border-white/10 rounded-lg p-4 text-white focus:border-primary-gold outline-none transition-colors peer" placeholder=" "></textarea>
            <label className="absolute left-4 top-4 text-secondary-text transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary-gold peer-focus:bg-surface px-1 peer-valid:-top-3 peer-valid:text-xs peer-valid:bg-surface">Message</label>
          </div>
          <MagneticButton className="w-full">
            <button disabled={isSubmitting} type="submit" className="w-full bg-white text-background font-bold py-4 rounded-lg hover:bg-primary-gold transition-colors disabled:opacity-50">
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </MagneticButton>
        </form>
      </motion.div>
    </div>
  );
};
export default Contact;
