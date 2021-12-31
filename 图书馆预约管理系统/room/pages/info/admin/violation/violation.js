// pages/index/violation.js
var app = getApp();
var util = require('../../../../utils/util.js');
Page({
    data: {
        remind: false,
        building: ['图书馆', '自习室'],
        floor: [
            ['1F', '2F', '3F', '4F'],
            ['1F']
        ],
        type: [
            [
                ['mac座位', '电脑座位'],
                ['数据库电脑座位', '普通电脑座位', '电源座位', '普通座位'],
                ['单独座位', '电源座位', '普通座位'],
                ['电脑座位', '电源座位', '普通座位']
            ],
            [
                ['电脑座位区', '电源座位区', '普通座位区', '单独座位区']
            ]
        ],
        buildingnum: 0,
        floornum: 0,
        typenum: 0,
        list: [],
    },
    //用户点击更改教学楼
    bindPickerChangeBuilding: function (e) {
        this.setData({
            buildingnum: e.detail.value,
            floornum: 0,
            typenum: 0
        })
        //调用onShow()方法重新拉取页面数据
        this.onShow()
    },
    //用户点击更改楼层
    bindPickerChangeFloor: function (e) {
        this.setData({
            floornum: e.detail.value,
            typenum: 0
        })
        this.onShow()
    },
    //用户点击更改教室
    bindPickerChangeType: function (e) {
        this.setData({
            typenum: e.detail.value,
        })
        this.onShow()
    },
    //如果点击的座位已被预约，拉黑一周
    N: function (e) {
        wx.showModal({
            cancelColor: 'cancelColor',
            content: '是否将该同学拉黑一天？',
            success: (res) => {
                if (res.confirm) {
                    wx.request({
                        url: 'http://127.0.0.1/limit.php',
                        data: {
                            building: this.data.building[this.data.buildingnum],
                            floor: this.data.floor[this.data.buildingnum][this.data.floornum],
                            sittype: this.data.type[this.data.buildingnum][this.data.floornum][this.data.typenum],
                            time_index: this.data.time_index,
                            sit_index: e.currentTarget.dataset.seatnum,
                            date: util.formatTime(new Date()).split(' ')[0],
                            nextdate: util.nextDate(new Date()),
                            limit_date: util.limit_date()
                        },
                        success: (e) => {
                            console.log(e.data);
                            this.onShow();
                        }
                    })
                }
            }
        })
    },
    //如果点击的座位未被预约
    Y: function () {
        wx.showModal({
            content: '无人选择该座位',
            showCancel: false,
        })
    },
    onLoad: function (options) {

    },
    //页面打开时向数据库拉取数据
    onShow() {
        var time_index = util.get_time_index()
        if (time_index == -1) {
            this.setData({
                list: []
            })
        } else {
            wx.request({
                url: 'http://127.0.0.1/showsit.php',
                data: {
                    building: this.data.building[this.data.buildingnum],
                    floor: this.data.floor[this.data.buildingnum][this.data.floornum],
                    sittype: this.data.type[this.data.buildingnum][this.data.floornum][this.data.typenum],
                    date: util.formatTime(new Date()).split(' ')[0],
                },
                success: (e) => {
                    this.setData({
                        list: e.data.sit[time_index],
                        time_index: time_index
                    })
                }
            })
        }
    }
})