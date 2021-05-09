<template>
  <div class="cart-list">
    <scroll
      class="content"
      :probe-type="2"
      :pull-up-load="true"
      :observeDOM="true"
      :observeImage="true"
      ref="scroll"
    >
      <cart-list-item
        v-for="item in cartList"
        :key="item.id"
        :item-info="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Scroll from 'components/common/scroll/Scroll.vue';
import CartListItem from './CartListItem.vue';

export default {
  name: 'Cartlist',
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(['cartList']),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style lang="less" scoped>
.cart-list {
  // height: calc(100% - 44px -49px);
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;

  overflow: hidden;
  // height: 100%;
  // overflow: hidden;
  // position: relative;
  // bottom: 49px;
}
</style>
