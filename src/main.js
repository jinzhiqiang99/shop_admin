import Vue from 'vue'
import App from './App.vue'

// 引入路由实例
import router from './router'

// 引入element相关
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入公共的样式
import './assets/common.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  // 将路由实例挂载到vue实例上
  router,
  render: h => h(App)
}).$mount('#app')
