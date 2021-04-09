<template>
  <!-- 整个首页唯一 比较合理 id home -->
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
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
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <!--  @tabClick= 接收子组件发送过来的数据  子传父-->
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <!-- 因为这个图片不需要放到滚动里 所以放到他并其的位置就行 -->
    <!-- <button></button><div></div>  这些原生组件可以监听 @click 那么组件可以吗-->
    <!-- v-show="true" 显示隐藏 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- ul>li{列表$}*100` -->
    <!-- <ul>
      <li>别聊1</li>
      <li>别聊2</li>
      <li>别聊3</li>
      <li>别聊4</li>
      <li>别聊5</li>
      <li>别聊6</li>
      <li>别聊7</li>
      <li>别聊8</li>
      <li>别聊9</li>
      <li>别聊10</li>
      <li>别聊11</li>
      <li>别聊12</li>
      <li>别聊13</li>
      <li>别聊14</li>
      <li>别聊15</li>
      <li>别聊16</li>
      <li>别聊17</li>
      <li>别聊18</li>
      <li>别聊19</li>
      <li>别聊20</li>
      <li>别聊21</li>
      <li>别聊22</li>
      <li>别聊23</li>
      <li>别聊24</li>
      <li>别聊25</li>
      <li>别聊26</li>
      <li>别聊27</li>
      <li>别聊28</li>
      <li>别聊29</li>
      <li>别聊30</li>
      <li>别聊31</li>
      <li>别聊32</li>
      <li>别聊33</li>
      <li>别聊34</li>
      <li>别聊35</li>
      <li>别聊36</li>
      <li>别聊37</li>
      <li>别聊38</li>
      <li>别聊39</li>
      <li>别聊40</li>
      <li>别聊41</li>
      <li>别聊42</li>
      <li>别聊43</li>
      <li>别聊44</li>
      <li>别聊45</li>
      <li>别聊46</li>
      <li>别聊47</li>
      <li>别聊48</li>
      <li>别聊49</li>
      <li>别聊50</li>
    </ul> -->
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
    };
  },
  created() {
    // 组件创建完毕 函数
    // 这里面主要写主要逻辑 ！！
    // 具体逻辑在 methods
    // 1. 请求多个数据
    this.getHomeMultidata(); // 然后在调用一下下面的函数 写 this 是在调 下面的
    // 2. 请求商品数据
    this.getHomeGoods('pop'); // 流行数据
    this.getHomeGoods('new'); // 新增数据  这个数据好像是没了  找不到
    this.getHomeGoods('sell'); // 精选数据
    // 3. 监听item中图片加载完成
    // 这一段代码其实可以不用 因为已经通过插件的问题解决了图片滚动的问题 留着也没有影响 下次看好知道这个是干什么的
    this.$bus.$on('itemImageLoad', () => {
      // console.log('哈哈哈');
      this.$refs.scroll.scroll.refresh();
    });
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
      this.isShowBackTop = -position.y > 1000;
    },
    loadMore() {
      console.log('上拉加载更多');
      // currentType 是正在记录的那个
      this.getHomeGoods(this.currentType);
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
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style lang="less" scoped>
#home {
  // 对于对外边距的使用 官方推荐能用padding 就不要用 margin
  padding-top: 44px;
  height: 100vh; // vh 视图高度 100
  // padding-bottom: 800px;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  // 这样会脱离文档流 盖住轮播图
  // 下次再出现滚动条的时候 把positon 取消掉看有没有用
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  // 被盖住了 给他提高层级
  z-index: 9;
}

.tab-control {
  //   设置position:sticky同时给一个(top,bottom,right,left)之一即可
  // 使用条件：
  // 1、父元素不能overflow:hidden或者overflow:auto属性。
  // 2、必须指定top、bottom、left、right4个值之一，否则只会处于相对定位
  // 3、父元素的高度不能低于sticky元素的高度
  // 4、sticky元素仅在其父元素内生效

  // 粘性对位
  position: sticky;
  top: 44px;
  z-index: 9;
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
