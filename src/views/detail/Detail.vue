<template>
  <div id="detail">
    <detail-nav-bar
      ref="navBar"
      class="detail-nav"
      @titleClick="titleClick"
    ></detail-nav-bar>
    <scroll
      @scroll="contentScroll"
      ref="scroll"
      class="content"
      :probe-type="3"
      :pull-up-load="true"
      :observeDOM="true"
      :observeImage="true"
    >
      <!-- 属性:topImages 传入值t op-images-->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="Shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue';

import DetailNavBar from './childComps/DetailNavBar.vue';
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailParamInfo from './childComps/DetailParamInfo.vue';
import DetailCommentInfo from './childComps/DetailCommentInfo.vue';

import GoodsList from 'components/content/goods/GoodsList.vue';

import { debounce } from 'common/utlis'; // 防抖

// mixin 引入
import { itemListenerMixin } from 'common/mixin';

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from 'network/detail';
export default {
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
  },
  name: 'Detail',
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      Shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // itemImgListener: null,
      themTopYs: [],
      getThemTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    // 1.保存存入的iid
    // console.log(this.$route.params);
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 1.获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息的对象
      this.Shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.保存评论信息
      // 因为并不是所有商品都有评论信息 所以做个判断
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3.请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    // 4.给getThemTopY 赋值(对给 this.themTopYs 赋值的操作进行防抖)
    this.getThemTopY = debounce(() => {
      this.themTopYs = [];
      this.themTopYs.push(0);
      // 因为顶上的 NavBar 占用了44px
      this.themTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themTopYs.push(Number.MAX_VALUE);
      console.log(this.themTopYs);
    }, 100);
    // 第一次获取 值不对
    // 原因:this.$refs.params.$el 压根没有渲染
    // this.themTopYs = [];
    // this.themTopYs.push(0);
    // this.themTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themTopYs);

    this.$nextTick(() => {
      // 第二次获取:值不对
      // 原因:图片没有计算在内
      // 根据最新的数据 对应的Dom是已经被渲染出来了
      // 但是图片依然没有加载完(目前获取到offsetTop是不包含图片的)
      // offsetTop值不对的时候 都是因为图片的问题
      // this.themTopYs = [];
      // this.themTopYs.push(0);
      // this.themTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themTopYs);
    });
  },
  methods: {
    imageLoad() {
      // 第一种 判断
      // this.$refs.scroll.refresh();
      // 另一种 在混入里添加里 refresh
      this.refresh();
      // 点击到对应位置进行防抖
      this.getThemTopY();
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themTopYs[index], 300);
    },
    contentScroll(position) {
      // 获取Y值
      const positionY = -position.y;
      // console.log(position);
      // 2.positonY和主体中值进行对比
      // [0, 7911, 8546, 8857,特别大的值]
      // console.log(Number.MAX_VALUE);

      let length = this.themTopYs.length;
      // 数据里有个最大值 只是为了做判断的 所以要将它减掉
      // 如果用第一种方法的话不能减
      for (let i = 0; i < length - 1; i++) {
        // 这样只能判断到 第三个数组 因为 i+1
        // if (
        // positionY > this.themTopYs[i] &&
        // positionY < this.themTopYs[i + 1]
        // ) {
        //   console.log(i);
        // }
        // 自己读读吧 套他猴子 那么长的判断
        // if (
        //   this.currentIndex !== i &&
        //   ((i < length - 1 &&
        //     positionY >= this.themTopYs[i] &&
        //     positionY <= this.themTopYs[i + 1]) ||
        //     (i === length - 1 && positionY > this.themTopYs[i]))
        // ) {
        //   this.currentIndex = i;
        //   console.log(this.currentIndex);
        //   this.$refs.navBar.currentIndex = this.currentIndex;
        // }
        if (
          this.currentIndex !== i &&
          positionY >= this.themTopYs[i] &&
          positionY < this.themTopYs[i + 1]
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.navBar.currentIndex = this.currentIndex;
        }
      }
    },
  },
  mounted() {
    // let refresh = debounce(this.$refs.scroll.refresh, 1000);
    // this.itemImgListener = () => {
    //   refresh();
    // };
    // this.$bus.$on('itemImageLoad', this.itemImgListener);
    // mounted 这时 子组件有可能还没加载完成
  },
  updated() {
    // 组件完成之后
    //  可以保证这里一定是有值的 只要有数据发生变化就会更新  就会导致多次调用
    // 每次都让这个数组为[]
    // this.themTopYs = [];
    // this.themTopYs.push(0);
    // this.themTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themTopYs);
  },
  destroyed() {
    // 取消事件总线的方法 第二个参数是一个函数
    this.$bus.$off('itemImageLoad', this.itemImgListener);
    // console.log('走了哈');
  },
};
</script>

<style lang="less" scoped>
#detail {
  // 因为app 已经判断将 nav bar 隐藏了
  // position: relative;
  // z-index: 9;
  // background: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>
