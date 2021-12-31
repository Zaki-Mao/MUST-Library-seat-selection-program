// pages/information/information.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    username: '',
    infoType: '',
    successTimes: 0,
    orderinfo: [],
    pages: ['图书馆违规登记', '图书馆使用状态更改', '管理员账号管理'],
    pagesUrl: ['violation', 'status', 'IDManagement'],
  },
  //取消预约
  delorder(e){
    console.log(e.currentTarget.dataset.id);
    wx.showModal({
      cancelColor: 'cancelColor',
      content:'是否取消'+e.currentTarget.dataset.sit+'的预约？',
      success:(res)=>{
        if(res.confirm){
          wx.request({
            url: 'http://127.0.0.1/delorder.php',
            data:{
              id:e.currentTarget.dataset.id,
              username:app.globalData.username
            },
            success:(re)=>{
              this.onShow();
              wx.showToast({
                title: '删除成功',
              })
            }
          })
        }
      }
    })
  },
  //切换用户
  exit: function () {
    wx.removeStorageSync('user');
    wx.redirectTo({
      url: 'login/login',
    })
  },
  //开放所有教室
  openclass() {
    wx.showModal({
      cancelColor: 'cancelColor',
      content: "是否开放所有教室提供预约",
      success: (e) => {
        if (e.confirm) {
          wx.request({
            url: 'http://127.0.0.1/openall.php',
            success: () => {
              wx.showToast({
                title: '开放成功',
                icon: 'success'
              })
            }
          })
        }
      }
    })
  },
  //开放明日预约
  opentomorrow(){
    wx.showModal({
      cancelColor: 'cancelColor',
      content:'是否开放明日所有预约',
      success:(res)=>{
        if(res.confirm){
          wx.request({
            url: 'http://127.0.0.1/opentomorrow.php',
            data:{
              date:util.nextDate(new Date())
            },
            success:(e)=>{
              wx.showModal({
                cancelColor: 'cancelColor',
                content:e.data,
                showCancel:false
              })
            }
          })
        }
      }
    })
  },
  //用户点击预约信息，展开详情
  Open(e) {
    var index = e.currentTarget.dataset.index;
    var open = this.data.orderinfo[index].open;
    var is = 'orderinfo[' + index + '].open';
    this.setData({
      [is]: !open
    })

  },
  onLoad() {

  },
  //页面每次打开调用，获取/更新用户的基本信息
  onShow: function (options) {
    wx.request({
      url: 'http://127.0.0.1/login.php',
      data: {
        username: app.globalData.username,
        password: app.globalData.password,
        date: util.formatTime(new Date()).split(' ')[0]
      },
      success:(res)=>{
          app.globalData.infoType = res.data.infoType
          app.globalData.number = res.data.number
          app.globalData.orderinfo = res.data.orderinfo
          this.setData({
            username: app.globalData.username,
            infoType: app.globalData.infoType,
            successTimes: app.globalData.number,
            orderinfo: app.globalData.orderinfo
          })
      }
    })
  },
  //跳转页面
  status: function () {
    wx.navigateTo({
      url: '../status/status',
    })
  },
  //跳转页面
  violation: function () {
    wx.navigateTo({
      url: '../violation/violation',
    })
  },
})