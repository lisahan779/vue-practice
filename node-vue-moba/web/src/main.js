import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss' //全局使用样式
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper' //轮播图
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */ )

import Card from './components/Card.vue' //导入公共组件
Vue.component('m-card', Card)

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)

import axios from 'axios'
Vue.prototype.$http = axios.create({
    // 生产环境
    // baseURL: process.env.VUE_APP_API_URL || '/web/api'
    baseURL: 'http://localhost:3000/web/api'
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')