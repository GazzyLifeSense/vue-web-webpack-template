import antdLocale from "ant-design-vue/es/locale/es_ES"

// 使用 require.context 同步加载所有 JSON 文件
const context = require.context("./es-us", true, /\.json$/)

const languages: { [key: string]: unknown } = {}
context.keys().forEach(key => {
  // 提取文件名作为语言标识（例如：en.json -> 'en'）
  const fileName = key.replace("./", "").replace(".json", "")
  // 同步加载文件内容
  languages[fileName] = context(key)
})

export default {
  message: {
    ...languages,
    antdLocale
  },
  dateLocale: null,
  dateLocaleName: "es-us"
}
