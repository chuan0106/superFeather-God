<template>
  <div>
    <router-view></router-view>
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
