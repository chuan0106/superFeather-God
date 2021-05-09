<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>
    <div @click="calcClick" class="calculate">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'CartButtonBar',
  components: { CheckButton },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return (
        '¥' +
        this.cartList
          .filter((item) => item.checked)
          .reduce((preValue, item) => {
            return preValue + item.price * item.count
          }, 0)
          .toFixed(2)
      )
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length
    },
    // 全选按钮
    isSelectAll() {
      // 做取反 当结果为false
      // return !this.cartList.filter((item) => !item.checked).length;
      if (this.cartList.length === 0) return false
      return !this.cartList.find((item) => !item.checked)

      // 普通做法
      // for (const item of this.cartList) {
      //   if (!item.checked) {
      //     return false
      //   }
      // }
      // return true
    },
  },
  methods: {
    checkClick() {
      console.log('111')
      if (this.isSelectAll) {
        // 全部选中
        this.cartList.forEach((item) => (item.checked = false))
      } else {
        // 部分或全部不选中
        this.cartList.forEach((item) => (item.checked = true))
      }
    },
    calcClick() {
      if (this.checkLength === 0) {
        this.$toast.show('请选择购买的商品', 2000)
      } else {
        this.$toast.show('您的余额已不足 请联系帅气的川哥哥进行充值', 2000)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.bottom-bar {
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  margin-right: 5px;
  height: 20px;
  width: 20px;
  line-height: 20px;
}
.price {
  margin-left: 30px;
}

.calculate {
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
