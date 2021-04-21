export default {
  cartLength(state) {
    // 数组商品的长度
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  }
}