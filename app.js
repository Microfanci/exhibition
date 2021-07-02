App({
  globalData: {
    employ: '',
    userInfo: null,
  },
  getuserCode(){
    let userInfo = wx.getStorageSync('token') || null,
     that = this;
     console.log(userInfo,'token')
    // 更新userInfo
    if(userInfo){
      console.log(1111)
    }else{
      console.log(2222)
      wx.login({
        success: res=>{
          const code = res.code
          wx.request({  
            //http://192.168.30.93:8080
            // url: 'http://192.168.30.93:8080/miniprogram/login',  
           
            url: 'https://enroll-api-tools.histo.cn/miniprogram/login', 
            // url: 'https://enroll-be-tools.histo.cn/miniprogram/login',  
            data:{code},  
            method:'POST',  
            // header: {  
            // 'content-type': 'application/x-www-form-urlencoded'  
            // },  
            success: function (res) {  
            console.log(res.data) 
            if(res.data.code === 200){
              that.globalData.userInfo = res.data.token;
              wx.setStorageSync('USERCODE', res.data.USERCODE) 
              wx.setStorageSync('token', res.data.token) 
            }else{
              wx.showToast({
                title: '登录失败，稍后重试',
              })
              wx.setStorageSync('userInfo', null);
            }
            that.globalData.employ = true;
          /* 由于这里是网络请求，可能会在 Page.onLoad 之后才返回
          * 所以此处加入 callback 以防止这种情况 */
          if (that.employCallback) {
            that.employCallback(true);
          }
            
            }  
          })
        }
      })
    }
  },
  onLaunch: function () {
    // this.getuserCode()
    
  }, 
})