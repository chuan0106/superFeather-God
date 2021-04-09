<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 所有的item 都展示图一个图片 同一个文字 -->
    <!-- <img src="../../assets/img/tabbar/羽神1.jpg" alt="" />
    <div>首页</div> -->
    <slot v-if="!isActive" name="item-icon" @click="itemClick"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="activeStyle">
      <!-- 因为这个 slot 被替换掉了 所以需要个div包裹一下 -->
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red',
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      // home => item(/home) = true
      // home => item(/category) = true
      // home => item(/profile) = true
      // home => item(/cart) = true
      return this.$route.path.indexOf(this.path) !== -1; // 做个判断
      // 使用computer 是因为监听到path 的变化 会触发函数的助兴 是 class 实现
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  }, // 计算属性
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch((err) => err); // 跳转
    },
  },
};
</script>

<style lang="less" scoped>
.tab-bar-item {
  height: 49px;
  text-align: center;
  flex: 1;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle; // 图片默认会有三像素 这里取消
  margin-bottom: 2px;
}
</style>
