import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/i18n'],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'cs' },
    },
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-07-15',

  vite: {
    plugins: [tailwindcss()],
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  i18n: {
    defaultLocale: 'cs',
    strategy: 'no_prefix',
    locales: [
      { code: 'cs', language: 'cs-CZ', name: 'Čeština', file: 'cs.json' },
    ],
  },
})
