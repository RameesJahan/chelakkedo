/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'chat-bg':"/public/images/chat_bg.jpg"
      }
    },
  },
  plugins: [],
}

