// pages/home/home.js
var server = require("../../utils/server");
const app = getApp()

Page({
  data: {
    userInfo:null,
  },
  // 判断用户是否注册，注册过跳转个人中心，没注册跳转填写信息
    gotoMy(e){
      console.log(e.currentTarget.dataset.url,'去my')
      var target = e.currentTarget.dataset.url
      this.getPhoneData(target)
    },
    //判断用户是否注册，注册过跳转详情，没注册跳转填写信息
    
    gotoDetail(e){
      // console.log(e.currentTarget.dataset.url,'去detail')
      console.log(e.currentTarget.dataset,'去detail')
      var target = e.currentTarget.dataset.url
      // var item = JSON.stringify(e.currentTarget.dataset.detail)
      var exhibitionCode = e.currentTarget.dataset.exhibitioncode
      // console.log(item)
      this.getPhoneData(target,exhibitionCode)
    },
    // 跳转至衡道介绍
    gotoIntroduce(){
      wx.navigateTo({
            url: '/pages/introduction/introduction'
          })
    },
    // 跳转至联系我们
    gotoContact(){
      wx.navigateTo({
            url: '/pages/contact/contact'
          })
    },
   // 判断是否填写过手机号
    getPhoneData(target,exhibitionCode){
      const userCode = wx.getStorageSync('USERCODE')
        server.request('get','exhibition/user/usercode',{userCode}).then(res=>{
          console.log(res,'exlist')
          if(res.data.data.userPhone){
            wx.navigateTo({
              url: target+'?exhibitionCode=' + exhibitionCode,
            })
          }else{
            wx.navigateTo({
              url: '/pages/card/card?target=' + target + '&exhibitionCode=' + exhibitionCode,
            })
          }
        }).catch(data=>{
          console.log(data,'catch')
        })
    },
    // 获取展会列表
    getExhibition(){
    server.request('get','exhibition/exhibition/list').then(res=>{
      console.log(res.data.rows,'res')
      const listArr = res.data.rows
      listArr.forEach((item)=>{
        console.log(item,'li')
        item.exhibitionEndTime = item.exhibitionEndTime.split(' ')[0]
        item.exhibitionStartTime = item.exhibitionStartTime.split(' ')[0]
      })
      this.setData({
        exhibitionList: listArr //res.data.rows
      })
    }) 
  },
  onLoad: function () {
    let userInfo = wx.getStorageSync('token') || null
    //  that = this;
     console.log(userInfo,'token1')
    // 更新userInfo
    if(userInfo){
      console.log('list')
      this.getExhibition()
    }else{
      console.log(4444)
      let that = this;
    if (app.globalData.employ && app.globalData.employ != '') {
      console.log("first")
      let userInfo = app.globalData.userInfo;
      that.setData({
        userInfo: userInfo ? userInfo : null
      });
    } else {
      console.log("second")
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.getuserCode()
      app.employCallback = employ => {
        if (employ != '') {
          console.log('huidiao')     
          this.getExhibition()  
        }
      }
    }
    }
    
  }
})
