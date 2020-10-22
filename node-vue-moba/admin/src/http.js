import axios from 'axios'
import Vue from 'vue'
import router from './router'
// axios封装
const http = axios.create({
        // baseURL: process.env.VUE_APP_API_URL || '/admin/api', // daobai 生产环境  process.env环境变量 VUE_APP_API_URL真正的接口地址
        baseURL: 'http://localhost:3000/admin/api', //开发环境
        timeout: 10000,
    })
    // 请求拦截与响应拦截
http.interceptors.request.use(function(config) {
    // Do something before request is sent
    // 服务端校携带token访问请求的接口内容 
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});
http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {

        Vue.prototype.$message({
                type: 'error',
                message: err.response.data.message
            })
            // 服务端返回401（ token不存在）， 或者token过期(状态500) 跳转到登录 前端处理跳转到登录页面
        if (err.response.status === 401 || err.response.status === 500) {
            router.push('/login')
        }
    }

    return Promise.reject(err)
})

export default http