<template>
  <div>
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <i class="arrow-right"></i>
        </div>
      </div>
      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="" />
        <span>{{ commentInfo.user.uname }}</span>
      </div>
      <div class="info-detail">
        <p>{{ commentInfo.content }}</p>
        <div class="info-other">
          <!-- 当前的时间戳 转换并展示 -->
          <span class="date">{{ commentInfo.created | showDate }}</span>
          <span>{{ commentInfo.style }}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="item in commentInfo.images" :key="item.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 用个格式化插件 老师那个我没用
import { formatDate2 } from 'common/utlis';
// import moment from 'moment';
// import { formatDate } from 'common/utlis';
export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    showDate(data) {
      // 1.将时间戳转成Date对象
      // let date = new Date(value * 1000);
      // H 区分大小写 小写是12小时制
      return formatDate2(data, 'YYYY-HH:mm:ss');
      // return moment(value * 1000).format('YYYY-HH:mm:ss ');
      // // 2.将date进行格式化
      // return formatDate(date, 'uuuu-MM-dd');
    },
  },
};
</script>

<style lang="less" scoped>
.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}

.info-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.header-title {
  float: left;
  font-size: 15px;
}

.header-more {
  float: right;
  margin-right: 10px;
  font-size: 13px;
}

.info-user {
  padding: 10px 0 5px;
}

.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}

.info-user span {
  position: relative;
  font-size: 15px;
  top: -15px;
  margin-left: 10px;
}

.info-detail {
  padding: 0 5px 15px;
}

.info-detail p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}

.info-detail .info-other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}

.info-other .date {
  margin-right: 8px;
}

.info-imgs {
  margin-top: 10px;
}

.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>
