// pages/home/home.js
var server = require("../../utils/server");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exhibitionList: []
  },
  goto(e){
    var url = e.currentTarget.dataset.url
    var item = JSON.stringify(e.currentTarget.dataset.detail);
    wx.navigateTo({
      url: url+'?detail='+ item
    })
  },
  // 授权基本信息
  getUserInfo: function(e) {
    let that = this;
    // console.log(e)
    // 获取用户信息
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              that.setData({
                name: res.userInfo.nickName
              })
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          that.showSettingToast("请授权")
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  data: {
    albumDisabled: true,
    bindDisabled: false
  },
   onLoad: function (options) {
    // console.log(getApp(),'990')
    console.log(wx.getStorageSync('token'),'2first')
    // await getApp().getList()
    if(!wx.getStorageSync('token')){
      console.log('second')
      server.request('get','exhibition/exhibition/list').then(res=>{
        console.log(res.data,'res')
        this.setData({
          exhibitionList: res.data.rows
        })
      })
    }else{
      getApp().gettoken()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow(){

  },
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