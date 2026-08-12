# ACE — Aura Core Esports

## Premium 3D Futuristic Esports Homepage

**WE ARE ACE — LET'S MAKE IT TOGETHER!!**

A modern, immersive 3D esports platform built with React, Three.js, and Tailwind CSS. Combines the visual quality of AAA game interfaces with professional tournament management.

---

## 🚀 Features

### 🌌 **Hero Section**
- **3D Interactive Environment** - Futuristic esports arena with rotating ACE logo
- **Mouse Tracking** - Logo and background react to mouse movement
- **Holographic Elements** - Floating panels and LED strips
- **Cinematic Animations** - Smooth transitions and glowing effects

### 🎮 **Tournament System**
- **3 Active Tournaments**
  - Valorant League
  - Free Fire Legends Tournament
  - BGMI Super League
- **Card Hover Effects** - Interactive 3D card animations
- **Registration System** - Full squad registration with substitutes

### ✨ **ACE Experience**
- **4 Core Values**
  - COMPETE - Competitive tournaments
  - CONNECT - Community building
  - EXPERIENCE - Premium esports events
  - GROW - Skill development

### 🧬 **ACE Core Section**
- **3D Rotating Sphere** - Interactive core visualization
- **Particle Effects** - Animated particles around core
- **Community Message** - One community, one competition, one core

### 👥 **Community Network**
- **Interactive Network Graph** - Connected community nodes
- **Player Stats** - 1000+ players, 100+ teams, 50+ creators
- **Real-time Updates** - Live player counts

### 📊 **Live Statistics HUD**
- **Real-time Counters** - Animated stat counters
- **Active Monitoring** - System status indicator
- **Professional Display** - Command console style interface

### 🌐 **Social Integration**
- **Social Media Hub** - Instagram, YouTube, Discord
- **Community Links** - Connect with community
- **Social Authentication** - Login with Discord/Google

### 📝 **Contact System**
- **Contact Form** - Query submission system
- **Email Support** - HELP.ACE@gmail.com
- **Quick Response** - 24-48 hour response time

### 🔐 **Authentication**
- **Firebase Integration** - Secure auth system
- **Sign Up / Login** - User registration
- **Social Auth** - Discord and Google OAuth
- **Email Verification** - Account verification
- **Password Reset** - Forgot password recovery

### 👤 **User Dashboard**
- **Profile Management** - Edit user profile
- **Email Verification** - Email status tracking
- **Tournament History** - View registrations
- **Account Settings** - Manage preferences

### 🎯 **Tournament Registration**
- **Squad Registration** - 6 players + 2 substitutes
- **Player Details** - Name and game ID per player
- **Team Information** - Team name and contact
- **Form Validation** - Input validation

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.2 - UI library
- **Vite** 5.0 - Build tool
- **Tailwind CSS** 3.3 - Styling

### 3D Graphics
- **Three.js** r158 - 3D engine
- **React Three Fiber** 8.15 - React renderer for Three.js
- **Drei** 9.88 - Useful helpers for Three.js

### Animation
- **GSAP** 3.12 - Advanced animations
- **Framer Motion** 10.16 - React animations

### Utilities
- **Lucide React** 0.294 - Icon library
- **Firebase** 10.6 - Auth & Database

---

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/lumoraxstudio/ACE.git
cd ACE

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your Firebase credentials to .env
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project
# ... other Firebase keys
```

---

## 🚀 Running Locally

### Development Server

```bash
npm run dev
```

The site will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Deployment

### GitHub Pages

The site is automatically deployed to GitHub Pages via GitHub Actions.

**Deployment URL:** `https://lumoraxstudio.github.io/ACE/`

### Setup GitHub Pages

1. Go to **Settings** → **Pages**
2. Select **GitHub Actions** as source
3. Push to `main` or `feature/premium-3d-homepage` branch
4. Workflow automatically builds and deploys

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy dist folder to your server
# Or use GitHub Pages, Netlify, Vercel, etc.
```

---

## 📁 Project Structure

```
ace-esports-platform/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx       # Top navigation bar
│   │   └── Footer.jsx           # Footer component
│   ├── sections/
│   │   ├── Hero.jsx             # Hero section with 3D
│   │   ├── TournamentPreview.jsx # Tournament cards
│   │   ├── AceExperience.jsx    # Experience section
│   │   ├── AceCore.jsx          # Core 3D section
│   │   ├── CommunitySection.jsx # Community network
│   │   ├── EsportsHUD.jsx       # Statistics HUD
│   │   ├── SocialHub.jsx        # Social media section
│   │   ├── ContactSection.jsx   # Contact form
│   │   ├── FinalCTA.jsx         # Final call to action
│   │   ├── AuthenticationUI.jsx # Login/Signup
│   │   ├── UserDashboard.jsx    # User dashboard
│   │   └── TournamentRegistration.jsx # Registration form
│   ├── 3d/
│   │   ├── AceLogo3D.jsx        # 3D ACE logo
│   │   └── HolographicArena.jsx # 3D arena environment
│   ├── hooks/
│   │   └── useMouseMove.js      # Mouse tracking hook
│   ├── utils/
│   │   ├── auth.js              # Firebase auth utilities
│   │   ├── email.js             # Email utilities
│   │   ├── api.js               # API calls
│   │   ├── validation.js        # Form validation
│   │   └── tournaments.js       # Tournament data
│   ├── config/
│   │   └── firebase.js          # Firebase config
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── index.html                   # HTML entry
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Neon Cyan (`#00d9ff`)
- **Secondary**: Electric Violet (`#a855f7`)
- **Background**: Deep Black (`#0a0a0a`)
- **Accent**: Graphite (`#1a1a1a`)
- **Text**: White (`#ffffff`)

### Typography
- **Font Family**: Orbitron, Rajdhani, Exo (Monospace)
- **Headings**: Bold, uppercase
- **Body**: Light weight, normal case

### Effects
- **Glowing Shadows**: `drop-shadow(0 0 20px rgba(0,217,255,0.5))`
- **Glassmorphism**: `backdrop-blur-md` with transparent background
- **Gradient Text**: Cyan to Violet

---

## 🔑 Environment Variables

Create a `.env` file:

```env
# Firebase
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# API
REACT_APP_API_URL=http://localhost:5000/api

# Social Media
REACT_APP_INSTAGRAM_URL=https://instagram.com/auracoreesport
REACT_APP_DISCORD_URL=https://discord.gg/ace
REACT_APP_YOUTUBE_URL=https://youtube.com/@ace
```

---

## 🐛 Troubleshooting

### 404 Error on GitHub Pages

**Solution:**
1. Enable GitHub Actions in repository settings
2. Ensure workflow runs successfully
3. Check Pages settings point to `gh-pages` branch
4. Clear browser cache and hard refresh

### 3D Objects Not Rendering

**Solution:**
1. Check browser WebGL support
2. Verify Three.js is installed: `npm list three`
3. Check browser console for errors
4. Try in Chrome/Firefox

### Firebase Auth Not Working

**Solution:**
1. Verify Firebase credentials in `.env`
2. Check Firebase project has Authentication enabled
3. Whitelist domain in Firebase console
4. Check browser console for auth errors

---

## 📞 Support

**Email:** HELP.ACE@gmail.com

**Contact Form:** Available on website

**Social Media:**
- Instagram: @auracoreesport
- Discord: [Community Link]
- YouTube: [Channel Link]

---

## 📄 License

MIT License - feel free to use for your esports platform

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a pull request

---

## 🎯 Roadmap

- [ ] Team management system
- [ ] Live tournament streaming
- [ ] Player statistics dashboard
- [ ] Mobile app
- [ ] Payment integration
- [ ] AI-powered matchmaking
- [ ] Community forums
- [ ] Leaderboard system

---

## 🙌 Credits

Built with ❤️ by Aura Core Esports

**Let's make it together — ACE!!**

---

### 🚀 Ready to Deploy?

```bash
# Push to GitHub
git add .
git commit -m "Deploy premium 3D homepage"
git push origin feature/premium-3d-homepage

# Create pull request or merge to main
# GitHub Actions will automatically build and deploy
```

Your site will be live at: `https://lumoraxstudio.github.io/ACE/`
