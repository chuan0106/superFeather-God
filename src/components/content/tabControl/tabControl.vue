<template>
  <div class="tab-control">
    <!-- 只是文字不一样 就没必要搞插槽了  有点大材小用的感觉 -->
    <!-- 根据有几个 titles 遍历多少个 -->
    <div
      v-for="(item, index) in titles"
      :key="item.id"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span> {{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      // 点击选中红色
      this.currentIndex = index;
      // 把点击的数据  发送出去
      this.$emit('tabClick', index);
    },
  },
};
</script>

<style lang="less" scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  justify-content: space-around;
  background-color: #fff;
}

.tab-control-item span {
  padding: 5px;
}
.active {
  // 选中状态文字高亮
  color: var(--color-high-text);
}
.active span {
  // 选中文字 有事实线
  border-bottom: 3px solid var(--color-high-text);
}
</style>
