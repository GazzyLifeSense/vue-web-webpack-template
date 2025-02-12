import request from '@/api'
import { ResponseType } from '@/types/request'

const UserLoginUrl = '/api/login',
    UserRegisterUrl = '/api/register',
    GetUserUrl = '/api/verifyAndGetUser'

// 登录
function userLogin(user: {username: string, password: string}){
    return new Promise(resolve=>{
        request.post(UserLoginUrl, user).then((resp: ResponseType)=>{
            if(resp.code === 200) {
                // 存储token
                sessionStorage.setItem("securityToken", JSON.stringify(resp.data).replaceAll("\"", ""))
            }
            resolve(resp)
        })
    })
}

// 注册
function userRegister(user: {nickname: string, username: string, password: string}){
    return request.post(UserRegisterUrl, user)
}

// 获取用户信息
function getUserAPI(){
    return request.post(GetUserUrl)
}

export { 
    userLogin, 
    userRegister, 
    getUserAPI, 
}