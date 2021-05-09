<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    // message: {
    //   type: String,
    //   default: '',
    // },
    // show: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      message: '',
      isShow: false,
      timer: null,
    }
  },
  methods: {
    show(message = '默认文字', duration = 2000) {
      // 这种是es6的
      // duration = duration || 2000 // 默认时间是两秒
      this.isShow = true
      this.message = message
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    },
  },
}
</script>

<style lang="less" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%, 50%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
}
</style>
