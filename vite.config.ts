import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "service-worker.ts",
      registerType: "prompt",
      injectRegister: false,
      scope: "/",
      base: "/",
      pwaAssets: {
        disabled: false,
        config: true,
      },
      manifest: {
        id: "xxx",
        lang: "fr",
        start_url: "/",
        scope: "/",
        name: "xxx",
        short_name: "xxx",
        description: "xxx",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
      },
      kit: {
        includeVersionFile: true,
      },
      injectManifest: {
        globPatterns: ["client/**/*.{js,css,ico,png,svg}"],
      },
      devOptions: {
        enabled: false,
        navigateFallback: "/",
        navigateFallbackAllowlist: [/^\/$/],
        type: "module",
      },
    }),
  ],
});
