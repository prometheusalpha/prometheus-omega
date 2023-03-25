import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [sveltekit(), VitePWA()],
  resolve: {
    alias: {
      $components: path.resolve("./src/lib/shared/components"),
    },
  },
});
