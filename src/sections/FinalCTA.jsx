import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';

const FinalCTA = () => {
  return (
    <section className="relative min-h-screen w-full bg-ace-black overflow-hidden flex items-center justify-center">
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-t from-ace-violet via-transparent to-ace-cyan"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-ace-cyan/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* ACE Logo */}
          <motion.div
            className="text-8xl md:text-9xl font-black mb-8 bg-gradient-to-r from-ace-cyan via-ace-violet to-ace-cyan bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,217,255,0.6)]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ⚡
          </motion.div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">READY TO</span>
            <br />
            <span className="bg-gradient-to-r from-ace-cyan to-ace-violet bg-clip-text text-transparent">MAKE IT TOGETHER?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 font-light mb-12 leading-relaxed">
            YOUR TEAM. YOUR GAME. YOUR MOMENT.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-ace-cyan to-ace-cyan text-ace-black font-bold text-lg rounded-lg border-2 border-ace-cyan hover:shadow-[0_0_40px_rgba(0,217,255,0.6)] transition-all duration-300"
            >
              JOIN ACE NOW
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 border-2 border-ace-cyan text-ace-cyan font-bold text-lg rounded-lg backdrop-blur-md hover:bg-ace-cyan/10 transition-all duration-300"
            >
              EXPLORE TOURNAMENTS
            </motion.button>
          </div>

          {/* Stats Footer */}
          <motion.div
            className="flex flex-col md:flex-row justify-center gap-8 text-center opacity-70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="text-3xl font-bold text-ace-cyan">3+</div>
              <div className="text-sm text-white/60">Active Tournaments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ace-cyan">1000+</div>
              <div className="text-sm text-white/60">Active Players</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ace-cyan">24/7</div>
              <div className="text-sm text-white/60">Support Available</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Message */}
        <motion.p
          className="mt-16 text-ace-cyan/60 font-light text-sm tracking-widest uppercase"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          LET'S MAKE IT TOGETHER — ACE!!
        </motion.p>
      </div>
    </section>
  );
};

export default FinalCTA;
