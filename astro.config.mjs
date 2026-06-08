// @ts-check
import UnoCSS from '@unocss/astro';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS()],
});
