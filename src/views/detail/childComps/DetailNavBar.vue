<template>
  <div id="detail">
    <nav-bar>
      <div @click="backClick" slot="left" class="back">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="item.id"
          class="title-item"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
export default {
  components: { NavBar },
  NavBar: 'Detail',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    backClick() {
      // 返回
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
  // justify-content: space-around;
}
.active {
  // 选中状态文字高亮
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
</style>
