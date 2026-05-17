// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [solidJs()],
  
  // Base path for GitHub Pages
  base: '/tic-tac-toe-astro',
  outDir: './dist'
});
