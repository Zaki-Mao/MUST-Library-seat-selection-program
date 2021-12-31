var app = getApp();
var util = require('../../../utils/util');

Page({ //页面的显示
  data: {
    date: util.formatTime(new Date()).split(' ')[0],
    tablenum: [],
    time: ["8点-12点", "12点-18点", "18点-22点"],
    open:1
  },
  //用户点击左日期
  today() {
    this.setData({
      date: util.formatTime(new Date()).split(' ')[0]
    })
    this.onShow();
  },
  //用户点击右日期
  nextday() {
    this.setData({
      date: util.nextDate(new Date())
    })
    this.onShow();
  },
  //预定座位信息页面
  Y: function (e) {
    wx.showModal({
      title: '提示',
      content: "确定预约这个座位?",
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: 'http://127.0.0.1/order.php',
            data: {
              sit_index: e.currentTarget.dataset.item_index,
              time_index: e.currentTarget.dataset.table_index,
              building: app.globalData.building,
              floor: app.globalData.floor,
              sittype: app.globalData.type,
              username:app.globalData.username,
              date:this.data.date
            },
            success: (e) => {
                wx.showModal({
                  content: e.data,
                  showCancel: false,
                  success:()=>{
                    app.globalData.number=app.globalData.number+1
                    console.log(app.globalData);
                  }
                })
              this.onShow();
            }
          })
        } else {
          console.log(2);
        }
      }
    })
  },
  //座位已被预约
  N: function (e) {
    console.log(e.currentTarget.dataset);
    wx.showModal({
      content: '该座位已被预约，下次趁早~o(*￣▽￣*)o',
      showCancel: false,
    })
    this.onShow();
  },
  //座位不开放
  S: function () {
    wx.showModal({
      content: '该座位暂不开放~o(*￣▽￣*)o',
      showCancel: false,
    })
    this.onShow();
  },
  onLoad: function (options) {

  },
  //页面打开时展示拉取数据
  onShow() {
    wx.request({
      url: 'http://127.0.0.1/showsit.php',
      data: {
        building:app.globalData.building,
        floor:app.globalData.floor,
        sittype:app.globalData.type,
        date:this.data.date
      },
      success: (e) => {
        this.setData({
          tablenum: e.data.sit,
          open:e.data.open
        })
      }
    })
  }
})