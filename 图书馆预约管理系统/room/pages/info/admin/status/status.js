var app = getApp();
var util = require('../../../../utils/util.js');
Page({
  data: {
    date: [util.formatTime(new Date()).split(' ')[0],util.nextDate(new Date())],
    building:['全部','图书馆','自习室'],
    floor:[['全部'],['全部','1F','2F','3F','4F'],['1F']],
    type:[[['全部']],[['全部'],['全部','mac座位','电脑座位'],['全部','数据库电脑座位','普通电脑座位','电源座位','普通座位'],['全部','单独座位','电源座位','普通座位'],['全部','电脑座位','电源座位','普通座位']],[['全部','电脑座位区','电源座位区','普通座位区','单独座位区']]],
    buildingnum:0,
    floornum:0,
    typenum:0,
    Datenum:0,
  },
  //用户点击更改教学楼
  bindPickerChange: function (e) {
    this.setData({
      buildingnum: e.detail.value,
      floornum:0,
      typenum:0
    })
  },
  //用户点击更改楼层
  bindPickerChangeLou: function (e) {
    this.setData({
      floornum: e.detail.value,
      typenum:0
    })
  },
  //用户点击更改教室类型
  bindPickerChangeRoom: function (e) {
    this.setData({
      typenum: e.detail.value
    })
  },
  //用户点击更改日期
  bindPickerChangeDate: function(e){
    this.setData({
      Datenum: e.detail.value,
    })
  },
  //用户设置教学楼不可用
  confirmInfoAdmin: function () {
    //拼接出提示信息
    var message = "";
    if(this.data.building[this.data.buildingnum] == "全部"){
      message = "是否要设置所有教学楼不可预约？";
    }else if(this.data.floor[this.data.buildingnum][this.data.floornum] == "全部"){
      message = "是否要设置" + this.data.building[this.data.buildingnum] + "所有楼层不可预约？";
    }else if(this.data.type[this.data.buildingnum][this.data.floornum][this.data.typenum] == "全部"){
      message = "是否要设置" + this.data.building[this.data.buildingnum] + this.data.floor[this.data.buildingnum][this.data.floornum] + "所有教室不可预约？";
    }else{
      message = "是否要设置" + this.data.building[this.data.buildingnum] + this.data.floor[this.data.buildingnum][this.data.floornum] + this.data.type[this.data.buildingnum][this.data.floornum][this.data.typenum] + "不可预约？";
    }
    //展示提示信息
    wx.showModal({
      cancelColor: 'cancelColor',
      content:message,
      success:(e)=>{
        //用户点击确定
        if(e.confirm){
          //调用下面的ban()方法
          this.ban();
        }
      }
    })
  },
  //
  ban(){
    wx.request({
      url: 'http://127.0.0.1/ban.php',
      data:{
        building:this.data.building[this.data.buildingnum],
        floor:this.data.floor[this.data.buildingnum][this.data.floornum],
        type:this.data.type[this.data.buildingnum][this.data.floornum][this.data.typenum],
        date:this.data.date[this.data.Datenum]
      },
      success(e){
        wx.showToast({
          title: '设置成功！',
        })
      }
    })
  },
  onLoad: function (options) {
    
  }

})