export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        barBounce: {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1.3)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease forwards',
        spinSlow: 'spinSlow 4s linear infinite',
        barBounce: 'barBounce 0.8s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
