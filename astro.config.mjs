// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],

  // Image optimization configuration
  image: {
    // Enable sharp for image processing (default in Astro v3+)
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
});
