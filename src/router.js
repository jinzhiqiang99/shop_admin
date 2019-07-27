// 引入vue
import Vue from 'vue'
// 引入router
import VueRouter from 'vue-router'

// 引入组件
import Login from './components/login/Login.vue'
import Home from './components/home/Home.vue'

// 路由模块化后需要使用vue安装
Vue.use(VueRouter)

// 创建路由对象
const router = new VueRouter({
  // 配置路由规则
  routes: [
    // 重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})

// 挂载
export default router
