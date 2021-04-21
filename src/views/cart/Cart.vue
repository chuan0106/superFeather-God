<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
      <!-- <div slot="center">购物车({{ cartLength }})</div> -->
    </nav-bar>
    <!-- 商品列表 -->
    <cartlist class="cart-list"></cartlist>
    <!-- 底部汇总 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import NavBar from 'components/common/navbar/NavBar.vue';

import Cartlist from './childComps/Cartlist.vue';
export default {
  name: 'Cart',
  components: {
    NavBar,
    Cartlist,
  },
  computed: {
    // getters 转成计算属性
    // 两种语法
    // ...mapGetters(['cartLength']),
    ...mapGetters({
      length: 'cartLength',
    }),

    // cartLength() {
    //   return this.$store.getters.cartLength;
    // },
  },
};
</script>

<style lang="less" scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  // 加粗
  font-weight: 700;
}
</style>
