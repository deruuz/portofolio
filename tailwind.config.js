/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './error.vue',
    './plugins/**/*.{js,ts}',
    './composables/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        mute: 'var(--mute)',
        line: 'var(--line)',
        vermilion: 'var(--red)',
      },
      fontFamily: {
        serif: ['"Shippori Mincho"', 'serif'],
        sans: ['"Zen Kaku Gothic New"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        wrap: '980px',
      },
    },
  },
  plugins: [],
}
