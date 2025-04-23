/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cozy: {
          brown: '#8B5A2B',       // Warm brown
          tan: '#D2B48C',         // Tan/beige
          cream: '#F5F5DC',       // Cream
          sand: '#E8DCCA',        // Sandy beige
          coffee: '#6F4E37',      // Coffee brown
          caramel: '#C68E17',     // Caramel
          orange: '#E67E22',      // Sunset orange
          coral: '#FF7F50',       // Coral sunset
          gold: '#FFD700',        // Warm gold
          amber: '#FFBF00',       // Amber
          red: '#B22222',         // Cozy red
          maroon: '#800000',      // Deep maroon
          navy: '#2C3E50',        // Deep navy for contrast
          'soft-white': '#F9F6F0', // Soft white
          'warm-gray': '#9C9990', // Warm gray
        },
      },
      fontFamily: {
        handwritten: ['"Cabin Sketch"', '"Patrick Hand"', 'cursive'],
        cozy: ['"Quicksand"', 'sans-serif'],
        title: ['"Amatic SC"', 'cursive'],
      },
      boxShadow: {
        'cozy': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'cozy-lg': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'inner-cozy': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'warm-glow': '0 0 15px rgba(255, 191, 0, 0.2)',
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'breathe': 'breathe 8s ease-in-out infinite',
        'fade-in': 'fade-in 1.2s ease-out',
        'gentle-pulse': 'gentle-pulse 4s ease-in-out infinite',
        'soft-bounce': 'soft-bounce 2s ease-in-out infinite',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'gentle-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'soft-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backgroundImage: {
        'cozy-gradient': 'linear-gradient(to right bottom, #F5F5DC, #E8DCCA)',
        'sunset-gradient': 'linear-gradient(to right, #E67E22, #FF7F50)',
        'warm-overlay': 'radial-gradient(circle, rgba(255, 191, 0, 0.1), transparent 70%)',
        'soft-texture': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\' viewBox=\'0 0 4 4\'%3E%3Cpath fill=\'%239C9990\' fill-opacity=\'0.1\' d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\'%3E%3C/path%3E%3C/svg%3E")',
        'living-room-blur': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\' viewBox=\'0 0 800 800\'%3E%3Cdefs%3E%3CradialGradient id=\'a\' cx=\'400\' cy=\'400\' r=\'50%25\' gradientUnits=\'userSpaceOnUse\'%3E%3Cstop offset=\'0\' stop-color=\'%23F5F5DC\' stop-opacity=\'0.3\' /%3E%3Cstop offset=\'1\' stop-color=\'%23D2B48C\' stop-opacity=\'0\' /%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill=\'url(%23a)\' width=\'800\' height=\'800\' /%3E%3C/svg%3E")',
      },
      backgroundSize: {
        'texture': '4px 4px',
      },
      backdropFilter: {
        'blur-soft': 'blur(8px)',
      },
    },
  },
  plugins: [],
};

