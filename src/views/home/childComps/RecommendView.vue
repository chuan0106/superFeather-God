<template>
  <div class="recommend">
    <!-- recommend-item 循环遍历的每一个  -->
    <div v-for="item in recommends" class="recommend-item" :key="item.id">
      <a :href="item.link">
        <!-- 一定要写 : v-model 双向绑定 缩写 -->
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20p 0x;
  border-bottom: 10px solid #eee;
  /* justify-content: space-between; */
}

.recommend-item {
  flex: 1;
}

.recommend-item img {
  /* width: 70px; */
  /* height: 70px; */
  width: 80%;
  /* 最大百分之百 */
  /* max-width: 100%; */
  /* margin-bottom: 10px; */
}
</style>
