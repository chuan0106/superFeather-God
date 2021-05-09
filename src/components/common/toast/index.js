import Toast from './Toast.vue'
const obj = {}
obj.install = function (Vue) {
  // Vue.extend(trn)
  // console.log('执行了obj函数', Vue);
  // console.log(Toast.$el);  // 没有 空的
  // document.body.appendChild(Toast.$el)

  // 1.创建组件构造器
  const ToastConstructor = Vue.extend(Toast)
  // 2. new 的方式 很久组件构造器 可以创建出来一个组件对象
  const toast = new ToastConstructor()

  // 3.组件对象 手动挂在到某个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el 对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast

}
export default obj