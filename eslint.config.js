const globals = require("globals")
const pluginJs = require("@eslint/js")
const tseslint = require("typescript-eslint")
const pluginVue = require("eslint-plugin-vue")

/*
 * 项目引入eslint：pnpm create @eslint/config
 * 安装vscode插件：eslint(若未符合规则但没有提示，考虑切换eslint vscode插件版本)
 */
/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  // specifying globals in browser environment
  {
    files: ["src/**/*"],
    languageOptions: { globals: globals.browser }
  },
  // apply recommended rules to JS files
  {
    name: "js/recommended-rules",
    files: ["**/*.js"],
    plugins: [pluginJs.configs.recommended]
  },
  // apply recommended rules to TS files
  {
    files: ["**/*.ts"],
    ...tseslint.configs.recommended
  },
  // apply recommended rules to VUE files
  {
    files: ["**/*.vue"],
    ...pluginVue.configs["flat/essential"],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  },
  // override rules
  {
    files: ["src/**/*.{js,mjs,cjs,ts,vue}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      semi: "off",
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": "off",
      "no-duplicate-imports": "error",
      "no-irregular-whitespace": "off"
    }
  }
]
