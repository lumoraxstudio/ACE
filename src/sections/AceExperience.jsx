import { motion } from 'framer-motion';
import { Zap, Users, Sparkles, Rocket } from 'lucide-react';

const AceExperience = () => {
  const experiences = [
    {
      icon: Zap,
      title: 'COMPETE',
      description: 'Competitive tournaments for ambitious players.',
    },
    {
      icon: Users,
      title: 'CONNECT',
      description: 'Build connections with players and gaming communities.',
    },
    {
      icon: Sparkles,
      title: 'EXPERIENCE',
      description: 'Experience esports beyond ordinary competitions.',
    },
    {
      icon: Rocket,
      title: 'GROW',
      description: 'Develop skills, teamwork and competitive discipline.',
    },
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-ace-black via-ace-navy to-ace-black overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ace-cyan rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ace-violet rounded-full filter blur-3xl opacity-20"></div>
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
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-ace-cyan to-ace-violet bg-clip-text text-transparent">MORE THAN A GAME</span>
          </h2>
        </motion.div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative p-6 rounded-xl border border-ace-cyan/30 hover:border-ace-cyan/80 bg-gradient-to-br from-ace-navy/40 to-ace-black/40 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.3)]"
              >
                {/* Icon */}
                <motion.div
                  className="mb-4 text-ace-cyan group-hover:text-ace-violet transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <Icon size={40} />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-ace-cyan transition-colors duration-300">
                  {exp.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed">
                  {exp.description}
                </p>

                {/* Glowing Border Animation */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  boxShadow: 'inset 0 0 20px rgba(0, 217, 255, 0.2)',
                }}></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AceExperience;
