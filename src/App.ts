import { createApp } from "vue"
import App from "@/App.vue"

// style sheet
import "./design/ele.less"
import "../style.less"
import "animate.css"
// import "tailwindcss/index.css" // 引入tailwindcss

// progress bar
import "nprogress/nprogress.css"

// router
import router from "@/route"

// pinia
import { createPinia } from "pinia"

// i18n
import { setupI18n } from "./locales/setupI18n"

const pinia = createPinia()
const MainApp = createApp(App)
MainApp.use(router)
MainApp.use(pinia)
setupI18n(MainApp)
MainApp.provide("piniaInstance", pinia)
MainApp.mount("#app")
