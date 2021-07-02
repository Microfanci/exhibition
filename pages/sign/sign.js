// pages/sign/sign.js
import server from '../../utils/server'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeState:['未开始','进行中','已结束'],
    activeAddress: '',
    // activeCode: "89b807075e8347d5b4f48bc1b8335673",
    activeName: '',
    activeStatus: '',
    activeEndTimeOne: '',
    activeEndTimeTwo: '',
    activeStartTimeOne: '',
    activeStartTimeTwo: '',
    msg:'',
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{text: '取消'}, {text: '确定'}],
    oneButton: [{text: '确定'}],
  },
  goto(e){
    console.log(e.currentTarget.dataset.url)
    wx.reLaunch({
      url: e.currentTarget.dataset.url,
    })
  },
  openConfirm: function () {
      this.setData({
          dialogShow: true
      })
  },
  tapDialogButton(e) {
      this.setData({
          dialogShow: false,
          showOneButtonDialog: false
      })
  },
  tapOneDialogButton(e) {
      this.setData({
          showOneButtonDialog: true
      })
  },
  showToast(){
    console.log(1111)
    wx.showToast({
      title: '自定义图标弹窗',
      image: '../../static/image/icon.png',  //image的优先级会高于icon
      duration: 2000     
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'签到页面接收的参数')
    // activeCode89b807075e8347d5b4f48bc1b8335673
    const activeCode = options.activeCode
    server.request('get','exhibition/active/list',{activeCode}).then(res=>{
      console.log(res,'活动结果')
      if(res.data.rows[0]){
        this.setData({
          activeName:res.data.rows[0].activeName,
          activeStatus:res.data.rows[0].activeStatus,
          activeStartTimeOne:(res.data.rows[0]. activeStartTime).split(' ')[0],
          activeStartTimeTwo:(res.data.rows[0]. activeStartTime).split(' ')[1],
          activeEndTimeOne:(res.data.rows[0]. activeEndTime).split(' ')[0],
          activeEndTimeTwo:(res.data.rows[0]. activeEndTime).split(' ')[1],
          activeAddress:res.data.rows[0].activeAddress,
          msg:options.msg
        })
      }
      
    })
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