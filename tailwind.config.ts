import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Space-themed colors for kids
      colors: {
        space: {
          'deep-blue': '#0B1426',
          'navy': '#1E2A4A',
          'purple': '#6B46C1',
          'light-purple': '#A855F7',
          'neon-green': '#10F2C5',
          'bright-green': '#00FF88',
          'cosmic-yellow': '#FFD700',
          'star-white': '#F8FAFC',
          'galaxy-gray': '#64748B',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      fontFamily: {
        'space': ['Inter', 'sans-serif'],
        'fun': ['Comic Sans MS', 'cursive', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'rocket': 'rocket 4s ease-in-out infinite',
        'planet-rotate': 'planetRotate 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        rocket: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) rotate(2deg)' },
          '75%': { transform: 'translateY(-5px) rotate(-2deg)' },
        },
        planetRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #0B1426 0%, #1E2A4A 50%, #6B46C1 100%)',
        'cosmic-gradient': 'linear-gradient(45deg, #6B46C1 0%, #A855F7 50%, #10F2C5 100%)',
      },
    },
  },
  plugins: [],
}

export default config
