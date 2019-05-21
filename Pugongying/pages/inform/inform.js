var app = getApp();

Page({

  formSubmit: function (e) {
    console.log('消息通知Submit')
  },
  
  formReset: function () {
    console.log('消息通知Reset')
  },

  onLoad: function (options) {
    console.log("监听消息通知页面加载");
  },

  onReady: function () {
    console.log("监听消息通知页面初次渲染完成");
  },

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
  },

  onHide: function () {
    console.log("监听消息通知页面隐藏");
  },

  onUnload: function () {
    console.log("监听消息通知页面卸载");
  },

  onPullDownRefresh: function () {
    console.log("消息通知页面监听用户下拉动作");
  },

  onReachBottom: function () {
    console.log("消息通知页面上拉触底事件");
  },

  onShareAppMessage: function () {
    console.log("消息通知页面用户点击右上角分享");
  }
})