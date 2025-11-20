// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],

  // Image optimization configuration
  image: {
    // Enable sharp for image processing
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // Default image format
    format: ['webp', 'avif'],
    // Quality settings (1-100)
    quality: 80,
  },
});
