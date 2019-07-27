import Vue from 'vue'
import App from './App.vue'

// 引入路由实例
import router from './router'

Vue.config.productionTip = false

new Vue({
  // 将路由实例挂载到vue实例上
  router,
  render: h => h(App)
}).$mount('#app')
