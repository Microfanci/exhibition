// app.js
App({
  onLaunch() {
    // this.gettoken()
    console.log(11111111111)
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    
   // 获取用户信息
  //  wx.getSetting({
  //   success: res => {
  //     if (res.authSetting['scope.userInfo']) {
  //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //       wx.getUserInfo({
  //         success: res => {
  //           // 可以将 res 发送给后台解码出 unionId
  //           this.globalData.userInfo = res.userInfo
  //           console.log(this.globalData.userInfo,'userinfo')
  //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //           // 所以此处加入 callback 以防止这种情况
  //           if (this.userInfoReadyCallback) {
  //             this.userInfoReadyCallback(res)
  //           }
  //         }
  //       })
  //     }
  //   }
  // })
  },
  gettoken(){
    console.log('first')
    // token
    const token = wx.getStorageSync('token') || []
    const USERCODE = wx.getStorageSync('USERCODE') || []
    console.log(USERCODE,token)
    if(token!='' && USERCODE!=''){
      console.log(1)
      return 
    }else{
      console.log(2)
      wx.login({
      success: res => {
        const code = res.code
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({  
          url: 'http://192.168.30.93:8080/miniprogram/login',  
          data:{code},  
          method:'POST',  
          // header: {  
          // 'content-type': 'application/x-www-form-urlencoded'  
          // },  
          success: function (res) {  
          console.log(res.data) 
          this.getList()
          wx.setStorageSync('USERCODE', res.data.USERCODE) 
          wx.setStorageSync('token', res.data.token) 
         }  
        })  
      }
    })
    }
  },
  getList(){
    return new Promise((resolve,reject)=>{
      return resolve()
    })
  },
  globalData: {
    userInfo: null,
    employId: ''
  }
})
