// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";

// import federation from '@originjs/vite-plugin-federation'

// import { resolve } from 'node:path'

export default defineNuxtConfig({
  experimental: {
    asyncEntry: true,
  },

  vite: {
    build: {
      target: ["esnext", "es2022"],
      modulePreload: false,
      minify: false,
      cssCodeSplit: false,
    },
    esbuild: {
      target: "es2022",
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "es2022",
      },
    },

    server: {
      cors: { origin: "*" },
    },
  },

  devServer: {
    port: 3001,
  },

  srcDir: "./src",
  modules: ["nuxt-primevue", "nuxt-gtag", "@nuxtjs/i18n"],

  i18n: {
    locales: [
      { code: "en", name: "English", iso: "en-US", file: "en.json" },
      { code: "fr", name: "Français", iso: "fr-FR", file: "fr.json" },
    ],
    lazy: true,
    langDir: "../lang/", // Simplified path
    defaultLocale: "en",
    vueI18n: "../i18n.config.js",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: true,
      fallbackLocale: "en",
    },
  },

  primevue: {
    options: {
      unstyled: false,
    },
    importPT: {
      // from: path.resolve(__dirname, './src/presets/lara/'),
      from: "../src/presets/lara/",
      as: "TailwindLara",
    },
    components: {
      include: "*",
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  plugins: ["~/plugins/fontawesome.js"],

  app: {
    layoutTransition: {
      name: "slide-right",
      mode: "out-in",
    },
  },

  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "primeicons/primeicons.css",
    "~/assets/scss/main.scss",
  ],

  runtimeConfig: {
    public: {
      BASE_URL: process.env.NUXT_API_BASE_URL,
      ADMIN_PASSWORD: process.env.NUXT_APP_ADMIN_PASSWORD,
    },
  },

  compatibilityDate: "2024-10-08",
});