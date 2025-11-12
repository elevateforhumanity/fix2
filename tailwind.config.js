/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend:{
      colors:{ efh:{ red:"var(--efh-red)", orange:"var(--efh-orange)", blue:"var(--efh-blue)",
        bg:"var(--efh-bg)", surface:"var(--efh-surface)", text:"var(--efh-text)", muted:"var(--efh-muted)" } }
    }
  },
  plugins:[]
}
