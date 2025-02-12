import { ResponseType } from '@/types/request'
import axios from 'axios'
import NProgress from 'nprogress'

// request拦截器设置
axios.interceptors.request.use(
    (config) => {
        // 附带token
        config.headers['token'] = sessionStorage.getItem('securityToken')
        // 开启进度条
        NProgress.start();
        return config
    },
    (error) =>{
        NProgress.done()
        // TODO UI
        console.error("请检查网络~")
        Promise.reject(error)
    }
)
// response拦截器
axios.interceptors.response.use(
    (response: ResponseType) =>{
        NProgress.done()
        console.log(response)
        return response.data || {};
    },
    (err) => {
        NProgress.done()
        // TODO UI
        console.error("服务器内部问题~",err)
        Promise.reject({ code: err?.response?.status || -1, msg: err?.response?.statusText || 'unknown error'})
    }
)
export default axios