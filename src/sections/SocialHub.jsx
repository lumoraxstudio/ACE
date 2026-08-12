import { motion } from 'framer-motion';
import { Github, Instagram, Youtube } from 'lucide-react';

const SocialHub = () => {
  const socials = [
    {
      name: 'Instagram',
      icon: Instagram,
      handle: '@auracoreesport',
      color: 'from-pink-600 to-purple-600',
      link: 'https://instagram.com/auracoreesport',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      handle: 'ACE Esports',
      color: 'from-red-600 to-red-800',
      link: '#',
    },
    {
      name: 'Discord',
      icon: Github,
      handle: 'ACE Community',
      color: 'from-indigo-600 to-purple-600',
      link: '#',
    },
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-ace-black via-ace-navy/50 to-ace-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ace-cyan rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-ace-cyan to-ace-violet bg-clip-text text-transparent">CONNECT WITH ACE</span>
          </h2>
          <p className="text-white/70 text-lg">Join our gaming community</p>
        </motion.div>

        {/* Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {socials.map((social, idx) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.08, y: -20 }}
              >
                {/* Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>

                {/* Glass Border */}
                <div className="absolute inset-0 border border-ace-cyan/30 group-hover:border-ace-cyan/80 rounded-2xl transition-colors duration-300"></div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-between p-8 backdrop-blur-sm text-center">
                  <motion.div
                    className="text-ace-cyan"
                    whileHover={{ scale: 1.3, rotate: 20 }}
                  >
                    <Icon size={50} />
                  </motion.div>

                  <div>
                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-ace-cyan transition-colors">
                      {social.name}
                    </h3>
                    <p className="text-white/70 text-sm font-mono mb-4">{social.handle}</p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 border border-ace-cyan text-ace-cyan font-bold rounded hover:bg-ace-cyan/10 transition-all duration-300"
                    >
                      CONNECT
                    </motion.button>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                  boxShadow: '0 0 40px rgba(0, 217, 255, 0.4), inset 0 0 40px rgba(168, 85, 247, 0.2)',
                }}></div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialHub;
