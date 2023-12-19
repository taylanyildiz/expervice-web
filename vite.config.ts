import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteHtmlResolveAlias from 'vite-plugin-html-resolve-alias'
import { sentryVitePlugin } from "@sentry/vite-plugin";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // react(),
    viteHtmlResolveAlias(),
    sentryVitePlugin({
      org: "acri",
      project: "web-expervice",
      authToken: "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"
    })
  ],
  build: {
    outDir: "build",
    copyPublicDir: true,
    sourcemap: true
  },
  define: {
    global: "window",
  },
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
      { find: '@Local', replacement: resolve(__dirname, './src/localization') },
    ]
  },
})