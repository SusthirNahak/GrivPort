
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


const resources = {
  en: {
    translation: {
      Enter_Location_Details: 'Enter Location Details',
      description: 'This is an English description.'
    }
  },
  od: {
    translation: {
      Enter_Location_Details: 'ଅବସ୍ଥାନ ବିବରଣୀ ପ୍ରବେଶ କରନ୍ତୁ |',
      description: 'ଏହା ଏକ ଓଡ଼ିଆ ବିବରଣୀ ଅଟେ।'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
