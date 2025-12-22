import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://worstofbreed.net',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  vite: {
    ssr: {
      external: ['node:fs/promises'],
    },
  },
  integrations: [{
    name: 'move-redirects',
    hooks: {
      'astro:build:done': async ({
        dir
      }) => {
        const fs = await import('node:fs/promises');
        const path = await import('node:path');
        const {
          fileURLToPath
        } = await import('node:url');
        const distDir = fileURLToPath(dir);
        // Astro might output 'redirects' or 'redirects/index.html' depending on configuration
        // In static mode for endpoint .ts, it usually outputs 'redirects' (no extension) or 'redirects.html'
        // Let's check for 'redirects' first
        const src = path.join(distDir, 'redirects');
        const dest = path.join(distDir, '_redirects');
        try {
          await fs.rename(src, dest);
          console.log('Successfully renamed redirects to _redirects');
        } catch (e) {
          // If not found, try redirects.html (less likely for GET endpoint returning plain text but possible)
           try {
             const srcHtml = path.join(distDir, 'redirects.html');
             await fs.rename(srcHtml, dest);
             console.log('Successfully renamed redirects.html to _redirects');
           } catch(e2) {
             console.warn('Could not find redirects file to rename. Build might be missing it.', e.message);
           }
        }
      }
    }
  }, sitemap()]
});