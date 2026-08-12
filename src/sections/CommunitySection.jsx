import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const CommunitySection = () => {
  const communityTypes = [
    { name: 'PLAYERS', icon: '🎮', count: '1000+' },
    { name: 'TEAMS', icon: '👥', count: '100+' },
    { name: 'CREATORS', icon: '🎬', count: '50+' },
    { name: 'ORGANIZERS', icon: '⚡', count: '20+' },
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-ace-black via-ace-navy/50 to-ace-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-ace-cyan via-transparent to-ace-violet"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        ></motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-ace-cyan to-ace-white bg-clip-text text-transparent">BUILT FOR GAMERS</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            «ACE brings gamers together to compete, connect and create unforgettable esports experiences.»
          </p>
        </motion.div>

        {/* Community Network */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            className="relative h-96 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Center Node */}
            <motion.div
              className="absolute w-20 h-20 rounded-full border-2 border-ace-cyan flex items-center justify-center z-20"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                boxShadow: '0 0 30px rgba(0, 217, 255, 0.6)',
              }}
            >
              <div className="text-2xl">🎯</div>
            </motion.div>

            {/* Connected Nodes */}
            {communityTypes.map((type, idx) => {
              const angle = (idx / communityTypes.length) * Math.PI * 2;
              const radius = 140;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={idx}
                  className="absolute w-24 h-24 rounded-full border-2 border-ace-violet flex flex-col items-center justify-center cursor-pointer hover:border-ace-cyan transition-colors duration-300"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
                  }}
                  whileHover={{ scale: 1.15, boxShadow: '0 0 40px rgba(0, 217, 255, 0.6)' }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.15 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl">{type.icon}</div>
                  <div className="text-xs font-bold text-white mt-1 text-center">{type.count}</div>
                </motion.div>
              );
            })}

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {communityTypes.map((_, idx) => {
                const angle = (idx / communityTypes.length) * Math.PI * 2;
                const radius = 140;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.line
                    key={idx}
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${x}px)`}
                    y2={`calc(50% + ${y}px)`}
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    opacity="0.5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                );
              })}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d9ff" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {communityTypes.map((type, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-4 rounded-lg border border-ace-cyan/30 bg-ace-navy/40 backdrop-blur-md text-center hover:border-ace-cyan/80 transition-colors duration-300"
            >
              <div className="text-3xl mb-2">{type.icon}</div>
              <div className="text-ace-cyan font-bold text-sm mb-1">{type.count}</div>
              <div className="text-white/60 text-xs">{type.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
