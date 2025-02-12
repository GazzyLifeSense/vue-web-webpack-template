import { defineStore } from 'pinia';

export const useConfigOptionStore = defineStore('configOptionStore', {
  state: () => {
    return {
      // 用户设置语言，默认为空，由程序自主判断当前语言
      language: localStorage.getItem("language"),
    };
  },
  actions: {
    saveLanguage(locale: string){
      this.language = locale;
      localStorage.setItem("language", locale)
    }
  },
});