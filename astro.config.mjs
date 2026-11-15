// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  site: 'https://Kiraly07.github.io/', // Replace with your site URL
  integrations: [
    mdx(),
    sitemap()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
