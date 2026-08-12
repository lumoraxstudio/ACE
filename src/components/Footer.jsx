const Footer = () => {
  return (
    <footer className="border-t border-ace-cyan/20 bg-gradient-to-t from-ace-navy/50 to-transparent py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-ace-cyan to-ace-violet bg-clip-text text-transparent mb-2">
              ⚡ ACE
            </div>
            <p className="text-white/60 text-sm">Aura Core Esports</p>
            <p className="text-white/40 text-xs mt-2">Let's make it together — ACE!!</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-ace-cyan font-bold mb-4">PLATFORM</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-ace-cyan transition">Tournaments</a></li>
              <li><a href="#" className="hover:text-ace-cyan transition">Register</a></li>
              <li><a href="#" className="hover:text-ace-cyan transition">Teams</a></li>
              <li><a href="#" className="hover:text-ace-cyan transition">Rules</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-ace-cyan font-bold mb-4">ABOUT</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-ace-cyan transition">About ACE</a></li>
              <li><a href="#" className="hover:text-ace-cyan transition">Blog</a></li>
              <li><a href="#" className="hover:text-ace-cyan transition">Privacy</a></li>
              <li><a href="#" className="hover:text-ace-cyan transition">Terms</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-ace-cyan font-bold mb-4">CONTACT</h3>
            <p className="text-white/60 text-sm mb-2">Email:</p>
            <p className="text-ace-cyan font-mono text-sm mb-4">HELP.ACE.@gmail.com</p>
            <div className="flex gap-3">
              <a href="#" className="text-ace-cyan hover:text-ace-violet transition">Discord</a>
              <a href="#" className="text-ace-cyan hover:text-ace-violet transition">Instagram</a>
              <a href="#" className="text-ace-cyan hover:text-ace-violet transition">YouTube</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-ace-cyan/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
            <p>&copy; 2026 Aura Core Esports. All rights reserved.</p>
            <p>Built for gamers. Powered by esports.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
