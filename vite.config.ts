import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteHtmlResolveAlias from 'vite-plugin-html-resolve-alias'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteHtmlResolveAlias(),
    VitePWA({
      strategies: 'injectManifest',
      injectRegister: null,
      registerType: 'autoUpdate',
      srcDir: 'src',
      filename: 'firebase-messaging-sw.js',
      devOptions: {
        enabled: true,
        type: 'module', //firebase
        navigateFallback: 'index.html' //firebase
      },
      workbox: { //firebase
        sourcemap: true
      }
    })
  ],
  resolve: {
    alias: [
      {
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser',
      },
      { find: "@", replacement: resolve(__dirname, "./src") },
      { find: '@Assets', replacement: resolve(__dirname, './src/assets') },
      { find: '@Components', replacement: resolve(__dirname, './src/components') },
      { find: '@Features', replacement: resolve(__dirname, './src/features') },
      { find: '@Utils', replacement: resolve(__dirname, './src/utils') },
      { find: '@Routes', replacement: resolve(__dirname, './src/routes') },
      { find: '@Models', replacement: resolve(__dirname, './src/models') },
      { find: '@Themes', replacement: resolve(__dirname, './src/themes') },
      { find: '@Repo', replacement: resolve(__dirname, './src/repositories') },
      { find: '@Log', replacement: resolve(__dirname, './src/logs') },
      { find: '@Store', replacement: resolve(__dirname, './src/stores') },
    ]
  },
  build: {
    outDir: "build",
  }
})
