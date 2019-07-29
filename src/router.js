// 引入vue
import Vue from 'vue'
// 引入router
import VueRouter from 'vue-router'

// 引入组件
import Login from './components/login/Login.vue'
import Home from './components/home/Home.vue'
import Users from './components/users/Users.vue'
import Rights from './components/rights/Rights.vue'
import Roles from './components/roles/Roles.vue'

// 路由模块化后需要使用vue安装
Vue.use(VueRouter)

// 创建路由对象
const router = new VueRouter({
  // 配置路由规则
  routes: [
    // 重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles }
      ]
    }
  ]
})

// 全局路由守卫 登录拦截
router.beforeEach((to, form, next) => {
  // 访问的是登录页
  if (to.path === '/login') {
    next()
    // 访问的不是登录页
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})

// 挂载
export default router
