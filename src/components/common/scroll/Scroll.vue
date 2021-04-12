<template>
  <!-- 父访问子 需要在子组件 ref wrapper -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <!-- 需要做滚动的元素 -->
      <slot></slot>
    </div>
  </div>
</template>
<script>
// // 直接使用这个插件存在着未知的危险 所以进一步封装
import BetterScroll from '@better-scroll/core';
import PullUp from '@better-scroll/pull-up';
import ObserveDOM from '@better-scroll/observe-dom';
import ObserveImage from '@better-scroll/observe-image';
BetterScroll.use(PullUp);
BetterScroll.use(ObserveDOM);
BetterScroll.use(ObserveImage);
export default {
  name: 'scroll',
  props: {
    // 因为不是所有滚动都要设置为这些属性的
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    observeDOM: {
      type: Boolean,
      default: false,
    },
    observeImage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 最好用个变量接受 因为不确定 在组件创建好执行生命周期函数的时候  是否保留下来
      scroll: null,
      message: '哈哈哈',
    };
  },
  mounted() {
    // 组件被挂载 所以可以拿到了

    // console.log(this.$refs.wrapper);
    // this.$refs.wrapper 明确拿到某个元素 即使外面有一万个 class="wrapper"
    // 1.创建BScroll 对象
    this.scroll = new BetterScroll(this.$refs.wrapper, {
      click: true,
      pullUpLoad: this.pullUpLoad, // 上拉
      probeType: this.probeType, // 实时监听
      observeDOM: this.observeDOM,
      observeImage: this.observeImage,
    });
    // console.log(this.scroll);
    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        // 不是所有滚动都需要监听 通过自定义事件传出去
        this.$emit('scroll', position);
      });
    }
    // 3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多');
        this.$emit('pullingUp');
        // this.scroll.finishPullUp(); // 默认执行一次 这样可执行多次
      });
    }
  },
  methods: {
    // 封装个函数 点击返回顶部
    // es6 可以使用默认值 如果不传 就是300
    //  this.scroll && 逻辑与 有值的情况下执行
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 可以连续下拉加载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      // console.log('111');
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      // 三元运算符
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style lang="less" scoped></style>
