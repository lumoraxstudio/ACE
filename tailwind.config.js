export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'ace-black': '#0a0a0a',
        'ace-graphite': '#1a1a1a',
        'ace-navy': '#0f1b2e',
        'ace-cyan': '#00d9ff',
        'ace-violet': '#a855f7',
        'ace-magenta': '#ff006e',
      },
      fontFamily: {
        futuristic: ['Orbitron', 'Rajdhani', 'Exo', 'monospace'],
      },
      boxShadow: {
        'ace-glow': '0 0 30px rgba(0, 217, 255, 0.5)',
        'ace-glow-violet': '0 0 30px rgba(168, 85, 247, 0.5)',
      },
    },
  },
  plugins: [],
};
