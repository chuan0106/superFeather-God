module.exports = {
  plugins: {
    autoprefixer: {}, // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
    "postcss-px-to-viewport": {
      unitToConvert: "px", // 要转化的单位
      /* 1. 物理像素 就是我们说的分辨率  iPhone8的物理像素是 750 */
      /* 2. 在 iPhone8里面  1px 开发像素  =  2个物理像素  */
      viewportWidth: 375, // UI设计稿的宽度
      viewportHeight: 667, // 视窗的宽度 对应的事我们十几稿的高度 (也可以不设置)
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: ["tab-bar", 'ignore'], // 指定不转换为视窗单位的类名，
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/, /TabBar.vue/], // 设置忽略文件，用正则做目录名匹配
      landscape: false, // 是否处理横屏情况
    }
  }
};