<template>
  <div class="wrapper">
    <!-- 1.无论是否设置click:false button都可以点击 -->
    <!-- 2.必须设置click:true namediv 才能监听点击 -->
    <ul class="content">
      <button @click="btnClick">按钮</button>
      <div @click="divClick">呵呵呵</div>

      <li>分离1</li>
      <li>分离2</li>
      <li>分离3</li>
      <li>分离4</li>
      <li>分离5</li>
      <li>分离6</li>
      <li>分离7</li>
      <li>分离8</li>
      <li>分离9</li>
      <li>分离10</li>
      <li>分离11</li>
      <li>分离12</li>
      <li>分离13</li>
      <li>分离14</li>
      <li>分离15</li>
      <li>分离16</li>
      <li>分离17</li>
      <li>分离18</li>
      <li>分离19</li>
      <li>分离20</li>
      <li>分离21</li>
      <li>分离22</li>
      <li>分离23</li>
      <li>分离24</li>
      <li>分离25</li>
      <li>分离26</li>
      <li>分离27</li>
      <li>分离28</li>
      <li>分离29</li>
      <li>分离30</li>
      <li>分离31</li>
      <li>分离32</li>
      <li>分离33</li>
      <li>分离34</li>
      <li>分离35</li>
      <li>分离36</li>
      <li>分离37</li>
      <li>分离38</li>
      <li>分离39</li>
      <li>分离40</li>
      <li>分离41</li>
      <li>分离42</li>
      <li>分离43</li>
      <li>分离44</li>
      <li>分离45</li>
      <li>分离46</li>
      <li>分离47</li>
      <li>分离48</li>
      <li>分离49</li>
      <li>分离50</li>
      <li>分离51</li>
      <li>分离52</li>
      <li>分离53</li>
      <li>分离54</li>
      <li>分离55</li>
      <li>分离56</li>
      <li>分离57</li>
      <li>分离58</li>
      <li>分离59</li>
      <li>分离60</li>
      <li>分离61</li>
      <li>分离62</li>
      <li>分离63</li>
      <li>分离64</li>
      <li>分离65</li>
      <li>分离66</li>
      <li>分离67</li>
      <li>分离68</li>
      <li>分离69</li>
      <li>分离70</li>
      <li>分离71</li>
      <li>分离72</li>
      <li>分离73</li>
      <li>分离74</li>
      <li>分离75</li>
      <li>分离76</li>
      <li>分离77</li>
      <li>分离78</li>
      <li>分离79</li>
      <li>分离80</li>
      <li>分离81</li>
      <li>分离82</li>
      <li>分离83</li>
      <li>分离84</li>
      <li>分离85</li>
      <li>分离86</li>
      <li>分离87</li>
      <li>分离88</li>
      <li>分离89</li>
      <li>分离90</li>
      <li>分离91</li>
      <li>分离92</li>
      <li>分离93</li>
      <li>分离94</li>
      <li>分离95</li>
      <li>分离96</li>
      <li>分离97</li>
      <li>分离98</li>
      <li>分离99</li>
      <li>分离100</li>
    </ul>
  </div>
</template>

<script>
// 不会了 具体看官网
import BetterScroll from '@better-scroll/core';
import PullUp from '@better-scroll/pull-up';
BetterScroll.use(PullUp);
export default {
  name: 'Category',
  data() {
    return {
      // 最好用个变量接受 因为不确定 在组件创建好执行生命周期函数的时候  是否保留下来
      scroll: null,
    };
  },

  // 组件创建完之后 调用 因为模板还没挂载 所以拿不到
  created() {
    // console.log(this.$refs.aaaa);
    // console.log(document.querySelector('.wrapper'));
    // this.scroll = new BScroll(document.querySelector('.weapper'), {});
  },

  mounted() {
    // 组件被挂载 所以可以拿到了

    this.scroll = new BetterScroll('.wrapper', {
      pullUpLoad: true, // 上拉
      probeType: 2, // 实时监听
      // 用法：要覆盖本机滚动，BetterScroll必须禁止某些默认浏览器行为，例如鼠标单击。如果您希望您的应用程序响应click事件，则必须将该选项显式设置为true。然后BetterScroll将向其_constructed调度事件添加一个私有属性，该属性的值为true。
      click: false,
    });
    this.scroll.on('scroll', (position) => {
      // 默认情况下 BScroll 是不可以实时监听滚动位置
      // console.log(position); // 实时滚动的位置
    });
    this.scroll.on('pullingUp', () => {
      console.log('我套你猴子');
      this.scroll.finishPullUp(); // 默认执行一次 这样可执行多次
    });
  },
  methods: {
    btnClick() {
      console.log('我套你猴子');
    },
    divClick() {
      console.log('套死你猴子');
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 150px;
  background-color: pink;
  // overflow: scroll; // 在高度内滚动 移动端是非常的卡顿的
  overflow: hidden;
}
</style>
