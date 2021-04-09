import { request } from "./request";
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 获取首页商品
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,    // type : type
      page    // page : page
    }
  })
}


// 函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束 -> 弹出函数栈(释放函数所有的变量)
// function test() {
//   const names = ['why', 'aaa']
// }
//
// test()
//
// test()



let totalNums = []

const nums1 = [20, 11, 222]
const nums2 = [111, 22, 333]

// for (let n of nums1) {
//   totalNums.push(n)
// }
// totalNums.push([20, 11, 222], 111)   这样显然是不行的
totalNums.push(...nums1)   // 可以对数组进行解析 将里面的元素一个个取出来 在 push 里面
