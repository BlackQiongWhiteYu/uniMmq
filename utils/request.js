// http.js
// 通常可以吧 baseUrl 单独放在一个 js 文件了
let baseUrl = ''
if (location.origin.indexOf('localhost:') === -1) {
  baseUrl = 'http://118.190.140.13'
}


const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    const userData = uni.getStorageSync("userData")
    // 在这里可以对请求头进行一些设置
    options.header = {
      accessToken: userData?.accessToken
    }
    uni.request({
      url: baseUrl + options.url || '',
      method: options.type || 'GET',
      data: options.data || {},
      header: options.header || {}
    }).then(data => {
      let [err, res] = data;
      const { data: resData } = res

      switch (resData.code) {
        case 200: 
          resolve(resData)
          break
        case 5: 
          uni.showToast({
            icon: "none",
            position: "bottom",
            title: "密码不正确",
          });
          uni.setStorageSync("userData", '')
          uni.navigateTo({
            url: "../../pages/login/login",
          });
          break
        default:
          resolve(resData)
          return
      }
    }).catch(error => {
      reject(error)
    })
  });
}

const get = (url, data, options = {}) => {
  options.type = 'GET';
  options.data = data;
  options.url = url;
  return request(options)
}

const post = (url, data, options = {}) => {
  options.type = 'POST';
  options.data = data;
  options.url = url;
  return request(options)
}


export default {
  request,
  get,
  post
}