/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // 👇 Ajout de la couleur secondaire (utilisée dans les boutons)
        secondary: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',  // rose-500
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        dark: {
          900: '#050a15',
          800: '#0a1628',
          700: '#0f2040',
          600: '#162a4a',
          500: '#1e3a5f',
        },
        // 👇 Vert signature — accent principal inspiré des références (CTA, highlights)
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // 👇 Palette officielle OMEDEV (référence : Home.jsx) — à utiliser partout
        brand: {
          navy: '#053876',
          blueDark: '#1D5B9B',
          blue: '#0B74C1',
          blueLight: '#4681B7',
          cyan: '#72A5CE',
          cyanLight: '#A6C3D7',
          turquoise: '#2AACB2',
          energy: '#55DDB5',
          offwhite: '#F6F6F7',
          dark: '#0B1213',
          textSecondary: '#25364A',
        },
      },
      fontFamily: {
        syne:    ['Syne', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        sans:    ['DM Sans', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-x': 'gradientX 8s ease infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(16,185,129,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(16,185,129,0.7)' }
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}