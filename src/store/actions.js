import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  addCart(context, payload) {
    console.log(context);
    // payload 新添加的商品
    // 判断商品是否已经添加
    console.log(payload);
    // let oldProduct = null
    // for (const item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    // 1.查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid == payload.iid)
    // 2.判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1
      // 看似是多加了一步 mutations 可以做跟踪 Vuex插件那个
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      // 如果上面那个为空 就创建一个 count 属性 并且等于1
      payload.count = 1  // 数组属性 统计数组元素个数
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}