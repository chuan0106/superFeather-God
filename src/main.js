import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'
import toast from './components/common/toast'
// 安装toast 插件 自己的插件
Vue.use(toast)
// 使用懒加载插件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // 占位图
  loading: require('./assets/img/tabbar/羽神2.jpg')
})

// 解决移动端300毫秒延迟
FastClick.attach(document.body)

Vue.config.productionTip = false
// 事件总线 new 一个 Vue 实例
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
