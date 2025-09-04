/* @ts-check */
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:3000',
  trailingSlash: 'never',
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.kavia.ai'],
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});
