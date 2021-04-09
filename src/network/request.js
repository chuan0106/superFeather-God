import axios from "axios";

// 优雅永不过时！！！！
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {  // 请求发送成功 请求发送失败

    // console.log(config); // 拦截成功
    return config   // 拦截了需要把成功的数据发送出去
  }, err => {
    console.log(err);
  })
  instance.interceptors.response.use(res => {   // res result  结果
    // console.log(res);   // 响应拦截成功
    return res.data   // 结果返回出去
  }, err => {
    console.log(err);
  })
  return instance(config)

}
