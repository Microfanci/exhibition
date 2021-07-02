// pages/my/my.js
import server from '../../utils/server'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeState:['未开始','进行中','已结束'],
    activeStateClass:['active-start','active-pedding','active-end'],
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
    this.getPhoneData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  getPhoneData(){
    const userCode = wx.getStorageSync('USERCODE')
      server.request('get','exhibition/user/usercode',{userCode}).then(res=>{
        console.log(res,'exlist')
        if(res.data.data.userPhone){
          this.setData({
            userJob: res.data.data.userJobs,
            userName: res.data.data.userName,
            userPhone: res.data.data.userPhone,
            userWorkUnit: res.data.data.userWorkUnit,
            exbExhibitionList: res.data.data.exbExhibitionList,
            count: res.data.data.exbExhibitionList.length
          })
        }
      })
  },
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