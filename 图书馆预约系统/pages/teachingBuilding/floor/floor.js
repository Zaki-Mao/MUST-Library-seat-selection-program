Page({
  data: {
    emoji: ['0', '0', '0', '0'],
    pages: []
  },
  ableRoom: function () {
    wx.navigateTo({
      url: '../classroom/classroom',
    })
  },
  disabledRoom: function () {
    wx.showModal({
      content: '形势与政策，邝倩讲师，8:00~9:40，图书馆605教室',
      showCancel: false,
    })
  },
  onLoad: function (options) {
    var floorIdx = options.floorIdx;
    var buildingIdx = options.buildingIdx;
    var teachingBuilding = ['图书馆', '自习室', '图书馆C座', '二教', '一教'];
    var floor = ['A区', 'B区', 'C区', 'D区', '普通座位区、电源座位区','普通座位区、电源座位区'];
    var flIdx = floor[floorIdx];
    var pages= ['601', '602', '603', '604'];
    pages = ['A区', 'B区', 'C区', 'D区']
    this.setData({
      floorIdx: floorIdx,
      buildingIdx: buildingIdx,
      pages: pages,
      flIdx:flIdx,
    })
    wx.setNavigationBarTitle({
      title: teachingBuilding[buildingIdx],
    })
  },
})