// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/global.css'],
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  icon: {
    serverBundle: 'remote',
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            correct: '#6aaa64',
            'correct-dark': '#538d4e',
            present: '#c9b458',
            'present-dark': '#b59f3b',
            absent: '#787c7e',
            'absent-dark': '#3a3a3c',
            empty: '#d3d6da',
            'empty-dark': '#a1a3a4',
            dark: '#121213',
          },
        },
        fontFamily: {
          sans: ['"Libre Franklin"', 'ui-sans-serif'],
        },
      },
    },
  },
});
