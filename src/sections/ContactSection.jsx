import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', query: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-32 bg-ace-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-ace-cyan rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ace-violet rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-ace-cyan to-ace-violet bg-clip-text text-transparent">CONTACT ACE</span>
          </h2>
          <p className="text-white/70 text-lg">Reach out to us with any queries or suggestions</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-ace-cyan/30 bg-ace-navy/40 backdrop-blur-md hover:border-ace-cyan/80 transition-colors duration-300">
                <h3 className="text-ace-cyan font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="text-2xl">📧</span> Email
                </h3>
                <p className="text-white/80 font-mono text-sm">HELP.ACE@gmail.com</p>
              </div>

              <div className="p-6 rounded-lg border border-ace-cyan/30 bg-ace-navy/40 backdrop-blur-md hover:border-ace-cyan/80 transition-colors duration-300">
                <h3 className="text-ace-cyan font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="text-2xl">🌐</span> Follow Us
                </h3>
                <div className="flex gap-4">
                  <a href="#" className="text-ace-cyan hover:text-ace-violet transition">Instagram</a>
                  <a href="#" className="text-ace-cyan hover:text-ace-violet transition">Discord</a>
                  <a href="#" className="text-ace-cyan hover:text-ace-violet transition">YouTube</a>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-ace-cyan/30 bg-ace-navy/40 backdrop-blur-md hover:border-ace-cyan/80 transition-colors duration-300">
                <h3 className="text-ace-cyan font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="text-2xl">⚡</span> Response Time
                </h3>
                <p className="text-white/80 text-sm">We typically respond within 24-48 hours</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 p-8 rounded-lg border border-ace-cyan/30 bg-ace-navy/40 backdrop-blur-md hover:border-ace-cyan/80 transition-colors duration-300">
              {/* Name Field */}
              <div>
                <label className="block text-ace-cyan font-bold text-sm mb-2">NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-ace-black border border-ace-cyan/30 rounded text-white placeholder-white/30 focus:border-ace-cyan focus:outline-none transition-colors duration-300 font-mono text-sm"
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-ace-cyan font-bold text-sm mb-2">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-ace-black border border-ace-cyan/30 rounded text-white placeholder-white/30 focus:border-ace-cyan focus:outline-none transition-colors duration-300 font-mono text-sm"
                  placeholder="your@email.com"
                />
              </div>

              {/* Query Field */}
              <div>
                <label className="block text-ace-cyan font-bold text-sm mb-2">QUERY</label>
                <textarea
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-ace-black border border-ace-cyan/30 rounded text-white placeholder-white/30 focus:border-ace-cyan focus:outline-none transition-colors duration-300 font-mono text-sm resize-none"
                  placeholder="Tell us what you need..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-ace-cyan to-ace-cyan text-ace-black font-bold rounded border-2 border-ace-cyan hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send size={18} />
                SUBMIT QUERY
              </motion.button>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded bg-ace-cyan/10 border border-ace-cyan text-ace-cyan text-center font-bold text-sm"
                >
                  ✓ Query submitted successfully! We'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
