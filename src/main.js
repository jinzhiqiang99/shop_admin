import Vue from 'vue'
import App from './App.vue'

// 引入路由实例
import router from './router'

// 引入element相关
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入公共的样式
import './assets/common.css'

import axios from 'axios'
Vue.use(ElementUI)
Vue.config.productionTip = false
// 设置基准地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// Vue.config.productionTip = false
// 将axios挂载到原型上  以后的vue实例（组件）都可以通过this.$axios 使用axios了
Vue.prototype.$axios = axios

// 解决每次发请求都要携带token的问题
axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

new Vue({
  // 将路由实例挂载到vue实例上
  router,
  render: h => h(App)
}).$mount('#app')
