# Space STEM Learning App

A fun, interactive Progressive Web App (PWA) for kids ages 6-12 to learn Science, Technology, Engineering, and Mathematics through space-themed adventures!

## 🚀 Features

### Core Functionality
- **Space-themed STEM Learning**: Interactive lessons covering Science, Technology, Engineering, and Math
- **Role-based Authentication**: Separate dashboards for students and teachers
- **Progressive Web App**: Works offline and can be installed on devices
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Progress Tracking**: Monitor learning progress and achievements

### Student Features
- 🎓 Interactive space-themed lessons
- 🏆 Achievement system with badges and XP
- 📊 Personal progress dashboard
- 🎯 Learning streaks and goals
- 🌟 Gamified learning experience

### Teacher Features
- 👥 Student management dashboard
- 📈 Progress analytics and reporting
- 📚 Lesson management and creation
- 📋 Class overview and statistics
- 🔔 Announcements and communication

### Technical Features
- **PWA Support**: Offline functionality with service workers
- **Modern UI**: Built with TailwindCSS and Framer Motion animations
- **TypeScript**: Full type safety throughout the application
- **Next.js 14+**: Latest React features with App Router
- **Mobile-first**: Responsive design that works on all devices

## 🛠 Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom space theme
- **Animations**: Framer Motion
- **State Management**: React Query (@tanstack/react-query)
- **Icons**: Lucide React
- **PWA**: Custom service worker implementation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-stem-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🎮 Demo Accounts

The app includes demo accounts for testing:

### Students
- **Email**: alex@spacestem.com | **Password**: demo123
- **Email**: luna@spacestem.com | **Password**: demo123

### Teachers  
- **Email**: galaxy@spacestem.com | **Password**: demo123

## 📁 Project Structure

```
my-stem-app/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── learn/             # Student learning dashboard
│   ├── teacher/           # Teacher dashboard
│   ├── profile/           # User profile page
│   ├── layout.tsx         # Root layout with global providers
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles and space theme
├── components/            # Reusable UI components
│   ├── auth/             # Authentication components
│   └── ui/               # General UI components
├── public/               # Static assets and PWA files
│   ├── manifest.json     # PWA manifest
│   └── sw.js            # Service worker
├── utils/                # Utility functions
│   ├── auth.ts          # Authentication helpers
│   └── pwa.ts           # PWA utilities
└── tailwind.config.ts    # TailwindCSS configuration
```

## 🎨 Design System

### Color Palette
- **Deep Blue**: #0B1426 (Primary background)
- **Navy**: #1E2A4A (Secondary background) 
- **Purple**: #6B46C1 (Primary accent)
- **Light Purple**: #A855F7 (Secondary accent)
- **Neon Green**: #10F2C5 (Success/Active states)
- **Cosmic Yellow**: #FFD700 (Highlights/Warnings)
- **Star White**: #F8FAFC (Primary text)
- **Galaxy Gray**: #64748B (Secondary text)

### Typography
- **Primary Font**: Inter (clean, readable)
- **Fun Font**: Comic Sans MS (kid-friendly elements)

### Animations
- **Float**: Gentle floating motion for space elements
- **Twinkle**: Star twinkling effects
- **Rocket**: Rocket ship movement animations
- **Planet Rotate**: Continuous rotation for planetary elements

## 📱 PWA Features

### Offline Support
- Service worker caches essential resources
- Offline page navigation
- Background sync for data updates

### Installation
- Custom install prompt
- App-like experience when installed
- Splash screen and app icons

### Performance
- Resource caching strategies
- Optimized bundle sizes
- Lazy loading for components

## 🔧 Customization

### Adding New Lessons
1. Create lesson content in the learning dashboard
2. Add lesson metadata to the subjects array
3. Implement lesson completion tracking

### Extending Authentication
Replace the mock authentication in `utils/auth.ts` with:
- Firebase Authentication
- Auth0
- NextAuth.js
- Custom backend API

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify  
- Railway
- Heroku

---

**Made with ❤️ for young space explorers** 🚀🌟
# SIH_2025
