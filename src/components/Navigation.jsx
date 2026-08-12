import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', href: '#home' },
    { label: 'TOURNAMENTS', href: '#tournaments' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SOCIAL', href: '#social' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-ace-cyan/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-ace-cyan to-ace-violet bg-clip-text text-transparent">
              ⚡ ACE
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/80 hover:text-ace-cyan transition-colors duration-300 hover:drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm text-white/80 hover:text-ace-cyan transition-colors">
              LOGIN / SIGN UP
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-ace-cyan hover:text-ace-violet"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-ace-cyan/20 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-sm font-medium text-white/80 hover:text-ace-cyan transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button className="w-full text-sm text-white/80 hover:text-ace-cyan transition-colors border-t border-ace-cyan/20 pt-4 mt-4">
              LOGIN / SIGN UP
            </button>
          </div>
        )}
      </div>

      {/* Animated Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-ace-cyan to-transparent opacity-50"></div>
    </nav>
  );
};

export default Navigation;
