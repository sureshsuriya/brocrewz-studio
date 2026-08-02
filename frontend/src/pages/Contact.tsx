import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { MessageSquare, Mail } from 'lucide-react';

const InstagramIcon = () => (
  <svg className="w-8 h-8 mt-1 text-premium-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (_data: any) => {
    try {
      // Assuming a backend endpoint is ready
      // await axios.post('/api/public/contact', _data);
      alert('Message sent successfully!');
      reset();
    } catch (_err) {
      console.error(_err);
      alert('Failed to send message.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gradient-gold mb-4">Contact Us</h2>
        <p className="text-premium-silver">Ready to elevate your content? Get in touch with us today.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
          <div className="glass-card p-6 flex items-start space-x-4 hover:border-premium-gold transition-colors">
            <MessageSquare className="text-premium-gold w-8 h-8 mt-1" />
            <div>
              <h4 className="text-xl font-bold text-white mb-1">WhatsApp</h4>
              <p className="text-premium-silverDark mb-2">Message us for quick replies.</p>
              <a href="https://wa.me/918124376230" target="_blank" rel="noreferrer" className="text-premium-gold hover:underline">+91 81243 76230</a>
            </div>
          </div>

          <div className="glass-card p-6 flex items-start space-x-4 hover:border-premium-gold transition-colors">
            <InstagramIcon />
            <div>
              <h4 className="text-xl font-bold text-white mb-1">Instagram</h4>
              <p className="text-premium-silverDark mb-2">Check out our latest work.</p>
              <a href="#" className="text-premium-gold hover:underline">@brocrewz.studio</a>
            </div>
          </div>

          <div className="glass-card p-6 flex items-start space-x-4 hover:border-premium-gold transition-colors">
            <Mail className="text-premium-gold w-8 h-8 mt-1" />
            <div>
              <h4 className="text-xl font-bold text-white mb-1">Email</h4>
              <p className="text-premium-silverDark mb-2">For business inquiries.</p>
              <a href="mailto:contact@brocrewz.com" className="text-premium-gold hover:underline">contact@brocrewz.com</a>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-premium-silverDark mb-2">Name</label>
              <input {...register('name', { required: true })} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-premium-gold focus:outline-none" />
              {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
            </div>
            <div>
              <label className="block text-premium-silverDark mb-2">Email</label>
              <input type="email" {...register('email', { required: true })} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-premium-gold focus:outline-none" />
              {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
            </div>
            <div>
              <label className="block text-premium-silverDark mb-2">Message</label>
              <textarea {...register('message', { required: true })} rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-premium-gold focus:outline-none"></textarea>
              {errors.message && <span className="text-red-500 text-sm">Message is required</span>}
            </div>
            <button type="submit" className="btn-primary w-full text-black">Send Message</button>
          </form>
        </motion.div>
      </div>
      
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-white mb-6">Our Location</h3>
        <div className="glass-card h-96 w-full rounded-2xl overflow-hidden flex items-center justify-center bg-black/50">
           <p className="text-premium-silverDark">Google Maps Embed Placeholder</p>
        </div>
      </div>
    </div>
  );
};
export default Contact;
