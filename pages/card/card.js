// pages/card/card.js
var server = require("../../utils/server");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeCode: '',//从扫码页面传过来的签到的活动activeCode
    excode: '',//从扫码页面传过来的展会码exhibitionCode
    type: '',// 扫码的类型type：detail/si g n
    // item: '', // 从首页跳转详情传过来的活动详情参数
    nextPage: '', // 填写信息完成后将要去的页面
    userInfo: {},
    a:true,
    b:true,
    c:true,
    flag:false
  },
  inputOne(e){
    if(e.detail.value){
      this.setData({
        a: false
      })
    }else{
      this.setData({
        a: true
      })
    }
  },
  inputTwo(e){
    if(e.detail.value){
      this.setData({
        b: false
      })
    }else{
      this.setData({
        b: true
      })
    }
  },
  inputThree(e){
    if(e.detail.value){
      this.setData({
        c: false
      })
    }else{
      this.setData({
        c: true
      })
    }
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
      flag:true
    })
    this.setData({
      userInfo:e.detail.value
    })
    console.log(this.data.userInfo)
  },

  getPhoneNumber (e) {
    console.log(123)
    
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // console.log(e.detail.errMsg)
    // console.log(e.detail.iv)
    // console.log(e.detail.encryptedData)

    const phoneObj = {
      encryptedData:e.detail.encryptedData,
      iv:e.detail.iv
    }
    const userCode = wx.getStorageSync('USERCODE')
    const {userName,userWorkUnit,userJobs} = this.data.userInfo
    console.log(userName,userWorkUnit,userJobs,'用户填写的信息')
    if(phoneObj.encryptedData && phoneObj.iv){
      const submitData = {
        userPhone: JSON.stringify(phoneObj),
        userCode,
        userName,
        userWorkUnit,
        userJobs
      }
      console.log(submitData,'sss')
      console.log(this.data.nextPage,this.data.excode,this.data.activeCode,'sss')
      //提交手机号和用户信息等数据
      server.request('post','exhibition/user',submitData).then(res=>{
        console.log(res, '填写手机号接口调用')
        if(res.data.code === 200){
          console.log(res, '填写手机号成功')
          wx.showToast({
            title: '填写信息成功'
          })
          wx.reLaunch({
            url: this.data.nextPage + '?exhibitionCode=' + this.data.excode + '&activeCode='+ this.data.activeCode + '&type=' + this.data.type,
          })
        }
      })
    }else{
      wx.reLaunch({
        url: '/pages/home/home',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'card接收的页面')
    var nextPage = options.target
    var exhibitionCode = options.exhibitionCode
    this.setData({
      nextPage: nextPage,
      activeCode: options.activeCode,
      excode:exhibitionCode,
      type:options.type
    })
    console.log(this.data,'data')
    // debugger
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})