// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://gwenaelbihan.fr',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  build: {
    assets: 'assets'
  },
  i18n: {
    locales: ['fr', 'en', 'es'],
    defaultLocale: 'fr',
    routing: {
      prefixDefaultLocale: false
    }
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Archivo',
      cssVariable: '--font-sans',
      weights: [400, 500, 600, 700],
      fallbacks: ['Helvetica', 'Arial', 'sans-serif']
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      weights: [400, 500],
      fallbacks: ['ui-monospace', 'monospace']
    }
  ],
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en-US', es: 'es-ES' }
      }
    })
  ]
});
