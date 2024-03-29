// 混入的 js  混合（Mixin）是一种将一组属性从一个规则集包含（或混入）到另一个规则集的方法
import { debounce } from 'common/utlis'; // 防抖
import BackTop from 'components/content/backTop/BackTop.vue'; // 返回顶部

// 组件之间相同方法 可以通过混入
export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null,
      // 另一种方法 定义个refresh 空的值
      refresh: null
    }
  },
  mounted () {
    this.refresh = debounce(this.$refs.scroll.refresh, 1000);
    // let refresh = debounce(this.$refs.scroll.refresh, 1000);
    // 这样的话混入的组件都有这个属性了  也就是说就防止例如:   this.name='xc 需要被创建多次的话
    this.itemImgListener = () => {
      this.refresh();
      // refresh();
    };
    this.$bus.$on('itemImageLoad', this.itemImgListener);
    // console.log('我是混入的内容');
  },
}

export const backTopMixin = {

  components: {
    BackTop
  },
  data () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick () {
      // console.log('哈哈');
      // 父访问子 拿到 ref="scroll" 里面的 scroll
      // this.$refs.scroll.scroll.scrollTo(0, 0, 300);\
      this.$refs.scroll.scrollTo(0, 0); // 调用的是 scroll 的方法 scrollTO
    },
    listenShoBackTop (position) {
      this.isShowBackTop = -position.y > 1000;
    }
  },
}