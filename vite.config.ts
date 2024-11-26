import { URL, fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: `
          @use "sass:math";
          @use "sass:meta";
          @use "sass:map";
          @use "./src/assets/styles/_variables.scss" as *;
          @use "highlight.js/styles/stackoverflow-dark.css";`,
      },
    },
  },
});
