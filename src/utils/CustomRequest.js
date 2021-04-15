/*
 * @Author: your name
 * @Date: 2021-04-15 06:47:51
 * @LastEditTime: 2021-04-15 07:17:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \uniMmq\src\utils\CustomRequest.js
 */
export default function(url, data = {}, method = "GET", header = {}) {
  return uni.request({
    url,
    data,
    method,
    header,
  });
}
