import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://fabipers.com',
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  redirects: {
    '/traffikcer-digital-colombia': '/trafficker-digital-colombia',
    '/traffikcer-digital-miami': '/trafficker-digital-miami',
    '/trafficker-digital-colombia/': '/trafficker-digital-colombia',
    '/trafficker-digital-miami/': '/trafficker-digital-miami'
  },
  integrations: [react(), sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['react', 'react-dom']
    }
  }
});