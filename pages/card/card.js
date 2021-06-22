// pages/card/card.js
var server = require("../../utils/server");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    a:true,
    b:true,
    c:true
  },
  inputOne(e){
    console.log(e,'input')
    if(e.detail.value){
      this.setData({
        a: false
      })
      console.log(this.data.a)
    }else{
      this.setData({
        a: true
      })
    }
  },
  inputTwo(e){
    console.log(e,'input')
    if(e.detail.value){
      this.setData({
        b: false
      })
      console.log(this.data.b)
    }else{
      this.setData({
        b: true
      })
    }
  },
  inputThree(e){
    console.log(e,'input')
    if(e.detail.value){
      this.setData({
        c: false
      })
      console.log(this.data.c)
    }else{
      this.setData({
        c: true
      })
    }
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    
    this.setData({
      userInfo:e.detail.value
    })
    console.log(this.data.userInfo)
  },

  getPhoneNumber (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)

    const phoneObj = {
      encryptedData:e.detail.encryptedData,
      iv:e.detail.iv
    }
    const userCode = wx.getStorageSync('USERCODE')
    const {userName,userWorkUnit,userJobs} = this.data.userInfo
    console.log(userName,userWorkUnit,userJobs,'ppp')
    if(phoneObj.encryptedData && phoneObj.iv){
      const submitData = {
        userPhone: JSON.stringify(phoneObj),
        userCode,
        userName,
        userWorkUnit,
        userJobs
      }
      console.log(submitData,'sss')
      //提交手机号和用户信息等数据
      server.request('put','exhibition/user',submitData).then(res=>{
        console.log(res)
        if(res.data.code === 200){
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }else{
      wx.reLaunch({
        url: '/pages/home/home',
      })
    }
  },
  // getPhone(){
  //   console.log(e.detail.errMsg)
  //   console.log(e.detail.iv)
  //   console.log(e.detail.encryptedData)
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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