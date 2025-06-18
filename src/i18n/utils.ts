import {defaultLang, showDefaultLang, ui} from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function getRouteFromUrl(url: URL): string | undefined {
  const base = import.meta.env.BASE_URL;
  const pathname = url.pathname;
  const pathWithoutBase = pathname.startsWith(base) ? pathname.substring(base.length) : pathname;
  const parts = pathWithoutBase.split('/').filter(p => p);

  if (parts.length === 0) {
    return '/';
  }

  const langCandidate = parts[0];
  let lang: keyof typeof ui;
  let routePart: string | undefined;

  if (langCandidate in ui) {
    lang = langCandidate as keyof typeof ui;
    routePart = parts[1];
    if (!routePart) {
      return '/';
    }
  } else {
    lang = defaultLang;
    routePart = parts[0];
  }

  const routes = ui[lang].routes as { [key: string]: string };
  if (routes) {
      for (const [canonical, translated] of Object.entries(routes)) {
        if (translated === routePart) {
          return canonical;
        }
      }
  }

  return undefined;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) {
    const keys = key.split('.');
    let value: any = ui[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        // Fallback to default language
        let fallbackValue: any = ui[defaultLang];
        for (const fk of keys) {
          if (fallbackValue && typeof fallbackValue === 'object') {
            fallbackValue = fallbackValue[fk];
          } else {
            return key;
          }
        }
        return fallbackValue || key;
      }
    }
    
    return value || key;
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  const base = import.meta.env.BASE_URL;
  return function translatePath(path: string, l: string = lang) {
    let pathName = path;
    if (pathName.startsWith('/')) {
      pathName = pathName.slice(1);
    }
    if (pathName.endsWith('/')) {
      pathName = pathName.slice(0, -1);
    }
    const langKey = l as keyof typeof ui;
    const routes = ui[langKey].routes as { [key: string]: string } | undefined;

    const hasTranslation =
      defaultLang !== langKey &&
      routes &&
      routes[pathName];
    const translatedPath = hasTranslation
      ? '/' + routes[pathName]
      : path;

    const langPath = !showDefaultLang && l === defaultLang ? '' : `/${l}`;
    const finalPath = `${base}${langPath}${translatedPath}`;
    
    return finalPath.replaceAll('//', '/');
  };
} 