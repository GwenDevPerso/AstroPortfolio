import { getRelativeLocaleUrl } from 'astro:i18n';

export const locales = ['fr', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export const localeLabels: Record<Locale, string> = {
    fr: 'Français',
    en: 'English',
    es: 'Español',
};

export const ogLocales: Record<Locale, string> = {
    fr: 'fr_FR',
    en: 'en_US',
    es: 'es_ES',
};

export function isLocale(value: unknown): value is Locale {
    return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/** Resolves the current locale, falling back to the default one. */
export function toLocale(value: unknown): Locale {
    return isLocale(value) ? value : defaultLocale;
}

/** Value of the `[...locale]` route param: the default locale lives at the root. */
export function localeParam(lang: Locale): string | undefined {
    return lang === defaultLocale ? undefined : lang;
}

/** `getStaticPaths` entries for every locale. */
export function localeStaticPaths() {
    return locales.map((lang) => ({ params: { locale: localeParam(lang) }, props: { lang } }));
}

/** Builds a localized URL, e.g. `localizedPath('es', 'project/3')` → `/es/project/3/`. */
export function localizedPath(lang: Locale, path = ''): string {
    return getRelativeLocaleUrl(lang, path);
}
