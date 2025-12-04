/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        night: '#0b1220',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(14, 165, 233, 0.25)',
      },
    },
  },
  plugins: [],
};
