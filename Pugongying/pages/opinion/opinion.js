var app = getApp();

Page({

  data: {
    opinions:'',//这是用户提交的建议
    power:0//删除文章评论权限
  },

  opinions:function(res){
    var opinions = this.data.opinions;
    this.setData({
      opinions: res.detail.value
    })
    console.log("输入框建议获取成功");
  },//获取用户提交的建议，并且传入到页面数据

  opinioninput: function () {
    var userid = getApp().globalData.userid;
    var that=this;
    if (that.data.opinions=='')
      wx.showToast({
        title: '输入信息',
        icon: 'none',
        duration: 2000
      })
    else{
    if (that.data.opinions == '我要最高权限') {
      app.globalData.supuser = 1;
      that.data.power=1;
      wx.showToast({
        title: '最高权限已经开启！！！',
        icon: 'none',
        duration: 2000
      })
    }
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/opinions.php',
      method: "POST",
      data: {
        userid: userid,
        opinions: that.data.opinions
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
         console.log('提交数据成功');
         if(that.data.power !=1)
         wx.showToast({
           title: '提交成功',
           icon: 'none',
           duration: 2000
         });
       }
    })}
  },//将获取到的建议传输到服务器

  onShow: function () {
    var that = this;
    var userid = getApp().globalData.userid;
    if (app.globalData.relogin != null) {
      wx.request({
        url: 'https://www.buleboy.cn/Pugongying/relogin.php',
        method: "POST",
        data: {
          userid: userid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log('接收重复登陆检测信息');
          if (app.globalData.relogin != res.data) {
            app.globalData.userInfo = null;
            app.globalData.userid = null;
            app.globalData.supuser = null;
            app.globalData.password = null;
            app.globalData.opinionhide = true;
            app.globalData.relogin = null;
            app.globalData.username = '点击登陆';
            wx.clearStorageSync();
            wx.showToast({
              title: '有人已经登陆本账号，重登吧',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  }//重复登陆检测
})