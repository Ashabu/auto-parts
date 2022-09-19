import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import english from './english.json';
import georgian from './georgian.json';
import russian from './russian.json';



i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    resources: {
        en: english,
        ru: russian,
        ka: georgian
    },
    react: {
        useSuspense: false
    }
});

export default i18next;
