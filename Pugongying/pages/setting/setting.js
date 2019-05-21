var app = getApp();

Page({

  data: {
    setpicture: [
      'https://www.buleboy.cn/Pugongying/images/picture4.png', 
      'https://www.buleboy.cn/Pugongying/images/settingpic1.png',
      'https://www.buleboy.cn/Pugongying/images/settingpic2.png',
      'https://www.buleboy.cn/Pugongying/images/settingpic3.png'
    ] //设置页面的图标
  },

  loginbackClick:function(){
    app.globalData.userInfo = null;
    app.globalData.userid = null;
    app.globalData.supuser = null;
    app.globalData.password = null;
    app.globalData.relogin =null;
    app.globalData.username = '点击登陆';
    app.globalData.opinionhide = true;
    wx.clearStorageSync();
    var pages = getCurrentPages();
    var prevPage = pages[pages.length -2];
    prevPage.setData({
      username: '点击登陆',
      userimg: 'https://www.buleboy.cn/Pugongying/images/touxiang.png',
      userbgimg: 'https://www.buleboy.cn/Pugongying/images/background-info.png'
    })
    console.log("注销账号成功");
    wx.switchTab({
      url: '../user/user',
      complete: function (res) {
        console.log('跳回用户界面');
      }
    })
  },//注销账户功能

  informClick: function () {
    wx.navigateTo({
      url: '../inform/inform',
      complete: function (res) {
        console.log('跳转到消息通知设置页面')
      }
    })
  },//跳转到消息通知设置页面

  opinionClick: function () {
    wx.navigateTo({
      url: '../opinion/opinion',
      complete: function (res) {
        console.log('跳转到意见反馈页面')
      }
    })
  },//跳转到意见反馈页面

  correctClick:function(){
    wx.navigateTo({
      url: '../correct/correct',
      complete: function (res) {
        console.log('跳转到密码修改页面')
      }
    })
  },//跳转到密码修改页面

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