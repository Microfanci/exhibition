// 封装请求
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FORM = 'FORM';
const DELETE = 'DELETE';

const baseURL = 'http://192.168.30.93:8080/';
// const baseURL = 'http://127.0.0.1:8080/';
function request(method, url, data) {
  const token = wx.getStorageSync('token') || []
    const USERCODE = wx.getStorageSync('USERCODE') || []
    // console.log(method)
    // console.log(url)
    // console.log(data)
    // console.log(token)
    // console.log(USERCODE)
    return new Promise(function(resolve, reject) {
        let header = {
          'content-type': 'application/json',
          'Authorization': token,
          'USERCODE':USERCODE
        };
        wx.request({
            url: baseURL + url,
            method: method,
            data: method === POST ? JSON.stringify(data) : data,
            header: header,
            success(res) {
                //请求成功
                //判断状态码---errCode状态根据后端定义来判断
                if (res.data.code == 200) {
                    resolve(res);
                } else {
                  if (res.data.code == 401) {
                    // wx.redirectTo({
                    //   url: '/pages/card/card'
                    // })
                    console.log(2222)
                    // wx.clearStorage('token','')
                    // wx.clearStorage('USERCODE','')
                    // getApp().gettoken()
                  } 
                    //其他异常
                    reject('运行时错误,请稍后再试');
                }
            },
            fail(err) {
                //请求失败
                reject(err)
            }
        })
    })
}
// const API = {
//   getOpenid: (data) => request(GET, `jsapi/mini?jsCode=${data}`),
// };
module.exports.request = request