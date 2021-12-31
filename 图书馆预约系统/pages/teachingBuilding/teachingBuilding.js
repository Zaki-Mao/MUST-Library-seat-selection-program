var app = getApp();
var dataUtil = require('../../data/publicData.js');
var util = require('../../utils/util.js');
Page({
  data:{
      emoji:['0','0','0','0','0',],
    listForm: [
            {
                id: 'yiFu',
                name: '图书馆',
                open: false,
                pages: ['4F-电脑座位、电源座位、普通座位', '3F-单独座位、电源座位、普通座位', '2F-数据库电脑座位、普通电脑座位、普通座位、电源座位','1F-mac座位、电脑座位']
            },
            {
                id: 'xingXiang',
                name: '自习室',
                open: false,
                pages: ['电脑座位区','电源座位区','普通座位区','单独座位区']
            },
        
    ]
  },
  kindToggle: function (e) {
        var id = e.currentTarget.id, listForm = this.data.listForm;
        for (var i = 0, len = listForm.length; i < len; ++i) {
            if (listForm[i].id == id) {
                listForm[i].open = !listForm[i].open
            } else {
                listForm[i].open = false
            }
        }
        this.setData({
            listForm: listForm
        });
    },
    loop: function (){
      var emoji=[];
      for(var i=0;i<5;i++){
      var temp=util.emoji(this.data.list[i],0,0,13)
      emoji.push(temp)
      }
      this.setData({
        emoji:emoji
      })
    },
  onLoad:function(options){
    var list = wx.getStorageSync('list')
    // var teachingBuilding=dataUtil.publicData[1];
    this.setData({
    //   teachingBuilding:teachingBuilding,
    list:list
    });
    this.loop();
  },
  
})
