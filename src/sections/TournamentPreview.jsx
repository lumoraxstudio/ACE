import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TournamentPreview = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const tournaments = [
    {
      id: 1,
      title: 'VALORANT LEAGUE',
      description: 'Competitive tactical tournament',
      color: 'from-red-600 to-red-900',
      particles: true,
    },
    {
      id: 2,
      title: 'FREE FIRE LEGENDS TOURNAMENT',
      description: 'Battle royale championship',
      color: 'from-orange-600 to-orange-900',
      particles: true,
    },
    {
      id: 3,
      title: 'BGMI SUPER LEAGUE',
      description: 'Mobile esports excellence',
      color: 'from-blue-600 to-blue-900',
      particles: true,
    },
  ];

  return (
    <section id="tournaments" className="relative py-32 bg-ace-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-ace-cyan/10 via-transparent to-ace-violet/10"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-ace-cyan via-ace-violet to-ace-cyan bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,217,255,0.5)]">ENTER THE BATTLE</span>
          </h2>
          <p className="text-xl text-ace-cyan/80 font-light">YOUR GAME. YOUR TEAM. YOUR MOMENT.</p>
        </motion.div>

        {/* Tournament Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tournaments.map((tournament, idx) => (
            <motion.div
              key={tournament.id}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -20, scale: 1.05 }}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Card Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tournament.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>

              {/* Glass Effect Border */}
              <div className="absolute inset-0 border border-ace-cyan/30 group-hover:border-ace-cyan/80 rounded-2xl transition-colors duration-300"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8 backdrop-blur-sm">
                <div>
                  <div className="text-sm font-mono text-ace-cyan/60 mb-2">CARD {String(tournament.id).padStart(2, '0')}</div>
                  <h3 className="text-2xl font-black text-white mb-2 group-hover:text-ace-cyan transition-colors duration-300">
                    {tournament.title}
                  </h3>
                  <p className="text-white/70 text-sm">{tournament.description}</p>
                </div>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 border-2 border-ace-cyan text-ace-cyan font-bold rounded-lg backdrop-blur-md hover:bg-ace-cyan/10 hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all duration-300"
                >
                  VIEW TOURNAMENT
                </motion.button>
              </div>

              {/* Glow Effect on Hover */}
              {hoveredCard === idx && (
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    boxShadow: '0 0 40px rgba(0, 217, 255, 0.4), inset 0 0 40px rgba(168, 85, 247, 0.2)',
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TournamentPreview;
