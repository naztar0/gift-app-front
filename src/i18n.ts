import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18NextHttpBackend from 'i18next-http-backend';


i18n
  .use(initReactI18next)
  .use(I18NextHttpBackend)
  .init({
    interpolation: { escapeValue: false },
    supportedLngs: ['en', 'ru'],
    debug: true,
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;