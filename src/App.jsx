import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import TournamentPreview from './sections/TournamentPreview';
import AceExperience from './sections/AceExperience';
import AceCore from './sections/AceCore';
import CommunitySection from './sections/CommunitySection';
import EsportsHUD from './sections/EsportsHUD';
import SocialHub from './sections/SocialHub';
import ContactSection from './sections/ContactSection';
import FinalCTA from './sections/FinalCTA';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 2 seconds
    const timer = setTimeout(() => {
      const loader = document.getElementById('aceLoader');
      if (loader) {
        loader.classList.add('hidden');
        setIsLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-ace-black text-white font-futuristic">
      <Navigation />
      <Hero />
      <TournamentPreview />
      <AceExperience />
      <AceCore />
      <CommunitySection />
      <EsportsHUD />
      <SocialHub />
      <ContactSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;
