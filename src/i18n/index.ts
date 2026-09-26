import type { Locale } from './locales';
import { fr, type Dictionary } from './dictionaries/fr';
import { en } from './dictionaries/en';
import { es } from './dictionaries/es';

const dictionaries: Record<Locale, Dictionary> = { fr, en, es };

export function useTranslations(lang: Locale): Dictionary {
    return dictionaries[lang];
}

export type { Dictionary };
export * from './locales';
