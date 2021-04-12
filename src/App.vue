<template>
  <div>
    <!--   keep-alice 是 Vue 内置的一个组件 可以被包含的组件保留状态 或避免重新渲染 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
      <!--当我们点击其他页面回来的时候希望进行缓存  -->
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
// 这个项目因为数据请求的相对较慢 所以才导致 滚动不了  个人猜测哈
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue';
export default {
  components: {
    MainTabBar,
  },
  name: 'App',
};
</script>

<style>
@import 'assets/css/base.css';
</style>
