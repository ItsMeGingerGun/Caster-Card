module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Add Farcaster colors
        'farcaster-purple': '#8a63d2',
        'farcaster-blue': '#4e82f0',
        'farcaster-pink': '#ff71ce',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
