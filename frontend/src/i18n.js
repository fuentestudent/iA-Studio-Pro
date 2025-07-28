import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar tus archivos de traducción
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

i18n
  .use(initReactI18next) // Pasa i18n a react-i18next
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      es: {
        translation: translationES,
      },
    },
    lng: 'es', // Idioma predeterminado
    fallbackLng: 'en', // Idioma de respaldo

    interpolation: {
      escapeValue: false, // React ya escapa los valores para prevenir XSS
    },
  });

export default i18n;