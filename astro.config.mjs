import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://fabipers.com',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [react(), sitemap()],
  build: {
    inlineStylesheets: 'auto',
  }
});