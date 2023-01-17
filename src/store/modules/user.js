import { defineStore } from 'pinia';
import { getLanguage } from '@/lang/index'
import Cookies from "js-cookie";

export const useAppStore = defineStore('lang', {
  state: () => {
    return {
      language: getLanguage(),
    }
  },
  actions: {
    SET_LOCALE(locale) { //语言切换
      this.language = locale
      Cookies.set('lang', locale)
    }
  }
})