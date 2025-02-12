import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router"
import NProgress from "nprogress"
import DemoPage from "@/views/DemoPage.vue"
import NotFound from "@/components/NotFound.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Main",
    component: DemoPage,
    props: { msg: "vue-web-template" }
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound
  },
  {
    path: "/:pathMatch(.*)*", // 页面不存在的情况下会跳到404页面
    redirect: "/404"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((_to, _from, next) => {
  // 开启进度条
  NProgress.start()
  // 获取Token
  // if(to.path != '/'){
  //     let isLogin = sessionStorage.getItem('securityToken');
  //     if (isLogin) {
  //         //如果用户信息存在则往下执行。
  //         next()
  //     } else {
  //         //如果用户token不存在拦截跳转
  //         return
  //     }
  // }
  next()
})

// 页面路由切换完毕的时候
router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})

export default router
