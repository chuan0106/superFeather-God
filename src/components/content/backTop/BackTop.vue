<template>
  <div class="back-top">
    <!-- <img src="~assets/img/common/top.png" alt="" /> -->
    <img src="~assets/img/tabbar/羽神3.jpg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  methods: {
    backClick() {
      // console.log('回到顶部');
      // 子传父
      // this.$emit('backClick');
    },
  },
};
</script>

<style lang="less" scoped>
.back-top {
  position: fixed;
  right: 8px;
  bottom: 50px;
}
.back-top img {
  border-radius: 50%;
  width: 44px;
  height: 44px;
}
</style>
