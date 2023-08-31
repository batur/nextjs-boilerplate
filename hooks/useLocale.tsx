import React, { createContext, useState, useContext, useEffect } from 'react';

import { cookies } from 'next/headers';

import i18n from 'i18n-js';

import { COOKIE_KEYS, LOCALES } from '@constants';

interface ReturnTypes {
  t: (scope: string, options?: Record<string, string | number>) => string;
  locale: string;
  locales: ReadonlyArray<{ code: string; name: string; flag: string }>;
  changeLocale: (localeParam: string) => void;
}

interface ProviderProps {
  children: React.ReactNode;
  initialLocale?: string;
}

const DEFAULT_LOCALE = LOCALES[0].code;

const LocaleContext = createContext({} as unknown as ReturnTypes);
const translationGetters = {
  en: require('@app/assets/locale/en.json'),
  tr: require('@app/assets/locale/tr.json'),
};

const cookieLanguage = (cookies().get(COOKIE_KEYS.LOCALE) ?? DEFAULT_LOCALE) as string;

export const LocaleProvider: React.FC<ProviderProps> = ({ children, initialLocale }) => {
  const [locale, setLocale] = useState<string>(initialLocale ?? cookieLanguage);

  i18n.translations = translationGetters;
  i18n.locale = locale;

  useEffect(() => {
    /**
     * TODO: check locale logic
     */
  }, [locale]);

  function changeLocale(localeParam: string): void {
    setLocale(localeParam);
    cookies().set(COOKIE_KEYS.LOCALE, localeParam);
  }

  return (
    <LocaleContext.Provider value={{ t: i18n.t, locale, locales: LOCALES, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export default function useLocale(): ReturnTypes {
  const context = useContext(LocaleContext);

  return context;
}
