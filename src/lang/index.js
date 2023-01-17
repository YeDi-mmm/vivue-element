import { createI18n } from 'vue-i18n'
import Cookies from "js-cookie";

import zhLocale from './zh'
import enLocale from './en'
import viLocale from './vi'
import idLocale from './id'
import thLocale from './th'
import msLocale from './ms'

// 语言库
const messages = {
  en: {
    ...enLocale,
  },
  zh: {
    ...zhLocale,
  },
  vi: {
    ...viLocale,
  },
  id: {
    ...idLocale,
  },
  ms: {
    ...msLocale
  },
  th: {
    ...thLocale,
  }
}

// 默认语言
export function getLanguage() {
  const chooseLanguage = Cookies.get('lang')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getLanguage(),		//默认显示的语言 
  fallbackLocale: 'en', // 预设的语言环境
  silentTranslationWarn: true, // 禁止本地化失败警告
  // set locale messages
  messages
})

export default i18n; // 将i18n暴露出去，在main.js中引入挂载

// ElementPlus 语言包配置
import zh from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import th from 'element-plus/lib/locale/lang/th'
import vi from 'element-plus/lib/locale/lang/vi'
import id from 'element-plus/lib/locale/lang/id'

export function langElementPlus(lang) {
  const status = new Map([
    ['zh', zh],
    ['en', en],
    ['vi', th],
    ['id', vi],
    ['th', id]
  ])

  return status.get(lang)
}