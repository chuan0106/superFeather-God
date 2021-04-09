import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
// 事件总线 new 一个 Vue 实例
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
