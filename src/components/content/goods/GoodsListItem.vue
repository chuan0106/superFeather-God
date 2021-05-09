<template>
  <div class="goods-item" @click="itemClick">
    <div>
      <!-- 千万 千万别忘记带 : -->
      <!-- <img :src="goodsItem.show.img" @load="imageLoad" alt="" /> -->
      <img v-lazy="showImage" @load="imageLoad" alt="" />
      <div class="goods-info">
        <p>{{ goodsItem.title }}</p>
        <!-- 商品价格描述 和 title -->
        <span class="price">{{ goodsItem.price }}</span>
        <span class="collect">{{ goodsItem.cfav }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    showImage() {
      // 因为 Home 和Detail 同时引入这个组件 所以做个判断 逻辑或
      return this.goodsItem.image || this.goodsItem.show.img
    },
  },
  methods: {
    imageLoad() {
      // 检测图片加载完成
      // console.log('imageLoad');
      // 事件总线
      // 现在没什么作用 留着下次知道这个是干嘛的
      // 判断是不是/home 里面
      this.$bus.$emit('itemImageLoad')

      // if (this.$route.path.indexOf('/home')) {
      //   this.$bus.$emit('homeImageLoad');
      // } else if (this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit('detailItemLoad');
      // }
    },
    itemClick() {
      // console.log('跳转到详情页');
      // console.log(this.$route.path);
      // console.log(this.$route.path.indexOf('/home'));
      // 判断 detail 底下那些图片不跳转
      // if (this.$route.path == '/home') {
      //   this.$router.push('/detail/' + this.goodsItem.iid);
      // }
      // console.log(this.$route.path.indexOf('/home') == -1);
      if (this.$route.path.indexOf('/home') !== -1) {
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
      // if (/^\/home/.test(this.$route.path)) {
      //   this.$router.push('/detail/' + this.goodsItem.iid);
      // }
    },
  },
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  /* 不换行 */
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>
