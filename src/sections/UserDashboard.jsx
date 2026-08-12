import { motion } from 'framer-motion';

const UserDashboard = ({ userName = 'Player' }) => {
  const dashboardCards = [
    {
      title: 'Profile',
      icon: '👤',
      description: 'View and edit your profile',
      action: 'EDIT PROFILE',
    },
    {
      title: 'Email Verification',
      icon: '✉️',
      description: 'Verify your email address',
      status: 'Verified',
      color: 'text-green-400',
    },
    {
      title: 'Tournament Registrations',
      icon: '🏆',
      description: 'View your active registrations',
      action: 'VIEW TOURNAMENTS',
    },
    {
      title: 'Upcoming Events',
      icon: '📅',
      description: 'Check upcoming tournaments',
      action: 'EXPLORE',
    },
    {
      title: 'Account Settings',
      icon: '⚙️',
      description: 'Manage your account',
      action: 'SETTINGS',
    },
    {
      title: 'Support',
      icon: '💬',
      description: 'Contact support team',
      action: 'CONTACT US',
    },
  ];

  return (
    <div className="min-h-screen bg-ace-black pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-8 rounded-2xl border border-ace-cyan/30 bg-gradient-to-r from-ace-navy/60 to-ace-black/60 backdrop-blur-md"
        >
          <h1 className="text-5xl font-black mb-2">
            <span className="text-white">WELCOME BACK, </span>
            <span className="bg-gradient-to-r from-ace-cyan to-ace-violet bg-clip-text text-transparent">
              {userName.toUpperCase()}
            </span>
          </h1>
          <p className="text-white/70">Ready to enter the battle? Manage your tournaments and team below.</p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {dashboardCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-6 rounded-xl border border-ace-cyan/30 bg-ace-navy/40 backdrop-blur-md hover:border-ace-cyan/80 transition-all duration-300 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-ace-cyan transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-white/60 text-sm mb-4">{card.description}</p>
              {card.status && (
                <div className={`text-sm font-bold ${card.color} mb-4`}>✓ {card.status}</div>
              )}
              {card.action && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 border border-ace-cyan text-ace-cyan text-sm font-bold rounded hover:bg-ace-cyan/10 transition-all duration-300"
                >
                  {card.action}
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full md:w-auto px-8 py-3 border-2 border-red-500 text-red-400 font-bold rounded-lg hover:bg-red-500/10 transition-all duration-300"
        >
          LOGOUT
        </motion.button>
      </div>
    </div>
  );
};

export default UserDashboard;
