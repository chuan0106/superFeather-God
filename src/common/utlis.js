// 公共的方法
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 正则表达式是干什么的 字符串匹配 利器(难,规则太多)
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {

    // y+ =>1个或者多个y
    // y* =>0个或这个多个y
    // y? =>0个或者一个y
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};


import moment from 'moment';
export function formatDate2(data, value) {
  return moment(data * 1000).format(value);
}


