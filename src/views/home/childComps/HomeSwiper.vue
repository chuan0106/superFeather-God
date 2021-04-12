<template>
  <swiper>
    <!-- 循环遍历多个轮播图 -->
    <swiper-item v-for="(item, id) in banners" :key="id">
      <!-- 一定要写 : v-model 双向绑定 缩写 -->
      <a :href="item.link">
        <img :src="item.image" alt="" @load.once="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// import Swiper from 'components/common/swiper/Swiper.vue';
// import SwiperItem from 'components/common/swiper/SwiperItem.vue';
import { Swiper, SwiperItem } from 'components/common/swiper';

export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isLoad: false,
    };
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad');
        this.isLoad = true;
      }
    },
  },
};
</script>

<style scoped></style>
