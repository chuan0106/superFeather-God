<template>
  <!-- 整个首页唯一 比较合理 id home -->
  <!-- 底下的方法都是箭头函数 所以this 都是组件对象 -->
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!--  @tabClick= 接收子组件发送过来的数据  子传父-->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <!-- 添加滚动 -->
    <!-- :probe-type="3" 滚动设置为实时监听   @scroll="contentScroll"首页设置监听位置-->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      :observeDOM="true"
      :observeImage="true"
      @pullingUp="loadMore"
      @scroll="contentScroll"
    >
      <!-- 父访问子组件的 recommends 与 banners -->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <!--  @tabClick= 接收子组件发送过来的数据  子传父-->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <!-- 因为这个图片不需要放到滚动里 所以放到他并其的位置就行 -->
    <!-- <button></button><div></div>  这些原生组件可以监听 @click 那么组件可以吗-->
    <!-- v-show="true" 显示隐藏 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- ul>li{列表$}*100` -->
  </div>
</template>

<script>
// 导入的孩子组件

import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView.vue';
import FeatureView from './childComps/FeatureView.vue';

// 导入的公共组件
import NavBar from 'components/common/navbar/NavBar.vue';
import TabControl from 'components/content/tabControl/tabControl.vue';
import GoodList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backTop/BackTop.vue';

// 导入的方法组件

import { getHomeMultidata, getHomeGoods } from 'network/home'; // 用于对应接口的数据
// import { debounce } from 'common/utlis'; // 防抖
// mixin 引入
import { itemListenerMixin } from 'common/mixin';
export default {
  name: 'Home',
  components: {
    // 养成良好编程规范 尽量与上面的顺序一样
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      // result: null, // 定义个空的对象 以便接受数据
      banners: [], // 轮播图
      recommends: [], // 推荐
      // 数据模型
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 默认展示 pop
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      // 混入已经引过了
      // itemImgListener: null,
    };
  },
  created() {
    // 还没挂载dom元素拿不到很正常
    // 组件创建完毕 函数
    // 这里面主要写主要逻辑 ！！
    // 具体逻辑在 methods
    // 1. 请求多个数据
    this.getHomeMultidata(); // 然后在调用一下下面的函数 写 this 是在调 下面的
    // 2. 请求商品数据
    this.getHomeGoods('pop'); // 流行数据
    this.getHomeGoods('new'); // 新增数据  这个数据好像是没了  找不到
    this.getHomeGoods('sell'); // 精选数据
  },
  destroyed() {
    // 当我们点击其他页面回来的时候希望进行缓存
    console.log('home destroyed');
  },
  activated() {
    // console.log('activated');
    // 回到离开时的位置
    this.$refs.scroll.scrollTo(0, this.saveY);
    // 做一次刷新
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1.保存记录离开的位置
    this.saveY = this.$refs.scroll.getScrollY();
    // 2.取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener);
  },
  mounted() {
    // 加入了混入 mixin  这个所以用不到了
    // // 1. 事件监听item中图片加载完成
    // // 这一段代码其实可以不用 因为已经通过插件的问题解决了图片滚动的问题 留着也没有影响 下次看好知道这个是干什么的
    // // this.$refs.scroll.refresh 不要加小括号 不然相当于执行
    // const refresh = debounce(this.$refs.scroll.refresh, 500); // 这个局部变量不会被销毁 下面闭包有引用
    // // 对监听的事件进行保存
    // this.itemImgListener = () => {
    //   refresh();
    // };
    // this.$bus.$on('itemImageLoad', () => {
    //   // console.log(this.$refs.scroll.refresh);
    //   // console.log(this.$refs.scroll.scroll.refresh);
    //   // console.log('~~~~~~~~~~');
    //   // this.$refs.scroll && this.$refs.scroll.refresh();
    //   refresh();
    //   // 上面代码会执行30次 这个经过防抖 refresh() 直接执行这个就好了 原理自己看
    // });
  },

  computed: {
    showGoods() {
      // 这段代码 放到html页面上 可能会有点长 通过计算属性获取会更好 但也不是不可以
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      console.log(index);
      // switch 循环遍历查找 index 现在是0 也就是 pop  当发生点击的时候 改变对应的
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
      }
      // 两个 tabControl 保持同一个点击
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // console.log('哈哈');
      // 父访问子 拿到 ref="scroll" 里面的 scroll
      // this.$refs.scroll.scroll.scrollTo(0, 0, 300);\
      this.$refs.scroll.scrollTo(0, 0); // 调用的是 scroll 的方法 scrollTO
    },
    contentScroll(position) {
      // console.log(position);
      // position.y < 1000;
      // 返回顶部显示隐藏
      // 1.判断 BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 2.决定tabControl是否吸顶(position:fiex)

      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      // console.log('上拉加载更多');
      // currentType 是正在记录的那个
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // 2.获取tabControl的offsetTop
      // 所有的组件都有一个属性 $el:用于获取组件中的元素的
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关的方法
     */
    // 本身是在 created 在包装一层
    getHomeMultidata() {
      // getHomeMultidata 这个是方法名字  getHomeMultidata 下面那个才是引入进来的
      // 1. 请求多个数据
      getHomeMultidata().then((res) => {
        // console.log(res); // 这段代码执行完之后就没意义了 函数作用域
        // this.result = res; // 这个箭头函数的 this 指向的是 这个组件对象 把这个数据存在 result
        this.banners = res.data.banner.list; // 拿到数据的 banner
        this.recommends = res.data.recommend.list;
      }); //  因为这个函数getHomeMultiData 把 request 的返回值返回了 而他的返回值是 promise
    },
    getHomeGoods(type) {
      // 上拉请求完数据 动态请求下一页
      // goods[type] type 是下面的变量
      // console.log(this.goods);
      // console.log(this.goods['pop']); // 地下那个type 就是对应的数据
      let page = this.goods[type].page + 1; // js 中可以使用两种方法获取属性值 [] 个 . 语法都是可以的
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // res=> pop 前 30 条数据 page : 1
        // console.log(res.data.list);
        this.goods[type].list.push(...res.data.list); // 函数级作用于 这个数据存储到上面的 goods 中 这个是获取第一组数据
        // 之后页码也要加上 1 page +=1
        this.goods[type].page += 1;

        // 加载完调这个属性 可以连续下拉加载更多
        //  this.$refs.scroll && this.$refs.scroll.finishPullUp();  判断是否有数据
        this.$refs.scroll && this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style lang="less" scoped>
#home {
  // 对于对外边距的使用 官方推荐能用padding 就不要用 margin
  // padding-top: 44px;
  height: 100vh; // vh 视图高度 100
  // padding-bottom: 800px;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  // 这样会脱离文档流 盖住轮播图
  // 下次再出现滚动条的时候 把positon 取消掉看有没有用
  // 在使用浏览器原生滚动时 为了让导航 不跟随导航一起滚动
  // position: fixed;
  // left: 0;
  // right: 0;
  // top: 0;
  // // 被盖住了 给他提高层级
  // z-index: 9;
}

// 这个方法比较新 不太适合使用 换成 offsetTop
.tab-control {
  position: relative;
  // top: 44px;
  z-index: 9;
  //   //   设置position:sticky同时给一个(top,bottom,right,left)之一即可
  //   // 使用条件：
  //   // 1、父元素不能overflow:hidden或者overflow:auto属性。
  //   // 2、必须指定top、bottom、left、right4个值之一，否则只会处于相对定位
  //   // 3、父元素的高度不能低于sticky元素的高度
  //   // 4、sticky元素仅在其父元素内生效

  //   // 粘性对位
  //   position: sticky;
  //   top: 44px;
  //   z-index: 9;
}

.content {
  // 一种解决方案 定位
  position: absolute;
  // height: 300px;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

// 动态计算也是一种方案
// .content {
//   // height: 100%;
//   margin-top: 44px;
//   height: calc(100% - 93px); // C3 样式
//   // height: 300px;
//   overflow: hidden;
// }
</style>
