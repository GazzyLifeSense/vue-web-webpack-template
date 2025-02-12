import { App, unref } from 'vue';
import { I18n, I18nOptions, createI18n } from 'vue-i18n';
import { useConfigOptionStore } from '@/store/configOption.ts';
import en_gb_Locale from './lang/en-gb';
import de_de_Locale from './lang/de-de';
import en_us_Locale from './lang/en-us';
import es_us_Locale from './lang/es-us';
import ko_kr_Locale from './lang/ko-kr';
import zh_cn_Locale from './lang/zh-cn';
import zh_tw_Locale from './lang/zh-tw';
import ja_jp_Locale from './lang/ja-jp';
import fr_fr_Locale from './lang/fr-fr';

const loadLocalePool: string[] = [];

// 语言字典
export const localeMap: { [key: string]: string } = {
  en: 'en-us',
  gb: 'en-gb',
  es: 'es-us',
  de: 'de-de',
  fr: 'fr-fr',
  zh: 'zh-cn',
  tw: 'zh-tw',
  ko: 'ko-kr',
  ja: 'ja-jp',
};

export interface LocaleSetting {
  // 当前语言
  locale: string;
  // 默认语言
  fallback: string;
  // 有效语言
  availableLocales: string[];
}

export const localeSetting: LocaleSetting = {
  // 默认语言
  locale: localeMap['en'] ,
  // 兜底语言
  fallback: localeMap['en'],
  // 有效语言
  availableLocales: Object.values(localeMap),
};

// 语言文件
export const localeObj: { [key: string]: typeof en_us_Locale } = {
  // 英语
  'en-us': en_us_Locale, // 英语-美国
  'en-gb': en_gb_Locale, // 英语-英国
  // 法语
  'fr-fr': fr_fr_Locale, // 法语-法国
  // 中文
  'zh-cn': zh_cn_Locale, // 中文-大陆
  'zh-tw': zh_tw_Locale, // 中文-台湾
  // 西班牙语
  'es-us': es_us_Locale, // 西班牙语-美国
  // 其他
  'de-de': de_de_Locale, // 德语-德国
  'ko-kr': ko_kr_Locale, // 韩语-韩国
  'ja-jp': ja_jp_Locale, // 日语-日本
}

export let i18n: I18n;

// ①
export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options) as I18n;
  app.use(i18n);
}

// ②
async function createI18nOptions(): Promise<I18nOptions> {
  const configOptionStore = useConfigOptionStore();

  // 获取浏览器语言
  const browserLanguage: string = navigator.language.toLowerCase();
  // 确定目标语言  已选择语言 > 浏览器语言 > 默认语言
  const locales: (string | null)[] = [ configOptionStore.language, browserLanguage, localeSetting.locale ];
  // 获取可用目标语言翻译
  let targetLocale = ''
  let targetLocaleObj
  for(let i = 0; i < locales.length; i++){
    targetLocale = locales[i] || ''
    targetLocaleObj = localeObj[targetLocale];
    if(targetLocaleObj) break
  }
  const message = targetLocaleObj?.message ?? {};
  loadLocalePool.push(targetLocale);

  console.log(browserLanguage, targetLocale, targetLocale, message, loadLocalePool)

  return {
    legacy: false,
    locale: targetLocale,
    fallbackLocale: localeSetting.fallback,
    messages: {
      [targetLocale]: message,
    },
    availableLocales: localeSetting.availableLocales,
    sync: true, // 如果不想从全局作用域继承区域设置，则需要将组件选项的sync设置为false.
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

// 改变语言配置
export async function changeLocale(locale: string) {
  const configOptionStore = useConfigOptionStore();
  configOptionStore.saveLanguage(locale)

  // 获取当前语言
  const globalI18n = i18n.global;
  const currentLocale = unref(globalI18n.locale);
  // 当前语言与目标语言相同，不更改
  if (currentLocale === locale) {
    return locale;
  }

  // 目标语言未加载，获取目标语言文件，设置并缓存
  if (!loadLocalePool.includes(locale)) {
    const getLocale = await localeObj[locale];
    const message = getLocale?.message ?? {};
    globalI18n.setLocaleMessage(locale, message);
    loadLocalePool.push(locale);
  }

  // 目标语言已加载，直接设置
  {(i18n.global.locale as { value: string }).value = locale;}
  return locale;
}