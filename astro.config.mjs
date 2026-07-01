import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ai-night.study',
  devToolbar: {
    enabled: false,
  },
  build: {
    format: 'directory',
  },
});
