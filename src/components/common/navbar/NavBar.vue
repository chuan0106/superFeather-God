<template>
  <div class="nav-bar">
    <!-- 因为一个项目可能会出现多个 nav-bar 所以用的是class 而不是 id -->
    <!-- 因为这个 slot 被替换掉了 可能会出现很多问题 所以需要个div包裹一下 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style>
.nav-bar {
  width: 100%;
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0, 1px, 1px rgba((100), 100, 100, 0.1);
}
.left,
.right {
  width: 60px;
}
.center {
  flex: 1;
}
</style>
