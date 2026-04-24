import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  server: {
    host: true,
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        item: resolve(__dirname, "item.html"),
        modulo: resolve(__dirname, "modulo.html"),
      },
    },
  },
});
