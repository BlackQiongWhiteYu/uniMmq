// http.js
// 通常可以吧 baseUrl 单独放在一个 js 文件了
// let baseUrl = ''
let baseUrl = 'http://47.241.190.47:9334'

// 这里app端 启动报错
// if (location.origin.indexOf('localhost:') === -1) {
//   // baseUrl = 'http://118.190.140.13'
//   baseUrl = 'http://47.241.190.47:9334'
// }

/* 
  *@param {Object} option 存放请求内容的对象
  * 
 */
export const request = (options = {}) => {
	
  // 返回一个 promise
   return new Promise((resolve, reject) => {
	 // 定义一个变量 userData 为获取本地缓存中 key 为 userData 的值
    const userData = uni.getStorageSync("userData")
    // 在这里可以对请求头进行一些设置
    options.header = {
	  // 如果 userData 为真，则设置 token 为 userData.accessToken
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
		  // 请求成功
        case 0: 
          resolve(resData)
          break
        case 3:
		uni.showLoading({
		    title: '加载中'
		});
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
