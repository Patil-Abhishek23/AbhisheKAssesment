// filepath: c:\Users\abpatil\Desktop\Login Page - Copy\my-app\src\i18n\i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locals/en/commom.json';
import es from '../locals/es/commom.json';

i18n
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    fallbackLng: 'en', 
    debug: true, 
    resources: {
      en: {
        translation: en, 
      },
      es: {
        translation: es, 
      },
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'], 
    },
    react: {
      useSuspense: true, 
    },
  });

export default i18n;