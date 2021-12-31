// pages/login/login.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  data: {
    username: null,
    password: null,
  },
//登录操作
  login: function (e) {
    if(e.detail.value.username == "" || e.detail.value.password == ""){
      wx.showModal({ content: '用户名密码不能为空' })
    } else {
      wx.request({
        url: 'http://127.0.0.1/login.php',
        data:{
          username:e.detail.value.username,
          password:e.detail.value.password,
          date:util.formatTime(new Date()).split(' ')[0]
        },
        success(res){
          if(res.data.istrue){
            app.globalData.username=res.data.username
            app.globalData.password=e.detail.value.password
            app.globalData.infoType=res.data.infoType
            app.globalData.number=res.data.number
            app.globalData.orderinfo=res.data.orderinfo
            app.globalData.userdate=res.data.date
            wx.switchTab({ url: "../info"})
          }else{
            wx.showModal({
              content: '用户名或密码错误',
              showCancel: false
            })
          }
        }
      })
    }
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})