import { useState } from 'react';
import { motion } from 'framer-motion';

const TournamentRegistration = ({ tournamentName = 'VALORANT LEAGUE' }) => {
  const [players, setPlayers] = useState([
    { id: 1, name: '', gameId: '' },
    { id: 2, name: '', gameId: '' },
    { id: 3, name: '', gameId: '' },
    { id: 4, name: '', gameId: '' },
    { id: 5, name: '', gameId: '' },
    { id: 6, name: '', gameId: '' },
  ]);

  const [substitutes, setSubstitutes] = useState([
    { id: 1, name: '', gameId: '' },
    { id: 2, name: '', gameId: '' },
  ]);

  const [teamInfo, setTeamInfo] = useState({
    teamName: '',
    whatsapp: '',
    note: '',
  });

  const handlePlayerChange = (id, field, value) => {
    setPlayers(players.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleSubstituteChange = (id, field, value) => {
    setSubstitutes(substitutes.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleTeamInfoChange = (field, value) => {
    setTeamInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      tournament: tournamentName,
      teamInfo,
      players,
      substitutes,
    });
    alert('Registration submitted! Good luck in the tournament.');
  };

  return (
    <div className="min-h-screen bg-ace-black pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-2">
            <span className="bg-gradient-to-r from-ace-cyan to-ace-violet bg-clip-text text-transparent">
              ENTER YOUR SQUAD
            </span>
          </h1>
          <p className="text-white/70 text-lg">Registering for: {tournamentName}</p>
        </motion.div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Team Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-ace-cyan/30 bg-ace-navy/40 backdrop-blur-md"
          >
            <h2 className="text-2xl font-black text-ace-cyan mb-4">TEAM INFORMATION</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-ace-cyan font-bold text-sm mb-2 uppercase">Team Name</label>
                <input
                  type="text"
                  value={teamInfo.teamName}
                  onChange={(e) => handleTeamInfoChange('teamName', e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-ace-black border border-ace-cyan/30 rounded text-white placeholder-white/30 focus:border-ace-cyan focus:outline-none transition-colors duration-300"
                  placeholder="Enter your team name"
                />
              </div>
              <div>
                <label className="block text-ace-cyan font-bold text-sm mb-2 uppercase">WhatsApp Number</label>
                <input
                  type="tel"
                  value={teamInfo.whatsapp}
                  onChange={(e) => handleTeamInfoChange('whatsapp', e.target.value)}
                  className="w-full px-4 py-2 bg-ace-black border border-ace-cyan/30 rounded text-white placeholder-white/30 focus:border-ace-cyan focus:outline-none transition-colors duration-300"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-ace-cyan font-bold text-sm mb-2 uppercase">Additional Notes</label>
                <textarea
                  value={teamInfo.note}
                  onChange={(e) => handleTeamInfoChange('note', e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 bg-ace-black border border-ace-cyan/30 rounded text-white placeholder-white/30 focus:border-ace-cyan focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Any additional information..."
                ></textarea>
              </div>
            </div>
          </motion.div>

          {/* Players */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl border border-ace-cyan/30 bg-ace-navy/40 backdrop-blur-md"
          >
            <h2 className="text-2xl font-black text-ace-cyan mb-4">SQUAD (6 PLAYERS)</h2>
            <div className="space-y-3">
              {players.map((player, idx) => (
                <div key={player.id} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-ace-cyan/60 uppercase font-bold">Player {idx + 1} Name</label>
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => handlePlayerChange(player.id, 'name', e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-ace-black border border-ace-cyan/30 rounded text-white text-sm focus:border-ace-cyan focus:outline-none transition-colors duration-300"
                      placeholder="Player name"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs text-ace-cyan/60 uppercase font-bold">Game ID</label>
                    <input
                      type="text"
                      value={player.gameId}
                      onChange={(e) => handlePlayerChange(player.id, 'gameId', e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-ace-black border border-ace-cyan/30 rounded text-white text-sm focus:border-ace-cyan focus:outline-none transition-colors duration-300"
                      placeholder="In-game ID/Username"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Substitutes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl border border-ace-cyan/30 bg-ace-navy/40 backdrop-blur-md"
          >
            <h2 className="text-2xl font-black text-ace-cyan mb-4">SUBSTITUTES (2 PLAYERS)</h2>
            <div className="space-y-3">
              {substitutes.map((sub, idx) => (
                <div key={sub.id} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-ace-cyan/60 uppercase font-bold">Substitute {idx + 1} Name</label>
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => handleSubstituteChange(sub.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 bg-ace-black border border-ace-cyan/30 rounded text-white text-sm focus:border-ace-cyan focus:outline-none transition-colors duration-300"
                      placeholder="Substitute name"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs text-ace-cyan/60 uppercase font-bold">Game ID</label>
                    <input
                      type="text"
                      value={sub.gameId}
                      onChange={(e) => handleSubstituteChange(sub.id, 'gameId', e.target.value)}
                      className="w-full px-3 py-2 bg-ace-black border border-ace-cyan/30 rounded text-white text-sm focus:border-ace-cyan focus:outline-none transition-colors duration-300"
                      placeholder="In-game ID/Username"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-ace-cyan to-ace-cyan text-ace-black font-bold text-lg rounded-lg border-2 border-ace-cyan hover:shadow-[0_0_40px_rgba(0,217,255,0.6)] transition-all duration-300"
          >
            ENTER THE BATTLE
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default TournamentRegistration;
