var app=getApp();
Page({
  data:{
    frame:true,
  },
  //用户点击保存，提交数据到数据库
  submit(e){
    // console.log(e.detail.value);
    if(e.detail.value.username == "" || e.detail.value.pwd == "" || e.detail.value.repwd == ""){
      wx.showToast({
        title: '请填写完整',
        icon:'error'
      })
    }else{
      if(e.detail.value.pwd != e.detail.value.repwd){
        wx.showToast({
          title: '两次密码不一致',
          icon:'error'
        })
      }else{
        wx.request({
          url: 'http://127.0.0.1/setuser.php',
          data:{
            username:e.detail.value.username,
            password:e.detail.value.pwd
          },
          success:(res)=>{
            // console.log(res);
            wx.showModal({
              cancelColor: 'cancelColor',
              showCancel:false,
              content:res.data
            })
          }
        })
      }
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})