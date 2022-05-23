import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import * as en from './locales/en.json'
import * as sk from './locales/sk.json'
import * as cs from './locales/cs.json'

i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    debug: true,
    resources: {
      en: en.default,
      sk: sk.default,
      cs: cs.default
    },
    lng: 'sk',
    fallbackLng: 'sk',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
