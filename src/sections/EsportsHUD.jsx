import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const EsportsHUD = () => {
  const [stats, setStats] = useState({
    tournaments: 0,
    players: 0,
    communities: 0,
    events: 0,
  });

  useEffect(() => {
    const targetStats = {
      tournaments: 3,
      players: 1000,
      communities: 10,
      events: 5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate numbers
          let current = { ...stats };
          const interval = setInterval(() => {
            current.tournaments = Math.min(current.tournaments + 0.1, targetStats.tournaments);
            current.players = Math.min(current.players + 20, targetStats.players);
            current.communities = Math.min(current.communities + 0.2, targetStats.communities);
            current.events = Math.min(current.events + 0.1, targetStats.events);

            setStats({
              tournaments: Math.floor(current.tournaments),
              players: Math.floor(current.players),
              communities: Math.floor(current.communities),
              events: Math.floor(current.events),
            });

            if (
              current.tournaments >= targetStats.tournaments &&
              current.players >= targetStats.players &&
              current.communities >= targetStats.communities &&
              current.events >= targetStats.events
            ) {
              clearInterval(interval);
            }
          }, 30);

          observer.unobserve(entry.target);
        }
      });
    });

    const element = document.getElementById('hud-stats');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-32 bg-ace-black overflow-hidden">
      {/* Background Scanlines Effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 217, 255, 0.03) 0px, rgba(0, 217, 255, 0.03) 1px, transparent 1px, transparent 2px)',
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          id="hud-stats"
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* HUD Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 border border-ace-cyan/50 rounded text-sm font-mono text-ace-cyan mb-4">
              [ACE ESPORTS NETWORK]
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-2">LIVE STATISTICS</h2>
            <p className="text-ace-cyan/80 font-mono text-sm">REAL-TIME DATA • ACTIVE MONITORING</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'TOURNAMENTS', value: stats.tournaments, suffix: '' },
              { label: 'PLAYERS', value: stats.players, suffix: '+' },
              { label: 'COMMUNITIES', value: stats.communities, suffix: '+' },
              { label: 'EVENTS', value: stats.events, suffix: ' LIVE' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="relative p-6 rounded-lg border border-ace-cyan/40 bg-gradient-to-br from-ace-navy/60 to-ace-black/60 backdrop-blur-md hover:border-ace-cyan/80 transition-colors duration-300 group"
                whileHover={{ borderColor: 'rgba(0, 217, 255, 1)', boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}
              >
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  boxShadow: 'inset 0 0 20px rgba(0, 217, 255, 0.1)',
                }}></div>

                <div className="relative z-10 text-center">
                  <div className="text-xs font-mono text-ace-cyan/60 mb-2 uppercase tracking-widest">
                    {stat.label}
                  </div>
                  <motion.div
                    className="text-4xl md:text-5xl font-black text-ace-cyan"
                    key={stat.value}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {stat.value}
                    <span className="text-sm">{stat.suffix}</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Status Indicator */}
          <motion.div
            className="mt-8 p-4 rounded-lg border border-ace-cyan/30 bg-ace-navy/40 backdrop-blur-md text-center"
            animate={{ boxShadow: ['0 0 20px rgba(0, 217, 255, 0.3)', '0 0 40px rgba(0, 217, 255, 0.6)', '0 0 20px rgba(0, 217, 255, 0.3)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="inline-flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-ace-cyan"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              ></motion.div>
              <span className="text-ace-cyan font-mono text-sm">SYSTEM STATUS: OPERATIONAL</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EsportsHUD;
