<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages" :key="item.id">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index';
export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
