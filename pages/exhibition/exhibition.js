// pages/exhibiton/exhibition.js
import server from '../../utils/server'
const app = getApp()
Page({
  data: {
      clientHeight: 0,
      winWidth: 0,
      winHeight: 0,
      currentTab: 0,
      detail:{},
      activeState:['未开始','进行中','已结束'],
      orderState:['可预约','已预约',''],
      activeStateClass:['active-start','active-pedding','active-end'],
      searchName: ''
  },
//   点击预约按钮，判断是否可预约
  isPermitOrder(e){
    // console.log(e.currentTarget.dataset.index,'userinfo')
      const userCode = wx.getStorageSync('USERCODE')
      console.log(this.data.detail.activeList[e.currentTarget.dataset.index],'预约成功')
      const submitData = {
        activeCode: this.data.detail.activeList[e.currentTarget.dataset.index].activeCode,
        activeName: this.data.detail.activeList[e.currentTarget.dataset.index].activeName,
        exhibitionCode: this.data.detail.exhibitionCode,
        exhibitionName: this.data.detail.exhibitionName,
        userCode: wx.getStorageSync('USERCODE'),
        appointmentStatus: '1'
      }
      console.log(submitData,'submitData')
    server.request('get','exhibition/user/usercode',{userCode}).then(res=>{
        console.log(res,'userinfo')
        if(res.data.data.userPhone){
            // console.log(this.data.detail[e.currentTarget.dataset.index],'预约成功')
            // 调预约接口,显示已经预约
            console.log(111)
            server.request('post','exhibition/operation',submitData).then(res=>{
              this.getExhibitonSingleList()
            })
          
        }else{
            console.log(222)
            wx.navigateTo({
              url: '/pages/card/card',
            })
        }
    })
},
getExhibitonSingleList(){
  console.log( this.data.searchName,'////')
  const exhibitionName = this.data.searchName
  server.request('get','exhibition/exhibition/list',{exhibitionName:exhibitionName}).then(res=>{
    console.log(res.data.rows,'预约后获取展会')
    this.setData({
      detail:res.data.rows[0]
    })
    console.log(this.data.detail,'detail')
  })
},
  onLoad: function(options) {
    console.log(options,'aaa')
    var item = JSON.parse(options.detail)
    console.log(item.exhibitionName,'11')
      var that = this;
      this.setData({
        // detail: item,
        searchName: item.exhibitionName
      })
      this.getExhibitonSingleList()
      /**
       * 获取当前设备的宽高
       */
      wx.getSystemInfo( {
          success: function( res ) {
              that.setData( {
                  winWidth: res.windowWidth,
                  winHeight: res.windowHeight,
                  clientHeight: res.windowHeight
              });
          }

      });
      const userCode = wx.getStorageSync('USERCODE')
      server.request('get','exhibition/user/usercode',{userCode}).then(res=>{
        console.log(res,'返回是否填写过信息')
        if(!res.data.data.userPhone){
          wx.navigateTo({
            url: '/pages/card/card',
          })({
            delta: 1,
          })
        }else{
          console.log('用户已经填写过信息')
        }
      })
  },
    
//  tab切换逻辑
  swichNav: function( e ) {

      var that = this;

      if( this.data.currentTab === e.target.dataset.current ) {
          return false;
      } else {
          that.setData( {
              currentTab: e.target.dataset.current
          })
      }
  },

  bindChange: function( e ) {

      var that = this;
      that.setData( { currentTab: e.detail.current });

  },
})