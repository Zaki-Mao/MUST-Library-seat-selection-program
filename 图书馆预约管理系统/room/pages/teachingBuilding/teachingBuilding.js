var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    emoji: ['0', '0', '0', '0', '0', ],
    is: 0,
    listForm: [{
      id: '0',
      name: '图书馆',
      open: false,
      pages: [{
        floor: '4F',
        open: false,
        type: ['电脑座位', '电源座位', '普通座位']
      }, {
        floor: '3F',
        open: false,
        type: ['单独座位', '电源座位', '普通座位']
      }, {
        floor: '2F',
        open: false,
        type: ['数据库电脑座位', '电脑座位', '电源座位', '普通座位']
      }, {
        floor: '1F',
        open: false,
        type: ['mac座位', '电脑座位']
      }]
    }, {
      id: '1',
      name: '自习室',
      open: false,
      pages: [{
        floor: '1F',
        type: ['电脑座位', '电源座位', '普通座位', '单独座位']
      }]
    }]
  },
  //用户点击教学楼时展开/关闭下级
  kindToggle(e) {
    var buildingindex = e.currentTarget.dataset.buildingindex;
    var list = 'listForm[' + buildingindex + '].open';
    var is = !this.data.listForm[buildingindex].open;
    this.setData({
      [list]: is
    })
  },
  //用户点击楼层时展开/关闭下级
  kindToggle2(e) {
    var buildingindex = e.currentTarget.dataset.buildingindex;
    var pageindex = e.currentTarget.dataset.pageindex;
    var list = 'listForm[' + buildingindex + '].pages[' + pageindex + '].open';
    var is = !this.data.listForm[buildingindex].pages[pageindex].open
    this.setData({
      [list]: is
    })
  },
  //用户点击教室时跳转页面
  kindToggle3(e) {
    if (this.data.is) {
      var buildingindex = e.currentTarget.dataset.buildingindex;
      var pageindex = e.currentTarget.dataset.pageindex;
      app.globalData.building = this.data.listForm[buildingindex].name;
      app.globalData.floor = this.data.listForm[buildingindex].pages[pageindex].floor;
      app.globalData.type = e.currentTarget.dataset.type;
      wx.navigateTo({
        url: './classroom/classroom',
      })
    } else {
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '您当前已被管理员拉黑，解封时间为' + app.globalData.userdate,
        showCancel:false
      })
    }
  },
  //从全局数据中拉取用户被拉黑的日期
  onShow: function (options) {
    var is = util.choose_time_index(app.globalData.userdate)
    this.setData({
      is,
    })
  },
})