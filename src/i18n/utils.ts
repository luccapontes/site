import pt from './pt.json';
import en from './en.json';

export type Lang = 'pt' | 'en';

const translations = { pt, en };

export function getLang(): Lang {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('lang') as Lang;
    if (saved === 'pt' || saved === 'en') return saved;
  }
  if (typeof navigator !== 'undefined') {
    const lang = navigator.language?.toLowerCase();
    return lang?.startsWith('pt') ? 'pt' : 'en';
  }
  return 'pt';
}

export function setLang(lang: Lang) {
  localStorage.setItem('lang', lang);
  window.location.reload();
}

export function t(key: string, lang: Lang): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value ?? key;
}
