<template>
  <div>
    <tab-bar>
      <tab-bar-item path="home" >
        <img slot="item-icon" src="~assets/img/tabbar/羽神1.jpg" alt="" />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/羽神1.jpg"
          alt=""
        />

        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="category" >
        <img slot="item-icon" src="~assets/img/tabbar/羽神2.jpg" alt="" />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/羽神1.jpg"
          alt=""
        />

        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="cart" >
        <img slot="item-icon" src="~assets/img/tabbar/羽神3.jpg" alt="" />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/羽神1.jpg"
          alt=""
        />

        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="profile">
        <img slot="item-icon" src="~assets/img/tabbar/羽神4.jpg" alt="" />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/羽神1.jpg"
          alt=""
        />

        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar';
import TabBarItem from 'components/common/tabbar/TabBarItem';
export default {
  name: 'MainTbarBar',
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style lang="less" scoped></style>
