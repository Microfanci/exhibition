// pages/my/my.js
import server from '../../utils/server'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userJob: '',
    userName: '',
    userPhone: '',
    userWorkUnit: '',
    exbExhibitionList: [],
    count: 0
  },

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
    // if(this.data.userPhone)
    const userCode = wx.getStorageSync('USERCODE')
      server.request('get','exhibition/user/usercode',{userCode}).then(res=>{
        if(res.data.data.userPhone){
          this.setData({
            userJob: res.data.data.userJobs,
            userName: res.data.data.userName,
            userPhone: res.data.data.userPhone,
            userWorkUnit: res.data.data.userWorkUnit,
            exbExhibitionList: res.data.data.exbExhibitionList,
            count: res.data.data.exbExhibitionList.length
          })
        }else{
          wx.navigateTo({
            url: '/pages/card/card',
          })
        }
      })
    //  wx.navigateTo({
    //                   url: '/pages/card/card?type='+'my'
    //                 })
    // const usercode = wx.getStorageSync('USERCODE')

    // server.request('get','exhibition/user/usercode/',{userCode:usercode}).then(res=>{
    //   console.log(res,'user')
    // })
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