// @ts-check
import {defineConfig} from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://GwenDevPerso.github.io',
  base: '/AstroPortfolio',
  output: 'static',
  build: {
    assets: 'assets'
  }
});
