// pages/exhibiton/exhibition.js
import server from '../../utils/server'
const app = getApp()
Page({
  data: {
      key: '',
      current: '0',
      detail:{},
      activeState:['未开始','进行中','已结束'],
      orderState:['可预约','已预约',''],
      activeStateClass:['active-start','active-pedding','active-end'],
      submitData: {},
      searchCode: '',
      dialogShow: false,
      showOneButtonDialog: false,
      buttons: [{text: '取消'}, {text: '确定'}],
      oneButton: [{text: '确定'}],
      successToast: false
  },
  close(){
    this.setData({
      successToast: false
    })
  },
  openConfirm: function () {
    // console.log(1111)
    this.setData({
        dialogShow: true
    })
},
tapDialogButton(e) {
  console.log(e, 222)
  if(e.detail.index === 0){
    wx.showToast({
      title: '取消预约',
      icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
      duration: 2000     
    })  
  }
  if(e.detail.index === 1){
    this.activeAppointment()
  }
    this.setData({
        dialogShow: false,
        showOneButtonDialog: false
    })
},
tapOneDialogButton(e) {
  console.log(e,333)
    this.setData({
        showOneButtonDialog: true
    })
},
showToast(){
  console.log(e,41111)
  wx.showToast({
    title: '自定义图标弹窗',
    image: '../../static/image/icon.png',  //image的优先级会高于icon
    duration: 2000     
  })
},
  // 切换活动列表与展会详情
  swichTab(e){
    console.log(e.currentTarget.dataset,'切换')
    if(e.currentTarget.dataset.current === '0'){
      this.setData({
        current:'0'
      })
    }
    if(e.currentTarget.dataset.current === '1'){
      this.setData({
        current:'1'
      })
    }
  },
  // 点击列表时显示边框
  showborder(e){
    console.log(e.currentTarget.dataset.key,'dianji')
    this.setData({
      key:e.currentTarget.dataset.key
    })
  },
//   点击预约按钮，判断是否可预约
  isPermitOrder(e){
    this.setData({
      showOneButtonDialog: true,
      dialogShow: true
    })
    // console.log(e.currentTarget.dataset.index,'userinfo')
      const userCode = wx.getStorageSync('USERCODE')
      console.log(this.data.detail.activeList[e.currentTarget.dataset.index],'预约成功')
      const submitInfo = {
        activeCode: this.data.detail.activeList[e.currentTarget.dataset.index].activeCode,
        activeName: this.data.detail.activeList[e.currentTarget.dataset.index].activeName,
        exhibitionCode: this.data.detail.exhibitionCode,
        exhibitionName: this.data.detail.exhibitionName,
        userCode: wx.getStorageSync('USERCODE'),
        appointmentStatus: '1'
        // appointmentStatus: '1'
      }
      this.setData({
        submitData : submitInfo
      })
      console.log(this.data.submitData,'submitData')
    
},
// 预约活动
activeAppointment(){
  server.request('post','exhibition/operation',this.data.submitData).then(res=>{
    console.log(res,'999')
    if(res.data.code === 200){
      wx.showToast({
        title: '预约成功',
        duration: 2000     
      })
    }else{
      wx.showToast({
        title: '预约失败',
        duration: 2000     
      })
    }
   
    // this.setData({
    //   successToast : true
    // })
      this.getExhibitonSingleList(this.data.searchCode)
  })
},
// 根据传过来的展会的名字获取展会详情
getExhibitonSingleList(exhibitionCode){
  // console.log( this.data.searchName,'////')
  server.request('get','exhibition/exhibition/list',{exhibitionCode:exhibitionCode}).then(res=>{
    console.log(res.data.rows,'展会liebiao')
    const detailA = res.data.rows[0]
    detailA.exhibitionStartTime = res.data.rows[0].exhibitionStartTime.split(' ')[0]
    detailA.exhibitionEndTime = res.data.rows[0].exhibitionEndTime.split(' ')[0]
    this.setData({
      detail:detailA
    })
    // console.log(this.data.detail,'detail')
  })
},
  onLoad: function(options) {
    console.log(options,'传给详情页的参数')
      this.setData({
        searchCode: options.exhibitionCode
      })
      this.getExhibitonSingleList(this.data.searchCode)
  },
})