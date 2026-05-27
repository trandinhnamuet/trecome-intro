'use client';
import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { i18nData, Lang, t as tFn, tArr as tArrFn } from './i18n';

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  tArr: (key: string) => string[];
}

const I18nContext = createContext<I18nContextType>({
  lang: 'vi',
  setLang: () => {},
  t: (k) => k,
  tArr: () => [],
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('vi');

  const value = useMemo(() => {
    const dict = i18nData[lang] || i18nData.vi;
    return {
      lang,
      setLang,
      t: (key: string) => tFn(dict, key),
      tArr: (key: string) => tArrFn(dict, key),
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
