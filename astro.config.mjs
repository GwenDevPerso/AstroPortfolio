// @ts-check
import {defineConfig} from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://gwenaelbihan.com',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  build: {
    assets: 'assets'
  }
});
