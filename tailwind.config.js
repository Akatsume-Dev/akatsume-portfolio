/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#F5D87A',
          300: '#E4C76B',
          400: '#C9A84C',
          500: '#B8941F',
          600: '#9A7A10',
          700: '#7A5F08',
          800: '#5C4405',
          900: '#3D2D02',
        },
        dark: {
          900: '#030303',
          800: '#070707',
          700: '#0A0A0A',
          600: '#0F0F0F',
          500: '#141414',
          400: '#1A1A1A',
          300: '#222222',
          200: '#2A2A2A',
          100: '#333333',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'beam': 'beam 3s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee 30s linear infinite reverse',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,168,76,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(201,168,76,0.6), 0 0 100px rgba(201,168,76,0.3)' },
        },
        beam: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E4C76B 0%, #C9A84C 40%, #8B6914 100%)',
        'gold-radial': 'radial-gradient(ellipse at center, rgba(201,168,76,0.15) 0%, transparent 70%)',
        'dark-gradient': 'linear-gradient(180deg, #030303 0%, #070707 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 100%)',
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(201,168,76,0.2)',
        'gold-md': '0 0 30px rgba(201,168,76,0.3)',
        'gold-lg': '0 0 60px rgba(201,168,76,0.4)',
        'gold-xl': '0 0 100px rgba(201,168,76,0.5)',
        'card': '0 4px 24px rgba(0,0,0,0.6)',
        'card-hover': '0 8px 48px rgba(0,0,0,0.8)',
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
}
