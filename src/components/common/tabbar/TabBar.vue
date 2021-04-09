<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
};
</script>

<style lang="less" scoped>
// @import 动态引入文件
#tab-bar {
  display: flex;
  align-content: center;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 10px -3px 1px -4px rgba(0, 0, 0, 0.5);
}
</style>
