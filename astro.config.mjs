import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { verifyPublicAssets } from './scripts/verify-public-assets.mjs';

export default defineConfig({
  site: 'https://ai-night.study',
  integrations: [{
    name: 'publishable-asset-safety',
    hooks: {
      'astro:build:start': async () => {
        await verifyPublicAssets(fileURLToPath(new URL('./public/', import.meta.url)));
      },
      'astro:build:done': async ({ dir }) => {
        await verifyPublicAssets(fileURLToPath(dir));
      },
    },
  }],
  devToolbar: {
    enabled: false,
  },
  build: {
    format: 'directory',
  },
});
